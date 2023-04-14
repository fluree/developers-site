---
sidebar_position: 2
---

# Javascript Examples

You can dowbload the latest version of the Fluree JavaScript library from npm:

```bash
npm install @fluree/flureedb
```

The following commands are available in the JavaScript api library. JavaScript promises are used to return results from long-running processes.

> _For the following examples, it is assumed that you are using the downloaded Fluree Community Edition. Unless you changed the default_ `fdb-api-port`_, the full URL is_ `http://localhost:8090/`

## **`connect`** {#connect}

Connect to a ledger server using an URL address. If using a ledger group, multiple addresses can be supplied, separated by a comma.

There are 2 versions of the connect command:

- `connect` returns a connection object
- `connect_p` returns a connection object via a promise

### Parameter(s) {#connect-parameters}

| Name            | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-string` | a string identifying one or more ledger servers                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `options`       | <ul><li>a JavaScript object containing configuration options. The following options are currently supported:</li><li>- `keep-alive-fn`: a JavaScript function that is executed when a connection is abruptly dropped.</li><li>- `private`: The private-key identifying the Auth to be used for operations associated with the connection. This is required for accessing Fluree instances with a closed api (i.e., fdb-api-open=false) unless you are using password authentication.</li></ul> |

### Returns {#connect-returns}

Returns a connection object.

### JavaScript Example {#connect-example}

An example of the `connect` command:

```javascript
const flureeServerUrl = "http://localhost:8090";
var myConn = flureedb.connect(flureeServerUrl);
```

An example of the `connect_p` command:

```javascript
const flureeServerUrl = "http://localhost:8090";
flureedb
  .connect_p(flureeServerUrl)
  .then((conn) => {
    // execute a query or transaction
  })
  .catch((error) => {
    // error handling
  })
  .finally(() => {
    // close connection
  });
```

An example of using `connect_p` with `keep-alive-fn` option:

```javascript
function flureeConnect(url, options){
    if (!url) {
        throw "Unable to connect to Fluree: Missing url. "
    }

    var cOpts = {};
    if (options && options.keepAlive && options.keepAlive === true) {
        cOpts = {"keep-alive-fn": function(){ flureeConnect(url,options); }}
    }

    flureedb.connect_p(url, cOpts)
    .then(conn => {
        reConnection = conn;
    })
    .catch(error => {
        console.error("Error connecting to Fluree DB", error);
        //  [  1.771s] [server] "Server contact error: "
        //  "xhttp error - http://localhost:8090/fdb/health"
        //  {:url "http://localhost:8090/fdb/health", :error :xhttp/http-error}
        // -> gracefully shutdown
        // -> or add re-try logic
    })

    const downloadedInstance = "http://localhost:8090"
    const options = {keepAlive: true};
    flureeConnect(downloadedInstance, options);
```

## **`close`** {#close}

Close a connection to a ledger server/group.

<!-- markdownlint-disable MD024 -->

### Parameter(s) {#close-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |

### Returns {#close-returns}

Returns a boolean, false when the connection is not currently open; otherwise, true.

### JavaScript Example {#close-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
var myConn = flureedb.connect(flureeServerUrl);

flureedb.close(myConn);
```

## **`db`** {#db}

Returns a queryable ledger from the connection. The ledger object represents a point-in-time ledger. As such, the ledger will not contain block updates submitted after acquisition of the channel.

### Parameter(s) {#db-parameters}

| Key          | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |

### Returns {#db-returns}

Returns a queryable ledger as an asynchronous channel.

### JavaScript Example {#db-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);
var myDb = flureedb.db(myConn, myLedgerName);

flureedb.close(myConn);
```

## **`db_schema`** {#db_schema}

Generates a schema map for a point-in-time ledger.

### Parameter(s) {#db_schema-parameters}

| Name        | Value                                               |
| ----------- | --------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` command |

### Returns {#db_schema-returns}

Returns a JavaScript promise that will eventually deliver the schema map for a ledger.

### JavaScript Example {#db_schema-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);
var myDb = flureedb.db(myConn, myLedgerName);

flureedb
  .db_schema(myDb)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`new_ledger`** {#new_ledger}

Creates a new ledger given a "network/id". If the network specified does not exist, it creates a new network. This call returns a transaction id, the process does not wait for the ledger to be fully initialized before returning.

### Parameter(s) {#new_ledger-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |
| `options`    | an optional map of key/value pairs                                     |

#### Option(s)

| Key          | Value                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------- |
| `:alias`     | an alias for the ledger, if different than the id                                           |
| `:owners`    | auth ids to bootstrap with (array of string).                                               |
| `:doc`       | doc string about this ledger                                                                |
| `:fork`      | If forking an existing db, ref to db (actual identity, not db-ident). Must exist in network |
| `:forkBlock` | If fork is provided, optionally provide the block to fork at. Defaults to latest known.     |

### Returns {#new_ledger-returns}

A JavaScript promise that eventually contains a transaction id. The transaction id can be used to query the results of the new ledger command.

### JavaScript Example {#new_ledger-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/invoice";
var myConn = flureedb.connect(flureeServerUrl);
flureedb
  .new_ledger(myConn, myLedgerName)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`delete_ledger`** {#delete_ledger}

Deletes a ledger, such that a user will no longer be able to query or transact against that ledger. Currently, the files associated with the ledger are not physically deleted from disk. You can choose to delete those files yourself - or keep them. You will not be able to create a new ledger with the same name as the deleted ledger.

### Parameter(s) {#delete_ledger-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |

### Returns {#delete_ledger-returns}

Returns a promise that eventually the results

### JavaScript Example {#delete_ledger-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
var myConn = flureedb.connect(flureeServerUrl);

flureedb.delete_ledger(myConn, "test/deleteme");

flureedb.close(flureeDbConn);
```

## **`query`** {#query}

All single queries in FlureeQL syntax that include a `select` key should be issued through the `q` command.

### Parameter(s) {#query-parameters}

| Name        | Value                                               |
| ----------- | --------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` command |
| `query-map` | a map of key/value pairs defining the query         |
| `options`   | an optional map of key/value pairs                  |

### Returns {#query-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### JavaScript Example {#query-example}

An example of a query with the network, `test` and the ledger `chat`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);
var myDb = flureedb.db(myConn, myLedgerName);

var myQuery = {
  select: ["*"],
  from: "_collection",
};
flureedb
  .query(myDb, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`multi_query`** {#multi_query}

If you are submitting multiple FlureeQL queries at once (using the [multi_query syntax](/overview/query/advanced_query.mdx#multiple-queries)), that should be done through the `multi_query` command.

### Parameter(s) {#multi_query-parameters}

| Name        | Value                                               |
| ----------- | --------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` command |
| `query-map` | a map of key/value pairs defining the query         |
| `options`   | an optional map of key/value pairs                  |

### Returns {#multi_query-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### JavaScript Example {#multi_query-example}

An example of a `multi_query`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);
var myDb = flureedb.db(myConn, myLedgerName);

var myMultiQuery = {
  collections: { select: ["*"], from: "_collection" },
  persons: { select: ["*"], from: "person" },
};
flureedb
  .multi_query(myDb, myMultiQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`block_query`** {#block_query}

FlureeQL [block queries](/overview/query/block_query.mdx) should be submitted to the `block_query` command. This does not include other types of queries (basic queries, history queries, etc) that might have a "block" key. This only includes queries that are returning flakes from a block or set of blocks.

### Parameter(s) {#block_query-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |
| `query-map`  | a map of key/value pairs defining the query                            |
| `options`    | an optional map of key/value pairs                                     |

### Returns {#block_query-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### JavaScript Example {#block_query-example}

An example of a `block_query`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

var myQuery = { block: [1, 8] };
flureedb
  .block_query(myConn, myLedgerName, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`block_range`** {#block_range}

Given a ledger, returns blocks from a start block (inclusive) to end, if provided (exclusive). Each block is a separate map, containing keys :block and :flakes.

### Parameter(s) {#block_range-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |
| `start`      | an integer identify the start block; start block is included           |
| `end`        | an integer identifying the end block; end block is excluded            |
| `options`    | an optional map of key/value pairs                                     |

### Returns {#block_range-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### JavaScript Example {#block_range-example}

An example of a `block_range`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

flureedb
  .block_range(myConn, myLedgerName, 1, 8)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`history_query`** {#history_query}

FlureeQL [history queries](/overview/query/history_query.mdx) should be submitted to the `history` command. This command only includes queries like those in the linked section.

### Parameter(s) {#history_query-parameters}

| Name        | Value                                               |
| ----------- | --------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` command |
| `query-map` | a map of key/value pairs defining the query         |
| `options`   | an optional map of key/value pairs                  |

### Returns {#history_query-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### JavaScript Example {#history_query-example}

An example of a `history_query`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);
var myDb = flureedb.db(myConn, myLedgerName);

var myQuery = {
  history: ["person/handle", "zsmith"],
  block: 4,
};
flureedb
  .history_query(myDb, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`transact`** {#transact}

Submits a transaction for a ledger. Returns a promise that will eventually have the result of the tx, the txid (if :txid-only option used), or an exception either due to an invalid transaction or if the timeout occurs prior to a response.

Will locally sign a transaction command if a private key is provided via :private-key in the options, otherwise will submit the transaction to the ledger and request signature, provided the ledger group has a default private key available for signing.

Options is a map with the following possible keys:

- private-key - The private key to use for signing. If not present, a default
  private key will attempt to be used from the connection, if available.
- auth - The auth id for the auth record being used.
- jwt - The token which can be used for signing
- expire - When this transaction should expire if not yet attempted.
  Defaults to 5 minutes.
- nonce - Any long/64-bit integer value that will make this transaction unique.
  By default epoch milliseconds is used.
- deps - List of one or more txids that must be successfully processed before
  this tx is processed. If any fail, this tx will fail. (not yet implemented)
- txid-only - Boolean (default of false). If true, will not wait for a response to the tx,
  but instead return with the txid once it is successfully persisted by the
  transactors. The txid can be used to look up/monitor the response at a later time.
- timeout - will respond with an exception if timeout reached before response available.

### Parameter(s) {#transact-parameters}

| Name          | Value                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| `connection`  | a connection object created using the `connect` or `connect_p` command |
| `ledger`      | a string identifying both the network and ledger                       |
| `transaction` | a map of key/value pairs defining the transaction                      |
| `options`     | an optional map of key/value pairs                                     |

### Returns {#transact-returns}

A JavaScript promise that eventually contains the transaction id or an error.

### JavaScript Example {#transact-example}

An example of `transact` using the default private-key for the ledger to sign the transaction:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

var myTxn = [
  {
    _id: "_user",
    username: "jdoe",
  },
];
flureedb
  .transact(myConn, myLedgerName, myTxn)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

An example of a `transact` providing the private-key and auth to be used for signing:

```javascript
import { getSinFromPublicKey } from "@fluree/crypto-utils";

const publicKey = "...";
const privateKey = "...";
const auth = getSinFromPublicKey(publicKey);

const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

var myTxn = [
  {
    _id: "_user",
    username: "jdoe",
  },
];
var myOpts = {
  "private-key": privateKey,
  auth: auth,
  expire: Date.now() + 30000,
  nonce: 1,
  timeout: 600000,
  fuel: 100000,
};
flureedb
  .transact(myConn, myLedgerName, myTxn, myOpts)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`monitor_tx`** {#monitor_tx}

Monitors a ledger for a specific transaction id included in a block. Returns a promise that will eventually contain a response or an exception if the timeout period has expired. Also, the response itself may contain an exception, if the transaction resulted in an exception.

### Parameter(s) {#monitor_tx-parameters}

| Name             | Value                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| `connection`     | a connection object created using the `connect` or `connect_p` command |
| `ledger`         | a string identifying both the network and ledger                       |
| `transaction-id` | the transaction id returned by the `transact` command                  |
| `timeout`        | timeout, in milliseconds                                               |

### Returns {#monitor_tx-returns}

A JavaScript promise that eventually returns the results from the monitor_tx command.

### JavaScript Example {#monitor_tx-example}

An example of `monitor_tx`:

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

var myTxId = "f27e0b890bbc47e0bd67dc452fded9eb881548015d3e9860cf69bd5f19c20660";
flureedb
  .monitor_tx(myConn, myLedgerName, myTxId, 6000)
  .then((resp) => {
    console.log("Returned", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureedb.close(myConn);
```

## **`listen`** {#listen}

Listens to all events of a given ledger. Supply a ledger identity, any key, and a two-argument function that will be called with each event. The key is any arbitrary key, and is only used to close the listener via close-listener, otherwise it is transparent to the listener. The callback function's first argument is the event header/metadata and the second argument is the event data itself.

### Parameter(s) {#listen-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |
| `key`        | any arbitrary id                                                       |
| `callback`   | callback function/handler                                              |

### Returns {#listen-returns}

Returns true if the listener is successfully added. Otherwise, an exception is returned.

### JavaScript Example {#listen-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn;

// connect to fluree using a promise.
// the promise resolves when connection is
// ready or errors
flureedb
  .connect_p(flureeServerUrl)
  .then((conn) => {
    myConn = conn;
  })
  .catch((error) => {
    console.error("Error connecting to Fluree DB", error);
  });

var myListenerKey = "supercalifragilisticexpialidocious";
var someFunction = function (eventType, eventData) {
  // do something
  console.info("eventType: ", eventType);
  console.info("eventData: ", eventData);
};

// non-blocking wait for connection
(async () => {
  while (!myConn) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  addListener(myConn, myLedgerName, myListenerKey, someFunction);
})().catch((e) => console.log(e));
```

## **`close_listener`** {#close_listener}

Closes a listener associated with a given connection, ledger and key

### Parameter(s) {#close_listener-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |
| `ledger`     | a string identifying both the network and ledger                       |
| `key`        | same arbitrary key provided to the `listen` command                    |

### Returns {#close_listener-returns}

Returns true if a callback function was associated with the key and removed. Otherwise. nil is returned.

### JavaScript Example {#close_listener-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
const myLedgerName = "test/chat";
var myConn = flureedb.connect(flureeServerUrl);

var myListenerKey = "supercalifragilisticexpialidocious";
var listenerClosed = flureedb.close_listener(myConn, myLedgerName, myKey);
console.log("Closed listener?", listenerClosed?);

flureedb.close(myConn);
```

## **`listeners`** {#listeners}

Return a list of listeners currently registered for each ledger along with their respective keys.

### Parameter(s) {#listeners-parameters}

| Name         | Value                                                                  |
| ------------ | ---------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` or `connect_p` command |

### Returns {#listeners-returns}

Returns a list of listeners registered for the given connection object.

### JavaScript Example {#listeners-example}

```javascript
const flureeServerUrl = "http://localhost:8090";
var myConn = flureedb.connect(flureeServerUrl);

var myListeners = flureedb.listeners(myConn);
console.log("listeners: ", myListeners);

flureedb.close(myConn);
```
