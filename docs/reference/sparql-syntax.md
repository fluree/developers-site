# SPARQL Query Syntax

Fluree supports a subset of the W3C SPARQL 1.1 standard for querying and updating data. SPARQL can be used as an alternative to FlureeQL for users familiar with RDF databases.

---

## Using SPARQL

To use SPARQL queries, set the `Content-Type` header appropriately:

- `application/sparql-query` for SELECT and CONSTRUCT queries
- `application/sparql-update` for INSERT and DELETE operations

You must also specify the target ledger using the `fluree-ledger` header.

---

## SELECT Queries

SELECT queries return tabular results.

### Basic SELECT

```sparql
SELECT ?s ?name
WHERE {
  ?s <ex:name> ?name
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/query' \
  --header 'Content-Type: application/sparql-query' \
  --header 'fluree-ledger: my-ledger' \
  --data 'SELECT ?s ?name WHERE { ?s <ex:name> ?name }'
```

### Example Response

```json
[
  ["ex:alice", "Alice"],
  ["ex:bob", "Bob"]
]
```

### With FILTER

```sparql
SELECT ?s ?age
WHERE {
  ?s <ex:age> ?age .
  FILTER(?age > 21)
}
```

### With OPTIONAL

```sparql
SELECT ?s ?name ?email
WHERE {
  ?s <ex:name> ?name .
  OPTIONAL { ?s <ex:email> ?email }
}
```

### With ORDER BY and LIMIT

```sparql
SELECT ?s ?name
WHERE {
  ?s <ex:name> ?name
}
ORDER BY ?name
LIMIT 10
```

---

## CONSTRUCT Queries

CONSTRUCT queries build RDF graphs from query results, returned as JSON-LD.

### Basic CONSTRUCT

```sparql
CONSTRUCT {
  ?s a <ex:SearchResult> ;
     <ex:displayName> ?name .
}
WHERE {
  ?s <ex:name> ?name
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/query' \
  --header 'Content-Type: application/sparql-query' \
  --header 'fluree-ledger: my-ledger' \
  --data 'CONSTRUCT { ?s a <ex:Result> ; <ex:displayName> ?name } WHERE { ?s <ex:name> ?name }'
```

### Example Response

```json
{
  "@graph": [
    {
      "@id": "ex:alice",
      "@type": ["ex:Result"],
      "ex:displayName": ["Alice"]
    },
    {
      "@id": "ex:bob",
      "@type": ["ex:Result"],
      "ex:displayName": ["Bob"]
    }
  ],
  "@context": {}
}
```

---

## UPDATE Operations

SPARQL UPDATE is used to insert, delete, or modify data.

### INSERT DATA

Insert specific triples without pattern matching:

```sparql
INSERT DATA {
  <ex:alice> <ex:name> "Alice" .
  <ex:alice> <ex:age> 30 .
  <ex:alice> a <ex:Person> .
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/transact' \
  --header 'Content-Type: application/sparql-update' \
  --header 'fluree-ledger: my-ledger' \
  --data 'INSERT DATA { <ex:alice> <ex:name> "Alice" . <ex:alice> <ex:age> 30 }'
```

### DELETE DATA

Delete specific triples without pattern matching:

```sparql
DELETE DATA {
  <ex:alice> <ex:name> "Alice"
}
```

### DELETE/INSERT WHERE

Conditional updates using pattern matching:

```sparql
DELETE {
  ?s <ex:name> ?oldName
}
INSERT {
  ?s <ex:name> "Alice Smith"
}
WHERE {
  ?s <ex:name> ?oldName .
  FILTER(?oldName = "Alice")
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/transact' \
  --header 'Content-Type: application/sparql-update' \
  --header 'fluree-ledger: my-ledger' \
  --data 'DELETE { ?s <ex:name> ?old } INSERT { ?s <ex:name> "New Name" } WHERE { ?s <ex:name> ?old . FILTER(?old = "Old Name") }'
```

---

## Supported SPARQL Features

Fluree supports a subset of SPARQL 1.1. Here's what's available:

### Query Forms

| Form | Supported | Notes |
|------|-----------|-------|
| SELECT | Yes | Full support |
| CONSTRUCT | Yes | Returns JSON-LD |
| ASK | No | Not implemented |
| DESCRIBE | No | Not implemented |

### Graph Patterns

| Pattern | Supported |
|---------|-----------|
| Basic Graph Pattern | Yes |
| OPTIONAL | Yes |
| UNION | Yes |
| FILTER | Yes |
| BIND | Yes |

### Solution Modifiers

| Modifier | Supported |
|----------|-----------|
| ORDER BY | Yes |
| LIMIT | Yes |
| OFFSET | Yes |
| DISTINCT | Yes |

### Update Operations

| Operation | Supported |
|-----------|-----------|
| INSERT DATA | Yes |
| DELETE DATA | Yes |
| DELETE/INSERT WHERE | Yes |
| LOAD | No |
| CLEAR | No |
| DROP | No |

### Functions

SPARQL filter functions are generally supported. Common functions include:

- Comparison: `=`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- String: `STRLEN`, `STRSTARTS`, `STRENDS`, `CONTAINS`
- Numeric: `ABS`, `ROUND`, `CEIL`, `FLOOR`
- Type checking: `isIRI`, `isBlank`, `isLiteral`, `isNumeric`

---

## IRI Syntax

In SPARQL queries against Fluree, you can use:

### Full IRIs

```sparql
SELECT ?s WHERE { ?s <http://example.org/name> ?name }
```

### Prefixed Names

Use PREFIX declarations for more readable queries:

```sparql
PREFIX ex: <http://example.org/>
PREFIX schema: <http://schema.org/>

SELECT ?s ?name
WHERE {
  ?s a ex:Person ;
     schema:name ?name .
}
```

### Abbreviated IRIs

Fluree also accepts abbreviated IRIs without full namespace declarations when the context is known:

```sparql
SELECT ?s WHERE { ?s <ex:name> ?name }
```

---

## Response Formats

By default, SPARQL query results are returned as JSON arrays. You can control the output format using the `fluree-output` header:

- `fql` (default) - JSON array format
- `sparql` - SPARQL Results JSON format

### FQL Format (Default)

```json
[
  ["ex:alice", "Alice"],
  ["ex:bob", "Bob"]
]
```

### SPARQL Results JSON Format

When using `fluree-output: sparql`:

```json
{
  "head": {
    "vars": ["s", "name"]
  },
  "results": {
    "bindings": [
      {
        "s": { "type": "uri", "value": "http://example.org/alice" },
        "name": { "type": "literal", "value": "Alice" }
      }
    ]
  }
}
```
