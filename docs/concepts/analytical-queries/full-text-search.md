---
sidebar_position: 2
---

# Full Text Search

You can use analytical queries to search objects of a given predicate or within
a given collection. In order to do this, you first need to enable full text search
on any predicates you want to be able to search. For example, we're going to enable
full text search on `person/fullName`, `person/handle`, and `chat/message`.

```json
[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": true
},
{
    "_id": ["_predicate/name", "person/handle"],
    "fullText": true
},
{
    "_id": ["_predicate/name", "chat/message"],
    "fullText": true
}]
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": true
},
{
    "_id": ["_predicate/name", "person/handle"],
    "fullText": true
},
{
    "_id": ["_predicate/name", "chat/message"],
    "fullText": true
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation makeFullText ($myFullTextTx: JSON) {
  transact(tx: $myFullTextTx)
}

{
  "myFullTextTx": "[{\"_id\":[\"_predicate/name\",\"person/fullName\"],\"fullText\":true},{\"_id\":[\"_predicate/name\",\"person/handle\"],\"fullText\":true},{\"_id\":[\"_predicate/name\",\"chat/message\"],\"fullText\":true}]"
}
```

```sparql
Transactions not supported in SPARQL.
```

A predicate can be removed from the full-text search index (and thus from full-text
search capability) at any time by simply setting `fullText` to false:

```json
[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": false
}]
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": false
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation unmakeFullText ($myFullTextRemoveTx: JSON) {
  transact(tx: $myFullTextRemoveTx)
}

{
  "myFullTextRemoveTx": "[{\"_id\":[\"_predicate/name\",\"person/fullName\"],\"fullText\":false}]"
}
```

```sparql
Transactions not supported in SPARQL.
```

Now, we can issue a full text query against any predicate or collection by using
a special predicate, `fullText:PREDICATE` or `fullText:COLLECTION`, which acts
as a service call. For example:

```json
{
    "select": "?person",
    "where": [
        ["?person", "fullText:person/fullName"", "doe"]
    ]
}
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?person",
    "where": [
        ["?person", "fullText:person/fullName", "doe"]
    ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?person
WHERE {
  ?person fullText:person/fullName "doe".
}
```

The above query binds the subject _ids for any person whose `person/fullName`
includes the word `doe` (not case-sensitive). We can also issue the same query
searching any full-text-searchable predicates in the `person` collection. In
this case, we would be searching the predicates: `person/fullName` and `person/handle`.

```json
{
    "select": "?person",
    "where": [
        ["?person", "fullText:person", "doe"]
    ]
}
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?person",
    "where": [
        ["?person", "fullText:person", "doe"]
    ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?person
WHERE {
  ?person fullText:person "doe".
}
```

We can combine a full-text search service call clause with any other clause, for
example:

```json
{
    "select": ["?person", "?nums", "?age"
    "where": [
        ["?person", "fullText:person/handle", "jdoe"],
        ["?person", "person/favNums", "?nums"],
        ["?person", "person/age", "?age"]
    ]
}
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?person", "?nums", "?age"
    "where": [
        ["?person", "fullText:person/handle", "jdoe"],
        ["?person", "person/favNums", "?nums"],
        ["?person", "person/age", "?age"]
    ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?person ?nums ?age
WHERE {
  ?person fullText:person/handle "jdoe".
  ?person fdb:person/favNums ?nums.
  ?person fdb:person/age ?age.
}
```

A predicate can be removed from the full-text search index (and thus from full-text
search capability) at any time by simply setting `fullText` to false:

```json
[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": false
}]
```

```bash
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["_predicate/name", "person/fullName"],
    "fullText": false
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation unmakeFullText ($myFullTextRemoveTx: JSON) {
  transact(tx: $myFullTextRemoveTx)
}

{
  "myFullTextRemoveTx": "[{\"_id\":[\"_predicate/name\",\"person/fullName\"],\"fullText\":false}]"
}
```

```sparql
Transactions not supported in SPARQL.
```

## Note {#note}

A few things to note with full text searching:

1. The full-text search index is not guaranteed to be fully
  up-to-date. It may take some time for index to become synchronized.
2. Full-text search is only available for the current Fluree ledger.
