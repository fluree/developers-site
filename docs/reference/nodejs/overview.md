---
sidebar_position: 1
---

# Overview

Using the Node.js library, a Node.js service can be configured as a fully-functioning query peer. After establishing an initial connection, a web socket is used to communicate to a ledger server/group.

The available functions are below.

## Main {#main}

| Action         | Function        | Explanation                                                                      |
| -------------- | --------------- | -------------------------------------------------------------------------------- |
| Collection ID  | `collectionId`  | Returns the ID of a collection                                                   |
| Connect        | `connect`       | Connect to a ledger server/group using URL address(es)                           |
| Close          | `close`         | Closes a connection                                                              |
| DB             | `db`            | Returns a queryable database from the connection                                 |
| Delete Ledger  | `deleteLedger`  | Deletes a ledger                                                                 |
| Ledger Info    | `ledgerInfo`    | Returns information about a ledger, including blocks, indexes and current state  |
| Ledger List    | `ledgerList`    | Returns list of ledgers that the connected Fluree instances is currently serving |
| Ledger Stats   | `ledgerStats`   | Returns ledger stats, including db size and number of flakes                     |
| New Ledger     | `newLedger`     | Creates a new ledger                                                             |
| Predicate ID   | `predicateId`   | Returns the ID of a predicate                                                    |
| Predicate Name | `predicateName` | Returns the name of a predicate                                                  |
| Resolve Ledger | `resolveLedger` | Resolves a ledger identity in the current connection                             |
| Search         | `search`        | Executes a search against a given db (ledger instance) and flake parts           |
| Session        | `session`       | Returns session object for a given ledger                                        |
| Subject ID     | `subid`         | Returns the subject identity for a given object                                  |

## Queries {#queries}

| Action            | Function           | Explanation                                            |
| ----------------- | ------------------ | ------------------------------------------------------ |
| Block Query       | `blockQuery`       | Block queries in FlureeQL syntax                       |
| Collection Flakes | `collectionFlakes` | Returns the `spot` index for the requested collection  |
| GraphQL           | `graphql`          | Queries or transactions in GraphQL syntax, as a string |
| History           | `historyQuery`     | History queries in FlureeQL syntax                     |
| Multi-Query       | `multiQuery`       | Multi-Queries in FlureeQL syntax                       |
| Query             | `query`            | Query in FlureeQL syntax                               |
| SPARQL            | `sparql`           | Queries in SPARQL syntax, as a string                  |
| SQL               | `sql`              | Queries in SQL syntax                                  |

## Transactions {#transactions}

| Action                          | Function      | Explanation                                                                                      |
| ------------------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| Monitor Transaction             | `monitorTx`   | Returns the results of the monitor transaction request or a timeout                              |
| Transact                        | `transact`    | Submits a transaction for a ledger                                                               |
| Create Command from transaction | `txToCommand` | Helper function taking a transaction, filling out incomplete parts, to produce a signed command. |

## Auth-related {#auth-related}

| Action                  | Function               | Explanation                                                                               |
| ----------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| Account ID              | `accountId`            | Returns the account ID given either 1) a public key or 2) a message and signature         |
| HTTP Signature          | `httpSignature`        | Takes an HTTP request and creates an HTTP signature using a private key                   |
| Public Key from Private | `publickeyFromPrivate` | Returns a public key given a private key                                                  |
| Public Key from Message | `publicKey`            | Returns a public key from a message and a signature                                       |
| New Private Key         | `newPrivateKey`        | Generates a new private key, returned in a map, along with the public key and account ID. |
| Sign                    | `sign`                 | Returns a signature for a message given a private key.                                    |

## Password Auth {#password-auth}

| Action            | Function           | Explanation                                                                                               |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| Generate Password | `passwordGenerate` | Attempts to generate a new user-auth.                                                                     |
| Password Login    | `passwordLogin`    | Validates user and password combination against a ledger, returning a JSON Web Token (JWT) if successful. |
| Renew Token       | `renewToken`       | Renews a valid JWT                                                                                        |

## Listener {#listener}

| Action                 | Function          | Explanation                                                                                      |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| Convert Block to a Map | `blockEventToMap` | Takes block event data from `listen` and organizes into a map of :added and :retracted elements. |
| Listen                 | `listen`          | Listens to all events of a given ledger                                                          |
| Close Listener         | `closeListener`   | Closes a listener                                                                                |
| Listeners              | `listeners`       | Returns a list of listeners currently registered for each ledger                                 |

## Testing {#testing}

| Action                     | Function              | Explanation                                                             |
| -------------------------- | --------------------- | ----------------------------------------------------------------------- |
| Forward Time Travel        | `forwardTimeTravel`   | Returns a new, queryable db based on a provided db and flake parts      |
| Is Forward Time travel DB? | `isForwardTimeTravel` | Returns true if provided db is a forward-time-travel db                 |
| Query With                 | `queryWith`           | Executes a query against the provided DB, with the given flakes applied |

## Other {#other}

| Action          | Function        | Explanation                                                       |
| --------------- | --------------- | ----------------------------------------------------------------- |
| Set Default Key | `setDefaultKey` | Sets a new private key for an entire tx_group, network or ledger. |
| Set logging     | `setLogging`    | Set the level of logging for Flureenjs                            |

More information on [signing queries](/concepts/identity/signatures.md#signed-queries) and [signing transactions](/concepts/identity/signatures.md#signed-transactions) can be found in the linked sections.
