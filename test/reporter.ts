import { writeFileSync } from "node:fs";
import type { TestReport, TestResult } from "./types.ts";

// ANSI color helpers — degrade gracefully when stdout is not a TTY
const isTTY = process.stdout.isTTY;
const c = {
  green: (s: string) => (isTTY ? `\x1b[32m${s}\x1b[0m` : s),
  red: (s: string) => (isTTY ? `\x1b[31m${s}\x1b[0m` : s),
  yellow: (s: string) => (isTTY ? `\x1b[33m${s}\x1b[0m` : s),
  dim: (s: string) => (isTTY ? `\x1b[2m${s}\x1b[0m` : s),
  bold: (s: string) => (isTTY ? `\x1b[1m${s}\x1b[0m` : s),
};

function printFailureDetails(result: TestResult): void {
  if (result.error) {
    console.log(c.red(`       ${result.error}`));
  }
  if (result.actualStatus !== undefined) {
    const suffix =
      result.expectedStatus === undefined
        ? ""
        : ` (expected ${result.expectedStatus})`;
    console.log(c.dim(`       HTTP ${result.actualStatus}${suffix}`));
  }
  if (result.responseBody !== undefined) {
    const lines = JSON.stringify(result.responseBody, null, 2).split("\n");
    for (const line of lines.slice(0, 10)) {
      console.log(c.dim(`       ${line}`));
    }
    if (lines.length > 10) {
      console.log(c.dim(`       … (${lines.length - 10} more lines)`));
    }
  }
}

function statusLine(result: TestResult): string {
  switch (result.status) {
    case "passed":
      return `  ${c.green("✓")} ${c.dim(result.id)}`;
    case "failed":
      return `  ${c.red("✗")} ${result.id}`;
    case "pending-passed":
      return `  ${c.yellow("~")} ${c.dim(result.id)} ${c.yellow("(pending — unexpectedly passing)")}`;
    case "pending-failed":
      return `  ${c.yellow("~")} ${c.dim(result.id)} ${c.yellow("(pending — expected gap)")}`;
    case "error":
      return `  ${c.red("!")} ${result.id}`;
  }
}

export function printReport(report: TestReport): void {
  console.log();
  console.log(c.bold("Snippet Test Results"));
  console.log(c.dim(`Server:  ${report.serverUrl}`));
  console.log(c.dim(`Started: ${report.startedAt}`));
  console.log();

  for (const result of report.results) {
    console.log(statusLine(result));

    if (result.status === "failed" || result.status === "error") {
      printFailureDetails(result);
    }
  }

  const divider = "─".repeat(50);
  console.log();
  console.log(c.dim(divider));

  const passStr = c.green(`${report.passed} passed`);
  const failStr =
    report.failed > 0
      ? c.red(`${report.failed} failed`)
      : c.dim(`${report.failed} failed`);
  const pendingStr = c.yellow(`${report.pending} pending`);
  const errStr =
    report.errors > 0
      ? c.red(`${report.errors} errors`)
      : c.dim(`${report.errors} errors`);

  console.log(`  ${passStr}  ${failStr}  ${pendingStr}  ${errStr}`);
  console.log(c.dim(`  ${report.total} total · ${report.durationMs}ms`));
  console.log();

  if (report.failed > 0 || report.errors > 0) {
    console.log(
      c.red(
        `  ${report.failed + report.errors} test(s) failed. ` +
          `Review the results above to determine if db-r is missing functionality ` +
          `or if the documentation contains incorrect assumptions.`
      )
    );
    console.log();
  }

  const pendingFailed = report.results.filter(
    (r) => r.status === "pending-failed"
  ).length;
  const pendingPassed = report.results.filter(
    (r) => r.status === "pending-passed"
  ).length;

  if (pendingPassed > 0) {
    console.log(
      c.yellow(
        `  ${pendingPassed} pending test(s) are now passing — ` +
          `consider promoting them to testable: true in their .test.json files.`
      )
    );
    console.log();
  }

  if (pendingFailed > 0) {
    console.log(
      c.dim(
        `  ${pendingFailed} pending test(s) are tracking known db-r gaps. ` +
          `They do not fail CI.`
      )
    );
    console.log();
  }
}

export function writeJsonReport(report: TestReport, filePath: string): void {
  writeFileSync(filePath, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`JSON report written to ${filePath}`);
}
