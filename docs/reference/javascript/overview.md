---
sidebar_position: 1
---

# Overview

The javascript library, as an extension of our linear-scaling query peer service, makes data readily accessible. We get trusted data to the access point quickly. It runs in the browser, using a web socket to connect to a ledger server/group. The main commands are below.

| Action              | Command                                                                                                                                         | Explanation                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Connect             | <ul><li>[`connect`](/docs/reference/javascript/examples/#connect)</li><li>[`connect_p`](/docs/reference/javascript/examples/#connect)</li></ul> | Connect to a ledger server/group using URL address(es)              |
| Close               | [`close`](/docs/reference/javascript/examples/#close)                                                                                           | Closes a connection                                                 |
| DB                  | [`db`](/docs/reference/javascript/examples/#db)                                                                                                 | Returns a queryable ledger                                          |
| DB Schema           | [`db_schema`](/docs/reference/javascript/examples/#db_schema)                                                                                   | Returns the schema map for a ledger                                 |
| New Ledger          | [`new_ledger`](/docs/reference/javascript/examples/#new_ledger)                                                                                 | Creates a new ledger                                                |
| Delete Ledger       | [`delete_ledger`](/docs/reference/javascript/examples/#delete_ledger)                                                                           | Deletes a ledger                                                    |
| Query               | [`query`](/docs/reference/javascript/examples/#query)                                                                                           | Query in FlureeQL syntax                                            |
| Multi-Query         | [`multi_query`](/docs/reference/javascript/examples/#multi_query)                                                                               | Multi-Queries in FlureeQL syntax                                    |
| Block               | [`block_query`](/docs/reference/javascript/examples/#block_query)                                                                               | Block queries in FlureeQL syntax                                    |
| Block Range         | [`block_range`](/docs/reference/javascript/examples/#block_range)                                                                               | Block range queries in FlureeQL syntax                              |
| History             | [`history_query`](/docs/reference/javascript/examples/#history_query)                                                                           | History queries in FlureeQL syntax                                  |
| Transact            | [`transact`](/docs/reference/javascript/examples/#transact)                                                                                     | Submits a transaction for a ledger.                                 |
| Monitor Transaction | [`monitor_tx`](/docs/reference/javascript/examples/#monitor_tx)                                                                                 | Returns the results of the monitor transaction request or a timeout |
| Listen              | [`listen`](/docs/reference/javascript/examples/#listen)                                                                                         | Listens to all events of a given ledger                             |
| Close Listener      | [`close_listener`](/docs/reference/javascript/examples/#close_listener)                                                                         | Closes a listener                                                   |
| Listeners           | [`listeners`](/docs/reference/javascript/examples/#listeners)                                                                                   | Returns a list of listeners currently registered for each ledger    |
