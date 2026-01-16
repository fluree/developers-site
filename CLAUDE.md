# Fluree Developers Site

Documentation site for Fluree built with Docusaurus 3.9.2.

## Project Structure

```
docs/
├── getting-started/ # Quick start, installation, core concepts
├── learn/           # Conceptual documentation
│   ├── foundations/ # Core concepts (graph data, JSON-LD, context)
│   ├── working-with-data/ # CRUD operations, queries, time travel
│   ├── modeling/    # Classes, properties, ontologies, SHACL, reasoning
│   ├── security/    # Access control, policies, verifiable data
│   └── advanced/    # Architecture, language tags, etc.
├── reference/       # API and syntax reference
│   ├── http-api/    # HTTP endpoint documentation
│   ├── querying/    # FlureeQL query syntax (split by topic)
│   └── cookbook/    # Examples and patterns
├── examples/        # Example datasets and walkthroughs
├── cloud/           # Fluree Cloud platform docs
└── sense/           # Fluree Sense product docs (separate product)
```

## Tone & Voice

Documentation should be **warm, enthusiastic, and welcoming** — inviting users to learn the material rather than lecturing at them. Think of the tone in *Clojure for the Brave and True* by Daniel Higginbotham as inspiration.

### Guidelines

- **Explain the "why"** — Don't just show syntax; help readers understand the reasoning behind design decisions
- **Don't assume RDF/JSON-LD knowledge** — Many users come from SQL backgrounds; meet them where they are
- **Use second person** — "You can query..." not "One can query..."
- **Be encouraging** — Acknowledge when concepts are tricky, then guide through them
- **Keep it conversational** — Avoid dry, academic prose

### Tonal Reference

The original tutorial guide by Daniel Higginbotham is preserved at `.tonal-references/working-with-graph-data.mdx` as an example of the desired tone. Key elements:

- Uses engaging examples (Mongolian death worms named Jack and Lucia)
- Acknowledges complexity without being intimidating
- Builds concepts progressively with clear explanations
- Conversational without being sloppy

When writing new content, read this file first to calibrate your voice.

## Documentation Coherence

When creating or editing documentation:

1. **Reference existing docs** — Read related guides to ensure consistency in terminology, syntax examples, and explanations
2. **Cross-link generously** — When mentioning topics covered elsewhere, link to them. The docs should form a cohesive, interconnected whole
3. **Build on prior knowledge** — Later guides should reference concepts from earlier ones rather than re-explaining everything
4. **Maintain consistency** — Use the same example patterns, namespace prefixes, and entity names across related guides when it aids understanding

## Code Example Standards

### Copy-Paste Readiness

Code examples should generally be **complete and runnable** — users should be able to copy-paste them directly. This means:

- Include full `@context` blocks where needed
- Show complete JSON-LD documents, not fragments
- Include the `from` or `ledger` field in queries/transactions

**Exceptions**: Some guides specifically teach concepts like `@context` or show incremental building of queries. In these cases, incomplete examples are appropriate when they serve the pedagogical goal.

### Code-Hike Focus Annotations

This project uses [Code-Hike](https://codehike.org/) for enhanced code blocks. Use the `focus` annotation to highlight specific lines while still showing complete examples:

```mdx
```json focus=3:5
{
  "@context": {"ex": "http://example.org/"},
  "@id": "ex:alice",
  "ex:name": "Alice",
  "ex:age": 30
}
```
```

This keeps examples copy-paste ready while drawing attention to what matters. Available focus syntax:

- `focus=3` — Single line
- `focus=3:5` — Line range
- `focus=3,7,9` — Multiple specific lines
- `focus=3:5,8:10` — Multiple ranges

You can also use inline focus links in explanatory text: `[the @id field](focus://3[3:15])` highlights specific characters.

## Documentation Conventions

### File Formats

- Use `.md` for simple markdown files
- Use `.mdx` for files requiring React components, Code-Hike features, or Mermaid diagrams

### Code Fence Languages

- JSON examples: `json`
- Shell/curl examples: `sh`
- SPARQL: `sparql`
- Turtle/RDF: `turtle`
- Clojure: `clojure`
- JavaScript: `javascript`
- Python: `python`

### API Reference Format

For HTTP endpoints, follow this structure:

1. Endpoint heading (`## \`fluree/endpoint\``)
2. HTTP method block (` ```POST /fluree/endpoint``` `)
3. Request Object table (Key | Required | Value)
4. Example Request Object (JSON)
5. Curl Example
6. Example Response

### Tables

Use GitHub-flavored markdown tables:

```md
| Key        | Required | Value                           |
| ---------- | -------- | ------------------------------- |
| `@context` | no       | **object** &bull; description   |
| `ledger`   | yes      | **string** &bull; description   |
```

### Admonitions

Use blockquotes with **NOTE**, **WARNING**, **TIP** prefixes:

```md
> **NOTE**: Important information here.
```

### Internal Links

Use relative paths with `/docs/` prefix:

```md
[Link Text](/docs/reference/http-api)
```

### Mermaid Diagrams

Supported via `@docusaurus/theme-mermaid`. Use in `.mdx` files:

````md
```mermaid
graph LR
    A --> B
```
````

## Sidebar Configuration

Sidebars are configured in `sidebars.js`. Main sections:

- `gettingStarted` - Quick start, installation, core concepts
- `learn` - Foundations, Working with Data, Modeling, Security, Advanced
- `reference` - HTTP API, Query syntax, Transaction syntax, Cookbook
- `examples` - Example datasets by domain and feature
- `cloud` - Fluree Cloud docs
- `SenseSidebar` - Fluree Sense docs

## Quality Checks

Before finalizing documentation changes:

### Content Review

- [ ] Read through the guide as a new user would — does it flow logically?
- [ ] Are all concepts explained before they're used?
- [ ] Are prerequisites clearly stated?
- [ ] Do examples build on each other sensibly?

### Link Validation

- [ ] All internal links resolve (not pointing to deleted/moved pages)
- [ ] External links are valid and relevant
- [ ] Anchor links (`#section-name`) point to existing headings

### Build Verification

```sh
bun run build
```

The build will fail on broken markdown links (`onBrokenLinks: "throw"` in config). Fix any errors before committing.

### Cross-Reference Check

- [ ] Related guides link to each other appropriately
- [ ] No orphaned pages (every page reachable from sidebar)
- [ ] New pages added to `sidebars.js`

## Development

```sh
bun install        # Install dependencies
bun start          # Start dev server (hot reload)
bun run build      # Production build
```

## Verifying Documentation with Claude Code (Optional)

Contributors using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) can enable enhanced documentation verification. These features are entirely optional — contributors who don't use Claude Code can ignore this section.

### Testing Code Examples

Claude can verify that documentation examples actually work by running them against a live Fluree instance.

**Setup:**
1. Start a Fluree server locally (see [Getting Started](/docs/getting-started/installation))
2. Set the environment variable:
   ```sh
   export FLUREE_TEST_SERVER_URL="http://localhost:58090"
   ```
3. Ask Claude to verify examples: *"Can you test the examples in this guide against Fluree?"*

**Behavior:**
- If `FLUREE_TEST_SERVER_URL` is set, Claude will run transactions and queries via curl and report whether they succeed
- If not set, Claude will note: *"I can verify these examples if you start a Fluree server and set `FLUREE_TEST_SERVER_URL`"*

### Exploring Fluree Source Code

Claude can reference the `fluree/db` and `fluree/server` repositories to verify that documentation matches actual implementation.

**Option 1: Local repositories** (if you have them cloned)

Set environment variables pointing to your local clones:

```sh
export FLUREE_DB_REPO_PATH="/path/to/fluree/db"
export FLUREE_SERVER_REPO_PATH="/path/to/fluree/server"
```

Claude will use its built-in file tools to search and read code directly.

**Option 2: GitHub MCP Server** (no local clone needed)

If you don't want to clone the repos, you can add the [GitHub MCP Server](https://github.com/github/github-mcp-server) to your Claude Code configuration. This lets Claude search and read code directly from GitHub.

Add to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<optional-for-higher-rate-limits>"
      }
    }
  }
}
```

> **NOTE**: A GitHub Personal Access Token is optional for public repos but recommended to avoid rate limits. Create one at https://github.com/settings/personal-access-tokens with `repo` scope.

### Environment Variable Summary

| Variable | Purpose |
|----------|---------|
| `FLUREE_TEST_SERVER_URL` | URL of running Fluree server for testing examples |
| `FLUREE_DB_REPO_PATH` | Path to local `fluree/db` clone for source reference |
| `FLUREE_SERVER_REPO_PATH` | Path to local `fluree/server` clone for source reference |

### Quick Setup

For contributors who want the full experience:

```sh
# Add to your shell profile (.zshrc, .bashrc, etc.)
export FLUREE_TEST_SERVER_URL="http://localhost:58090"
export FLUREE_DB_REPO_PATH="/path/to/fluree/db"
export FLUREE_SERVER_REPO_PATH="/path/to/fluree/server"
```

Or copy and fill in `.env.local.example`, then source it:

```sh
cp .env.local.example .env.local
# Edit .env.local with your values
source .env.local
```

Then when working on docs, start Fluree and ask Claude to verify your examples.
