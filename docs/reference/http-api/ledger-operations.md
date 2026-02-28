# Ledger Operations

Endpoints for creating, deleting, and inspecting ledgers.

---

## `fluree/create`

```
POST /v1/fluree/create
```

Create a new ledger with optional initial data.

### Request Object

| Key        | Required | Value                                                                                                                                     |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@context` | no       | **object** &bull; a map of terms for the creation transaction ([See our Guide on Using Context](/docs/learn/working-with-data/context-patterns/)) |
| `ledger`   | yes      | **string** &bull; the name of the created ledger                                                                                          |
| `insert`   | yes      | **object** or **array** &bull; the first transaction for the ledger (think of this as an _initial commit_ when working with `git`)        |

### Example Request Object

```json snippet=reference/http-api/ledger-operations/create
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/create' --header 'Content-Type: application/json' --data '{
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
POST /v1/fluree/drop
```

Delete a ledger and all its associated data and commit history. This operation is irreversible.

> **WARNING**: This operation permanently deletes the ledger. Use with caution.

### Request Object

| Key      | Required | Value                                           |
| -------- | -------- | ----------------------------------------------- |
| `ledger` | yes      | **string** &bull; the name of the ledger to drop |

### Example Request Object

```json snippet=reference/http-api/ledger-operations/drop
```

### Curl Example

```sh
curl --location 'http://localhost:8090/v1/fluree/drop' \
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
GET /v1/fluree/exists/:ledger
```

Check whether a ledger exists.

### Path Parameters

| Parameter | Value                                            |
| --------- | ------------------------------------------------ |
| `ledger`  | **string** &bull; the name of the ledger to check |

### Curl Example

```sh
curl 'http://localhost:8090/v1/fluree/exists/cookbook/base'
```

### Example Response

```json
{
  "ledger": "cookbook/base",
  "exists": true
}
```

---

## `fluree/info`

```
GET /v1/fluree/info/:ledger
```

Get detailed information about a ledger, including statistics, commit history, and namespace codes.

### Path Parameters

| Parameter | Value                                    |
| --------- | ---------------------------------------- |
| `ledger`  | **string** &bull; the name of the ledger |

### Curl Example

```sh
curl 'http://localhost:8090/v1/fluree/info/cookbook/base'
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

## `fluree/stats`

```
GET /v1/fluree/stats
```

Get server-wide statistics, including information about all loaded ledgers.

### Curl Example

```sh
curl 'http://localhost:8090/v1/fluree/stats'
```

### Example Response

```json
{
  "uptime_secs": 3600,
  "storage_type": "file",
  "indexing_enabled": false,
  "cached_ledgers": 2,
  "version": "0.1.0"
}
```
