---
sidebar_position: 1
---

# Overview

Using the Node.js library, a Node.js service can be configured as a fully-functioning query peer. After establishing an initial connection, a web socket is used to communicate to a ledger server/group.

The available functions are below.

## Main {#main}

| Action         | Function                                                         | Explanation                                                                      |
| -------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Collection ID  | [`collectionId`](/docs/reference/nodejs/examples#collectionId)   | Returns the ID of a collection                                                   |
| Connect        | [`connect`](/docs/reference/nodejs/examples#connect)             | Connect to a ledger server/group using URL address(es)                           |
| Close          | [`close`](/docs/reference/nodejs/examples#close)                 | Closes a connection                                                              |
| DB             | [`db`](/docs/reference/nodejs/examples#db)                       | Returns a queryable database from the connection                                 |
| Delete Ledger  | [`deleteLedger`](/docs/reference/nodejs/examples#deleteLedger)   | Deletes a ledger                                                                 |
| Ledger Info    | [`ledgerInfo`](/docs/reference/nodejs/examples#ledgerInfo)       | Returns information about a ledger, including blocks, indexes and current state  |
| Ledger List    | [`ledgerList`](/docs/reference/nodejs/examples#ledgerList)       | Returns list of ledgers that the connected Fluree instances is currently serving |
| Ledger Stats   | [`ledgerStats`](/docs/reference/nodejs/examples#ledgerStats)     | Returns ledger stats, including db size and number of flakes                     |
| New Ledger     | [`newLedger`](/docs/reference/nodejs/examples#newLedger)         | Creates a new ledger                                                             |
| Predicate ID   | [`predicateId`](/docs/reference/nodejs/examples#predicateId)     | Returns the ID of a predicate                                                    |
| Predicate Name | [`predicateName`](/docs/reference/nodejs/examples#predicateName) | Returns the name of a predicate                                                  |
| Resolve Ledger | [`resolveLedger`](/docs/reference/nodejs/examples#resolveLedger) | Resolves a ledger identity in the current connection                             |
| Search         | [`search`](/docs/reference/nodejs/examples#search)               | Executes a search against a given db (ledger instance) and flake parts           |
| Session        | [`session`](/docs/reference/nodejs/examples#session)             | Returns session object for a given ledger                                        |
| Subject ID     | [`subid`](/docs/reference/nodejs/examples#subid)                 | Returns the subject identity for a given object                                  |

## Queries {#queries}

| Action            | Function                                                               | Explanation                                            |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Block Query       | [`blockQuery`](/docs/reference/nodejs/examples#blockQuery)             | Block queries in FlureeQL syntax                       |
| Collection Flakes | [`collectionFlakes`](/docs/reference/nodejs/examples#collectionFlakes) | Returns the `spot` index for the requested collection  |
| GraphQL           | [`graphql`](/docs/reference/nodejs/examples#graphql)                   | Queries or transactions in GraphQL syntax, as a string |
| History           | [`historyQuery`](/docs/reference/nodejs/examples#historyQuery)         | History queries in FlureeQL syntax                     |
| Multi-Query       | [`multiQuery`](/docs/reference/nodejs/examples#multiQuery)             | Multi-Queries in FlureeQL syntax                       |
| Query             | [`query`](/docs/reference/nodejs/examples#query)                       | Query in FlureeQL syntax                               |
| SPARQL            | [`sparql`](/docs/reference/nodejs/examples#sparql)                     | Queries in SPARQL syntax, as a string                  |
| SQL               | [`sql`](/docs/reference/nodejs/examples#sql)                           | Queries in SQL syntax                                  |

## Transactions {#transactions}

| Action                          | Function                                                     | Explanation                                                                                      |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Monitor Transaction             | [`monitorTx`](/docs/reference/nodejs/examples#monitorTx)     | Returns the results of the monitor transaction request or a timeout                              |
| Transact                        | [`transact`](/docs/reference/nodejs/examples#transact)       | Submits a transaction for a ledger                                                               |
| Create Command from transaction | [`txToCommand`](/docs/reference/nodejs/examples#txToCommand) | Helper function taking a transaction, filling out incomplete parts, to produce a signed command. |

## Auth-related {#auth-related}

| Action                  | Function                                                                       | Explanation                                                                               |
| ----------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Account ID              | [`accountId`](/docs/reference/nodejs/examples#accountId)                       | Returns the account ID given either 1) a public key or 2) a message and signature         |
| HTTP Signature          | [`httpSignature`](/docs/reference/nodejs/examples#httpSignature)               | Takes an HTTP request and creates an HTTP signature using a private key                   |
| Public Key from Private | [`publickeyFromPrivate`](/docs/reference/nodejs/examples#publicKeyFromPrivate) | Returns a public key given a private key                                                  |
| Public Key from Message | [`publicKey`](/docs/reference/nodejs/examples#publicKey)                       | Returns a public key from a message and a signature                                       |
| New Private Key         | [`newPrivateKey`](/docs/reference/nodejs/examples#newPrivateKey)               | Generates a new private key, returned in a map, along with the public key and account ID. |
| Sign                    | [`sign`](/docs/reference/nodejs/examples#sign)                                 | Returns a signature for a message given a private key.                                    |

## Password Auth {#password-auth}

| Action            | Function                                                               | Explanation                                                                                               |
| ----------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Generate Password | [`passwordGenerate`](/docs/reference/nodejs/examples#passwordGenerate) | Attempts to generate a new user-auth.                                                                     |
| Password Login    | [`passwordLogin`](/docs/reference/nodejs/examples#passwordLogin)       | Validates user and password combination against a ledger, returning a JSON Web Token (JWT) if successful. |
| Renew Token       | [`renewToken`](/docs/reference/nodejs/examples#renewToken)             | Renews a valid JWT                                                                                        |

## Listener {#listener}

| Action                 | Function                                                             | Explanation                                                                                      |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Convert Block to a Map | [`blockEventToMap`](/docs/reference/nodejs/examples#blockEventToMap) | Takes block event data from `listen` and organizes into a map of :added and :retracted elements. |
| Listen                 | [`listen`](/docs/reference/nodejs/examples#listen)                   | Listens to all events of a given ledger                                                          |
| Close Listener         | [`closeListener`](/docs/reference/nodejs/examples#closeListener)     | Closes a listener                                                                                |
| Listeners              | [`listeners`](/docs/reference/nodejs/examples#listeners)             | Returns a list of listeners currently registered for each ledger                                 |

## Testing {#testing}

| Action                     | Function                                                                     | Explanation                                                             |
| -------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Forward Time Travel        | [`forwardTimeTravel`](/docs/reference/nodejs/examples#forwardTimeTravel)     | Returns a new, queryable db based on a provided db and flake parts      |
| Is Forward Time travel DB? | [`isForwardTimeTravel`](/docs/reference/nodejs/examples#isForwardTimeTravel) | Returns true if provided db is a forward-time-travel db                 |
| Query With                 | [`queryWith`](/docs/reference/nodejs/examples#queryWith)                     | Executes a query against the provided DB, with the given flakes applied |

## Other {#other}

| Action          | Function                                                         | Explanation                                                       |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| Set Default Key | [`setDefaultKey`](/docs/reference/nodejs/examples#setDefaultKey) | Sets a new private key for an entire tx_group, network or ledger. |
| Set logging     | [`setLogging`](/docs/reference/nodejs/examples#setLogging)       | Set the level of logging for Flureenjs                            |

More information on [signing queries](/concepts/identity/signatures.md#signed-queries) and [signing transactions](/concepts/identity/signatures.md#signed-transactions) can be found in the linked sections.
