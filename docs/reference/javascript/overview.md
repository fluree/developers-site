---
sidebar_position: 1
---

# Overview

The javascript library, as an extension of our linear-scaling query peer service, makes data readily accessible. We get trusted data to the access point quickly. It runs in the browser, using a web socket to connect to a ledger server/group. The main commands are below.

| Action              | Command                                                                                        | Explanation                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Connect             | <ul><li>`connect`</li><li>`connect_p`</li></ul> | Connect to a ledger server/group using URL address(es)              |
| Close               | `close`                                                                                        | Closes a connection                                                 |
| DB                  | `db`                                                                                           | Returns a queryable ledger                                          |
| DB Schema           | `db_schema`                                                                                    | Returns the schema map for a ledger                                 |
| New Ledger          | `new_ledger`                                                                                   | Creates a new ledger                                                |
| Delete Ledger       | `delete_ledger`                                                                                | Deletes a ledger                                                    |
| Query               | `q`                                                                                            | Query in FlureeQL syntax                                            |
| Multi-Query         | `multi_query`                                                                                  | Multi-Queries in FlureeQL syntax                                    |
| Block               | `block_query`                                                                                  | Block queries in FlureeQL syntax                                    |
| Block Range         | `block_range`                                                                                  | Block range queries in FlureeQL syntax                              |
| History             | `history_query`                                                                                | History queries in FlureeQL syntax                                  |
| Transact            | `transact`                                                                                     | Submits a transaction for a ledger.                                 |
| Monitor Transaction | `monitor_tx`                                                                                   | Returns the results of the monitor transaction request or a timeout |
| Listen              | `listen`                                                                                       | Listens to all events of a given ledger                             |
| Close Listener      | `close_listener`                                                                               | Closes a listener                                                   |
| Listeners           | `listeners`                                                                                    | Returns a list of listeners currently registered for each ledger    |
