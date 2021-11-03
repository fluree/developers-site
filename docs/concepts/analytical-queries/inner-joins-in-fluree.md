---
sidebar_position: 1
---

# Inner Joins in Fluree

The three tuple is the base component for analytical queries in Fluree. A three
tuple acts as a pattern in a where-array. First it pulls all the data that matches
that given pattern, and then it binds the appropriate variables. For example, we
can issue the following query:

```json
{
    "select": ["?person", "?handle"],
    "where": [["?person", "person/handle", "?handle"]]
}
```

The result (in table form) could be (subject ids may be different for you):

?person | ?handle
-- | --
351843720888324 | dsanchez
351843720888323 | anguyen
351843720888322 | zsmith
351843720888321 | jdoe

Subsequent three-tuples are inner-joined with the previous results.
For example, let's say that that next clause is
`["?person", "person/favArtists", "?artist"]`. The results of that clause
(in table form) could be:

?person | ?artist
-- | --
351843720888324 | 404620279021570
351843720888321 | 404620279021571
351843720888322 | 404620279021569
351843720888323 | 404620279021570
351843720888321 | 404620279021570
351843720888323 | 404620279021571
351843720888321 | 404620279021569

If we were to resolve these two sequential three tuples
`["?person", "person/handle", "?handle"]`
`["?person", "person/favArtists", "?artist"]`, the above tables need to be inner-joined.
The `?person` variable is the only variable that matches across both sets of tuples,
so that is the one that we look to for matches. The resulting inner join:

?person | ?handle | ?artist
-- | -- | --
351843720888324 | dsanchez | 404620279021570
351843720888323 | anguyen | 404620279021570
351843720888323 | anguyen | 404620279021571
351843720888322 | zsmith | 404620279021569
351843720888321 | jdoe | 404620279021571
351843720888321 | jdoe | 404620279021570
351843720888321 | jdoe | 404620279021569

Note that if the previous result table and the subsequent clause have no matching
variables, this is the same as if every row in the previous results (table A)
matched every row in the new results (table B). This would result in a table of
`count of table A rows` * `count of table B rows`.

To speed up your queries, you want to order your clauses so that there are matching
variables in as many subsequent clauses as possible.

## Recursion {#recursion}

To recur across a relationship, simply add a `+` after a predicate. This will match
flakes any path length from the original. By default the recur depth is 100. You
can also specify a certain path length by adding an integer after the `+`.

```json
{
    "select": ["?followHandle"],
    "where": [
        ["?person", "person/handle", "anguyen"],
        ["?person", "person/follows+", "?follows"],
        ["?follows", "person/handle", "?followHandle"]
        ]  
}
```

```bash
 curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?followHandle"],
    "where": [
        ["?person", "person/handle", "anguyen"],
        ["?person", "person/follows+", "?follows"],
        ["?follows", "person/handle", "?followHandle"]
        ]  
}' \
   [HOST]/api/db/query
```

```graphql
Not supported.
```

```sparql
SELECT ?followHandle
WHERE {
  ?person fdb:person/handle "anguyen".
  ?person fdb:person/follows+ ?follows.
  ?person fdb:person/handle ?followHandle.
}
```

Below is an example specifying a maximum recursion depth.

```json
{
    "select": ["?followHandle"],
    "where": [
        ["?person", "person/handle", "anguyen"],
        ["?person", "person/follows+3", "?follows"],
        ["?follows", "person/handle", "?followHandle"]
        ]
    
}
```

```bash
 curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?followHandle"],
    "where": [
        ["?person", "person/handle", "anguyen"],
        ["?person", "person/follows+3", "?follows"],
        ["?follows", "person/handle", "?followHandle"]
        ]
    
}' \
   [HOST]/api/db/query
```

```graphql
Not sypported.
```

```sparql
SELECT ?followHandle
WHERE {
  ?person fdb:person/handle "anguyen".
  ?person fdb:person/follows+3 ?follows.
  ?follows fdb:person/handle ?followHandle.
}
```
