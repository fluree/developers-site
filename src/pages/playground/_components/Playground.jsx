import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import Button from "./Button";
// import ExampleTabs from "./components/ExampleTabs";
import useFluree from "../../../components/flureedb/useFluree";
import { memoryConnOptions } from "../../../components/flureedb/config";
// import examples from "./examples";

const defaultQuery = {
  where: [["?i", "rdf:type", "schema:Movie"]],
  select: { "?i": ["*"] },
};

const DBStatus = ({ stagedT, committedT }) => (
  <div className="flex-1 px-3 py-2 italic text-sm">
    DB status: {stagedT ? Math.abs(stagedT) : 0}{" "}
    {stagedT && Math.abs(stagedT) === 1 ? "transaction" : "transactions"}{" "}
    staged, {committedT ? Math.abs(committedT) : 0} committed
  </div>
);

export function Playground() {
  const commitSha = "42c4c4952ad227050fb409f8bc6d5b6a6b67aca6";
  console.log("@fluree/flureedb build from fluree/db commit", commitSha);
  const { conn, ledger, stagedDb, committedDb, stage, commit, query } =
    useFluree("test/jld", memoryConnOptions);

  const [txValue, setTxValue] = useState("");
  const [queryValue, setQueryValue] = useState(
    JSON.stringify(defaultQuery, null, 2)
  );
  const [results, setResults] = useState("");

  // leaving this code present and commented out, because I imagine we will want to
  // add the examples once we have a design strategy

  // const [currentExample, setCurrentExample] = useState("movieBook");

  // const handleClickExample = (e) => {
  //   const newExample = e.target.name;
  //   if (newExample !== currentExample) {
  //     setCurrentExample(newExample);
  //   }
  // };

  // const handleChangeExample = (e) => {
  //   const newExample = e.target.value;
  //   if (newExample !== currentExample) {
  //     setCurrentExample(newExample);
  //   }
  // };

  // useEffect(() => {
  //   const exampleInput = examples.find(({ key }) => key === currentExample);
  //   if (exampleInput) setTxValue(JSON.stringify(exampleInput.data, null, 2));
  // }, [currentExample]);

  const handleStage = () => {
    stage(ledger, txValue);
  };

  const handleCommit = async () => {
    let newStaged;
    if (txValue) {
      console.log("staging");
      newStaged = await stage(ledger, txValue);
    }
    await commit(conn, newStaged ?? stagedDb);
  };

  const handleQueryStaged = async () => {
    if (stagedDb) {
      const r = await query(stagedDb, queryValue);
      if (r) setResults(JSON.stringify(r, null, 2));
    }
  };

  const handleQueryCommitted = async () => {
    if (committedDb) {
      if (ledger) {
        const r = await query(committedDb, queryValue);
        if (r) setResults(JSON.stringify(r, null, 2));
      }
    }
  };

  return (
    <div className="m-8">
      <div className="">
        <div className="grid grid-cols-2 gap-2 m-2">
          {/* input */}
          <div className="rounded border border-gray-200">
            <div className="bg-gray-100 p-2 flex">
              <div className="flex-none">
                <span className="uppercase text-sm font-bold">input</span>
                <span className="text-sm">
                  {" "}
                  a JSON object to stage or commit
                </span>
              </div>
            </div>
            <div className="h-64 bg-white">
              {" "}
              <Editor
                id="input-editor"
                value={txValue}
                options={{ automaticLayout: true }}
                onChange={(value) => {
                  setTxValue(value);
                }}
                language="json"
              />
            </div>
            <div className="bg-gray-100 p-2 flex">
              <div className="flex space-x-1">
                <Button disabled={!ledger} onClick={handleStage}>
                  stage
                </Button>
                <Button disabled={!ledger} onClick={handleCommit}>
                  commit
                </Button>
              </div>
              <DBStatus stagedT={stagedDb?.t} committedT={committedDb?.t} />
            </div>
          </div>

          {/* query */}

          <div className="rounded border border-gray-200">
            <div className="bg-gray-100 p-2 flex">
              <div className="flex-none">
                <span className="uppercase text-sm font-bold">query</span>
                <span className="text-sm">
                  {" "}
                  retrieve staged or comitted data
                </span>
              </div>
            </div>
            <div className="h-64 bg-white">
              {" "}
              <Editor
                value={queryValue}
                options={{ automaticLayout: true }}
                onChange={(value) => {
                  setQueryValue(value);
                }}
                language="json"
              />
            </div>
            <div className="bg-gray-100 p-2">
              <div className="flex space-x-1">
                <Button onClick={handleQueryStaged} disabled={!stagedDb}>
                  query staged
                </Button>
                <Button onClick={handleQueryCommitted} disabled={!committedDb}>
                  query committed
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded border border-gray-200 bg-gray-100 col-span-2">
            <div className="bg-gray-100 p-2 flex">
              <span className="uppercase text-sm font-bold">query results</span>
            </div>
            <div className="h-64 bg-gray-100 p-2">
              {results ? (
                <Editor
                  value={results}
                  language="json"
                  options={{
                    automaticLayout: true,
                    readOnly: true,
                  }}
                />
              ) : (
                <span className="italic">no query executed yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
