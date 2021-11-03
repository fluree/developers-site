---
sidebar_position: 1
sidebar_label: Overview
---
# Overview

Downloaded endpoints can only be used in the downloadable versions of Fluree. All requests, except requests to `/health`, should be POST requests. The main downloaded endpoints are below, and they are all structured as follows:

`/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/[ACTION]`

- For the downloadable version, unless you changed the default `fdb-api-port`, the full URL is `http://localhost:8090/fdb/[DBNAME]/[ACTION]`

## Main Endpoints {#main-endpoints}

Action | Endpoint | Explanation
-- | -- | --
DBs | `/fdb/dbs` | Returns a list of all ledgers in the transactor group.
New DB | `/fdb/new-db` | Creates a new ledger
Export | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/export` | Locally exports an existing ledger into either `.xml` or `.ttl`
Delete DB | `/fdb/delete-db` | Deletes ledger (does not currently delete ledger files)
Add Server | `/fdb/add-server` | (Beta feature) Dynamically adds a server to the network.
Remove Server | `/fdb/remove-server`| (Beta feature) Dynamically removes a server from the network.
Query | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/query` | Queries in FlureeQL syntax
Multi-Query | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/multi-query` | Multi-Queries in FlureeQL syntax
Block | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/block` | Block queries in FlureeQL syntax
History |  `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/history`| History queries in FlureeQL syntax
Transact | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/transact` | Transactions in FlureeQL syntax
GraphQL | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/graphql` | Queries or transactions in GraphQL syntax, as a string
SPARQL | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/sparql` | Queries in SPARQL syntax, as a string
SQL | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/sql` | Queries in SQL syntax, as a string
Command | `/fdb/[NETWORK-NAME]/[DBID]/command` | Commands, such as transactions, with a signature in the body. See [signing transactions](/concepts/identity/signatures.md#signed-transactions).
Reindex | `/fdb/[NETWORK-NAME]/[DBID]/reindex` | Reindexes the specified ledger.
Reindex-fullText | `/fdb/[NETWORK-NAME]/[DBID]/reindex-fulltext` | Reindexes the fullText index on the specified ledger.
Hide | `/fdb/[NETWORK-NAME]/[DBID]/hide` | Hides flakes that match the given pattern.

## Test endpoints {#test-endpoints}

Action | Endpoint | Explanation
-- | -- | --
Generate Flakes | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/gen-flakes` | Returns the list of flakes that would be added to a ledger if a given transaction is issued.
Query With | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/query-with` | Returns the results of a query using the existing ledger flakes, including flakes that are provided with the query.
Test Transact With | `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/test-transact-with` | Given a valid set of flakes that could be added to the ledger at a given point in time and a transaction, returns the flakes that would be added to a ledger if a given transaction is issued.

## Password Authentication Endpoints {#password-authentication-endpoints}

You need password authentication enabled to use these endpoints. See [config options](/reference/fluree_config.md#password-and-jwt-token-settings) for all password authentication options. See the [Password Management Guide](/concepts/identity/password_management.md) for more information. For an implementation example refer to the [Comics Store](https://github.com/fluree/developer-hub) repo located in the Fluree Developer Hub.

Action | Endpoint | Explanation
-- | -- | --
[Generate](/reference/http/examples.md#pwgenerate) | `/fdb/[NETWORK-NAME]/[DBID]/pw/generate` | Returns a valid token for a given user or role. Sets a valid password for that user or role.
[Renew](/reference/http/examples.md#pwrenew) | `/fdb/[NETWORK-NAME]/[DBID]/pw/renew` | Given a token in the header and a new expiration time, returns a new token for a given user or role.
[Login](/reference/http/examples.md#pwlogin) | `/fdb/[NETWORK-NAME]/[DBID]/pw/login` | Given a password and user or auth id, returns a valid token.

## Other endpoints {#other-endpoints}

Action | Verb | Endpoint | Description
-- | -- | -- | --
Block Stats | POST | `/fdb/[NETWORK-NAME]/[DBID]/block-range-with-txn` | Block data, including signatures, instant, hash, flakes and transactions
Health | ANY | `/fdb/health` | Returns whether or not the server is ready.
Ledger Stats | POST | `/fdb/[NETWORK-NAME]/[DBID]/ledger-stats` | General ledger stats, including status, # flakes, current block, and size (kb).
Sub | POST | `/fdb/sub` | Handles subscriptions
Network Status | ANY | `/fdb/nw-state` | Returns status of Fluree network, raft state, etc.

For both queries and transactions, a signature is not required if the option `fdb-open-api` is set to true (default for the downloaded version of Fluree).

More information on [signing queries](/concepts/identity/signatures.md#signed-queries) and [signing transactions](/concepts/identity/signatures.md#signed-transactions) can be found in the linked sections.
