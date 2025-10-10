# Fluree Developer Docs

Welcome to the Fluree docs! This readme will detail how to run the docs,
raise an issue, and submit changes.

The docs are built using [Docusaurus](https://docusaurus.io/).

## Run the Docs Locally

Clone the project

```bash
git clone https://github.com/fluree/flhubee
```

Go to the project directory

```bash
cd apps/docs-site
```

Install dependencies

```bash
bun install
```

Start the server

```bash
bun run docs-site
```

## Docusaurus Customizations

We've customized the basic Docusaurus installation to enhance the docs
experience. These customizations require you to use MDX files, and you may need
to explicitly use docusaurus components for elements that you previously could
denote with markdown syntax. One such component is `Admonition`, for creating
warning or info blocks and the like. Here's an example:

```javascript
import Admonition from "@theme/Admonition";

<Admonition type="caution">
  In real-world usage you'll want to use _IRIs_ for `"@id"` values, a topic
  we'll cover in the next chapter. We'll keep formatting @id's this way for the
  time being, but if for some reason you stop the tutorial here just be aware
  that it'll be important to learn how to work with IRIs.
</Admonition>;
```

### Code Hike

You can use [Code Hike](https://codehike.org/) to spice up code snippets with
features like:

- Highlights
- Filenames and tabs
- Annotations
- Spotlight

See the code hike docs for more details.

### Fluree Sandbox

The Sandbox lets you transact against an in-memory Fluree database. This
database persists across a browser session, but does not survive a page refresh.

To use the sandbox:

1. Use the `.mdx` file extension for your file
2. Add the following at the top:

   ```javascript
   import SandboxDrawer from "@site/src/components/sandbox_drawer/SandboxDrawer.jsx";
   ```

3. Add the following at the bottom:

   ```javascript
   <SandboxDrawer />
   ```

4. The `SandboxDrawer` component can take in 3 props, which are optional:

- `defaultValue` will set the initial value of the drawer input editor. This is generally a JSON object, but could also be a string.
- `defaultContext` takes a JSON object and will set the default context used in the fluree ledger.
- `seedTransactions` takes an array of transactions which will be run against the ledger when the drawer component mounts. Accepts an array of objects (JSON).

5. In conjunction with the `SandboxDrawer`, you can use the `SandboxButton` to populate the drawer's contents. To use the `SandboxButton`, first add the import statement:

   ```javascript
   import SandboxButton from "@site/src/components/sandbox_drawer/SandboxButton.jsx";
   ```

   Then, add `<SandboxButton />` directly above a codeblock in the markdown file, such as:

   ````javascript
   (<SandboxButton />)```json
     {"some": "json"}
   ```;
   ````

### Mermaid

Mermaid renders diagrams from plain text. To use Mermaid on a page:

1. Use the `.mdx` file extension for your file
2. Add the following at the top:

   ```javascript
   import { FlureeMermaid } from "@site/src/components/Mermaid/FlureeMermaid.jsx";
   ```

3. Include a chart component with something like the following:

```javascript
<FlureeMermaid
  chart={`graph TB
  j(_:f100) -->|"@id"| jid(_:f100)
  j -->|name| jn(Jack)
  j -->|species| sp1(Mongolian death worm)
  j -->|bestFriend| l
  l(_:f101) -->|"@id"| lid(_:f101)
  l -->|name| ln(Lucia)
  l -->|species| sp2(Mongolian death worm)
  l -->|bestFriend| j
`}
/>
```

## Contributing

If you notice any issues on the mark down files please feel free to open an issue
on GitHub, contributions are always welcome!

## Connect with the Fluree Team

To connect directly with the Fluree team join our [Discord](https://discord.gg/pgjsvPa9Nm).

Visit our [Fluree](http://flur.ee/) website.
