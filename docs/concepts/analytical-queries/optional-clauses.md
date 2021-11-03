---
sidebar_position: 3
---

# Optional Clauses

Optional clauses are equivalent to left-outer joins. If a variable within an optional
clause does not match with existing results, the value of that variable is simply
bound to `nil`.

Currently, we do not support starting your where clause with an `optional` map.
This will always return an empty result, as of 0.13.0.

```flureeql
{
  "select": [ "?person", "?name", "?age" ],
  "where": [ [ "?person", "person/age", "?age"],
    { "optional": [ [ "?person", "person/fullName", "?name"],
        [ "?person", "person/favNums", "?favNums"]]
    }
  ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
  "select": [ "?person", "?name", "?age" ],
  "where": [ [ "?person", "person/age", "?age"],
    { "optional": [ [ "?person", "person/fullName", "?name"],
        [ "?person", "person/favNums", "?favNums"]]
    }
  ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?person ?name ?age
WHERE {
  ?person fdb:person/fullName ?name. 
  OPTIONAL {  ?person fdb:person/fullName ?name. 
              ?person fdb:person/favNums ?favNums. }
}
```

Here is an example of using an optional clause. Immediately after the optional
clause, we use a filter that keeps all `?nums` values that are nil or `?nums`
that = 98.

```all
{
  "select": [
    {"?person": ["favNums"]},
    "?name",
    "?age",
    "?nums"
  ],
  "where": [
    [
      "?person",
      "person/fullName",
      "?name"
    ],
    {
      "optional": [
        [
          "?person",
          "person/age",
          "?age"
        ],
        [
          "?person",
          "person/favNums",
          "?nums"
        ]
      ]
    },
     {"filter": ["(if (nil? ?nums) true (= 98 ?nums))"]}
  ]
}
```

<!-- 
### Left-Outer Join Walkthrough {#left-outer-join-walkthrough}

Here is a query that does not have any optional clauses:

```flureeql
{
    "select": ["?handle", "?num"],
    "where": [  ["?person", "person/handle", "?handle"], 
                ["?person", "person/favNums", "?num"] ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?handle", "?num"],
    "where": [  ["?person", "person/handle", "?handle"], 
                ["?person", "person/favNums", "?num"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?handle ?num
WHERE {
  ?person fdb:person/handle ?handle.
  ?person fdb:person/favNums ?num.
}
```

Let's say the results of the where clause are as follows:

?handle | ?num
-- | --
Alice | 7
Alice | 42 
Bob | 2
Bob | 9
Bob | 42

If there were any people in our ledger *without* favorite numbers, they would not appear in this query. However, if we want to preserve all `handle`s, even ones belonging to people without favorite numbers, we could issue this query:

```flureeql
{
    "select": ["?handle", "?num"],
    "where": [  ["?person", "person/handle", "?handle"] ],
    "optional": [["?person", "person/favNums", "?num"]]
}
```

```curl 
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?handle", "?num"],
    "where": [  ["?person", "person/handle", "?handle"] ],
    "optional": [["?person", "person/favNums", "?num"]]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?handle ?num
WHERE {
  ?person fdb:person/handle ?handle.
  OPTIONAL { ?person fdb:person/favNums ?num. }
}
```

The results of the above query might look below. Where Jack and Jill are still in our result set, even though they don't have favorite numbers.

?handle | ?num
-- | --
Alice | 7
Alice | 42 
Bob | 2
Bob | 9
Bob | 42
Jack | null
Jill | null

You could have as many optional clauses as you like, but note that ORDER matters! So think through those joins before writing out your query.

Filters can include multiple variables, for example gets all the favorite numbers for every person, and if a person has an age, it also gets their age. Then, it filters by returning only the favorite numbers that are greater than a given person's age or greater than 3 if no age is provided. 

```flureeql
{
  "select": ["?favNums", "?age" ],
  "where": [["?person", "person/favNums", "?favNums"]],
  "optional": [["?person", "person/age", "?age"]],
  "filter": ["(> ?favNums (coalesce ?age 3))"]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
  "select": ["?favNums", "?age" ],
  "where": [["?person", "person/favNums", "?favNums"]],
  "optional": [["?person", "person/age", "?age"]],
  "filter": ["(> ?favNums (coalesce ?age 3))"]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?favNums ?age
WHERE {
  ?person fdb:person/favNums ?favNums.
  OPTIONAL {
    ?person fdb:person/age ?age.
  }
  FILTER( ?favNums > (coalesce ?age 3))
}
``` -->
