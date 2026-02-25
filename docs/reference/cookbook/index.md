# Cookbook

The Fluree Cookbook provides practical examples for common operations. All examples are tested and can be run directly against a Fluree server.

## Quick Navigation

| Section | Description |
|---------|-------------|
| [Setup](#setup) | Create a ledger with sample data |
| [Querying](#querying) | Select statements, filters, graph traversals, aggregates |
| [Transacting](#transacting) | Insert, update, delete, upsert operations |
| [Schema](#schema) | Define types, properties, and constraints |
| [JSON-LD Utilities](#json-ld-utilities) | Context handling, IRI expansion |
| [Time Travel](#time-travel) | Historical queries, version comparison |
| [Policy](#policy) | Access control examples |

## Running the Examples

All cookbook examples assume you have a Fluree server running at `http://localhost:8090`.

### Using Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/27883365-fd224642-1872-4dae-a831-d28b674669f0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27883365-fd224642-1872-4dae-a831-d28b674669f0%26entityType%3Dcollection%26workspaceId%3Deed3ac8f-f457-4b1c-ac9f-07267b33ddd9)

### Using curl

Most examples show the request body. To run with curl:

```sh
curl -X POST "http://localhost:8090/fluree/query" \
  -H "Content-Type: application/json" \
  -d '<request body from example>'
```

## Complete Examples

See the **[Full Cookbook Examples](./examples)** page for all examples with detailed explanations and responses.

---

## Section Summaries

### Setup {#setup}

Create the `cookbook/base` ledger used throughout these examples. This populates sample data with Yetis and People.

[Go to Setup →](./examples#do-first-setup)

### Querying {#querying}

Learn to query data using FlureeQL:

- **Select statements** — Wildcards, specific properties, graph crawls
- **Where clauses** — Pattern matching, filters, optional patterns
- **Aggregates** — Count, sum, average, group by
- **Subqueries** — Nested queries for complex data retrieval

[Go to Querying →](./examples#querying)

### Transacting {#transacting}

Modify data in your ledger:

- **Insert** — Add new entities and properties
- **Delete** — Remove data
- **Update** — Modify existing values using where/delete/insert
- **Upsert** — Insert or update based on existence

[Go to Transacting →](./examples#transacting)

### Schema {#schema}

Define your data model:

- **Types** — Define entity classes
- **Properties** — Specify property characteristics
- **SHACL shapes** — Add validation constraints

[Go to Schema →](./examples#schema)

### JSON-LD Utilities {#json-ld-utilities}

Work with JSON-LD features:

- **Context** — Define and use namespaces
- **IRI handling** — Expand and compact IRIs
- **Framing** — Shape query output

[Go to JSON-LD Utilities →](./examples#json-ld-utilities)

### Time Travel {#time-travel}

Query historical data:

- **Point-in-time queries** — Query at specific transaction
- **History queries** — See how entities changed over time
- **Range queries** — Query changes within time ranges

[Go to Time Travel →](./examples#time-travel)

### Policy {#policy}

Implement access control:

- **View policies** — Control read access
- **Modify policies** — Control write access
- **Property-level policies** — Fine-grained access control

[Go to Policy →](./examples#policy)
