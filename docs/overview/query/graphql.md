---
sidebar_position: 6
---

# GraphQL

Fluree supports queries and transactions using GraphQL. GraphQL supports a more limited set of query capability than FlureeQL. Fluree's version of GraphQL supports a wide-range of GraphQL features, but not all of them.

If you don't already know and want to use GraphQL, we definitely recommend using FlureeQL. This section is an overview of GraphQL, and highlights key differences between FlureeQL and GraphQL. Throughout the rest of the documentation, you can toggle the left sidebar to see all applicable examples in GraphQL.

Because FlureeQL is a JSON format, this allows queries to be more easily composed within your programming code and is built to support Fluree's advanced capabilities like graph recursion.

All GraphQL queries and transactions can issued should be run through the [`/graphql`](/reference/http/examples.md#graphql) endpoint.

## Queries {#queries}

Using GraphQL, you can only retrieve predicates from within the namespace that you specify. In the below example, we indicate that we are looking in the `chat` collection.

Therefore, we can only retrieve predicates like `_id`, `message`, `person`, or `comments`, which are in the `chat` namespace.

```graphql
{ graph {
  chat {
    _id
    message
  }
}
}
```

Fluree allows any reference predicate to point to any subject, regardless of collection type.

However, in order to retrieve references using GraphQL, the `restrictCollection` property of that predicate has to be set to a valid collection. This second example retrieves not only the `_id` and `message` for each chat, but the `_id` and `handle` predicates for the `person` associated with each `chat`.

```graphql
{ graph {
  chat {
    _id
    message
    person {
        _id
        handle
    }
  }
}
}
```

## Wildcards {#wildcards}

GraphQL does not usually support the use of wildcards ( `*`), so most GraphQL interfaces will show an error when you attempt to use a wildcard. However, if you submit, the following query, the expected results will be returned.

```graphql
# Note this may show an error in your GraphQL tool, but it will return the expected result. 

{ graph {
  person {
    *
  }
}
}
```

## Reverse References {#reverse-references}

In addition to retrieving information in a forward-direction, we can also traverse the graph backwards.

The syntax for doing so differs from FlureeQL to GraphQL. While FlureeQL uses the format `chat/_person`, GraphQL performs the same query with `chat_Via_person`.

Using GraphQL:

```graphql
{ graph {
  person {
    chat_Via_person {
      _id
      instant
      message
    }
  }
}
}
```

Using FlureeQL

```json
{
  "select": [
    "*",
    {"chat/_person": ["*"]}
  ],
  "from": "person"
}
```

## Block Queries {#block-queries}

In order to query a specific block or range of blocks in GraphQL, you need to use a specific type of block query and specify the range of blocks you would like to see.

Querying a single block

```graphql
query  {
  block(from: 3, to: 3)
}
```

Querying a range of blocks

```graphql
query  {
  block(from: 3, to: 5)
}
```

Querying a range of blocks starting from a lower limit

```graphql
query  {
  block(from: 3)
}
```

## Search by Id or Ident {#search-by-id-or-ident}

To query a specific subject id, you can use the `_id` option, as seen below.

```graphql
{ graph {
  chat(_id: 369435906932737) {
    _id
    comments
    instant
    message
    person
  }
}
}
```

To query a unique two-tuple, you can use the `ident` option, as seen below.

```graphql
# Note this may show an error in your GraphQL tool, but it will return the expected result. 

{ graph {
  person1(ident: ["person/handle", "jdoe"]){
    _id
    handle
    fullName
  }
    person2(ident: ["person/handle", "zsmith"]){
    _id
    handle
    fullName
  }
}
}
```

## Sort By {#sort-by}

GraphQL queries allow you to sort any field at any level in the graph. In order to perform a sort, you need to specify both the attribute name and whether you would like to sort the values by ascending or descending values.

In the below example, we are sorting chat messages in alphabetical order.

```graphql
{ graph {
  chat (sort: {attribute: "message", order: ASC}) {
    _id
    instant 
    message
  }
}
}
```

The below query sorts every person alphabetically by their full name, and then sorts all of their comments by message.

```graphql
{ graph {
   person (sort: {attribute: "fullName", order: ASC}) {
    fullName
    comment_Via_person (sort:{attribute: "message", order: DESC}) {
      message
      instant
    }
  }
}
}
```

Query with sort. Get all chat messages sorted alphabetically by message.

```graphql
{ graph {
  chat (sort: {attribute: "message", order: ASC}) {
    _id
    instant 
    message
  }
}
}
```

Query with sort. Get all people, sorted alphabetically by full name, and get each person's chat messages sorted from oldest to newest.

```graphql
{ graph {
   person (sort: {attribute: "fullName", order: ASC}) {
    fullName
    comment_Via_person (sort:{attribute: "instant", order: ASC}) {
      message
      instant
    }
  }
}
}
```

## Transactions {#transactions}

We can perform transactions in GraphQL by passing a variable to a GraphQL mutation. This variable should contain a JSON-formatted parcel of data without line breaks.

As you can see in the below example, in order to add people, we store the JSON-formatted data in a variable called `myPeopleTx` and use the variable `myPeopleTx` in the mutation statement.

We also need to ensure that all `"` are escaped, like so `\"`. If you use `$` anywhere in your transaction, that also needs to be escaped. If using GraphQL for transactions, we recommend using `#` as the delimiting characters in tempids (i.e. `person#1` rather than `person$1`), as `#` does not need to be escaped.

```graphql
mutation addPeople ($myPeopleTx: JSON) {
  transact(tx: $myPeopleTx)
}

{
  "myPeopleTx": "[{ \"_id\": \"person\", \"handle\": \"aSmith\", \"fullName\": \"Alice Smith\" }, { \"_id\": \"person\", \"handle\": \"aVargas\", \"fullName\": \"Alex Vargas\" }]"
}
```

If you are using the UI, you can place your variable in the "Query Variables" section on the lower left hand side of the GraphQL interface. If you are using the API, you should add a new key, `"variables"` to your request body and include your variables (more information in the [`/graphql` reference section](/reference/http/examples.md#graphql) on GraphQL endpoints.  

## Other Features {#other-features}

Fluree's version of GraphQL supports both variables (as evident in [Transactions](#transactions)) and fragments.

We support introspection and type queries, as well.

## Sub-Select Queries {#sub-select-queries}

Simply list the options inside of parentheses immediately after the chosen predicate. For example, we can limit the `chat_Via_person` predicates to only show 10 chats (in GraphQL, reverse references use _Via_ rather than /_).

Note that in GraphQL, the options do not have a leading underscore. In GraphQL, the options that you can include are:

Key | Description
-- | --
`limit` | Limit (integer) of results to include. Only for `multi` and `ref` predicates.
`recur` | Number of times (integer) to follow a relationship. Only for `ref` predicates.
`as` | Alternate name for a predicate. Only for `ref` predicates.

```graphql
{ graph {
  person {
    _id
    handle
    chat_Via_person (limit: 10) {
      instant
      message
      comments {
        message
      }
    }
  }
}}
```
