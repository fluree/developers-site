<!-- # Examples

 Additional examples are coming soon


#### Query examples: {#query-examples}

In the [Basic Schema](/guides/schema/1.md), we gave each person a set of favorite numbers. If we want to view all of `zsmith`'s flakes, which contain the values of his favorite numbers, our query could be:

```flureeql
{
    "select": "?nums",
    "where": [["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"]]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?nums",
    "where": [ ["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?nums
WHERE {
    ?person fd:person/handle    "jdoe";
            fd:person/favNums   ?nums.
}
```

Our where clause only contains one tuple, `["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"]` within the main tuple (we'll see examples of multiple tuples later). There are four elements in this tuple: 

Alternatively, if we want to specify every flake that contains favorite numbers, we set the subject as a variable. 

```flureeql
{
    "select": "?nums",
    "where": [ ["$fdb", "?person", "person/favNums", "?nums"] ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?nums",
    "where": [ ["$fdb", null, "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?nums
WHERE {
    ?person fd:person/favNums ?nums.
}
```

If the same variable is used in multiple tuples, it acts as a filter. For example, if we want to select any favorite numbers shared by both "jdoe" and "zsmith", we could bind the value of their favNums to the same variable. 

```flureeql
{
    "select": "?nums",
    "where": [  ["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["$fdb", ["person/handle", "jdoe"], "person/favNums", "?nums"] ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?nums",
    "where": [  ["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["$fdb", ["person/handle", "jdoe"], "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?nums
WHERE {
    ?person     fd:person/handle    "jdoe";
                fd:person/favNums    ?nums.
    ?person2    fd:person/handle    "zsmith";
                fd:person/favNums   ?nums.
}
```

A `union` map can be placed anywhere inside of a `where` clause. For example:

```flureeql
{
  "select": [ "?person", "?age" ],
  "where": [
   {
      "union": [
        // First clause group
        [["?person","person/age", 70],
        ["?person", "person/handle", "dsanchez"]],
        
        // Second clause
        [["?person", "person/handle", "anguyen"]]
      ]
  }
    [
      "?person",
      "person/age",
      "?age"
    ]
  ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
  "select": [ "?person", "?age" ],
  "where": [
   {
      "union": [
        // First clause group
        [["?person","person/age", 70],
        ["?person", "person/handle", "dsanchez"]],
        
        // Second clause
        [["?person", "person/handle", "anguyen"]]
      ]
  }
    [
      "?person",
      "person/age",
      "?age"
    ]
  ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?person ?age
WHERE {
  {   ?person fdb:person/age 70.
    ?person fdb:person/handle "dsanchez". } 
  UNION 
  {   ?person fdb:person/handle "anguyen". } 
  ?person fdb:person/age ?age.
}
```

#### Unions {#unions}

A `union` map in a where clause allow variables to match multiple graph patterns. 

For example, the clause `[ "?person", "person/handle", "dsanchez" ]` will only match Diana Sanchez. The clause `[ "?person", "person/handle", "jdoe" ]` will only match Jane Doe. If we want to bind BOTH Diana and Jane's subject ids to `?person`, we can use a `union` map. The `union` map has an array of clause array. Note that even if each clause array only has a single clause, it still must be enclosed in `[`.

```flureeql
{
      "union": [
        [[ "?person", "person/handle", "dsanchez" ]],
        [[ "?person", "person/handle", "anguyen"]]
      ]
    }
```

```curl
// Below is just the FlureeQL code
{
      "union": [
        [[ "?person", "person/handle", "dsanchez" ]],
        [[ "?person", "person/handle", "anguyen"]]
      ]
}
```

```graphql 
Not supported
```

```sparql 
{ ?person fdb:person/handle "dsanchez" } UNION { ?person fdb:person/handle "anguyen" } 
```

Below is an example of a `union` with multiple clauses. In this case, `?person` can EITHER have an age of 70 and a handle, dsanzhez, OR it can have a handle of anguyen.

```flureeql
{
      "union": [
        // First clause group
        [["?person","person/age", 70],
        ["?person", "person/handle", "dsanchez]],
        
        // Second clause
        [["?person", "person/handle", "anguyen"]]
      ]
}
```

```curl
// Below is just the FlureeQL code
{
      "union": [
        // First clause group
        [["?person","person/age", 70],
        ["?person", "person/handle", "dsanchez]],
        
        // Second clause
        [["?person", "person/handle", "anguyen"]]
      ]
}
```

```graphql
Not supported
```

```sparql 
{   ?person fdb:person/age 70.
    ?person fdb:person/handle "dsanchez". } 
  UNION 
{   ?person fdb:person/handle "anguyen" } 

### Prefixes and Querying Across Sources

For example, if we wanted to see whether "zsmith" as of block 5 shared a favorite number with "zsmith" as of block 4. We are currently at block 4, so we would first need to issue a transaction. We can give `zsmith` an additional favorite number. 

```flureeql
[{
  "_id": ["person/handle", "zsmith"],
  "favNums": [100]
}]
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
  "_id": ["person/handle", "zsmith"],
  "favNums": [100]
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation addFavNum ($addFavNumTx: JSON) {
  transact(tx: $addFavNumTx)
}

{
  "addFavNumTx": "[{\"_id\":[\"person/handle\",\"zsmith\"],\"favNums\":[100]}]"
}
```

```sparql
Transactions not supported in SPARQL.
```

Now, we can issue a query showing which numbers were his favorites in BOTH block 4 and block 5. This means the results should exclude the number 100. 

```flureeql
{
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["$fdb5", ["person/handle", "zsmith"], "person/favNums", "?nums"] ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["$fdb5", ["person/handle", "zsmith"], "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?nums
WHERE {
    ?person     fd4:person/handle   "zsmith";
                fd4:person/favNums  ?nums;
                fd5:person/favNums  ?nums.
}
```

For example, the below is incorrect. 

```flureeql
<<< ----- THIS IS A AN INCORRECT EXAMPLE ----- >>>
{
    "prefixes": {
      "ftest5": "fluree/test" <<< ----- WRONG ----- >>>
    },
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["ftest5", ["person/handle", "zsmith"], "person/favNums", "?nums"] ]
}
```

```curl
<<< ----- THIS IS A AN INCORRECT EXAMPLE ----- >>>
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "prefixes": {
      "ftest5": "fluree/test" <<< ----- WRONG ----- >>>
    },
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["ftest5", ["person/handle", "zsmith"], "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
<<< ----- THIS IS A AN INCORRECT EXAMPLE ----- >>>
PREFIX ftest5: <fluree/test> <<< ----- WRONG ----- >>>
SELECT ?nums
WHERE {
   ?person     fd4:person/handle   "zsmith";
                fd4:person/favNums  ?nums.
    ?personTest ftest5:person/handle "zsmith".
                ftest5:person/favNums  ?nums.
}
```

The below is correct, where the time is specified in the actual clause itself. 

```flureeql
{
    "prefixes": {
      "ftest": "fluree/test" 
    },
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["ftest5", ["person/handle", "zsmith"], "person/favNums", "?nums"],
                ["ftestPT5M", ["person/handle", "jdoe"], "person/favNums", "?nums"] ]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "prefixes": {
      "ftest": "fluree/test" 
    },
    "select": "?nums",
    "where": [  ["$fdb4", ["person/handle", "zsmith"], "person/favNums", "?nums"], 
                ["ftest5", ["person/handle", "zsmith"], "person/favNums", "?nums"],
                ["ftestPT5M", ["person/handle", "jdoe"], "person/favNums", "?nums"] ]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
PREFIX ftest: <fluree/test> 
SELECT ?nums
WHERE {
   ?person     fd4:person/handle   "zsmith";
                fd4:person/favNums  ?nums.
    ?personTest ftest5:person/handle "zsmith".
                ftest5:person/favNums  ?nums.
}
```

### WikiData Examples

#### Artist Example 

Using the [Basic Schema](/guides/schema/1.md), we will be able to use analytical queries to connect up a `person/favArtists` (stored in Fluree) to their artworks (stored in Wikidata).

We can retrieve the names of artworks created by jdoe's favorite artists. Our full query is below. We will discuss each of the where clause tuples individually. 

```flureeql
{
    "select": ["?name", "?artist", "?artwork", "?artworkLabel"],
    "where": [[["person/handle", "jdoe"], "person/favArtists", "?artist"],
              ["?artist", "artist/name", "?name"],
              ["$wd", "?artwork", "wdt:P170", "?creator"],
              ["$wd", "?creator", "?label", "?name"]]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?name", "?artist", "?artwork", "?artworkLabel"],
    "where": [[["person/handle", "jdoe"], "person/favArtists", "?artist"],
              ["?artist", "artist/name", "?name"],
              ["$wd", "?artwork", "wdt:P170", "?creator"],
              ["$wd", "?creator", "?label", "?name"]]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?name ?artist ?artwork ?artworkLabel
WHERE {
    ?person     fd:person/handle        "jdoe";
                fd:person/favArtists    ?artist.
    ?artist     fd:artist/name          ?name.
    ?artwork    wdt:P170                ?creator.
    ?creator    wd:?label                ?name.
}
```

Tuple | Explanation
-- | --
`[["person/handle", "jdoe"], "person/favArtists", "?artist"]` | Retrieves all of the subject, `["person/handle", "jdoe"]`'s favorite artists (`"person/favArtists"`) and it binds them to the variable `?artist`.
`["?artist", "artist/name", "?name"]` | Looks up `artist/name` and binds to the variable `?name`.
`["$wd", "?artwork", "wdt:P170", "?creator"]` | Use the [Wikidata property, creator](https://www.wikidata.org/wiki/Property:P170) to bind `?artwork` and `?creator`
`["$wd", "?creator", "?label", "?name"]` | Limits the scope of our `?creator`s (and thus `?artworks`) based on `?creator`s whose `?label` matches `?name`

#### Movie Example

We can also use Wikidata to retrieve the narrative locations of users' favorite movies with the following query:

```flureeql
{
"select": ["?handle", "?title", "?narrative_locationLabel"],
"where": [ ["?user", "person/favMovies", "?movie"],
["?movie", "movie/title", "?title"],
["$wd", "?wdMovie", "?label", "?title"],
["$wd", "?wdMovie", "wdt:P840", "?narrative_location"],
["$wd", "?wdMovie", "wdt:P31", "wd:Q11424"],
["?user", "person/handle", "?handle"]]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
"select": ["?handle", "?title", "?narrative_locationLabel"],
"where": [ ["?user", "person/favMovies", "?movie"],
["?movie", "movie/title", "?title"],
["$wd", "?wdMovie", "?label", "?title"],
["$wd", "?wdMovie", "wdt:P840", "?narrative_location"],
["$wd", "?wdMovie", "wdt:P31", "wd:Q11424"],
["?user", "person/handle", "?handle"]]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?handle ?title ?narrative_locationLabel
WHERE {
  ?user     fdb:person/favMovies    ?movie.
  ?movie    fdb:movie/title       ?title.
     ?wdMovie  wd:?label             ?title;
            wdt:P840               ?narrative_location;
            wdt:P31               wd:Q11424.
  ?user     fdb:person/handle       ?handle.
}
```

To learn more about querying Wikidata, visit their [documentation](https://www.wikidata.org/wiki/Wikidata:Introduction). Also, stay tuned for our [analytical query lessons](/lessons) coming soon!

Note that cross-ledger queries can take some time. 

### Group By

```flureeql
{
    "select":  "?handle",
    "where": [  ["?person", "person/handle", "?handle"] ],
    "groupBy": "?person"
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select":  "?handle",
    "where": [["?person", "person/handle", "?handle"]],
    "groupBy": "?person"
}' \
   [HOST]/api/db/query
```

```graphql
Not supported.
```

```sparql
SELECT ?handle
WHERE {
  ?person fdb:person/handle ?handle.
}
GROUP BY ?person
```

Below, we group by two different variables. 

```flureeql
{
    "select":  "?handle",
    "where": [  ["?person", "person/handle", "?handle"] ],
    "groupBy": ["?handle", "?person"]
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select":  "?handle",
    "where": [  ["?person", "person/handle", "?handle"] ],
    "groupBy": ["?handle", "?person"]
}' \
   [HOST]/api/db/query
```

```graphql
Not supported.
```

```sparql
SELECT ?handle
WHERE {
  ?person fdb:person/handle ?handle.
}
GROUP BY ?person ?handle
```

You can use `groupBy` in conjunction with `orderBy`. For example, the below query will order the results by the second variable in the grouping. 

```flureeql
{
    "select":  "?handle",
    "where": [  ["?person", "person/handle", "?handle"] ],
    "groupBy": ["?handle", "?person"],
    "orderBy": "?person"
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select":  "?handle",
    "where": [  ["?person", "person/handle", "?handle"] ],
    "groupBy": ["?handle", "?person"],
    "orderBy": "?person"
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT ?handle
WHERE {
  ?person fdb:person/handle ?handle.
}
GROUP BY ?handle ?person
ORDER BY ?person
```

Example results for the above query in FlureeQL.

```all
{
  "[\"jdoe\" 351843720888321]": [
    "jdoe"
  ],
  "[\"zsmith\" 351843720888322]": [
    "zsmith"
  ],
  "[\"anguyen\" 351843720888323]": [
    "anguyen"
  ],
  "[\"dsanchez\" 351843720888324]": [
    "dsanchez"
  ],
  "[\"jdoe2\" 351843720888325]": [
    "jdoe2"
  ]
}
```

### Wikidata Options

By default, any Wikidata queries are run with a limit of 100, an offset of 0, English as the label language, and returning only distinct values. Any of these options can be overwritten by specifying Wikidata options in the `wikidataOpts` key-value pair in an analytical query. 

Below is an example of using `wikidataOpts` in a query. In SPARQL, you cannot currently specify Wikidata options other than `language` (see [language labels](/overview/query/sparql.md#language-labels))

```flureeql
{
    "select": ["?name", "?artist", "?artwork"],
    "where": [
        [["person/handle", "jdoe"], "person/favArtists", "?artist"],
        ["?artist", "artist/name", "?name"],
        ["$wd", "?artwork", "wdt:P170", "?creator"],
        ["$wd", "?creator", "?label", "?name"]
        ],
    "wikidataOpts": {"limit": 5, "distinct": false}
}
```

```curl
  curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '{
    "select": ["?name", "?artist", "?artwork"],
    "where": [
        [["person/handle", "jdoe"], "person/favArtists", "?artist"],
        ["?artist", "artist/name", "?name"],
        ["$wd", "?artwork", "wdt:P170", "?creator"],
        ["$wd", "?creator", "?label", "?name"]
        ],
    "wikidataOpts": {"limit": 5, "distinct": false}
}' \
   [HOST]/api/db/query
```

```graphql
Not supported
```

```sparql
SELECT DISTINCT ?name ?artist ?artwork ?artworkLabel
WHERE {
    ?person     fd:person/handle        "jdoe";
                fd:person/favArtists    ?artist.
    ?artist     fd:artist/name          ?name.
    ?artwork    wdt:P170                ?creator.
    ?creator    wd:?label                ?name.
}
LIMIT 5
```  -->
