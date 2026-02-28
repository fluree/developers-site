/**
 * Whether a snippet should be tested.
 *
 * - true        → Run; must pass. CI gate.
 * - false       → Never run (illustrative/incomplete snippet).
 * - "pending"   → Run; failures are tracked but do not fail CI.
 *                 Use this for known gaps in db-r that are being tracked.
 */
export type Testable = true | false | "pending";

export interface ExpectedResponse {
  /** Expected HTTP status code */
  status?: number;
  /** Partial match: actual response body must contain all these key/value pairs */
  bodyContains?: Record<string, unknown>;
  /** Exact match: actual response body must equal this value */
  bodyEquals?: unknown;
  /**
   * Array element match: actual response body must be an array containing at
   * least one element whose top-level key/value pairs all match.
   * Use this when the endpoint returns an array of objects.
   */
  bodyContainsItem?: Record<string, unknown>;
  /**
   * Tuple match: actual response body must be an array containing at least one
   * element that exactly equals this value.
   * Use this when the endpoint returns an array of arrays (e.g. history queries).
   */
  bodyContainsTuple?: unknown[];
}

/**
 * Metadata for a testable snippet, stored in a `*.test.json` file alongside
 * the snippet body file(s).
 */
export interface SnippetTest {
  /**
   * Unique identifier for this test, e.g. "reference/http-api/transactions/basic-insert".
   * Should mirror the file path relative to snippets/.
   */
  id: string;
  /** Human-readable description of what this snippet demonstrates */
  description: string;
  /** Whether and how to run this test */
  testable: Testable;
  /**
   * HTTP endpoint to POST to, e.g. "POST /v1/fluree/transact".
   * Required for testable snippets.
   */
  endpoint?: string;
  /**
   * Path to the request body file, relative to the directory containing this .test.json.
   * The body file's top-level "ledger" or "from" fields will be substituted with a
   * test-run-unique ledger name for isolation.
   */
  body?: string;
  /**
   * Ordered list of snippet test IDs to run before this test.
   * Each ID must match the "id" field in another *.test.json file.
   * Use "shared/create-test-ledger" to create a fresh ledger.
   */
  setup?: string[];
  /** Expected response from the server */
  expected?: ExpectedResponse;
}

/** A discovered test with its resolved file paths */
export interface DiscoveredTest {
  /** Absolute path to the directory containing the .test.json */
  snippetDir: string;
  test: SnippetTest;
}

export type TestStatus =
  | "passed"
  | "failed"
  | "pending-passed"
  | "pending-failed"
  | "error";

export interface TestResult {
  id: string;
  description: string;
  status: TestStatus;
  durationMs: number;
  actualStatus?: number;
  expectedStatus?: number;
  responseBody?: unknown;
  error?: string;
}

export interface TestReport {
  serverUrl: string;
  startedAt: string;
  durationMs: number;
  total: number;
  passed: number;
  failed: number;
  pending: number;
  errors: number;
  results: TestResult[];
}
