# Fluree HTTP API

## `fluree/create`

```
POST /fluree/create
```

### Request Object

| Key        | Required | Value                                                                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the creation transaction ([See our Guide on Using Context](/docs/learn/guides/working-with-context)) |
| `ledger`   | yes      | **string** &bull; the name of the created ledger                                                                                          |
| `insert`   | yes      | **object** or **array** &bull; the first transaction for the ledger (think of this as an _initial commit_ when working with `git`)        |

### Example Request Object

```json
{
  "@context": {
    "ex": "http://example.org/",
    "schema": "http://schema.org/"
  },
  "ledger": "cookbook/base",
  "insert": [
    {
      "@id": "ex:freddy",
      "@type": "ex:Yeti",
      "schema:age": 4,
      "schema:name": "Freddy",
      "ex:verified": true
    }
  ]
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/create' --header 'Content-Type: application/json' --data '{
  "@context": {
    "ex": "http://example.org/",
    "schema": "http://schema.org/"
  },
  "ledger": "cookbook/base",
  "insert": [
    {
      "@id": "ex:freddy",
      "@type": "ex:Yeti",
      "schema:age": 4,
      "schema:name": "Freddy",
      "ex:verified": true
    }
  ]
}'
```

### Example response

```json
{
  "address": "fluree:file://cookbook/base/main/head",
  "alias": "cookbook/base",
  "t": 1
}
```

## `fluree/transact`

```
POST /fluree/transact
```

Commit a transaction to a ledger.

### Request Object

| Key        | Required | Value                                                                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the transaction ([See our Guide on Using Context](/docs/learn/guides/working-with-context)) |
| `ledger`   | yes      | **string** &bull; the name of the _existing_ ledger                                                                              |
| `insert`   | no       | **object** or **array** &bull; data to be asserted                                                                               |
| `where`    | no       | **object** or **array** &bull; a subquery to bind logic variables for use in your `delete` and/or `insert` clauses               |
| `delete`   | no       | **object** or **array** &bull; data to be retracted                                                                              |

> **NOTE**: While `insert`, `delete`, and `where` are not required, either/both `insert` & `delete` must be used to qualify a valid transaction. You could _only_ insert data, you could _only_ delete data, or you could _use both_ `insert` + `delete` to qualify a sort of update to data state.

### Example Request Object

```json
{
  "@context": {
    "schema": "http://schema.org/"
  },
  "ledger": "cookbook/base",
  "where": { "@id": "?s", "schema:description": "We ❤️ All Blood" },
  "delete": { "@id": "?s", "schema:description": "We ❤️ All Blood" },
  "insert": {
    "@id": "?s",
    "schema:description": ["We ❤️ Human Blood", "We ❤️ Animal Blood"]
  }
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/transact' --header 'Content-Type: application/json' --data $'{
  "@context": {
    "schema": "http://schema.org/"
  },
  "ledger": "cookbook/base",
  "where": { "@id": "?s", "schema:description": "We ❤️ All Blood" },
  "delete": { "@id": "?s", "schema:description": "We ❤️ All Blood" },
  "insert": {
    "@id": "?s",
    "schema:description": ["We ❤️ Human Blood", "We ❤️ Animal Blood"]
  }
}'
```

### Example Response

```json
{
  "address": "fluree:file://cookbook/base/main/head",
  "alias": "cookbook/base",
  "t": 2
}
```

## `fluree/query`

```
POST /fluree/query
```

### Request Object

| Key        | Required | Value                                                                                                                                                                                                                |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the query and the result set ([See our Guide on Using Context](/docs/learn/guides/working-with-context))                                                                        |
| `from`     | yes      | **string** &bull; the name of the _existing_ ledger                                                                                                                                                                  |
| `where`    | no       | **object** or **array** &bull; a subquery to set query constraints and bind logic variables for use in your `select` clause [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax) |
| `select`   | yes      | **object** or **array** &bull; a clause used to format the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                                |
| `groupBy`  | no       | **string** &bull; an optional clause used to group the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                                    |
| `having`   | no       | **string** or **array** &bull; an optional clause used to filter the projected result set of your query (requires the use of `groupBy`)                                                                              |
| `orderBy`  | no       | **string** &bull; an optional clause used to order the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                                    |
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

## `fluree/history`

```
POST /fluree/history
```

### Request Object

| Key              | Required | Value                                                                                                                                                                                                                                      |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@context`       | no       | **object** &bull; a map of terms for the history query and the result set ([See our Guide on Using Context](/docs/learn/guides/working-with-context))                                                                                      |
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
curl --location 'http://localhost:58090/fluree/query' --header 'Content-Type: application/json' --data '{
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
        "id": "ex:andrew"
      },
      {
        "schema:name": "Betty",
        "id": "ex:betty"
      },
      {
        "schema:name": "Freddy",
        "id": "ex:freddy"
      },
      {
        "schema:name": "Leticia",
        "id": "ex:letty"
      }
    ],
    "f:retract": []
  },
  {
    "f:t": 2,
    "f:assert": [
      {
        "schema:name": "Andy the Yeti",
        "id": "ex:andrew"
      }
    ],
    "f:retract": []
  }
]
```
