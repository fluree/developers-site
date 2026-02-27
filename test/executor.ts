import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DiscoveredTest, ExpectedResponse, TestResult, TestStatus } from "./types.ts";

const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Top-level JSON fields that identify the target ledger in a Fluree request body.
 * The executor replaces these with the test-run-specific ledger name for isolation.
 */
const LEDGER_FIELDS = ["ledger", "from"] as const;

/** Parse "METHOD /path" into its parts */
function parseEndpoint(endpoint: string): { method: string; path: string } {
  const spaceIdx = endpoint.indexOf(" ");
  if (spaceIdx === -1) throw new Error(`Invalid endpoint format: "${endpoint}"`);
  return {
    method: endpoint.slice(0, spaceIdx),
    path: endpoint.slice(spaceIdx + 1),
  };
}

/**
 * Load a JSON body file relative to a snippet directory.
 * Returns the parsed object, ready for ledger substitution.
 */
function loadBody(
  snippetDir: string,
  bodyPath: string
): Record<string, unknown> {
  const fullPath = join(snippetDir, bodyPath);
  try {
    return JSON.parse(readFileSync(fullPath, "utf8"));
  } catch (err) {
    throw new Error(`Could not load body file "${fullPath}": ${err}`);
  }
}

/**
 * Replace the top-level "ledger" and "from" fields in a request body
 * with the test-run-specific ledger name. This isolates each test so
 * they don't interfere with each other or with production data.
 *
 * The snippet file retains its canonical ledger name (e.g. "cookbook/base")
 * for documentation purposes — only the test executor substitutes it.
 */
function substituteLedger(
  body: Record<string, unknown>,
  testLedger: string
): Record<string, unknown> {
  const result = { ...body };
  for (const field of LEDGER_FIELDS) {
    if (typeof result[field] === "string") {
      result[field] = testLedger;
    }
  }
  return result;
}

/** Send a single HTTP request to the db-r server */
async function httpRequest(
  serverUrl: string,
  endpoint: string,
  body: Record<string, unknown>
): Promise<{ status: number; body: unknown }> {
  const { method, path } = parseEndpoint(endpoint);
  const url = `${serverUrl}${path}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  let responseBody: unknown;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    responseBody = await response.json();
  } else {
    responseBody = await response.text();
  }

  return { status: response.status, body: responseBody };
}

/**
 * Check whether `actual` is a superset of `expected`.
 * Only checks the top-level keys present in `expected`.
 */
function containsMatch(
  actual: unknown,
  expected: Record<string, unknown>
): boolean {
  if (typeof actual !== "object" || actual === null) return false;
  const obj = actual as Record<string, unknown>;
  for (const [key, val] of Object.entries(expected)) {
    if (JSON.stringify(obj[key]) !== JSON.stringify(val)) return false;
  }
  return true;
}

/** Generate a unique ledger name for test isolation */
function makeTestLedger(testId: string): string {
  // Use the last path segment so the distinctive part (e.g. "create", "drop")
  // isn't lost to truncation when sibling tests share a long common prefix.
  const segment = testId.split("/").at(-1) ?? testId;
  const safe = segment
    .toLowerCase()
    .replaceAll(/[^a-z0-9]/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/(^-)|(-$)/g, "")
    .slice(0, 16);
  const uid = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
  return `t-${safe}-${uid}`;
}

/** Run all setup steps, substituting the test-run ledger name into each request body. */
async function runSetupSteps(
  setupIds: string[],
  allTests: Map<string, DiscoveredTest>,
  serverUrl: string,
  testLedger: string
): Promise<void> {
  for (const setupId of setupIds) {
    const setupDiscovered = allTests.get(setupId);
    if (!setupDiscovered) throw new Error(`Setup snippet not found: "${setupId}"`);
    const { test: setupTest, snippetDir: setupDir } = setupDiscovered;
    if (!setupTest.endpoint) throw new Error(`Setup snippet "${setupId}" has no endpoint`);
    if (!setupTest.body) throw new Error(`Setup snippet "${setupId}" has no body`);
    const setupBody = loadBody(setupDir, setupTest.body);
    await httpRequest(serverUrl, setupTest.endpoint, substituteLedger(setupBody, testLedger));
  }
}

/** Check response against expected values. Returns failure messages (empty = all passed). */
function evaluateAssertions(
  status: number,
  responseBody: unknown,
  expected: ExpectedResponse
): string[] {
  const failures: string[] = [];
  if (expected.status !== undefined && status !== expected.status) {
    failures.push(`Expected HTTP ${expected.status}, got ${status}`);
  }
  if (expected.bodyContains !== undefined && !containsMatch(responseBody, expected.bodyContains)) {
    failures.push(`Response body missing expected fields`);
  }
  if (expected.bodyEquals !== undefined && JSON.stringify(responseBody) !== JSON.stringify(expected.bodyEquals)) {
    failures.push(`Response body did not match expected exactly`);
  }
  return failures;
}

/**
 * Preflight check: verify that the server can create and drop a ledger.
 *
 * Run this before the main test suite. If create or drop are broken there is
 * no point launching parallel tests — every test creates a ledger, and every
 * teardown drops one. A clear early failure is better than a wall of errors.
 *
 * Throws with a descriptive message on failure so the runner can surface it.
 */
export async function runPreflight(serverUrl: string): Promise<void> {
  const ledger = makeTestLedger("preflight");

  const createResult = await httpRequest(
    serverUrl,
    "POST /v1/fluree/create",
    { ledger, insert: [] }
  );
  if (createResult.status !== 201) {
    throw new Error(
      `fluree/create returned HTTP ${createResult.status} (expected 201).\n` +
        `Response: ${JSON.stringify(createResult.body, null, 2)}`
    );
  }

  const dropResult = await httpRequest(
    serverUrl,
    "POST /v1/fluree/drop",
    { ledger }
  );
  if (dropResult.status !== 200) {
    throw new Error(
      `fluree/drop returned HTTP ${dropResult.status} (expected 200).\n` +
        `Response: ${JSON.stringify(dropResult.body, null, 2)}`
    );
  }
}

/**
 * Run a single test: setup steps → main request → assertions → teardown.
 * Each test gets an isolated ledger whose name is substituted into all request bodies.
 * Teardown (drop) always runs, even on failure, to keep the server clean.
 */
export async function executeTest(
  discovered: DiscoveredTest,
  serverUrl: string,
  allTests: Map<string, DiscoveredTest>
): Promise<TestResult> {
  const { test, snippetDir } = discovered;
  const startTime = Date.now();
  const testLedger = makeTestLedger(test.id);

  try {
    await runSetupSteps(test.setup ?? [], allTests, serverUrl, testLedger);

    if (!test.endpoint) throw new Error("Test has no endpoint");
    if (!test.body) throw new Error("Test has no body");

    const body = loadBody(snippetDir, test.body);
    const { status, body: responseBody } = await httpRequest(
      serverUrl,
      test.endpoint,
      substituteLedger(body, testLedger)
    );

    const failures = evaluateAssertions(status, responseBody, test.expected ?? {});
    const passed = failures.length === 0;
    const isPending = test.testable === "pending";

    let testStatus: TestStatus;
    if (isPending) {
      testStatus = passed ? "pending-passed" : "pending-failed";
    } else {
      testStatus = passed ? "passed" : "failed";
    }

    return {
      id: test.id,
      description: test.description,
      status: testStatus,
      durationMs: Date.now() - startTime,
      actualStatus: status,
      expectedStatus: test.expected?.status,
      responseBody: passed ? undefined : responseBody,
      error: failures.join("; ") || undefined,
    };
  } catch (err) {
    return {
      id: test.id,
      description: test.description,
      status: "error",
      durationMs: Date.now() - startTime,
      error: String(err),
    };
  } finally {
    // Drop the isolated test ledger regardless of pass/fail/error.
    // Failures are silently ignored — the ledger may not have been created
    // (e.g. if setup failed before reaching fluree/create), or the server
    // may be temporarily unreachable.
    try {
      await httpRequest(serverUrl, "POST /v1/fluree/drop", { ledger: testLedger });
    } catch {
      // ignore
    }
  }
}
