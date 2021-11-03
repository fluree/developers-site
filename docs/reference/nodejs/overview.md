---
sidebar_position: 1
---
# Overview

Using the Node.js library, a Node.js service can be configured as a fully-functioning query peer.  After establishing an initial connection, a web socket is used to communicate to a ledger server/group.  

The available functions are below.

## Main {#main}

Action | Function | Explanation
-- | -- | --
Collection ID | `collection_id` | Returns the ID of a collection
Connect | <ul><li>`connect`</li><li>`connect_p`</li></ul> | Connect to a ledger server/group using URL address(es)
Close | `close` | Closes a connection
DB | <ul><li>`db`</li><li>`db_p`</li></ul> | Returns a queryable database from the connection
Delete Ledger | `delete_ledger` | Deletes a ledger
Ledger Info | `ledger_info` | Returns information about a ledger, including blocks, indexes and current state
Ledger List | `ledger_list` | Returns list of ledgers that the connected Fluree instances is currently serving
Ledger Stats | `ledger_stats` | Returns ledger stats, including db size and number of flakes
New Ledger | `new_ledger` | Creates a new ledger
Predicate ID | `predicate_id` | Returns the ID of a predicate
Predicate Name | `predicate_name` | Returns the name of a predicate
Resolve Ledger | `resolve_ledger` | Resolves a ledger identity in the current connection
Search | `search` | Executes a search against a given db (ledger instance) and flake parts
Session | `session` | Returns session object for a given ledger
Subject ID | `subid` | Returns the subject identity for a given object

## Queries {#queries}

Action | Function | Explanation
-- | -- | --
Block Query | `block_query` | Block queries in FlureeQL syntax
Collection Flakes | `collection_flakes` | Returns the `spot` index for the requested collection
GraphQL | `graphql` | Queries or transactions in GraphQL syntax, as a string
History |  `history_query`| History queries in FlureeQL syntax
Multi-Query | `multi_query` | Multi-Queries in FlureeQL syntax
Query | `query` | Query in FlureeQL syntax
SPARQL | `sparql` | Queries in SPARQL syntax, as a string
SQL | `sql` | Queries in SQL syntax

## Transactions {#transactions}

Action | Function | Explanation
-- | -- | --
Monitor Transaction | `monitor_tx` | Returns the results of the monitor transaction request or a timeout
Transact | `transact` | Submits a transaction for a ledger
Create Command from transaction | `tx__GT_command` | Helper function taking a transaction, filling out incomplete parts, to produce a signed command.

## Auth-related {#auth-related}

Action | Function | Explanation
-- | -- | --
Account ID | `account_id` | Returns the account ID given either 1) a public key or 2) a message and signature
HTTP Signature | `http_signature` | Takes an HTTP request and creates an HTTP signature using a private key
Public Key from Private | `public_key_from_private` | Returns a public key given a private key
Public Key from Message | `public_key` | Returns a public key from a message and a signature
New Private Key | `new_private_key` | Generates a new private key, returned in a map, along with the public key and account ID.
Sign | `sign` | Returns a signature for a message given a private key.

## Password Auth {#password-auth}

Action | Function | Explanation
-- | -- | --
Generate Password | `password_generate` | Attempts to generate a new user-auth.
Password Login | `password_login` | Validates user and password combination against a ledger, returning a JSON Web Token (JWT) if successful.
Renew Token | `renew_token` | Renews a valid JWT

## Listener {#listener}

Action | Function | Explanation
-- | -- | --
Convert Block to a Map | `block_event__GT_map` | Takes block event data from `listen` and organizes into a map of :added and :retracted elements.
Listen | `listen` | Listens to all events of a given ledger
Close Listener | `close_listener` | Closes a listener
Listeners | `listeners` | Returns a list of listeners currently registered for each ledger

## Testing {#testing}

Action | Function | Explanation
-- | -- | --
Forward Time Travel | `forward_time_travel` | Returns a new, queryable db based on a provided db and flake parts
Is Forward Time travel DB? | `is_forward_time_travel` | Returns true if provided db is a forward-time-travel db
Query With | `query-with` | Executes a query against the provided DB, with the given flakes applied

## Other {#other}

Action | Function | Explanation
-- | -- | --
Set Default Key | `set_default_key` | Sets a new private key for an entire tx_group, network or ledger.  
Set logging | `set_logging` | Set the level of logging for Flureenjs

More information on [signing queries](/concepts/identity/signatures.md#signed-queries) and [signing transactions](/concepts/identity/signatures.md#signed-transactions) can be found in the linked sections.
