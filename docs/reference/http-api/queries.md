# Queries

Endpoints for reading and analyzing data.

---

## `fluree/query`

```
POST /fluree/query
```

Query data from a ledger using FlureeQL.

### Request Object

| Key        | Required | Value                                                                                                                                                                                                                |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the query and the result set ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/))                                                                        |
| `from`     | yes      | **string** &bull; the name of the _existing_ ledger                                                                                                                                                                  |
| `where`    | no       | **object** or **array** &bull; a subquery to set query constraints and bind logic variables for use in your `select` clause [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/querying/) |
| `select`   | yes      | **object** or **array** &bull; a clause used to format the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/querying/)                                |
| `groupBy`  | no       | **string** &bull; an optional clause used to group the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/querying/)                                    |
| `having`   | no       | **string** or **array** &bull; an optional clause used to filter the projected result set of your query (requires the use of `groupBy`)                                                                              |
| `orderBy`  | no       | **string** &bull; an optional clause used to order the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/querying/)                                    |
| `opts`     | no       | **object** &bull; an optional object used to set query options, such as the `role` or `did` identity of the querying entity                                                                                          |

### Example Request Object

```json
{
  "@context": {
    "ex": "http://example.org/",
    "schema": "http://schema.org/"
  },
  "from": "cookbook/base",
  "where": {
    "@id": "?s",
    "schema:name": "?name"
  },
  "select": { "?s": ["*"] }
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/query' --header 'Content-Type: application/json' --data '{
    "@context": {
        "ex": "http://example.org/",
        "schema": "http://schema.org/"
    },
    "from": "cookbook/base",
    "where": {
        "@id": "?s",
        "schema:name": "?name"
    },
    "select": {"?s": ["*"]}
}'
```

### Example Response

```json
[
  {
    "@id": "ex:andrew",
    "@type": "schema:Person",
    "schema:name": "Andrew Johnson",
    "schema:age": 35,
    "schema:follows": [
      { "@id": "ex:freddy" },
      { "@id": "ex:letty" },
      { "@id": "ex:betty" }
    ]
  },
  {
    "@id": "ex:betty",
    "@type": "ex:Yeti",
    "schema:name": "Betty",
    "schema:age": 82,
    "schema:follows": { "@id": "ex:freddy" }
  },
  {
    "@id": "ex:freddy",
    "@type": "ex:Yeti",
    "schema:name": "Freddy",
    "schema:age": 4,
    "ex:verified": true
  },
  {
    "@id": "ex:letty",
    "@type": "ex:Yeti",
    "schema:name": "Leticia",
    "schema:age": 2,
    "schema:follows": { "@id": "ex:freddy" },
    "ex:nickname": "Letty"
  }
]
```

---

## `fluree/history`

```
POST /fluree/history
```

Query the history of changes for entities in a ledger.

### Request Object

| Key              | Required | Value                                                                                                                                                                                                                                      |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@context`       | no       | **object** &bull; a map of terms for the history query and the result set ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/))                                                                                      |
| `from`           | yes      | **string** &bull; the name of the _existing_ ledger                                                                                                                                                                                        |
| `history`        | yes      | **string** or **array** &bull; used to express the entity or entity patterns for which you are auditing history ([See the Reference section for Constraining Nodes](/docs/reference/history-syntax/#constraints-on-nodes))                 |
| `t`              | yes      | **object** &bull; used to express individual commit/time values or ranges of commit/time values ([See the Reference section for Constraining by Time](/docs/reference/history-syntax/#constraints-on-time))                                |
| `commit-details` | no       | **boolean**. A flag for whether or not to include the full details for each `commit` included in the history response ([See the Reference section for Including Commit Details](/docs/reference/history-syntax/#including-commit-details)) |

### Example Request Object

```json
{
  "@context": { "schema": "http://schema.org/" },
  "from": "cookbook/base",
  "history": [null, "schema:name"],
  "t": { "from": 1 }
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/history' --header 'Content-Type: application/json' --data '{
    "@context": { "schema": "http://schema.org/" },
    "from": "cookbook/base",
    "history": [null, "schema:name"],
    "t": { "from": 1 }
}'
```

### Example Response

```json
[
  {
    "f:t": 1,
    "f:assert": [
      {
        "schema:name": "Andrew Johnson",
        "@id": "ex:andrew"
      },
      {
        "schema:name": "Betty",
        "@id": "ex:betty"
      },
      {
        "schema:name": "Freddy",
        "@id": "ex:freddy"
      },
      {
        "schema:name": "Leticia",
        "@id": "ex:letty"
      }
    ],
    "f:retract": []
  },
  {
    "f:t": 2,
    "f:assert": [
      {
        "schema:name": "Andy the Yeti",
        "@id": "ex:andrew"
      }
    ],
    "f:retract": []
  }
]
```

---

## `fluree/explain`

```
POST /fluree/explain
```

Get the query execution plan for a FlureeQL query. This is useful for understanding how Fluree will execute a query and for optimization.

### Request Object

The request body is a standard FlureeQL query (same format as `/fluree/query`).

### Example Request Object

```json
{
  "from": "cookbook/base",
  "select": { "?s": ["*"] },
  "where": { "@id": "?s", "schema:name": "?name" }
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/explain' \
  --header 'Content-Type: application/json' \
  --data '{
    "from": "cookbook/base",
    "select": { "?s": ["*"] },
    "where": { "@id": "?s", "schema:name": "?name" }
  }'
```

### Example Response

```json
{
  "query": {
    "where": [
      ["id", { "fluree.db.query.exec.where/var": "?s" }]
    ],
    "select": {
      "spec": { "depth": 0, "wildcard?": true },
      "selection": ["*"],
      "subj": "?s"
    },
    "opts": { "output": "fql", "identity": null },
    "context": {}
  },
  "plan": {
    "optimization": "none",
    "reason": "No statistics available",
    "where-clause": [
      ["id", { "fluree.db.query.exec.where/var": "?s" }]
    ]
  }
}
```
