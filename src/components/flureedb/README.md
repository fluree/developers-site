# Fluree JLD Ledger React components

## `useFluree`

Currently, the hook takes two parameters; a `ledgerAlias` string, and a `connOptions` object. An in-memory connection object (`memoryConnOptions`) can be imported from `/src/components/flureedb/config.js` for easy use.

The hook will establish a connection to the in-browser ledger, and create a new ledger upon initialization. The hook returns the state variables `conn`, `ledger`, `stagedDb`, and `committedDb`, as well as `stage`, `commit`, and `query` functions.

### Example

```javascript
import { useEffect } from "react";
import useFluree from "src/components/flureedb/useFluree";
import { memoryConnOptions } from "src/components/flureedb/config";

const Example = () => {
  // initialize ledger
  const { conn, ledger, stagedDb, committedDb, stage, commit, query } =
    useFluree("test/jld", memoryConnOptions);

  // automatically stage some data
  useEffect(() => {
    if (conn && ledger && !stagedDb) {
      const data = {
        "@context": "https://schema.org",
        "@id": "https://www.wikidata.org/wiki/Q836821",
        "@type": ["Movie"],
        name: "The Hitchhiker's Guide to the Galaxy",
        disambiguatingDescription:
          "2005 British-American comic science fiction film directed by Garth Jennings",
        titleEIDR: "10.5240/B752-5B47-DBBE-E5D4-5A3F-N",
        isBasedOn: {
          "@id": "https://www.wikidata.org/wiki/Q3107329",
          "@type": "Book",
          name: "The Hitchhiker's Guide to the Galaxy",
          isbn: "0-330-25864-8",
          author: {
            "@id": "https://www.wikidata.org/wiki/Q42",
            "@type": "Person",
            name: "Douglas Adams",
          },
        },
      };
      stage(ledger, data);
    }
  }, [conn, ledger, stagedDb]);
  return <></>;
};
```

## `FlureeWrapper` & `useFlureeContext`

`FlureeWrapper` is a React context provider component. It will allow for components wrapped within the provider to utilize a common Fluree ledger.

Any components that need to consume this context can import `useFlureeContext` and initialize it similarly to the `useFluree` hook, just with no need to pass params.

### Example

#### Consumer Component

```javascript
import { useFlureeContext } from "src/components/flureedb/FlureeContext";
import StageButton from "src/components/StageButton";

export default function StageButton({ data }) {
  const { ledger, stage } = useFlureeContext();
  const handleClick = async (e) => {
    if (ledger) {
      await stage(ledger, data);
    }
  };
  return <button onClick={handleClick}>Stage</button>;
}
```

#### MDX Document

```md
import { FlureeWrapper } from "src/components/flureedb/FlureeContext";

# Example Guide

Do you want to use an in-memory ledger within a documentation page? You're in luck. First wrap any React components that need to use the ledger within the `FlureeWrapper` component, like so.

<FlureeWrapper>

This is where we can place the `StageButton` component created in the previous code block.

<StageButton data={{
  "@id": "http://example.org/ex1",
  "@value": "a string"
}} />

You should be able to click the button to stage the passed data prop.

</FlureeWrapper>
```
