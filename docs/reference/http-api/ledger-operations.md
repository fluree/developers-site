# Ledger Operations

Endpoints for creating, deleting, and inspecting ledgers.

---

## `fluree/create`

```
POST /fluree/create
```

Create a new ledger with optional initial data.

### Request Object

| Key        | Required | Value                                                                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the creation transaction ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/)) |
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

### Example Response

```json
{
  "commit": {
    "address": "fluree:file://cookbook/base/commit/bms7aygquqai5r7zn5ddjpwtofeha4hawksshzsemurkigivow3.json",
    "hash": "bms7aygquqai5r7zn5ddjpwtofeha4hawksshzsemurkigivow3"
  },
  "t": 1,
  "tx-id": "174f7046369bc6b2b12b576faca28a17c56cb1f00e5542b3390a008231f2c146",
  "ledger": "cookbook/base"
}
```

---

## `fluree/drop`

```
POST /fluree/drop
```

Delete a ledger and all its associated data and commit history. This operation is irreversible.

> **WARNING**: This operation permanently deletes the ledger. Use with caution.

### Request Object

| Key      | Required | Value                                           |
| -------- | -------- | ----------------------------------------------- |
| `ledger` | yes      | **string** &bull; the name of the ledger to drop |

### Example Request Object

```json
{
  "ledger": "cookbook/base"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/drop' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "cookbook/base"
  }'
```

### Example Response

```json
{
  "type": "ledger-dropped",
  "ledger-id": "cookbook/base"
}
```

---

## `fluree/exists`

```
POST /fluree/exists
```

Check whether a ledger exists.

### Request Object

| Key      | Required | Value                                            |
| -------- | -------- | ------------------------------------------------ |
| `ledger` | yes      | **string** &bull; the name of the ledger to check |

### Example Request Object

```json
{
  "ledger": "cookbook/base"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/exists' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "cookbook/base"
  }'
```

### Example Response

```json
{
  "ledger": "cookbook/base",
  "exists": true
}
```

---

## `fluree/ledger-info`

```
POST /fluree/ledger-info
```

Get detailed information about a ledger, including statistics, commit history, and namespace codes.

### Request Object

| Key      | Required | Value                                           |
| -------- | -------- | ----------------------------------------------- |
| `ledger` | yes      | **string** &bull; the name of the ledger        |

### Example Request Object

```json
{
  "ledger": "cookbook/base"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/ledger-info' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "cookbook/base"
  }'
```

### Example Response

```json
{
  "address": "cookbook/base:main",
  "alias": "cookbook/base:main",
  "branch": "main",
  "t": 5,
  "commit": {
    "address": "fluree:file://cookbook/base/commit/abc123.json",
    "v": 2,
    "time": "2026-01-05T21:07:10.762114880Z",
    "alias": "cookbook/base:main",
    "id": "fluree:commit:sha256:babc123",
    "data": {
      "t": 5,
      "flakes": 51,
      "size": 7246
    }
  },
  "index": {
    "id": null,
    "t": null,
    "address": null
  },
  "namespace-codes": {
    "ex:": 101,
    "http://schema.org/": 17
  },
  "stats": {
    "flakes": 61,
    "size": 8740,
    "indexed": 0,
    "properties": {
      "ex:name": { "count": 3 },
      "ex:age": { "count": 1 }
    },
    "classes": {
      "ex:Person": { "count": 2 }
    }
  }
}
```

---

## `fluree/status`

```
POST /fluree/status
```

Get the current status of a ledger, including commit and index state. This is a lighter-weight alternative to `ledger-info`.

### Request Object

| Key      | Required | Value                                           |
| -------- | -------- | ----------------------------------------------- |
| `ledger` | yes      | **string** &bull; the name of the ledger        |

### Example Request Object

```json
{
  "ledger": "cookbook/base"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/status' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "cookbook/base"
  }'
```

### Example Response

```json
{
  "address": "cookbook/base:main",
  "alias": "cookbook/base:main",
  "branch": "main",
  "t": 5,
  "size": 8740,
  "flakes": 61,
  "commit": {
    "address": "fluree:file://cookbook/base/commit/abc123.json",
    "v": 2,
    "time": "2026-01-05T21:07:10.762114880Z",
    "id": "fluree:commit:sha256:babc123"
  }
}
```
