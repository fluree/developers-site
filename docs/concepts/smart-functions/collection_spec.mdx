---
sidebar_position: 3
---

# Collection Spec

A `_collection/spec` is set of smart functions that are attached to a particular collection. Any time that collection appears in a transaction, regardless of who issues the transaction, the smart functions attached to the `_collection/spec` will execute.

If all of the smart functions return true, the transaction will succeed. If any of the smart functions return false, it will fail.

The examples in this section use the [Basic Schema](/guides/schema/1.md).

## Example Uses {#example-uses}

1. Certain predicates are required.
2. If a certain predicate is included, other predicates are required.

The main use for `_collection/spec` is to require, or to conditionally require, certain predicates. For example, you might want to require `person/fullName`. Any transaction that would leave a person without a full name would be rejected. This includes creating a new person without a full name or deleting a full name from a person.

## Example: person/fullName Required {#example-personfullname-required}

If we want to make `person/fullName` required, we need to first create a smart function and then reference that function in the `person` collection spec.

It might be tempting to think that, because this smart function pertains to one specific predicate, then we should use a predicate spec. However, we could be creating new people with the following transaction:

```json
[{
  "_id": "person",
  "handle": "gWash"
},
{
  "_id": "person",
  "handle": "johnnyQ"
}]
```

The above transaction should not be allowed if we want to require full names, but it would not trigger any smart functions attached to the `person/fullName` `_predicate/spec`. This is because the `fullName` predicate does not appear anywhere in the transaction. Instead, we need to put the smart function on the `_collection/spec` for `person/fullName`.

Note, in our smart function, we first use our `?sid` to find the `person/fullName`. We retrieve the `person/fullName` using `get`, and then we coerce the result to a boolean (`true` or `false`), so that any non-nil value will return `true` and `nil` will return `false`.

In the below transaction, we first attach the `_fn$fullNameReq` to the `person` collection, and write a `specDoc`. The `specDoc` is the custom error message that will display when this smart function returns false. In the second part of the transaction, we create the relevant smart function, `fullNameReq`.

```json
[{
  "_id": ["_collection/name", "person"],
  "spec": ["_fn$fullNameReq"],
  "specDoc": "A person is required to have a fullName."
},
{
  "_id": "_fn$fullNameReq",
  "name": "fullNameReq",
  "code": "(boolean (get (?s) \"person/fullName\"))"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
  "_id": ["_collection/name", "person"],
  "spec": ["_fn$fullNameReq"],
  "specDoc": "A person is required to have a fullName."
},
{
  "_id": "_fn$fullNameReq",
  "name": "fullNameReq",
  "code": "(boolean (get (?s) \"person/fullName\"))"
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation reqFullName ($reqFullNameTx: JSON) {
  transact(tx: $reqFullNameTx)
}

{
  "reqFullNameTx": "[{\"_id\":[\"_collection/name\",\"person\"],\"spec\":[\"_fn$fullNameReq\"],\"specDoc\":\"A person is required to have a fullName.\"},{\"_id\":\"_fn$fullNameReq\",\"name\":\"fullNameReq\",\"code\":\"(boolean (get (?s) \\\"person/fullName\\\"))\"}]"
}
```

```sparql
Transactions not supported in SPARQL
```

After we add this `_collection/spec`, the following transaction should fail:

```json
[{
    "_id": "person",
    "handle": "noFullName"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": "person",
    "handle": "noFullName"
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation addPersonNoFullName ($addPersonNoFullNameTx: JSON) {
  transact(tx: $addPersonNoFullNameTx)
}

{
  "addPersonNoFullNameTx": "[{\"_id\":\"person\",\"handle\":\"noFullName\"}]"
}
```

```sparql
Transactions not supported in SPARQL
```
