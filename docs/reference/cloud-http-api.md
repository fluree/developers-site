# Cloud HTTP API

## `api/{handle}/create-dataset`

```
POST /api/{handle}/create-dataset
```

Creates a new dataset owned by the authenticated user.

### Path Parameters

| Parameter | Required | Type   | Description                                   |
| --------- | -------- | ------ | --------------------------------------------- |
| handle    | yes      | string | The username/handle of the authenticated user |

### Request Object

| Key           | Required | Value                                                              |
| ------------- | -------- | ------------------------------------------------------------------ |
| `datasetName` | yes      | **string** &bull; Name of the dataset to create                    |
| `storageType` | yes      | **string** &bull; Storage type for the dataset (`ipfs`, `default`) |
| `description` | yes      | **string** &bull; Description of the dataset                       |
| `visibility`  | yes      | **string** &bull; Visibility (`public`, `private`)                 |
| `tags`        | no       | **array** &bull; Optional tags for the dataset                     |

### Example Request Object

```json
{
  "datasetName": "my-dataset",
  "storageType": "default",
  "description": "Sample dataset",
  "visibility": "private",
  "tags": ["tag1", "tag2"]
}
```

### Curl Example

```sh
curl --location 'https://data.flur.ee/api/jdoe/create-dataset' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'x-user-handle: jdoe' \
  --data '{
    "datasetName": "my-dataset",
    "storageType": "default",
    "description": "Sample dataset",
    "visibility": "private",
    "tags": ["tag1", "tag2"]
  }'
```

### Example Response

```json
{
  "message": "Dataset created successfully",
  "data": {
    "datasetName": "my-dataset",
    "storageType": "default",
    "description": "Sample dataset",
    "visibility": "private",
    "tags": ["tag1", "tag2"]
  }
}
```

## `api/{handle}/generate-sparql`

```
POST /api/{handle}/generate-sparql
```

Generate SPARQL query from natural language.

### Path Parameters

| Parameter | Required | Type   | Description                                   |
| --------- | -------- | ------ | --------------------------------------------- |
| handle    | yes      | string | The username/handle of the authenticated user |

### Request Object

| Key        | Required | Value                                                         |
| ---------- | -------- | ------------------------------------------------------------- |
| `datasets` | yes      | **string** or **array** &bull; Dataset(s) to query against    |
| `prompt`   | yes      | **string** &bull; Natural language prompt/question to process |

### Example Request Object

```json
{
  "datasets": ["my-dataset"],
  "prompt": "List all triples in the dataset"
}
```

### Curl Example

```sh
curl --location 'https://data.flur.ee/api/jdoe/generate-sparql' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'x-user-handle: jdoe' \
  --data '{
    "datasets": ["my-dataset"],
    "prompt": "List all triples in the dataset"
  }'
```

### Example Response

```json
{
  "sparql": "SELECT * WHERE { ?s ?p ?o . }"
}
```

## `api/{handle}/generate-prompt`

```
POST /api/{handle}/generate-prompt
```

Generate a prompt for SPARQL query generation.

### Path Parameters

| Parameter | Required | Type   | Description                                   |
| --------- | -------- | ------ | --------------------------------------------- |
| handle    | yes      | string | The username/handle of the authenticated user |

### Request Object

| Key        | Required | Value                                                         |
| ---------- | -------- | ------------------------------------------------------------- |
| `datasets` | yes      | **string** or **array** &bull; Dataset(s) to query against    |
| `prompt`   | no       | **string** &bull; Natural language prompt/question to process |

### Example Request Object

```json
{
  "datasets": ["my-dataset"],
  "prompt": "List all triples in the dataset"
}
```

### Curl Example

```sh
curl --location 'https://data.flur.ee/api/jdoe/generate-prompt' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'x-user-handle: jdoe' \
  --data '{
    "datasets": ["my-dataset"],
    "prompt": "List all triples in the dataset"
  }'
```

### Example Response

```json
{
  "prompt": "Write a SPARQL query to list all triples in the dataset 'my-dataset'."
}
```

## `api/{handle}/generate-answer`

```
POST /api/{handle}/generate-answer
```

Generate answer from natural language query.

### Path Parameters

| Parameter | Required | Type   | Description                                   |
| --------- | -------- | ------ | --------------------------------------------- |
| handle    | yes      | string | The username/handle of the authenticated user |

### Request Object

| Key        | Required | Value                                                         |
| ---------- | -------- | ------------------------------------------------------------- |
| `datasets` | yes      | **string** or **array** &bull; Dataset(s) to query against    |
| `prompt`   | yes      | **string** &bull; Natural language prompt/question to process |

### Example Request Object

```json
{
  "datasets": ["my-dataset"],
  "prompt": "How many triples are in the dataset?"
}
```

### Curl Example

```sh
curl --location 'https://data.flur.ee/api/jdoe/generate-answer' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'x-user-handle: jdoe' \
  --data '{
    "datasets": ["my-dataset"],
    "prompt": "How many triples are in the dataset?"
  }'
```

### Example Response

```json
{
  "answer": "There are 42 triples in the dataset."
}
```

## `fluree/transact`

```
POST /fluree/transact
```

Commit a transaction to a ledger.

### Request Object

| Key        | Required | Value                                                                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** • a map of terms for the transaction ([See our Guide on Using Context](/docs/learn/guides/working-with-context)) |
| `ledger`   | yes      | **string** • the name of the _existing_ ledger                                                                              |
| `insert`   | no       | **object** or **array** • data to be asserted                                                                               |
| `where`    | no       | **object** or **array** • a subquery to bind logic variables for use in your `delete` and/or `insert` clauses               |
| `delete`   | no       | **object** or **array** • data to be retracted                                                                              |

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
curl --location 'https://data.flur.ee/api/fluree/transact' \
  --header 'Content-Type: application/json' \
  --data '{
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

| Key        | Required | Value                                                                                                                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** • a map of terms for the query and the result set ([See our Guide on Using Context](/docs/learn/guides/working-with-context))                                                                       |
| `from`     | yes      | **string** • the name of the _existing_ ledger                                                                                                                                                                 |
| `where`    | no       | **object** or **array** • a subquery to set query constraints and bind logic variables for use in your `select` clause [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax) |
| `select`   | yes      | **object** or **array** • a clause used to format the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                               |
| `groupBy`  | no       | **string** • an optional clause used to group the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                                   |
| `having`   | no       | **string** or **array** • an optional clause used to filter the projected result set of your query (requires the use of `groupBy`)                                                                             |
| `orderBy`  | no       | **string** • an optional clause used to order the projected result set of your query [See our Reference Doc on FlureeQL Query Syntax](/docs/reference/flureeql-query-syntax)                                   |
| `opts`     | no       | **object** • an optional object used to set query options, such as the `role` or `did` identity of the querying entity                                                                                         |

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
curl --location 'https://data.flur.ee/api/fluree/query' \
  --header 'Content-Type: application/json' \
  --data '{
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

| Key              | Required | Value                                                                                                                                                                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@context`       | no       | **object** • a map of terms for the history query and the result set ([See our Guide on Using Context](/docs/learn/guides/working-with-context))                                                                      |
| `from`           | yes      | **string** • the name of the _existing_ ledger                                                                                                                                                                        |
| `history`        | yes      | **string** or **array** • used to express the entity or entity patterns for which you are auditing history ([See the Reference section for Constraining Nodes](/docs/reference/history-syntax/#constraints-on-nodes)) |
| `t`              | yes      | **object** • used to express individual commit/time values or ranges of commit/time values ([See the Reference section for Constraining by Time](/docs/reference/history-syntax/#constraints-on-time))                |
| `commit-details` | no       | **boolean** • A flag for whether to include full commit details ([See the Reference section for Including Commit Details](/docs/reference/history-syntax/#including-commit-details))                                  |

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
curl --location 'https://data.flur.ee/api/fluree/history' \
  --header 'Content-Type: application/json' \
  --data '{
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
      { "schema:name": "Andrew Johnson", "id": "ex:andrew" },
      { "schema:name": "Betty", "id": "ex:betty" },
      { "schema:name": "Freddy", "id": "ex:freddy" },
      { "schema:name": "Leticia", "id": "ex:letty" }
    ],
    "f:retract": []
  },
  {
    "f:t": 2,
    "f:assert": [{ "schema:name": "Andy the Yeti", "id": "ex:andrew" }],
    "f:retract": []
  }
]
```
