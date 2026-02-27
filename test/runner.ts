/**
 * Snippet test runner for the Fluree developers site.
 *
 * Discovers all testable snippets in the snippets/ directory, executes them
 * against a running db-r server, and reports results.
 *
 * Usage:
 *   FLUREE_TEST_SERVER_URL=http://localhost:8090 bun test/runner.ts
 *   FLUREE_TEST_SERVER_URL=http://localhost:8090 SNIPPET_REPORT_JSON=report.json bun test/runner.ts
 *
 * Environment variables:
 *   FLUREE_TEST_SERVER_URL  (required) Base URL of the running db-r server
 *   SNIPPET_REPORT_JSON     (optional) Path to write the JSON report to
 */
import { resolve } from "node:path";
import { discoverTests, buildTestIndex } from "./discover";
import { executeTest, runPreflight } from "./executor";
import { printReport, writeJsonReport } from "./reporter";
import type { TestReport } from "./types.ts";

const SNIPPETS_DIR = resolve(import.meta.dir, "../snippets");

async function main() {
  const serverUrl = process.env.FLUREE_TEST_SERVER_URL;
  if (!serverUrl) {
    console.error("Error: FLUREE_TEST_SERVER_URL is not set.");
    console.error("");
    console.error("Start a db-r server and set the variable, then re-run:");
    console.error("  export FLUREE_TEST_SERVER_URL=http://localhost:8090");
    console.error("  bun test/runner.ts");
    process.exit(1);
  }

  const reportJsonPath = process.env.SNIPPET_REPORT_JSON;

  console.log(`Discovering snippets in ${SNIPPETS_DIR} ...`);
  const allDiscovered = discoverTests(SNIPPETS_DIR);
  const allTestsMap = buildTestIndex(allDiscovered);

  // Separate testable (true | "pending") from illustrative (false)
  const toRun = allDiscovered.filter((d) => d.test.testable !== false);

  if (toRun.length === 0) {
    console.log("No testable snippets found.");
    console.log(
      "(All discovered snippets have testable: false — they are illustrative only.)"
    );
    process.exit(0);
  }

  const trueCount = toRun.filter((d) => d.test.testable === true).length;
  const pendingCount = toRun.filter((d) => d.test.testable === "pending").length;

  console.log(
    `Found ${toRun.length} testable snippets ` +
      `(${trueCount} active, ${pendingCount} pending) ` +
      `of ${allDiscovered.length} total.`
  );
  console.log(`Server: ${serverUrl}`);
  console.log();

  // Preflight: verify create+drop work before launching parallel tests.
  // Every test creates a ledger and every teardown drops one — if either
  // operation is broken, fail fast with a clear message instead of a wall
  // of parallel errors.
  process.stdout.write("Preflight (create/drop): ");
  try {
    await runPreflight(serverUrl);
    console.log("ok");
  } catch (err) {
    console.log("FAILED");
    console.error("\nPreflight failed — aborting. Fix the issue and re-run.");
    console.error(String(err));
    process.exit(1);
  }
  console.log();

  const startTime = Date.now();
  const startedAt = new Date().toISOString();

  const results = await Promise.all(
    toRun.map((discovered) => executeTest(discovered, serverUrl, allTestsMap))
  );

  const passed = results.filter((r) => r.status === "passed").length;
  const failed = results.filter((r) => r.status === "failed").length;
  const pending = results.filter(
    (r) => r.status === "pending-passed" || r.status === "pending-failed"
  ).length;
  const errors = results.filter((r) => r.status === "error").length;

  const report: TestReport = {
    serverUrl,
    startedAt,
    durationMs: Date.now() - startTime,
    total: results.length,
    passed,
    failed,
    pending,
    errors,
    results,
  };

  printReport(report);

  if (reportJsonPath) {
    writeJsonReport(report, reportJsonPath);
  }

  // Fail CI only for non-pending failures and errors
  if (failed > 0 || errors > 0) {
    process.exit(1);
  }
}

try {
  await main();
} catch (err) {
  console.error("Unexpected runner error:", err);
  process.exit(1);
}
