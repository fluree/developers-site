# Remote Endpoints

These endpoints are used for distributed/federated scenarios where data may be stored across multiple servers or storage backends.

---

## `fluree/remote/latestCommit`

```
POST /v1/fluree/remote/latestCommit
```

Retrieve the latest commit for a ledger from a remote publisher address.

### Request Object

| Key        | Required | Value                                                 |
| ---------- | -------- | ----------------------------------------------------- |
| `resource` | yes      | **string** &bull; the publisher address of the ledger |

### Example Request Object

```json
{
  "resource": "fluree:file://my-ledger/main/head"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/v1/fluree/remote/latestCommit' \
  --header 'Content-Type: application/json' \
  --data '{
    "resource": "fluree:file://my-ledger/main/head"
  }'
```

---

## `fluree/remote/resource`

```
POST /v1/fluree/remote/resource
```

Read a resource (commit or index file) from a remote address.

### Request Object

| Key        | Required | Value                                       |
| ---------- | -------- | ------------------------------------------- |
| `resource` | yes      | **string** &bull; the resource address      |

### Example Request Object

```json
{
  "resource": "fluree:file://my-ledger/commit/abc123.json"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/v1/fluree/remote/resource' \
  --header 'Content-Type: application/json' \
  --data '{
    "resource": "fluree:file://my-ledger/commit/abc123.json"
  }'
```

---

## `fluree/remote/hash`

```
POST /v1/fluree/remote/hash
```

Parse a resource address and extract its hash.

### Request Object

| Key       | Required | Value                                       |
| --------- | -------- | ------------------------------------------- |
| `address` | yes      | **string** &bull; the resource address      |

### Example Request Object

```json
{
  "address": "fluree:file://my-ledger/commit/abc123.json"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/v1/fluree/remote/hash' \
  --header 'Content-Type: application/json' \
  --data '{
    "address": "fluree:file://my-ledger/commit/abc123.json"
  }'
```

---

## `fluree/remote/addresses`

```
POST /v1/fluree/remote/addresses
```

Get all published addresses for a ledger.

### Request Object

| Key      | Required | Value                                    |
| -------- | -------- | ---------------------------------------- |
| `ledger` | yes      | **string** &bull; the name of the ledger |

### Example Request Object

```json
{
  "ledger": "my-ledger"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/v1/fluree/remote/addresses' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "my-ledger"
  }'
```

### Example Response

```json
{
  "addresses": [
    "fluree:file://my-ledger/main/head",
    "fluree:s3://bucket/my-ledger/main/head"
  ]
}
```
