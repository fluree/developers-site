---
sidebar_position: 4
---

# Identity

In Fluree, an auth record is the central component of identity. Every query and transaction is attributed to a particular auth record. If using a closed-API, the auth record is either the auth record that signed that query or transaction. If using a `fdb-open-api` (see [config options](/reference/fluree_config.md)), you can still sign queries and transactions. However, if you do not sign them, queries and transactions are automatically connected to a default auth record with root access.

An auth record's `_auth/id` is derived from a private key. There are many ways to [generate a auth-public-private key trio](/concepts/identity/auth_records.md#generating-a-public-private-key-auth-id-triple).

An auth record can belong to a user. A user can have many auth records.

Auth records handle _identity_. Smart functions handle _permissions_. By default, when you create a new auth record, it has no permissions. In order to give an auth record permissions, you must give your auth record roles, which in turn have rules. Those rules in turn reference smart functions.

See below for all the built-in predicates for users, auths, roles, and rules. See the guides on the [user-auth-role-rule structure](/concepts/identity/auth_records.md) and a [rule example](/concepts/smart-functions/rule_example.md).

## _user {#_user}

| Predicate        | Type     | Description                                                                                                                                                                                                          |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_user/username` | `string` | (optional) A unique username for this user.                                                                                                                                                                          |
| `_user/auth`     | `[ref]`  | (optional) Reference to auth entities available for this user to authenticate. Note if no auth entities exist, the user will be unable to authenticate.                                                              |
| `_user/roles`    | `[ref]`  | (optional) References to the default roles that apply to this user. If roles are specified via the `_auth` subject the user is authenticated as, those roles will always override (replace) any role specified here. |

## _auth {#_auth}

| Predicate          | Type     | Description                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_auth/id`         | `string` | (optional) Globally unique id for this auth record.                                                                                                                                                                                                                                                                                                                   |
| `_auth/doc`        | `string` | (optional) A docstring for this auth record.                                                                                                                                                                                                                                                                                                                          |
| `_auth/key`        | `string` | (optional) A unique lookup key for this auth record.                                                                                                                                                                                                                                                                                                                  |
| `_auth/type`       | `tag`    | (optional) The type of authorization this is. Current type tags supported are: `password`.                                                                                                                                                                                                                                                                            |
| `_auth/secret`     | `string` | (optional) The hashed secret. When using this as a `password` `_auth/type`, it is the one-way encrypted password. This predicate is not used anywhere in the ledger, but you can create an application using logins and passwords with the help of this predicate.                                                                                                    |
| `_auth/hashType`   | `tag`    | (optional) The type of hashing algorithm used on the `_auth/secret`.                                                                                                                                                                                                                                                                                                  |
| `_auth/resetToken` | `string` | (optional) If the user is currently trying to reset a password/secret, an indexed reset token can be stored here allowing quick access to the specific auth record that is being reset. This predicate is not used anywhere in the ledger, but you can create an application using logins and passwords with the help of this predicate.                              |
| `_auth/roles`      | `[ref]`  | (optional) Multi-cardinality reference to roles to use if authenticated via this auth record. If not provided, this `_auth` record will not be able to view or change anything in the ledger.                                                                                                                                                                         |
| `_auth/authority`  | `[ref]`  | (optional) Authorities for this auth record. References another \_auth record. Any auth records referenced in `_auth/authority` can sign a transaction in place of this auth record. To use an authority, you must sign your transaction using the authority's auth record. See more the guide for more on [authority](/concepts/identity/auth_records.md#authority). |
| `_auth/fuel`       | `long`   | Fuel this auth record has. Fuel is used to meter usage in the hosted version of Fluree, but an application can use this predicate to meter fuel usage in the downloadable version as well.                                                                                                                                                                            |

## _role {#_role}

| Predicate     | Type     | Description                                                       |
| ------------- | -------- | ----------------------------------------------------------------- |
| `_role/id`    | `string` | (optional) A unique identifier for this role.                     |
| `_role/doc`   | `string` | (optional) A docstring for this role.                             |
| `_role/rules` | `[ref]`  | (required) References to rule entities that this role aggregates. |

## _rule {#_rule}

| Predicate                 | Type       | Description                                                                                                                                                                                                                                         |
| ------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_rule/id`                | `string`   | (optional) A unique identifier for this rule.                                                                                                                                                                                                       |
| `_rule/doc`               | `string`   | (optional) A docstring for this rule.                                                                                                                                                                                                               |
| `_rule/collection`        | `string`   | (required) The collection name this rule applies to. In addition to a collection name, the special glob character `*` can be used to indicate all collections (wildcard).                                                                           |
| `_rule/collectionDefault` | `boolean`  | Indicates if this rule is a default rule for the specified collection. Use either this or `_rule/predicates` on a rule, but not both. Default rules are only executed if a more specific rule does not apply, and can be thought of as a catch-all. |
| `_rule/predicates`        | `[string]` | (optional) A multi-cardinality list of predicates this rule applies to. The special glob character `*` can be used to indicate all predicates (wildcard).                                                                                           |
| `_rule/fns`               | `[ref]`    | (required) Multi-cardinality reference to `_fn` subject. See the [functions](/overview/schema/smartfunctions.mdx) for all possible functions.                                                                                                       |
| `_rule/ops`               | `[tag]`    | (required) Multi-cardinality tag of action(s) this rule applies to. Current tags supported are `query` for query/read access, `transact` for transact/write access, and `all` for all operations.                                                   |
| `_rule/errorMessage`      | `string`   | (optional) If this rule prevents a transaction from executing, this optional error message can be returned to the client instead of the default error message (which is intentionally generic to limit insights into the ledger configuration).     |
