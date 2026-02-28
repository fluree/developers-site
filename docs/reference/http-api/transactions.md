# Transactions

Endpoints for modifying data in ledgers.

---

## `fluree/transact`

```
POST /v1/fluree/transact
```

Commit a transaction to a ledger. This is the most flexible transaction endpoint, supporting `where`/`delete`/`insert` patterns for conditional updates.

### Request Object

| Key        | Required | Value                                                                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the transaction ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/)) |
| `ledger`   | yes      | **string** &bull; the name of the _existing_ ledger                                                                              |
| `insert`   | no       | **object** or **array** &bull; data to be asserted                                                                               |
| `where`    | no       | **object** or **array** &bull; a subquery to bind logic variables for use in your `delete` and/or `insert` clauses               |
| `delete`   | no       | **object** or **array** &bull; data to be retracted                                                                              |

> **NOTE**: While `insert`, `delete`, and `where` are not required, either/both `insert` & `delete` must be used to qualify a valid transaction. You could _only_ insert data, you could _only_ delete data, or you could _use both_ `insert` + `delete` to qualify a sort of update to data state.

### Example Request Object

```json snippet=reference/http-api/transactions/transact
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/transact' --header 'Content-Type: application/json' --data $'{
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
  "commit": {
    "address": "fluree:file://cookbook/base/commit/bhkmj3wnwq2g4ji5l3zixl6os54uvhn6on3zgph6izyrxatoc4jn.json",
    "hash": "bhkmj3wnwq2g4ji5l3zixl6os54uvhn6on3zgph6izyrxatoc4jn"
  },
  "t": 2,
  "tx-id": "c1d0efce42e92f08bb45f32cf06b193c313eec08d7839f07464d1f244c4b307f",
  "ledger": "cookbook/base"
}
```

---

## `fluree/insert`

```
POST /v1/fluree/insert/:ledger
```

Insert new data into a ledger. This is a simplified endpoint for pure insertions — the target ledger is specified in the URL path.

### Path Parameters

| Parameter | Value                                          |
| --------- | ---------------------------------------------- |
| `ledger`  | **string** &bull; the name of the target ledger |

### Request Body

The request body should contain the data to insert as JSON-LD.

### Example Request (JSON-LD)

```json snippet=reference/http-api/transactions/insert
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/insert/cookbook/base' \
  --header 'Content-Type: application/json' \
  --data '{
    "@context": {
      "ex": "http://example.org/",
      "schema": "http://schema.org/"
    },
    "@id": "ex:alice",
    "@type": "schema:Person",
    "schema:name": "Alice",
    "schema:age": 30
  }'
```

### Example Response

```json
{
  "commit": {
    "address": "fluree:file://cookbook/base/commit/buvyh74ej4rb3x5jm3htgiim5f5qeqntxhmaosxztkguumvb3ii.json",
    "hash": "buvyh74ej4rb3x5jm3htgiim5f5qeqntxhmaosxztkguumvb3ii"
  },
  "t": 3,
  "tx-id": "8e6e9863372b1d61b16e0f915172329308b41e316cc1028c2e7e28fcf7c348e6",
  "ledger": "cookbook/base"
}
```

---

## `fluree/upsert`

```
POST /v1/fluree/upsert/:ledger
```

Insert or update data in a ledger. If an entity with the given `@id` exists, its properties will be merged/updated. If it doesn't exist, a new entity will be created. The target ledger is specified in the URL path.

### Path Parameters

| Parameter | Value                                          |
| --------- | ---------------------------------------------- |
| `ledger`  | **string** &bull; the name of the target ledger |

### Request Body

The request body should contain the data to upsert as JSON-LD.

### Example Request (JSON-LD)

```json snippet=reference/http-api/transactions/upsert
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/upsert/cookbook/base' \
  --header 'Content-Type: application/json' \
  --data '{
    "@context": {
      "ex": "http://example.org/",
      "schema": "http://schema.org/"
    },
    "@id": "ex:alice",
    "@type": "schema:Person",
    "schema:name": "Alice Updated",
    "schema:age": 31,
    "schema:email": "alice@example.org"
  }'
```

### Example Response

```json
{
  "commit": {
    "address": "fluree:file://cookbook/base/commit/f46abtqcr2df6abaog6litbjunmulhzrsadc22pdafok5dj2lwp.json",
    "hash": "f46abtqcr2df6abaog6litbjunmulhzrsadc22pdafok5dj2lwp"
  },
  "t": 4,
  "tx-id": "912f872d1a3da1f2ac5792cf4971ed1129d7430c35f2b6663b575aa45c1d9851",
  "ledger": "cookbook/base"
}
```

