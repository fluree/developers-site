---
sidebar_position: 7
---

# SPARQL

This section details how to use SPARQL to query a Fluree. If you don't already know SPARQL, we recommend you use [Analytical Queries](/overview/query/analytical_query.mdx), as they have the same capabilities as SPARQL queries.

All of the examples below display SPARQL syntax, regardless of the language selected in the top-left. In addition, all queries on this page can be submitted to endpoints ending in `/sparql`.

## What is SPARQL? {#what-is-sparql}

SPARQL (pronounced "sparkle") is a query-langauge for RDF ledgers. RDF ledgers are also known as triple-store ledgers, and every fact in a triple-store ledger is stored in a triple composed of a subject-predicate-object (SPO). The first three elements of a flake (subject, predicate, object) align exactly to triple-store ledgers' SPO triples. This lends itself to connection across Fluree and RDF ledgers.

You can use SPARQL to:

- Query FlureeQL ledgers across time
- Query across Fluree and non-Fluree ledgers, such as Wikidata and BigData.
- Calculate aggregates
- Create complicated joins

The ability to query across multiple FlureeQL ledgers is not currently supported, although it will be supported in future releases.

In additional, SPARQL is strictly a query-language. You cannot use SPARQL to transact data.

SPARQL queries, as supported in FlureeQL are comprised of a:

- [SELECT clause](#select-clause)
- [WHERE clause](#where-clause)
- [Sources](#sources)

## SELECT Clause {#select-clause}

In the SELECT clause, list all the variables that you want returned in your results. Variables must begin with a `?`. It does not matter what you call each variable, as long as you list those variables in your WHERE clause.

An example SELECT clause `SELECT ?chat ?message ?instant ?person ?handle ?fullName`

If you are submitting a query that uses any of the prefixes supported by Wikidata, you can optionally add the labels for the variables you are returning by just adding an addition variable with the name + `Label`. More on this in [SPARQL with Outside Sources](#sources).

For example, with the select clause `SELECT ?horse ?horseLabel`, the variable `?horse` must be included in your WHERE clause, but `?horseLabel` does not.

You can use the following aggregate functions in your SELECT clause. Note that because of the way the results are displayed, while the `AS ?varName` of each aggregate function is required, the variable name is not shown in the results. You can also combine multiple aggregate and non-aggregate items in the same SELECT clause.

For example,  `SELECT ?favNums (AVG(?favNums) AS ?avg) ?person ?handle (MAX(?favNums) as ?max)` is a valid SELECT clause.

Function | Example | Description
--|--|--
`AVG` | `SELECT (AVG(?favNums) AS ?avg)` | Returns the average of the values.
`COUNT` | `SELECT (COUNT(?favNums) AS ?count)` | Returns a count of the values.
`COUNT DISTINCT` | `SELECT (COUNT(DISTINCT ?favNums) AS ?countD)` | Returns a count of the distinct values.
`MAX` | `SELECT (MAX(?favNums) AS ?max)` | Returns the largest value.
`MEDIAN` | `SELECT (MEDIAN(?favNums) AS ?median)` | Returns the median of the values.
`MIN` | `SELECT (MIN(?favNums) AS ?min)` | Returns the smallest value.
`RAND` | `SELECT (RAND(?favNums) AS ?rand)` |  Returns a random value from the specified values.
`SAMPLE` |  `SELECT (SAMPLE(2 ?favNums) AS ?sample)` | Given a sample size and a set of values, returns an appropriately sized sample, i.e.  the example returns two favorite numbers from values bound to the variable,  ?favNums.
`STDDEV` |  `SELECT (STDDEV(?favNums) AS ?stddev)` |  Returns the standard deviation of the values.
`SUM` |  `SELECT (SUM(?favNums) AS ?sum)` |  Returns the sum of the values.
`VARIANCE` | `SELECT (VARIANCE(?favNums) AS ?variance)`| Returns the variance of the values.

## WHERE Clause {#where-clause}

WHERE clauses are comprised of a series of triples, which correspond to subject-predicate-object. By stringing multiple triples together, we can create fairly complex queries and easily follow relationships across entities.

Note: If you have already looked at [FlureeQL Analytical Queries](/overview/query/analytical_query.mdx), then this section will look very familiar. FlureeQL Analytical Queries use the same concept of binding variables across triples, although the syntax is slightly different. In addition, the source of the data in a given triple is specified as a prefix, rather than as the first item in a five-tuple. We'll explain this fully later.

The basic building block of WHERE clause is the triple. To start, let's take a look at a WHERE clause with a single triple `WHERE { ?person fd:person/handle "jdoe".}`.

Triple-Part | Example | Explanation
-- | -- | --
subject | `?person` | The subject is a variable: `?person`. We could have just as easily called this variable `?people` or `?elephant`- the name does not matter here.
predicate | `fd:person/handle` | This predicate is comprised of a prefix, `fd:` and an predicate name `person/handle`. `fd:` stands for `Fluree` (see [sources](#sources) for more info).
object | `jdoe` | We are looking for results where the subject can be anything, the predicate is `person/handle`, and the object is `jdoe`.

We can combine this simple triple, `?person fd:person/handle "jdoe"` with additional triples, for example:

```sparql
SELECT ?person
WHERE {
  ?person fd:person/handle "jdoe".
  ?person fd:person/fullName ?fullName.
}
```

Triple-Part | Example | Explanation
-- | -- | --
subject | `?person` | The same variable as in the first tuple
predicate | `fd:person/fullName` | The predicate `person/fullName` in Fluree
object| `?fullName` | Because the object is a variable, we are not looking for any particular fullName.

Both the first and the second triples use the `?person` variable, which means that only entities that match both of the triples will be returned. For example, if an subject does not have a `person/fullName` predicate, then it will not be included in the results (to include it in the results, you must include an [OPTIONAL](#optional-clause) clause).

## Multiple Triples {#multiple-triples}

If two triples contain the same subject, then we can shorten the triples by using a semicolon `;` after the first clause and omitting the subject in all subsequent triples that share a subject. Make sure that the final clause in the group is has a period `.` at the end.

```sparql
SELECT ?person ?fullName ?favNums
WHERE {
  ?person fd:person/handle "jdoe";
          fd:person/fullName ?fullName;
          fd:person/favNums  ?favNums.
}
```

If two triples contain the same subject and the same predicate, then we can shorten the triples by using a comma `,` after the first clause and omitting both the subject and predicate in all subsequent clauses that share both a subject and a predicate. Spacing, tabs, and new-lines do not effect the result of the query. In the examples, we write both objects on the same line for readability. The below query won't return anything, because no person has two different handles.

```sparql
SELECT ?person
WHERE {
  ?person fd:person/handle "jdoe", "zsmith".
}
```

We can also combine semicolons `;` and commas `,`. In the below example, we moved `fd:person/handle "jdoe", "zsmith"` to the bottom of the group of clauses for readability- it does not change the results of the query.

```sparql
SELECT ?person ?fullName ?favNums
WHERE {
  ?person fd:person/fullName ?fullName;
          fd:person/favNums  ?favNums;
          fd:person/handle "jdoe", "zsmith".
}
```

All the queries with the `?person fd:person/handle "jdoe", "zsmith"` triple will return null results, because the comma `,` is not an `or` statement. Our triple, `?person fd:person/handle "jdoe", "zsmith".` is looking for an subject with a `person/handle` that matches both `jdoe` and `zsmith`. This cannot exist in our current ledger, because `person/handle` is not a multi-type of predicate.

## OPTIONAL Clauses {#optional-clauses}

Within the WHERE clause, you may include OPTIONAL clauses. For example, the below query will return all horses, including horses that may or may not have a mother listed.

```sparql
SELECT DISTINCT ?horse ?horseLabel ?mother 
{
 ?horse wdt:P31/wdt:P279* wd:Q726 .    
 OPTIONAL{?horse wdt:P25 ?mother .}
}
```

## Sources {#sources}

Prefixes, like `wdt:`, `fd:`, `wd:` tell us where to look for the data in a given clause. If we specify a number as an subject, it is assumed that we are referring to the current Fluree.

The following are all the currently available prefixes:

Prefix | Source
--|--
`fd`, `fdb`, `fluree`, or `flureedb` | Any of these prefixes indicate the current Fluree.
`fd#`, `fdb#`, `fluree#`, or `flureedb#` | The current Fluree at a specified block, for example `fd3:person/handle` is the `person/handle` at block 3.
`wdt`, `bd`, etc | Wikidata-supported prefix, [see all here](https://en.wikibooks.org/wiki/SPARQL/Prefixes). See also [introduction to SPARQL](https://en.wikibooks.org/wiki/SPARQL).

Note that if you are including a prefix that is supported by Wikidata, but external to it, i.e. `rdfs`, then you need to add a PREFIX clause to the top of your query. For example:

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ...
WHERE {
  ...
}
```

Each triple in a query refers to a particular dataset. A single triple cannot reference multiple datasets.

Additionally, if a clause contains no prefixes, for example `?creator ?label ?name.`, then we assume that the clause is referring to the current Fluree. However, if the clause is referring to an outside source, such as Wikidata, then you can simply add a prefix to any of the variables, for example `?creator wd:?label ?name.`

## Additional Options {#additional-options}

In addition to the items listed here, SPARQL supports additional options, such as additional aggregate functions, UNIONs, nested SELECT clauses, and FILTER and OPTIONAL clauses. While submitting a SPARQL query to Fluree with these additional options may not throw an error, these options will be ignored. We will expand SPARQL support in subsequent releases.

Key | Format | Explanation
-- | -- | --
LIMIT | `SELECT ... WHERE {...} LIMIT 10` | Pass an integer at the end of your query to specify the maximum amount of results you would like to receive.
OFFSET | `SELECT ... WHERE {...} LIMIT 10` | Amount of results you would like to skip before you receive results. This will only be used for the Wikidata portions of your query. If there are no Wikidata clauses, this option will be ignored.
DISTINCT | `SELECT DISTINCT ... WHERE {...}` | Return only distinct results
ORDER BY | `SELECT ... WHERE {...} ORDER BY ?nums` | To sort the results, specify `ORDER BY` followed either a variable name, `ASC(variableName)`, or `DESC(variableName)`
PRETTY-PRINT | `SELECT ... WHERE {...} PRETTY-PRINT`| By default, SPARQL queries are returned as a vector without any result labels. If you would like labels with your results, you can specify `PRETTY-PRINT` at the end of your query.
Language Labels | See [language labels](#language-labels)  | For more information, see the [Wikidata documentation on Service labels](https://en.wikibooks.org/wiki/SPARQL/SERVICE_-_Label)

## Language Labels {#language-labels}

If you are returning Wikidata labels from your SPARQL query, the labels will automatically be returned with English labels. However, if you would like alternative languages, you can simply add `SERVICE wikibase:label { bd:serviceParam wikibase:language "ru". }` to the bottom of your WHERE clause, and replace the value of the triple with any language (or set of languages) that you would like. If you include more than one language label, Wikidata will include label in the first language that is available, for example if you list Spanish, then Italian, if no Spanish label is found, Wikidata will look for an Italian label, or simply return the Q-id if no labels are found. More about this in the [Wikidata documentation on Service labels](https://en.wikibooks.org/wiki/SPARQL/SERVICE_-_Label).

For example, adding this SERVICE clause will return all labels in Russian:

```sparql
SELECT DISTINCT...
WHERE {
  ...
  SERVICE wikibase:label { bd:serviceParam wikibase:language "ru". }
}
ORDER BY ?catLabel
```

Other manual bindings in the SERVICE labels are not currently supported in the Fluree version of SPARQL.
