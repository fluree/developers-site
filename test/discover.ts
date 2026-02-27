import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { DiscoveredTest, SnippetTest } from "./types.ts";

/**
 * Recursively walks snippetsDir and returns every *.test.json file parsed
 * into a DiscoveredTest, sorted by test ID for deterministic ordering.
 */
export function discoverTests(snippetsDir: string): DiscoveredTest[] {
  const discovered: DiscoveredTest[] = [];

  function walk(dir: string) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith(".test.json")) {
        try {
          const content = readFileSync(fullPath, "utf8");
          const test = JSON.parse(content) as SnippetTest;
          discovered.push({ snippetDir: dir, test });
        } catch (err) {
          console.error(`Warning: Failed to parse ${fullPath}: ${err}`);
        }
      }
    }
  }

  walk(snippetsDir);
  discovered.sort((a, b) => a.test.id.localeCompare(b.test.id));
  return discovered;
}

/** Build a Map<id, DiscoveredTest> for fast lookup by test ID */
export function buildTestIndex(
  tests: DiscoveredTest[]
): Map<string, DiscoveredTest> {
  return new Map(tests.map((d) => [d.test.id, d]));
}
