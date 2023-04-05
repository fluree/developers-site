---
sidebar_position: 1
sidebar_label: Overview
---

# Overview

Downloaded endpoints can only be used in the downloadable versions of Fluree. All requests, except requests to `/health`, should be POST requests. The main downloaded endpoints are below, and they are all structured as follows:

`/fdb/[NETWORK-NAME]/[LEDGER-NAME]/[ACTION]`

- For the downloadable version, unless you changed the default `fdb-api-port`, the full URL is `http://localhost:8090/fdb/[NETWORK-NAME]/[LEDGER-NAME]/[ACTION]`

## Main Endpoints {#main-endpoints}

| Action           | Endpoint                                             | Explanation                                                                                                                                     |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Ledgers          | `/fdb/ledgers`                                       | Returns a list of all ledgers in the transactor group.                                                                                          |
| New Ledger       | `/fdb/new-ledger`                                    | Creates a new ledger                                                                                                                            |
| Delete Ledger    | `/fdb/delete-ledger`                                 | Deletes ledger (does not currently delete ledger files)                                                                                         |
| Query            | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/query`            | Queries in FlureeQL syntax                                                                                                                      |
| Multi-Query      | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/multi-query`      | Multi-Queries in FlureeQL syntax                                                                                                                |
| Block            | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/block`            | Block queries in FlureeQL syntax                                                                                                                |
| History          | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/history`          | History queries in FlureeQL syntax                                                                                                              |
| Transact         | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/transact`         | Transactions in FlureeQL syntax                                                                                                                 |
| GraphQL          | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/graphql`          | Queries or transactions in GraphQL syntax, as a string                                                                                          |
| SPARQL           | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/sparql`           | Queries in SPARQL syntax, as a string                                                                                                           |
| SQL              | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/sql`              | Queries in SQL syntax, as a string                                                                                                              |
| Command          | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/command`          | Commands, such as transactions, with a signature in the body. See [signing transactions](/concepts/identity/signatures.md#signed-transactions). |
| Reindex          | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/reindex`          | Reindexes the specified ledger.                                                                                                                 |
| Reindex-fullText | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/reindex-fulltext` | Reindexes the fullText index on the specified ledger.                                                                                           |
| Hide             | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/hide`             | Hides flakes that match the given pattern.                                                                                                      |

## Test endpoints {#test-endpoints}

| Action             | Endpoint                                               | Explanation                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generate Flakes    | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/gen-flakes`         | Returns the list of flakes that would be added to a ledger if a given transaction is issued.                                                                                                   |
| Query With         | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/query-with`         | Returns the results of a query using the existing ledger flakes, including flakes that are provided with the query.                                                                            |
| Test Transact With | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/test-transact-with` | Given a valid set of flakes that could be added to the ledger at a given point in time and a transaction, returns the flakes that would be added to a ledger if a given transaction is issued. |

## Password Authentication Endpoints {#password-authentication-endpoints}

You need password authentication enabled to use these endpoints. See [config options](/reference/fluree_config.md#password-and-jwt-token-settings) for all password authentication options. See the [Password Management Guide](/concepts/identity/password_management.md) for more information. For an implementation example refer to the [Comics Store](https://github.com/fluree/developer-hub) repo located in the Fluree Developer Hub.

| Action                                             | Endpoint                                        | Explanation                                                                                          |
| -------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Generate](/reference/http/examples.md#pwgenerate) | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/pw/generate` | Returns a valid token for a given user or role. Sets a valid password for that user or role.         |
| [Renew](/reference/http/examples.md#pwrenew)       | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/pw/renew`    | Given a token in the header and a new expiration time, returns a new token for a given user or role. |
| [Login](/reference/http/examples.md#pwlogin)       | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/pw/login`    | Given a password and user or auth id, returns a valid token.                                         |

## Other endpoints {#other-endpoints}

| Action         | Method | Endpoint                                                 | Description                                                                     |
| -------------- | ------ | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Block Stats    | POST   | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/block-range-with-txn` | Block data, including signatures, instant, hash, flakes and transactions        |
| Health         | ANY    | `/fdb/health`                                            | Returns whether or not the server is ready.                                     |
| Ledger Stats   | POST   | `/fdb/[NETWORK-NAME]/[LEDGER-NAME]/ledger-stats`         | General ledger stats, including status, # flakes, current block, and size (kb). |
| WebSocket      | GET    | `/fdb/ws`                                                | Handles websocket subscriptions                                                 |
| Network Status | ANY    | `/fdb/nw-state`                                          | Returns status of Fluree network, raft state, etc.                              |

For both queries and transactions, a signature is not required if the option `fdb-api-open` is set to true (default for the downloaded version of Fluree).

More information on [signing queries](/concepts/identity/signatures.md#signed-queries) and [signing transactions](/concepts/identity/signatures.md#signed-transactions) can be found in the linked sections.
