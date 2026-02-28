# Queries

Endpoints for reading and analyzing data.

---

## `fluree/query`

```
POST /v1/fluree/query
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

```json snippet=reference/http-api/queries/query
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/query' --header 'Content-Type: application/json' --data '{
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

## History Queries

History queries run through the same `POST /v1/fluree/query` endpoint as regular queries. Adding a `"to"` key to your query body switches it into history mode, which returns a log of assertions and retractions over the specified time range.

Use `"@t"` and `"@op"` metadata bindings in your `where` clause to capture the commit index and whether each triple was asserted or retracted.

### Request Object

| Key        | Required | Value                                                                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the query and the result set ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/)) |
| `from`     | yes      | **string** &bull; starting point in ledger history, e.g. `"cookbook/base@t:1"` or `"cookbook/base@t:0"`                                     |
| `to`       | yes      | **string** &bull; ending point in ledger history, e.g. `"cookbook/base@t:latest"`                                                           |
| `select`   | yes      | **array** &bull; variables to project into the result tuples                                                                                 |
| `where`    | yes      | **object** or **array** &bull; pattern using `@value`, `@t`, and `@op` metadata keys to bind values and history metadata                    |
| `orderBy`  | no       | **string** &bull; variable to sort results by                                                                                                |

### Example Request Object

```json snippet=reference/http-api/queries/history
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/query' \
  --header 'Content-Type: application/json' \
  --data '{
    "@context": {
      "ex": "http://example.org/",
      "schema": "http://schema.org/"
    },
    "from": "cookbook/base@t:1",
    "to": "cookbook/base@t:latest",
    "select": ["?s", "?name", "?t", "?op"],
    "where": [
      {
        "@id": "?s",
        "schema:name": { "@value": "?name", "@t": "?t", "@op": "?op" }
      }
    ],
    "orderBy": "?t"
  }'
```

### Example Response

History results are returned as tuples — one per variable binding in your `select` clause:

```json
[
  ["ex:andrew", "Andrew Johnson", 1, "assert"],
  ["ex:betty", "Betty", 1, "assert"],
  ["ex:freddy", "Freddy", 1, "assert"],
  ["ex:letty", "Leticia", 1, "assert"]
]
```

---

## `fluree/explain`

```
POST /v1/fluree/explain
```

Get the query execution plan for a FlureeQL query. This is useful for understanding how Fluree will execute a query and for optimization.

### Request Object

The request body is a standard FlureeQL query (same format as `/v1/fluree/query`).

### Example Request Object

```json snippet=reference/http-api/queries/explain
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/explain' \
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
    "from": "cookbook/base",
    "select": { "?s": ["*"] },
    "where": { "@id": "?s", "schema:name": "?name" },
    "opts": {}
  },
  "plan": {
    "optimization": "none",
    "reason": "No statistics available",
    "where-clause": { "@id": "?s", "schema:name": "?name" }
  }
}
```
