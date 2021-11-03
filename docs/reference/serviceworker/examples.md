---
sidebar_position: 2
---

# FlureeWorker

You can dowbload the latest version of the FlureeWorker library from npm:

```bash
npm install @fluree/flureeworker
```

## Messages to FlureeWorker {#messages-to-flureeworker}

The following messages are used in communications to the FlureeWorker:

- connect
- close
- login
- registerQuery
- reset
- unregisterQuery

## **connect** {#connect}

Message sent to FlureeWorker to initiate a connection with a Fluree instance.

### Message {#message}

| Name     | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| `action` | `connect`                                                        |
| `conn`   | 0, indicates request is not connection-specific                  |
| `params` | configuration parameters for the request                         |
| `ref`    | ref within application, returned with reply message `connStatus` |

### Parameters {#parameters}

| Name        | Value                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `servers`   | list of server URIs, separated by commas                                                                                |
| `ledger`    | complete name of ledger (e.g. mynetwork\myledger)                                                                       |
| `workerUrl` | path to FlureeWorker (e.g. /flureeworker.js looks for FlureeWorker in public directory)                                 |
| `compact`   | true (default) or false; Option to remove namespaces from predicates when the namespace is the same as the collection   |
| `log`       | true or false (default); Set to true to see logging. Debug logging must be enabled with 'Verbose' in DevTools.          |
| `keepAlive` | true or false (default); Option to attempt re-connection to the Fluree instance when web socket is no longer ping-able. |

## **close** {#close}

Message sent to FlureeWorker to close a connection to a Fluree instance.

<!-- markdownlint-disable MD024 -->
### Message {#message-1}

| Name     | Value                                                            |
| -------- | ---------------------------------------------------------------- |
| `action` | `close`                                                          |
| `conn`   | connection id of connection to be closed                         |
| `ref`    | ref within application, returned with reply message `connClosed` |

## **login** {#login}

Message sent to FlureeWorker to initiate a login for a Fluree ledger.

### Message {#message-2}

| Name     | Value                                                       |
| -------- | ----------------------------------------------------------- |
| `action` | `login`                                                     |
| `conn`   | connection id                                               |
| `ref`    | ref within application, returned with reply message `login` |
| `params` | login information                                           |

### Parameters {#parameters-1}

| Name       | Value                                              |
| ---------- | -------------------------------------------------- |
| `ledger`   | complete name of ledger (e.g. mynetwork\myledger)  |
| `username` | A user identity corresponding to "\_user/username" |
| `password` | password (string)                                  |

## **registerQuery** {#registerquery}

Message sent to FlureeWorker to register a query for a Fluree ledger. When updates are received for the ledger, a `setState` message is returned by FlureeWorker,

### Message {#message-3}

| Name     | Value                                                                                                                                                                                                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `action` | `registerQuery`                                                                                                                                                                                                                                                                   |
| `conn`   | connection id associated with ledger                                                                                                                                                                                                                                              |
| `ref`    | reference within application                                                                                                                                                                                                                                                      |
| `params` | <ul><li>a JavaScript array, containing by position:</li><li>- ref (reference within application, returned with message `setState`)</li><li>- query (string; FlureeQL syntax)</li><li>- opts (TBD)</li><li>- forceUpdate (TBD)</li></ul> |

## **reset** {#reset}

Message sent to FlureeWorker to reset a connection to a Fluree instance.

### Message {#message-4}

| Name     | Value                                                           |
| -------- | --------------------------------------------------------------- |
| `action` | `reset`                                                         |
| `conn`   | connection id of connection to be reset                         |
| `ref`    | ref within application, returned with reply message `connReset` |

## **unregisterQuery** {#unregisterquery}

Message sent to FlureeWorker to deregister a FlureeQL from automated updates (i.e., `setState`).

### Message {#message-5}

| Name     | Value                        |
| -------- | ---------------------------- |
| `action` | `unregisterQuery`            |
| `conn`   | connection id of connection  |
| `ref`    | reference within application |

&nbsp;

---

## Messages from FlureeWorker {#messages-from-flureeworker}

The following messages are initiated by the FlureeWorker:

- connInit
- connClosed
- connStatus
- login
- setState

## **connInit** {#conninit}

Message received when FlureeWorker is initialized and ready for connections.

### Message {#message-6}

| Name    | Value      |
| ------- | ---------- |
| `event` | `connInit` |
| `conn`  | 0          |

## **connClosed** {#connclosed}

Message received from FlureeWorker after processing a `close` request.

### Message {#message-7}

| Name                                                                                                                      | Value                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `event`                                                                                                                   | `connClosed`                                                                                                                                                                                                                   |
| `conn`                                                                                                                    | connection id from original message                                                                                                                                                                                            |
| `ref`                                                                                                                     | reference from original message                                                                                                                                                                                                |
| `data` <ul><li>\* `status`</li><li>\* `error`</li><li>\* `message`</li></ul> | result of `close` connection request <ul><li>http-status of the result (e.g., 200)</li><li>optional field, indictes error category when returned</li><li>text message</li></ul> |

Examples of `close` results

```http
{status:  200
 message: "Connection closed."}

{status:  400
 error:   :db/invalid-connection
 message: "Connection doesn't exist, or is already closed."}
```

## **connStatus** {#connstatus}

Message received from FlureeWoker after processing a `connect` request.

### Message {#message-8}

| Name                                                                                                   | Value                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `event`                                                                                                | `connStatus`                                                                                                                                                       |
| `conn`                                                                                                 | connection id from original message                                                                                                                                |
| `ref`                                                                                                  | reference from original message                                                                                                                                    |
| `data` <ul><li>\* `status`</li><li>\* `message`</li></ul> | result of `connect` connection request <ul><li>http-status of the result (e.g., 200)</li><li>text message</li></ul> |

Example of `connStatus` results

```http
{status:  200
 message: "Connection is ready."}

{status:  500
  message: "Server contact error: xhttp error - http://localhost:8090/fdb/health"}
```

## **login** {#login-1}

Message received from FlureeWorker after processing a `login` request.

### Message {#message-9}

| Name                                                                                                                       | Value                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`                                                                                                                    | `login`                                                                                                                                                                                                                                                                            |
| `conn`                                                                                                                     | connection id from original message                                                                                                                                                                                                                                                |
| `ref`                                                                                                                      | reference from original message                                                                                                                                                                                                                                                    |
| `data` <ul><li>\* `status`</li><li>\* `result`</li><li>\* `message`</li></ul> | result of `login` connection request <ul><li>http-status of the result (e.g., 200)</li><li>username and JSON web token of authenticated login</li><li>text message of result, generally indicates an authentication error</li></ul> |

Example of `login` results

```http
{status:  200
 result: {username: "sam" token: "eyJhbGc..."}}

{status:  401
  message: "Authentication failed: ..."}
```

## **setState** {#setstate}

Triggered when FlureeWorker receives ledger updates from the Fluree network. The results are based on the queries registered to the connection.

### Message {#message-10}

| Name                                                                                                                    | Value                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`                                                                                                                 | `setState`                                                                                                                                                                                                                                                        |
| `conn`                                                                                                                  | connection id from original message                                                                                                                                                                                                                               |
| `ref`                                                                                                                   | reference from original message                                                                                                                                                                                                                                   |
| `data`<ul><li>\* `status`</li><li>\* `result`</li><li>\* `error`</li></ul> | result reprocessing registered queries <ul><li>status (e.g., "error", "loaded")</li><li>result of reprocessing register query(ies)</li><li>identifies error when execution of a regisstered query failed</li></ul> |

Example of `setState` results

```http
{status: "loaded",
 result:[{"_id":369435906932739,"buyer":{"_id":351843720888324,"name":"ABC Flurian Group"},"id":"113","cost":75000,"items":["db","mobile app","app server","db server"],"seller":{"_id":351843720888321,"name":"Fluree"}},{"_id":369435906932738,"buyer":{"_id":351843720888324,"name":"ABC Flurian Group"},"id":"112","cost":2500,"items":["db"],"seller":{"_id":351843720888321,"name":"Fluree"}},{"_id":369435906932737,"buyer":{"_id":351843720888323,"name":"Leh-x Flurian Services"},"id":"111","cost":5000,"items":["db","application","server","mobile app"],"seller":{"_id":351843720888321,"name":"Fluree"}}]}
```
