"use strict";

/**
 * remark-snippet-inject
 *
 * A remark plugin that reads fenced code blocks annotated with `snippet=path/to/file`
 * and injects the file contents as the code block body. This allows documentation to
 * reference the same snippet files used by the test suite, ensuring docs and tests
 * stay in sync.
 *
 * Usage in MDX files:
 *
 *   ```json snippet=reference/http-api/transactions/basic-insert
 *   ```
 *
 *   With Code-Hike focus annotations preserved:
 *
 *   ```json snippet=reference/http-api/transactions/basic-insert focus=3:5
 *   ```
 *
 * The plugin resolves the file extension from the code block language:
 *   json / jsonc → .json
 *   sh / bash / shell → .sh
 *   sparql → .sparql
 *   turtle / ttl → .ttl
 *   javascript / js → .js
 *   python / py → .py
 *
 * Configuration in docusaurus.config.js (must be listed BEFORE remarkCodeHike):
 *
 *   beforeDefaultRemarkPlugins: [
 *     [require('./plugins/remark-snippet-inject'), { snippetsDir: path.join(__dirname, 'snippets') }],
 *     [remarkCodeHike, { ... }],
 *   ]
 */

const fs = require("fs");
const path = require("path");

const LANG_TO_EXT = {
  json: ".json",
  jsonc: ".json",
  sh: ".sh",
  bash: ".sh",
  shell: ".sh",
  sparql: ".sparql",
  turtle: ".ttl",
  ttl: ".ttl",
  javascript: ".js",
  js: ".js",
  typescript: ".ts",
  ts: ".ts",
  python: ".py",
  py: ".py",
};

/** Simple depth-first tree walker — avoids unist-util-visit dependency */
function visitCode(tree, visitor) {
  function walk(node) {
    if (node.type === "code") visitor(node);
    if (node.children) node.children.forEach(walk);
  }
  walk(tree);
}

/**
 * @param {{ snippetsDir?: string }} options
 * @returns {(tree: object) => void}
 */
module.exports = function remarkSnippetInject(options = {}) {
  const snippetsDir =
    options.snippetsDir || path.join(process.cwd(), "snippets");

  return function transformer(tree) {
    visitCode(tree, function (node) {
      if (!node.meta) return;

      // Match snippet=some/path (may appear anywhere in the meta string)
      const match = node.meta.match(/(?:^|\s)snippet=(\S+)/);
      if (!match) return;

      const snippetPath = match[1];
      const lang = (node.lang || "json").toLowerCase();
      const ext = LANG_TO_EXT[lang] || ".json";

      const filePath = path.join(snippetsDir, snippetPath + ext);

      try {
        const content = fs.readFileSync(filePath, "utf8");
        node.value = content.trimEnd();
        // Strip the snippet=... token from meta, leave everything else intact
        // (e.g. Code-Hike's focus= annotations must survive)
        const newMeta = node.meta
          .replace(/(?:^|\s)snippet=\S+/, "")
          .trim();
        node.meta = newMeta || null;
      } catch (err) {
        const rel = path.relative(process.cwd(), filePath);
        throw new Error(
          `remark-snippet-inject: Cannot read snippet file "${rel}".\n` +
            `  Referenced from a code block: lang="${node.lang}", meta="${node.meta}"\n` +
            `  Resolved to: ${filePath}\n` +
            `  ${err.message}`
        );
      }
    });
  };
};
