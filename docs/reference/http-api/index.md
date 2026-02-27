# Fluree HTTP API

This reference documents all HTTP API endpoints provided by Fluree Server.

## Endpoint Categories

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **[Ledger Operations](./ledger-operations)** | `create`, `drop`, `exists`, `ledger-info`, `status` | Create, delete, and inspect ledgers |
| **[Transactions](./transactions)** | `transact`, `insert`, `upsert`, `update` | Modify data in ledgers |
| **[Queries](./queries)** | `query`, `history`, `explain` | Read and analyze data |
| **[Real-Time](./real-time)** | `notify`, `subscribe` | WebSocket subscriptions and notifications |
| **[Remote](./remote)** | `remote/*` | Distributed/federated scenarios |

## Base URL

All endpoints are relative to your Fluree server URL:

```
http://localhost:58090/v1/fluree/{endpoint}
```

For Fluree Cloud, use:

```
https://data.flur.ee/fluree/{endpoint}
```

---

## Request Headers

All endpoints accept standard HTTP headers. Several custom headers are available for controlling request behavior.

### Content Type Headers

| Header          | Value                            | Description                                    |
| --------------- | -------------------------------- | ---------------------------------------------- |
| `Content-Type`  | `application/json`               | JSON-LD format (default)                       |
| `Content-Type`  | `text/turtle`                    | Turtle/TTL RDF format                          |
| `Content-Type`  | `application/sparql-query`       | SPARQL SELECT/CONSTRUCT query                  |
| `Content-Type`  | `application/sparql-update`      | SPARQL UPDATE (DELETE/INSERT)                  |
| `Content-Type`  | `application/jwt`                | Signed JWT credential                          |

### Fluree-Specific Headers

| Header                   | Value           | Description                                                              |
| ------------------------ | --------------- | ------------------------------------------------------------------------ |
| `fluree-ledger`          | **string**      | Target ledger name (required for `/insert`, `/upsert`)                   |
| `fluree-format`          | `fql`, `sparql`, `turtle` | Input format hint when Content-Type is ambiguous                |
| `fluree-output`          | `fql`, `sparql` | Output format for query results                                          |

### Policy and Identity Headers

| Header                   | Value           | Description                                                              |
| ------------------------ | --------------- | ------------------------------------------------------------------------ |
| `fluree-identity`        | **string**      | User identity (DID or IRI) for policy evaluation                         |
| `fluree-policy`          | **JSON string** | Inline policy document for this request                                  |
| `fluree-policy-identity` | **string**      | Identity to use for policy lookup                                        |
| `fluree-policy-class`    | **string**      | Policy class to apply                                                    |
| `fluree-policy-values`   | **JSON string** | Values to bind in policy evaluation                                      |

### Resource Control Headers

| Header               | Value           | Description                                                              |
| -------------------- | --------------- | ------------------------------------------------------------------------ |
| `fluree-max-fuel`    | **integer**     | Maximum fuel (computational units) allowed for this request              |
| `fluree-track-fuel`  | `true`, `false` | Include fuel consumption in response                                     |
| `fluree-track-meta`  | `true`, `false` | Include metadata in response                                             |
| `fluree-track-policy`| `true`, `false` | Include policy evaluation details in response                            |
| `fluree-ledger-opts` | **JSON string** | Additional ledger options as JSON                                        |

### Response Headers

Fluree may return these headers in responses:

| Header          | Value           | Description                                                              |
| --------------- | --------------- | ------------------------------------------------------------------------ |
| `x-fdb-time`    | **integer**     | Query execution time in milliseconds                                     |
| `x-fdb-fuel`    | **integer**     | Fuel consumed by the request                                             |
| `x-fdb-policy`  | **string**      | Base64-encoded policy evaluation details                                 |
