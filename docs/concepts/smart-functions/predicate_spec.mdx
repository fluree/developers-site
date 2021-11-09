---
sidebar_position: 2
---

# Predicate Spec

A `_predicate/spec` is set of smart functions that are attached to a particular predicate. Any time that predicate appears in a transaction, regardless of who issues the transaction, the smart functions attached to the `_predicate/spec` will execute.

If all of the smart functions return true, the transaction will succeed. If any of the smart functions return false, it will fail.

The examples in this section use the [Basic Schema](/guides/schema/1.md).

## Example Uses {#example-uses}

1. Ensure an object is non-negative.
2. Ensure a string is less than 20 characters long.
3. Ensure an integer only increases, or only decreases.

Predicate specs may also be more complicated and may involve information about the person issuing the transaction. For example, a person can only edit their own chats or delete their own comments. These sorts of restrictions could alternatively be added to `_rule/fns`.

The decision of whether to add a restriction like this to `_rule/fns` or to `_predicate/spec` is based on whether that rule is universal or not. For example, you might want to have most people only able delete their own chats, but some people, i.e. moderators, who can delete any chat. If the rule is not universal, you want to add it to `_rule/fns`. If the rule is universal, you want to add it to `_predicate/spec`.

## Example: favNums non-negative {#example-favnums-non-negative}

If we want to make sure that `person/favNums` is always non-negative, we need to first create a smart function and then reference that function in the `person/favNums` predicate spec. Note, we can perform these transactions at the same time, but we separate them here for clarity.

Create a Non-Negative Function:

```json
[{
    "_id": "_fn",
    "name": "nonNegative?",
    "doc": "Checks that a value is non-negative",
    "code": "(<= 0 (?o))"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": "_fn",
    "name": "nonNegative?",
    "doc": "Checks that a value is non-negative",
    "code": "(<= 0 (?o))"
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation nonNeg ($nonNegTx: JSON) {
  transact(tx: $nonNegTx)
}

{
  "nonNegTx": "[{\"_id\":\"_fn\",\"name\":\"nonNegative?\",\"doc\":\"Checks that a value is non-negative\",\"code\":\"(<= 0 (?o))\"}]"
}
```

```sparql
Transactions not supported in SPARQL
```

Add function to the `_predicate/spec` for `person/favNums`:

```json
[{
    "_id": ["_predicate/name", "person/favNums"],
    "spec": [["_fn/name", "nonNegative?"]]
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["_predicate/name", "person/favNums"],
    "spec": [["_fn/name", "nonNegative?"]]
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation addFn ($addFnTx: JSON) {
  transact(tx: $addFnTx)
}

{
  "addFnTx": "[{\"_id\":[\"_predicate/name\",\"person/favNums\"],\"spec\":[[\"_fn/name\",\"nonNegative?\"]]}]"
}
```

```sparql
Transactions not supported in SPARQL
```

If you try to issue the following transaction, it will fail, because -4 is negative.

```json
[{
    "_id": "person",
    "handle": "aJay",
    "favNums": [12, -4, 57]
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": "person",
    "handle": "aJay",
    "favNums": [12, -4, 57]
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation addPerson ($addPersonTx: JSON) {
  transact(tx: $addPersonTx)
}

{
  "addPersonTx": "[{\"_id\":\"person\",\"handle\":\"aJay\",\"favNums\":[12,-4,57]}]"
}
```

```sparql
Transactions not supported in SPARQL
```
