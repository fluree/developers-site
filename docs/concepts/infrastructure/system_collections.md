---
sidebar_position: 5
---

# System Collections

When a new ledger is created, the first transaction, issued automatically by Fluree,
initializes system collections and predicates.

These system collections govern various ledger behaviors, such as schema, user rules,
smart functions. Each of these system collections and their predicates is discussed
in its respective section. The below list compiles all of the built-in collections
in one place, and you can follow the link to any particular section for more information.

## All System Collections {#all-system-collections}

All ledgers are created with the following collections.

Collection | Description
--- | ---
[_collection](#_collection) | Schema collections list
[_predicate](#_predicate) | Schema predicate definition
[_tag](#_tag) | Tags
[_fn](#_fn) | ledger functions
[_user](#_user) | ledger users
[_auth](#_auth) | Auth records. Every db interaction is performed by an auth record which governs permissions.
[_role](#_role) | Roles group multiple permission rules to an assignable category, like 'employee', 'customer'.
[_rule](#_rule) | Permission rules
[_block](#_block) | Block metadata
[_tx](#_tx) | ledger transactions
[_setting](#_setting) | ledger settings

## _collection {#_collection}
<!-- markdownlint-disable MD013 -->
Predicate | Type | Description
---|---|---
`_collection/name` | `string` | (required) The name of the collection. Collection names are aliases to an underlying collection integer identifier, and therefore it is possible to change collection alias to a different collection ID. Note that if you intend to use GraphQL tools, predicate names must conform to `/[_A-Za-z][_0-9A-Za-z]*/`. If you do not conform to this standard, queries issued to the `/graphql` endpoint will still work, but many GraphQL tools will not.
`_collection/doc` | `string` | (optional) Optional docstring describing this collection.
`_collection/spec` | [`ref`] | (optional) A multi-cardinality list of `ref`s, which reference entities in the `_fn` collection. These specs restricts what is allowed in this collection. To learn more, visit the Collection Spec and Predicate Spec sections in the Guides.
`_collection/specDoc` | `string` | (optional) Optional docstring to describe the specs. Is thrown when any spec fails.
`_collection/version` | `string` | (optional) For your optional use, if a collection's spec or intended predicates change over time this version number can be used to determine which schema version a particular application may be using.

## _predicate {#_predicate}

Predicate | Type | Description
---|---|---
`_predicate/name` | `string` | (required) Actual predicate name. Must be namespaced, and convention is to namespace it using the collection name you intend it to be used within. Technically any predicate can be placed on any subject, but using a `spec` can restrict this behavior. Note that if you intend to use GraphQL tools, predicate names must conform to `/[_A-Za-z][_0-9A-Za-z]*/`. If you do not conform to this standard, queries issued to the `/graphql` endpoint will still work, but many GraphQL tools will not.
`_predicate/doc` | `string` | (optional) Doc string for this predicate describing its intention. This description is also used for GraphQL automated schema generation.
`_predicate/type` | `tag` | (required) Data type of this predicate such as `string`, `integer`, or a reference (join) to another subject - `ref`. See table below for valid data types.
`_predicate/unique` | `boolean` | (optional) True if this predicate acts as a primary key.  Unique predicates can be used for idsubject (as the `_id` value in a transaction or query).  (Default false.)
`_predicate/multi` | `boolean` | (optional) If this is a multi-cardinality predicate (holds multiple values), set to `true`. (Default false.)
`_predicate/index` | `boolean` | (optional) True if an index should be created on this predicate. An predicate marked as `unique` automatically will generate an index and will ignore the value specified here. (Default false.)
`_predicate/upsert` | `boolean` | (optional) Only applicable to predicates marked as `unique`. If a new subject transaction using this predicate resolves to an existing subject, update that subject. By default the transaction will throw an exception if a conflict with a `unique` predicate exists.
`_predicate/noHistory` | `boolean` | (optional) By default, all history is kept. If you wish to turn this off for a certain subject, set this flag to true. Queries, regardless of time travel, will always show the current value.
`_predicate/component` | `boolean` | (optional) For type 'ref' predicates only. Mark true if this predicate refers to an subject which only exists as part of the parent subject. If true, and the parent subject is deleted, the subject referenced by this predicate will also be deleted automatically. (Default false.)
`_predicate/spec` | [`ref`] | (optional) A multi-cardinality list of `ref`s, which reference entities in the `_fn` collection. These specs restricts what is allowed in this _predicate. To learn more, visit the Collection and Predicate Specs section in the Fluree Guide.
`_predicate/specDoc` | `string` | (optional) Optional docstring to describe the specs. Is thrown when any spec fails.
`_predicate/deprecated` | `boolean` | (Not in production yet, optional) True if this v is deprecated.  Reads and writes are still allowed, but might give warnings in the API.
`_predicate/txSpec` | [`ref`] | (optional)  A multi-cardinality list of `ref`s, which reference entities in the `_fn` collection. This predicate allows you to set specifications for all of the flakes pertaining to a certain predicate. To learn more, visit the Predicate Tx Specs section in the Fluree Guides.
`_predicate/txSpecDoc` | `string` | (optional) Optional docstring to describe the txSpecs. Is thrown when any txSpec fails.
`_predicate/restrictCollection` | `string` | (optional) Only applicable to predicates of `ref` (reference) types. It will restrict references to only be allowed from the specified collection.
`_predicate/restrictTag` | `boolean` | (optional) Only applicable to predicates of type `tag`. If true, a tag, which corresponds to this predicate object must exist before adding predicate-object pair.
`_predicate/encrypted` | `boolean` | (Not in production yet, optional) Expects the value to come in as an encrypted string. Type checking will be disabled, and ledger functions won't be permitted on this value.
`_predicate/fullText` | `boolean` | (optional) If true, full text search enabled on this ledger. By default, the language for a Fluree ledger is set to English. You can change the default language in [_setting collection](/overview/schema/settings.md).

## _predicate Types {#_predicate-types}

Supported predicate types are as follows:

Type | Description
---|---
`string` | Unicode string (`_type/string`)
`ref` | Reference (join) to another collection (`_type/ref`)
`tag` | A special tag predicate. Tags are auto-generated, and create auto-resolving referred entities. Ideal for use as enum values. Also they allow you to find all entities that use a specific tag.  (`_type/tag`)
`int` | 32 bit signed integer (`_type/int`)
`long` | 64 bit signed integer (`_type/long`)
`bigint` | Arbitrary sized integer (more than 64 bits) (`_type/bigint`)
`float` | 32 bit IEEE double precision floating point (`_type/float`)
`double` | 64 bit IEEE double precision floating point (`_type/double`)
`bigdec` | IEEE double precision floating point of arbitrary size (more than 64 bits) (`_type/bigdec`)
`instant` | Millisecond precision timestamp from unix epoch. Uses 64 bits. (`_type/instant`)
`boolean` | true/false (`_type/boolean`)
`uri` | URI formatted string (`_type/uri`)
`uuid` | A UUID value. (`_type/uuid`)
`bytes` | Must input bytes as a lowercase, hex-encoded string (`_type/bytes`)
`json` | Arbitrary JSON data. The JSON is automatically encoded/decoded (UTF-8) with queries and transactions, and JSON structure can be validated with a `spec`. (`_type/json`)
`geojson` | Geospatial JSON data. GeoJSON is an open standard format designed to represent simple geographical features. (`_type/geojson`)

## _tag {#_tag}

Predicate | Type | Description
-- | -- | --
`id` | `string` | Namespaced tag id
`doc` | `string` | Optional docstring for tag

## _fn {#_fn}

Predicate | Type | Description
-- | -- | --
`name` | `string` | Function name
`params` | `(multi) string` | List of parameters this function supports.
`code` | `string` | Actual ledger code
`doc` | `string` | A docstring for this function.
`language` | `string` |  Programming language used (not yet implemented, currently only Clojure supported)
`spec` | `JSON` | (not yet implemented) Optional spec for parameters. Spec should be structured as a map, parameter names are keys and the respective spec is the value.

## _user {#_user}

Predicate | Type | Description
-- | -- | --
`_user/username` | `string` |  (optional) A unique username for this user.
`_user/auth` | `[ref]` | (optional) Reference to auth entities available for this user to authenticate. Note if no auth entities exist, the user will be unable to authenticate.
`_user/roles` | `[ref]` | (optional) References to the default roles that apply to this user. If roles are specified via the `_auth` subject the user is authenticated as, those roles will always override (replace) any role specified here.

## _auth {#_auth}

Predicate | Type | Description
-- | -- | --
`_auth/id` | `string` |  (optional) Globally unique id for this auth record.
`_auth/doc` | `string` | (optional) A docstring for this auth record.
`_auth/key` | `string` |  (optional) A unique lookup key for this auth record.
`_auth/type` | `tag` | (optional) The type of authorization this is. Current type tags supported are: `password`.
`_auth/secret` | `string` | (optional) The hashed secret. When using this as a `password` `_auth/type`, it is the one-way encrypted password. This predicate is not used anywhere in the ledger, but you can create an application using logins and passwords with the help of this predicate.
`_auth/hashType` | `tag` | (optional) The type of hashing algorithm used on the `_auth/secret`.
`_auth/resetToken` | `string` | (optional) If the user is currently trying to reset a password/secret, an indexed reset token can be stored here allowing quick access to the specific auth record that is being reset. This predicate is not used anywhere in the ledger, but you can create an application using logins and passwords with the help of this predicate.
`_auth/roles` | `[ref]` | (optional) Multi-cardinality reference to roles to use if authenticated via this auth record. If not provided, this `_auth` record will not be able to view or change anything in the ledger.
`_auth/authority` | `[ref]` | (optional) Authorities for this auth record. References another _auth record. Any auth records referenced in `_auth/authority` can sign a transaction in place of this auth record. To use an authority, you must sign your transaction using the authority's auth record. See more about signing transactions and authorities in the Signed Transactions section of the Guides.
`_auth/fuel` | `long` | Fuel this auth record has. [Fuel](/overview/transact/basics.md#fuel) is used to meter usage in the hosted version of Fluree, but an application can use this predicate to meter fuel usage in the downloadable version as well.

## _role {#_role}

Predicate | Type | Description
-- | -- | --
`_role/id` | `string` |  (optional) A unique identifier for this role.
`_role/doc` | `string` | (optional) A docstring for this role.
`_role/rules` | `[ref]` | (required) References to rule entities that this role aggregates.

## _rule {#_rule}

Predicate | Type | Description
-- | -- | --
`_rule/id` | `string` |  (optional) A unique identifier for this rule.
`_rule/doc` | `string` | (optional) A docstring for this rule.
`_rule/collection` | `string` | (required) The collection name this rule applies to. In addition to a collection name, the special glob character `*` can be used to indicate all collections (wildcard).
`_rule/collectionDefault` | `boolean` | Indicates if this rule is a default rule for the specified collection. Use either this or `_rule/predicates` on a rule, but not both. Default rules are only executed if a more specific rule does not apply, and can be thought of as a catch-all.
`_rule/predicates` | `[string]`| (optional) A multi-cardinality list of predicates this rule applies to. The special glob character `*` can be used to indicate all predicates (wildcard).
`_rule/fns` | `[ref]` | (required) Multi-cardinality reference to `_fn` subject. The actual function is stored in the `_fn/code` predicate. `_fn/code` can be `true`, `false`, or a ledger function expression. Built-in functions and variables are listed in [ledger Functions](#ledger-functions). `true` indicates the user always has access to this collection + predicate combination. `false` indicates the user is always denied access. Functions will return a truthy or false value that has the same meanings.
`_rule/ops` | `[tag]` | (required) Multi-cardinality tag of action(s) this rule applies to. Current tags supported are `query` for query/read access, `transact` for transact/write access, and `all` for all operations.
`_rule/errorMessage` | `string` | (optional) If this rule prevents a transaction from executing, this optional error message can be returned to the client instead of the default error message (which is intentionally generic to limit insights into the ledger configuration).

## _block {#_block}

Key | Description
---|---
`number` | Block number for this block.
`hash` | Hash for current block. Not included in block hash (can't include itself!).
`prevHash` | Previous block's hash
`transactions` | Reference to transactions included in this block (`_tx`).
`transactors` | Reference to transactor auth identities that signed this block. Not included in block hash.
`instant` | Instant this block was created, per the transactor.
`sigs` | List of transactor signatures that signed this block (signature of _block/hash). Not included in block hash.

## _tx {#_tx}

Key | Description
---|---
`tempids` | Tempid JSON map for this transaction.
`sig` | Signature of original JSON transaction command.
`tx` | Original JSON transaction command.
`doc` | Optional docstring for the transaction.
`altId` | Alternative Unique ID for the transaction that the user can supply. Transaction will throw if not unique.
`nonce` | A nonce that helps ensure identical transactions have unique txids, and also can be used for logic within smart functions (not yet implemented). Note this nonce does not enforce uniqueness, use _tx/altId if uniqueness must be enforced.
`authority` | If this transaction utilized an authority, reference to it.
`auth` | Reference to the auth id for this transaction.

## _setting {#_setting}

Key | Description
---|---
`txMax` | Maximum transaction size in bytes. Will default to the network db's value if not present.
`anonymous` | Reference to auth identity to use for anonymous requests to this db.
`consensus` | Consensus type for this db. Currently only 'Raft' supported.
`ledgers` | Reference to auth identities that are allowed to act as ledgers for this ledger.
`doc` | Optional docstring for the db.
