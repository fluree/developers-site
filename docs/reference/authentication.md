# Authentication

This guide covers authentication options for Fluree Server and Fluree Cloud.

---

## Overview

Fluree supports several authentication methods depending on your deployment:

| Deployment | Authentication Method |
|------------|----------------------|
| **Fluree Server (open)** | No authentication required (default) |
| **Fluree Server (closed)** | Root identities via `closedMode` config |
| **Fluree Cloud** | API keys via `Authorization` header |
| **Policy-based** | Identity headers for per-request policies |

---

## Fluree Server Authentication

### Open Mode (Default)

By default, Fluree Server runs in open mode with no authentication. All endpoints accept unauthenticated requests:

```sh
curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/json" \
  -d '{"from": "my-ledger", "select": {"?s": ["*"]}, "where": {"@id": "?s"}}'
```

This is suitable for development and trusted internal networks.

### Closed Mode

For production environments, enable `closedMode` to require authentication:

```yaml
# fluree-config.edn
{:fluree.server/closed-mode {:root-identities ["did:fluree:admin123"]}}
```

Or via environment variable:

```sh
export FLUREE_SERVER_CLOSED_MODE_ROOT_IDENTITIES='["did:fluree:admin123"]'
```

In closed mode, requests must include a valid identity. See [Server Configuration](/docs/reference/fluree-server-config#closed-mode) for details.

---

## Fluree Cloud Authentication

Fluree Cloud requires API key authentication for all requests.

### Generating an API Key

1. Navigate to your dataset in Fluree Cloud
2. Go to **Settings** > **API Keys**
3. (Optional) Name your API key
4. (Optional) Assign roles to limit permissions
5. Click **Generate Key**
6. Copy the key — it's only shown once

> **NOTE**: If you don't assign a role, the API key has full read-write access.

### Using API Keys

Include the API key in the `Authorization` header:

```sh
curl -X POST "https://data.flur.ee/fluree/query" \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_API_KEY" \
  -d '{
    "from": "fluree-jld/387028092977716",
    "select": {"?s": ["*"]},
    "where": {"@id": "?s", "@type": "ex:Person"}
  }'
```

### JavaScript Example

```javascript
const API_KEY = 'your-api-key-here';
const DATASET_ID = 'fluree-jld/387028092977716';

const response = await fetch('https://data.flur.ee/fluree/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  },
  body: JSON.stringify({
    from: DATASET_ID,
    select: { '?s': ['*'] },
    where: { '@id': '?s', '@type': 'ex:Person' }
  })
});

const data = await response.json();
console.log(data);
```

### Python Example

```python
import requests

API_KEY = 'your-api-key-here'
DATASET_ID = 'fluree-jld/387028092977716'

response = requests.post(
    'https://data.flur.ee/fluree/query',
    headers={
        'Content-Type': 'application/json',
        'Authorization': API_KEY
    },
    json={
        'from': DATASET_ID,
        'select': {'?s': ['*']},
        'where': {'@id': '?s', '@type': 'ex:Person'}
    }
)

print(response.json())
```

---

## Identity Headers

For policy-based access control, use identity headers to specify who is making the request. This works with both self-hosted and cloud deployments.

### Available Headers

| Header | Description |
|--------|-------------|
| `fluree-identity` | User identity (DID or IRI) for policy evaluation |
| `fluree-policy` | Inline policy document (JSON string) |
| `fluree-policy-identity` | Identity for policy lookup |
| `fluree-policy-class` | Policy class to apply |
| `fluree-policy-values` | Values to bind in policy evaluation (JSON string) |

### Example: Query as Specific User

```sh
curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/json" \
  -H "fluree-identity: ex:alice" \
  -d '{
    "from": "my-ledger",
    "select": {"?s": ["*"]},
    "where": {"@id": "?s"}
  }'
```

The query results will be filtered based on any policies defined for `ex:alice`.

### Example: Apply Inline Policy

```sh
curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/json" \
  -H 'fluree-policy: {"@id": "ex:readOnly", "f:targetClass": {"@id": "ex:Person"}, "f:allow": [{"@id": "f:view"}]}' \
  -d '{
    "from": "my-ledger",
    "select": {"?s": ["*"]},
    "where": {"@id": "?s"}
  }'
```

For more on policies, see [Policy Syntax](/docs/reference/policy-syntax) and [Data Access Control](/docs/learn/security/data-access-control-concepts/).

---

## Verifiable Credentials (JWS)

Fluree supports cryptographically signed requests using JSON Web Signatures (JWS). This provides:

- **Authentication** — Verify who is making the request
- **Integrity** — Ensure the request hasn't been tampered with
- **Non-repudiation** — Cryptographic proof of the request origin

### JWS Request Format

Set the `Content-Type` header to `application/jwt` and send the signed JWS as the request body:

```sh
curl -X POST "http://localhost:8090/fluree/create" \
  -H "Content-Type: application/jwt" \
  -d 'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19...'
```

The JWS payload contains the JSON query or transaction, signed with an Ed25519 private key.

### DID (Decentralized Identifier)

Fluree uses `did:key` format for identities. A DID is derived from your public key:

```
did:key:z6MkmbNqfM3ANYZnzDp9YDfa62pHggKosBkCyVdgQtgEKkGQ
```

### Creating Signed Requests

Use the Fluree crypto library to sign requests:

```javascript
import { createJws } from '@fluree/crypto';

const privateKey = 'your-ed25519-private-key-hex';

const query = {
  from: "my-ledger",
  select: { "?s": ["*"] },
  where: { "@id": "?s" }
};

const jws = createJws(JSON.stringify(query), privateKey, { includePubkey: true });
```

### Credential-Wrapped Operations

When using the Fluree library directly, use the credential functions:

**Signed Transaction:**
```javascript
import { credentialUpdate } from '@fluree/db';

const signedTx = await credential.generate({
  ledger: "my-ledger",
  insert: { "@id": "ex:newEntity", "ex:name": "Test" }
}, privateKey);

await fluree.credentialUpdate(conn, signedTx);
```

**Signed Query:**
```javascript
import { credentialQuery } from '@fluree/db';

const signedQuery = await credential.generate({
  from: "my-ledger",
  select: { "?s": ["*"] },
  where: { "@id": "?s" }
}, privateKey);

const results = await fluree.credentialQuery(db, signedQuery);
```

**Signed History Query:**
```javascript
import { credentialHistory } from '@fluree/db';

const signedHistory = await credential.generate({
  history: "ex:entity",
  t: { from: 1 }
}, privateKey);

const history = await fluree.credentialHistory(conn, "my-ledger", signedHistory);
```

---

## Closed Mode (Server)

Closed mode requires all requests to be cryptographically signed. This is essential for production deployments where you need strict access control.

### Enabling Closed Mode

Configure closed mode in your server configuration:

```edn
;; fluree-config.edn
{:fluree.server/closed-mode
 {:root-identities ["did:key:z6MkmbNqfM3ANYZnzDp9YDfa62pHggKosBkCyVdgQtgEKkGQ"]}}
```

Or via environment variable:

```sh
export FLUREE_SERVER_CLOSED_MODE_ROOT_IDENTITIES='["did:key:z6MkmbNqfM3ANYZnzDp9YDfa62pHggKosBkCyVdgQtgEKkGQ"]'
```

### Root vs Non-Root Identities

| Action | Root Identity | Non-Root Identity |
|--------|--------------|-------------------|
| Create ledger | ✅ Allowed | ❌ Rejected (403) |
| Drop ledger | ✅ Allowed | ❌ Rejected (403) |
| Transact | ✅ Allowed | Subject to policies |
| Query | ✅ Allowed | Subject to policies |
| History | ✅ Allowed | Subject to policies |

Root identities can perform administrative operations. Non-root identities can only access data permitted by policies.

### Closed Mode Request Flow

1. **Request arrives** — Server checks for JWS signature
2. **Missing signature** → 400 "Missing credential"
3. **Signature verified** → Extract DID from public key
4. **DID checked** → Is it a root identity?
5. **Root identity** → Full access to operation
6. **Non-root identity** → Apply policies, filter results

### Example: Closed Mode Requests

**Create Ledger (Root Only):**
```sh
# Sign the request with a root identity's private key
JWS=$(fluree-crypto sign '{
  "ledger": "my-ledger",
  "insert": {"@id": "ex:initial", "ex:name": "Initial Data"}
}' $ROOT_PRIVATE_KEY)

curl -X POST "http://localhost:8090/fluree/create" \
  -H "Content-Type: application/jwt" \
  -d "$JWS"
```

**Query (Any Signed Request):**
```sh
JWS=$(fluree-crypto sign '{
  "from": "my-ledger",
  "select": {"?s": ["*"]},
  "where": {"@id": "?s"}
}' $USER_PRIVATE_KEY)

curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/jwt" \
  -d "$JWS"
```

### Setting Up Policies for Non-Root Users

For non-root identities to access data, define policies in your ledger:

```json
{
  "insert": [
    {
      "@id": "ex:userPolicy",
      "@type": ["f:AccessPolicy", "ex:DefaultUserPolicy"],
      "f:action": [{"@id": "f:view"}, {"@id": "f:modify"}],
      "f:query": {
        "@type": "@json",
        "@value": {
          "where": [["filter", "(= ?$this ?$identity)"]]
        }
      }
    },
    {
      "@id": "did:key:z6MkiKJFxJJd9QuqKgzBR2kiSybE9V2517sFd2kTS7kQe9mg",
      "f:policyClass": {"@id": "ex:DefaultUserPolicy"},
      "@type": "ex:User",
      "ex:name": "Alice"
    }
  ]
}
```

This policy allows users to view and modify only their own data (where `?$this` equals `?$identity`).

### Security Considerations

1. **Protect private keys** — Never expose private keys; use secure key management
2. **Use unique identities** — Each user/service should have its own key pair
3. **Audit root access** — Limit and monitor root identity usage
4. **Rotate keys** — Periodically rotate key pairs for compromised key recovery

---

## Resource Control

These headers help control and monitor request resource usage:

| Header | Description |
|--------|-------------|
| `fluree-max-fuel` | Maximum computational units allowed |
| `fluree-track-fuel` | Include fuel consumption in response |
| `fluree-track-meta` | Include metadata in response |
| `fluree-track-policy` | Include policy evaluation details |

### Example: Track Fuel Usage

```sh
curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/json" \
  -H "fluree-max-fuel: 10000" \
  -H "fluree-track-fuel: true" \
  -d '{
    "from": "my-ledger",
    "select": {"?s": ["*"]},
    "where": {"@id": "?s"}
  }'
```

The response will include fuel consumption in the `x-fdb-fuel` header.

---

## Best Practices

1. **Never commit API keys** — Use environment variables or secret management
2. **Use least privilege** — Assign roles to API keys that limit access
3. **Rotate keys regularly** — Generate new keys and revoke old ones periodically
4. **Use HTTPS** — Always use encrypted connections in production
5. **Monitor usage** — Track fuel consumption to detect anomalies
