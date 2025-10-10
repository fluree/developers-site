import Editor, { useMonaco } from "@monaco-editor/react";
import React, { useState, useEffect, useRef } from "react";
import useFluree from "../../../components/flureedb/useFluree";
import useGlobal from "../../../hooks/useGlobal";

import {
	memoryConnOptions,
	triageContext,
} from "../../../components/flureedb/config";
import { PrimaryButton } from "fluree-ui";
import { useColorMode } from "@docusaurus/theme-common";
import "../Sandbox.css";

const DBStatus = ({ stagedT, committedT }) => {
	return (
		<span className="relative font-mono text-sm mx-0 xs:mx-2 opacity-60">
			[commits: {Math.abs(committedT) || 0}]
		</span>
	);
};

const circularReplacer = () => {
	const seen = new WeakSet();
	return (key, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};

const transaction1 = `{
  "@context": "https://schema.org",
  "@id": "https://www.wikidata.org/wiki/Q836821",
  "@type": [
    "Movie"
  ],
  "name": "The Hitchhiker's Guide to the Galaxy",
  "disambiguatingDescription": "2005 British-American comic science fiction film directed by Garth Jennings",
  "titleEIDR": "10.5240/B752-5B47-DBBE-E5D4-5A3F-N",
  "isBasedOn": {
    "@id": "https://www.wikidata.org/wiki/Q3107329",
    "@type": "Book",
    "name": "The Hitchhiker's Guide to the Galaxy",
    "isbn": "0-330-25864-8",
    "author": {
      "@id": "https://www.wikidata.org/wiki/Q42",
      "@type": "Person",
      "name": "Douglas Adams"
    }
  }
}`;

export const Sandbox = ({
	defaultValue,
	defaultContext,
	seedTransactions = [],
}) => {
	const commitSha = "f798df15c9a1c97ab8e392abf7f37fb30f93078a";
	// ('@fluree/flureedb build from fluree/db commit', commitSha)
	const { conn, ledger, stagedDb, committedDb, stage, commit, query } =
		useFluree("test/jld", memoryConnOptions(defaultContext));
	const [value, setValue] = useState(
		typeof defaultValue === "object"
			? JSON.stringify(defaultValue, null, 2)
			: defaultValue === undefined
			? transaction1
			: defaultValue
	);
	const [results, setResults] = useState("// results will show here...");
	const [isQuery, setIsQuery] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const monacoRef = useRef();
	const monaco = useMonaco();
	const { colorMode } = useColorMode();

	const defaultButton = useRef();

	const handleEditorDidMount = (editor, monaco) => {
		// here is another way to get monaco instance
		// you can also store it in `useRef` for further usage
		monacoRef.current = editor;
		setMonacoRef(monacoRef.current);
	};

	/* Keeping as global context for receiving input from button click */
	const {
		state: { input },
	} = useGlobal();
	const { dispatch } = useGlobal();
	const setMonacoRef = (val) => dispatch({ type: "monacoRef", value: val });

	useEffect(() => {
		if (conn && ledger) {
			setTimeout(async () => {
				for (var i = 0; i < seedTransactions.length; i++) {
					let newStaged;
					if (seedTransactions[i]) {
						// staging
						let transaction = seedTransactions[i];
						transaction = triageContext(transaction);
						newStaged = await stage(ledger, transaction);
					}

					if (ledger) {
						const r = await commit(ledger, newStaged ?? stagedDb);
					}
				}
			}, 500);
		}
	}, [conn, ledger]);

	useEffect(() => {
		if (JSON.stringify(input) !== "[]") {
			// input is the global value handed down via context
			setValue(JSON.stringify(input, circularReplacer(), 2));
		}
		if (monacoRef.current) {
			monacoRef.current.focus();
		}
	}, [input]);

	useEffect(() => {
		if (monaco) {
			monaco.editor.defineTheme("dark", {
				base: "vs-dark",
				inherit: true,
				rules: [],
				colors: {
					"editor.background": "#202124",
				},
			});

			if (colorMode === "light") {
				monaco.editor.setTheme("light");
			} else {
				monaco.editor.setTheme("dark");
			}
		}
	}, [colorMode, monaco]);

	const handleKey = (e) => {
		// F9
		if (e.keyCode === 120) {
			document.getElementById("target-button").click();
		}
		// ESC
		if (e.keyCode === 27) {
			document.getElementById("close-sandbox-drawer").click();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKey);
		return function cleanUp() {
			window.removeEventListener("keydown", handleKey);
		};
	}, []);

	useEffect(() => {
		if (value) {
			try {
				let obj = JSON.parse(value);
				// determine whether query or transaction
				let keys = Object.keys(obj);
				let queryKeys = [
					"select",
					"selectOne",
					"selectDistinct",
					"where",
					"from",
					"t",
					"opts",
					"ledger",
					"query",
					"@context",
					"context",
					"depth",
					"groupBy",
					"orderBy",
					"having",
					"values",
				];
				let isQueryKey = keys.every(function (e) {
					return queryKeys.indexOf(e) > -1;
				});
				setIsQuery(isQueryKey);
				setIsValid(true);
			} catch (err) {
				setIsValid(false);
			}
		} else {
			setIsValid(false);
		}
	}, [value]);

	const handleCommit = async () => {
		let newStaged;
		if (value) {
			// staging
			newStaged = await stage(ledger, triageContext(value));
		}

		if (ledger) {
			const r = await commit(ledger, newStaged ?? stagedDb);
			if (r) {
				setResults(
					JSON.stringify(
						{ ...r.commit.data, time: r.commit.time },
						circularReplacer(),
						2
					)
				);
			}
		}
	};

	const handleQueryCommitted = async () => {
		if (committedDb) {
			if (ledger) {
				const r = await query(committedDb, triageContext(value));
				if (r) setResults(JSON.stringify(r, null, 2));
			}
		}
	};

	return (
		<div className="w-100vw flex flex-col h-full pb-3">
			<div className="flex justify-between items-center relative py-3 px-5 -mb-4 max-w-[calc(100vw-70px)] lg:max-w-[50vw] sm:max-w-[calc(50vw+190px)] ">
				<span className="flex flex-col xs:flex-row justify-center xs:justify-start xs:items-center">
					<span className="font-bold">Fluree Sandbox</span>
					<DBStatus stagedT={stagedDb?.t} committedT={committedDb?.t} />
				</span>
				<span className="xs:px-3 xs:scale-100 scale-[0.90]">
					<PrimaryButton
						id={isQuery ? null : "target-button"}
						className={`inline-flex items-center min-w-24 h-10 px-2 py-1 xs:px-5 xs:py-2
              border border-transparent shadow-sm rounded-md 
              justify-center text-sm xs:text-md font-medium focus:outline-none text-snowflake hover:bg-avalanche cursor-pointer disabled:bg-gray-400 ${
								colorMode === "light"
									? "bg-fluree-blue shadow-gray-300 disabled:bg-gray-400"
									: "bg-mid-depth shadow-gray-700 disabled:bg-gray-600"
							} ${isQuery ? "opacity-50" : null}`}
						onClick={handleCommit}
						forwardRef={isQuery ? undefined : defaultButton}
						label="transact"
						disabled={!isValid}
					/>
					<PrimaryButton
						id={isQuery ? "target-button" : null}
						className={`inline-flex items-center min-w-24 h-10 px-2 py-1 xs:px-5 xs:py-2
          border border-transparent shadow-sm rounded-md shadow-gray-300 
          justify-center text-sm xs:text-md font-medium focus:outline-none text-snowflake hover:bg-avalanche cursor-pointer ml-1 ${
						colorMode === "light"
							? "bg-fluree-blue shadow-gray-300 disabled:bg-gray-400"
							: "bg-mid-depth shadow-gray-700 disabled:bg-gray-600"
					} ${isQuery ? null : "opacity-50"}`}
						onClick={handleQueryCommitted}
						ref={isQuery ? defaultButton : undefined}
						label="query"
						disabled={!isValid}
					/>
				</span>
			</div>
			<div
				className={`flex m-2 flex-col md:flex-row justy-around h-full relative min-h-[300px]`}
			>
				<div className="min-h-[calc(50%-10px)] md:min-h-full flex-1 m-2 p-1 border border-solid border-slate-400 rounded overflow-hidden">
					<Editor
						value={value}
						onChange={(value) => setValue(value)}
						language="json"
						onMount={handleEditorDidMount}
						options={{
							automaticLayout: true,
						}}
					/>
				</div>
				<div className="min-h-[calc(50%-10px)] md:min-h-full flex-1 m-2 p-1 border border-solid border-slate-400 rounded overflow-hidden">
					<Editor
						value={results}
						language="json"
						options={{
							automaticLayout: true,
							readOnly: true,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
