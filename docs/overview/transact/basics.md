---
sidebar_position: 1
---

# Basic Transaction

Fluree allows you to specify transaction using FlureeQL JSON array/vector syntax that contains
subject maps to create, update, upsert or delete. Maximum transaction size is 2 MB.

Transactions can also be done with GraphQL, for more information on on GraphQL transactions,
reference the [GraphQL Transactions](/overview/query/graphql.md#transactions) section.

## Transact Keys {#transact-keys}

Each map requires an `_id` as specified below along with key/value pairs containing the predicates
and values you wish to modify. An `_action` key is always included, but typically inferred and thus
optional for most operations.

Key | Type | Description
-- | -- | --
`_id` | subject id |  Any subject id value which can include the numeric assigned permanent `_id`
for an subject, any predicate marked as unique as a two-tuple, i.e. `["_user/username", "jdoe"]`,
or a temporary id (for new entities). See the [Temporary Ids](#temporary-ids) section in the below
Transactions section to learn more.
`_action` | string | Optional (if it can be inferred). One of: `add`, `update`, `upsert` or `delete`.
When using a temporary id, `add` is always inferred. When using an existing subject id, `update`
is always inferred. `upsert` is inferred for new entities with a tempid if they include an predicate
that was marked as `upsert`.

## Temporary Ids {#temporary-ids}

Every transaction item must have an _id predicate to refer to the subject we are attempting to
create/update. A tempid can simply be the collection name, i.e. `_user`.

FlureeQL example:

```json
[{
    "_id":    "_user",
    "username": "eWasswa"
}]
```

However, if you would like to reference that tempid somewhere else in your transaction,
it is necessary to create a unique tempid. To make a unique tempid, just append the collection
with any non-valid collection character (anything other than a-z, A-Z, 0-9, _) followed by anything
else. For example, `_user$lEliasz` or `_user#1`.

FlureeQL example:

```json
[{
    "_id":    "_user$lEliasz",
    "username": "lEliasz",
    "auth": ["_auth$temp"]
  },
  {
    "_id": "person",
    "handle": "lEliasz",
    "fullName": "Louis Eliasz",
    "user": "_user$lEliasz"
  },
  {
    "_id": "_auth$temp",
    "id": "tempAuthRecord"
}]
```

## Adding Custom Metadata {#adding-custom-metadata}

When issuing a transaction, you can include your own metadata. For example, if you want to include
a `_tx/note`, you can issue the below transaction to create the relevant predicate (field):

```json
[{
    "_id": "_predicate",
    "name": "_tx/note",
    "type": "string"
}]
```

And, then, whenever you issue a transaction, you are able to include a _tx/note.

```json
[{
    "_id": "_user",
    "username": "abc"
},
{
    "_id": "_tx",
    "note": "hey there"
}]
```

## Fuel {#fuel}

Fuel is used to meter usage. Every query and transaction accumulates a
certain amount of "fuel." The amount of fuel used is returned in the query or transaction results.

In the `Fluree`, fuel is returned as supplemental information.
