---
sidebar_position: 2
---

# Node Library Examples

You can download the latest version of the Fluree Node.js library from npm:

```bash
npm install @fluree/flureenjs
```

The following functions are available in the Node.js api library. JavaScript promises are used to return results from long-running processes.

## **`accountId`** {#accountId}

Returns an account id from either a 1) public key **or** 2) a message and its signature.

When provided a message and signature, the corresponding account id is
returned only if the signature is valid. An exception is thrown when the
signature is invalid.

### Parameter(s) {#accountId-parameters}

| Name         | Value                                                              |
| ------------ | ------------------------------------------------------------------ |
| `public-key` | a public key                                                       |
| **or**       |
| `message`    | a message                                                          |
| `signature`  | a signature, a hash of your message signed using your private key. |

### Returns {#accountId-returns}

The associated account id.

### Code Example {#accountId-example}

Examples of `accountId` function:

```javascript
const flureenjs = require("@fluree/flureenjs");
const message = "FlureeDL rocks!";

let { private, public, id } = flureenjs.newPrivateKey();

let signature = flureenjs.sign(message, private);

// validate
if (
  flureenjs.accountId(public) === id &&
  flureenjs.accountId(message, signature) === id
) {
  console.log(`Success! Account IDs match ${id}`);
} else {
  console.error(`Account IDs do not match ${id}`);
}
```

## **`blockEventToMap`** {#blockEventToMap}

Accepts block event data from a `listen` event, mapping flakes to either the `:added` key or `:retracted` key. The maps of data are organized by subject and include full predicate names.

<!-- markdownlint-disable MD024 -->

### Parameter(s) {#blockEventToMap-parameters}

| Name               | Value                                                    |
| ------------------ | -------------------------------------------------------- |
| `connection`       | a connection object created using the `connect` function |
| `ledger`           | a string identifying both the network and ledger-id      |
| `block-event-data` | block event data provided via `listen`                   |

### Return(s) {#blockEventToMap-return}

Returns the original block data, with flakes broken out into additions and retractions.

### Code Example {#blockEventToMap-example}

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const myKey = "supercalifragilisticexpialidocious";
var someFunction = function(header, data) {
    let mapData = flureenjs.block_event__GT_map(flureeDbConn, ledger, data);
    console.info("mapData:", mapData);
  };
var listenerAdded? = flureenjs.listen(flureeDbConn, ledger, myKey, someFunction);
console.log("Added listener?", listenerAdded?);
```

## **`blockQuery`** {#blockQuery}

FlureeQL [block queries](/overview/query/block_query.mdx) should be submitted to the `blockQuery` function. This does not include other types of queries (basic queries, history queries, etc) that might reference a "block" key. This only includes queries that are returning flakes from a block or set of blocks.

### Parameter(s) {#blockQuery-parameters}

| Name         | Value                                                                                                                                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function                                                                                                                                                    |
| `ledger`     | a string identifying both the network and ledger-id                                                                                                                                                         |
| `query-map`  | a map of key/value pairs defining the query                                                                                                                                                                 |
| `options`    | an optional map of key/value pairs. Options can also be included in the `query-map` using the `:opts` keyword. When using a closed-api, either the `:auth` or `:jwt` should be included in the options map. |

### Returns {#blockQuery-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#blockQuery-example}

An example of an unsigned request to `blockQuery`:

```javascript
const flureenjs = require("@fluree/flureenjs");

const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";

let flureeDbConn = flureenjs.connect(flureeServerUrl);

const myQuery = { block: [2, 3] };
flureenjs
  .blockQuery(flureeDbConn, ledger, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`collectionId`** {#collectionId}

Returns a JavaScript promise that eventually contains either the ID (integer) of a collection or nil if the collection does not exist.

### Parameter(s) {#collectionId-parameters}

| Name         | Value                                                |
| ------------ | ---------------------------------------------------- |
| `db-source`  | an asynchronous channel created by the `db` function |
| `collection` | name of a collection                                 |

### Returns {#collectionId-returns}

The ID of a collection or nil when the collection does not exist.

### Code Example {#collectionId-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
let flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
const myCollectionName = "artist";
flureenjs
  .db(flureeDbConn, ledger)
  .then((myDb) => {
    flureenjs
      .collectionId(myDb, myCollectionName)
      .then((resp) => {
        console.log("Success ", resp);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  })
  .catch((error) => {
    console.log("DB access Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`collectionFlakes`** {#collectionFlakes}

Returns the `spot` index range for the requested collection.

### Parameter(s) {#collectionFlakes-parameters}

| Name         | Value                                                |
| ------------ | ---------------------------------------------------- |
| `db-source`  | an asynchronous channel created by the `db` function |
| `collection` | name of a collection                                 |

### Returns {#collectionFlakes-returns}

The `spot` index for the requested collection is returned.

### Code Example {#collectionFlakes-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
let flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
const myCollectionName = "artist";
flureenjs
  .db(flureeDbConn, ledger)
  .then((myDb) => {
    flureenjs
      .collectionFlakes(myDb, myCollectionName)
      .then((resp) => {
        console.log("Success ", resp);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  })
  .catch((error) => {
    console.log("DB access Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`connect`** {#connect}

Connect to a ledger server using an URL address. If using a ledger group, multiple addresses can be supplied, separated by a comma.

### Parameter(s) {#connect-parameters}

| Name            | Value                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-string` | a string identifying one or more ledger servers                                                                                                                                             |
| `options`       | a JSON object containing configuration options. The following option is currently supported: `keep-alive-fn`: a JavaScript function that is executed when a connection is abruptly dropped. |

### Returns {#connect-returns}

Returns a connection object via a Promise

### Code Examples {#connect-example}

An example of the `connect` function:

```javascript
const flureenjs = require("@fluree/flureenjs");
var flureeDbConn;
var flureeIsAvailable = false;
const flureeServerUrl = "http://localhost:8090";
flureenjs
  .connect(flureeServerUrl)
  .then((conn) => {
    flureeDbConn = conn;
    flureeIsAvailable = true;
  })
  .catch((error) => {
    console.error("Error connecting to Fluree DB", error);
    // send alerts, gracefully shutdown Node.js server
  });
```

An example of using `connect` with `keep-alive-fn` option:

```javascript
const flureenjs = require("@fluree/flureenjs");
let flureeConnection;
function flureeConnect(url, options) {
  if (!url) {
    throw "Unable to connect to Fluree: Missing url. ";
  }

  var cOpts = {};
  if (options && options.keepAlive && options.keepAlive === true) {
    cOpts = {
      "keep-alive-fn": function () {
        flureeConnect(url, options);
      },
    };
  }

  flureenjs
    .connect(url, cOpts)
    .then((conn) => {
      flureeConnection = conn;
    })
    .catch((error) => {
      console.error("Error connecting to Fluree DB", error);
      // -> gracefully shutdown
      // -> or add re-try logic
    });
}
const flureeServerUrl = "http://localhost:8090";
const options = { keepAlive: true };
flureeConnect(flureeServerUrl, options);
```

## **`close`** {#close}

Close a connection to a ledger server/group.

### Parameter(s) {#close-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |

### Returns {#close-returns}

Returns a boolean, false when the connection is not currently open; otherwise, true.

### Code Example {#close-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

flureenjs.close(flureeDbConn);
```

## **`closeListener`** {#closeListener}

Closes a listener associated with a given connection, ledger and key

### Parameter(s) {#closeListener-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |
| `key`        | same arbitrary key provided to the `listen` function     |

### Returns {#closeListener-returns}

Returns true if a callback function was associated with the key and removed. Otherwise. nil is returned.

### Code Example {#closeListener-example}

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const myKey = "supercalifragilisticexpialidocious";
const listenerClosed = flureenjs.closeListener(flureeDbConn, ledger, myKey);
console.log("Closed listener?", listenerClosed?);

flureenjs.close(flureeDbConn);
```

## **`db`** {#db}

Returns a queryable ledger from the connection. The ledger object represents a point-in-time ledger. As such, the ledger will not contain block updates submitted after acquisition of the channel.

### Parameter(s) {#db-parameters}

| Key          | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |

### Returns {#db-returns}

Returns a queryable (point-in-time) ledger as a Promise.

### Code Example {#db-example}

Code example using a promise.

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
let flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
flureenjs
  .db(flureeDbConn, ledger)
  .then((myDb) => {
    // execute query against database
  })
  .catch((error) => {
    console.log("DB access Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`deleteLedger`** {#deleteLedger}

Deletes a ledger, such that a user will no longer be able to query or transact against that ledger. Currently, the files associated with the ledger are not physically deleted from disk. You can choose to delete those files yourself - or keep them. You will not be able to create a new ledger with the same name as the deleted ledger.

### Parameter(s) {#deleteLedger-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |

### Returns {#deleteLedger-returns}

Returns a promise that eventually contains the results.

### Code Example {#deleteLedger-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

flureenjs.deleteLedger(flureeDbConn, "test/deleteme");

flureenjs.close(flureeDbConn);
```

## **`graphql`** {#graphql}

All queries and transactions in GraphQL syntax should be issued through the `graphql` function. If you do not have `fdb-api-open` set to true (it is true by default), then you'll need to sign your query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

### Parameter(s) {#graphql-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |
| `query`      | JSON-encoded string containing the graphQL query         |
| `options`    | an optional map of key/value pairs                       |

### Returns {#graphql-returns}

A JavaScript promise that eventually contains the results of the query.

### Code Example {#graphql-example}

An example of an unsigned query to `graphql`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const myGraphQuery = {
  query: "{graph {chat {_id comments instant message person}}}",
  variables: null,
  operationName: null,
};
flureenjs
  .graphql(flureeDbConn, ledger, JSON.stringify(myGraphQuery))
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(myConn);
```

## **`historyQuery`** {#historyQuery}

FlureeQL [history queries](/overview/query/history_query.mdx) should be submitted to the `historyQuery` function. This function only supports queries like those in the linked section.

### Parameter(s) {#historyQuery-parameters}

| Name        | Value                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function                                                           |
| `query-map` | a map of key/value pairs defining the query                                                                    |
| `options`   | an optional map of key/value pairs. Options can also be included in the `query-map` using the `:opts` keyword. |

### Returns {#historyQuery-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#historyQuery-example}

An example of an unsigned request to `history_query`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

const myQuery = {
  history: ["person/handle", "zsmith"],
  block: 4,
};
flureenjs
  .historyQuery(myDb, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`httpSignature`** {#httpSignature}

Takes an http request and creates an http signature using a private key.

### Parameter(s) {#httpSignature-parameters}

| Name          | Value                                             |
| ------------- | ------------------------------------------------- |
| `req-method`  | the request method, should be GET, POST, PUT, ... |
| `url`         | the target url                                    |
| `request`     | a map containing `:headers` and `:body`           |
| `private-key` | the private key to use for signing the request    |
| `auth`        | an optional auth ID associated with the request   |

### Returns {#httpSignature-returns}

Returns a signed http request.

### Code Example {#httpSignature-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeUrl = "http://localhost:8090";
const rqst = {
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ select: ["*"], from: "_collection" }),
};
let { public, private, id } = flureenjs.newPrivateKey();
let signedRqst = flureenjs.httpSignature(
  "post",
  flureeUrl + `/fdb/${network}/${ledger}/query`,
  rqst,
  private,
  null
);
```

## **`ledgerInfo`** {#ledgerInfo}

Returns promise with ledger's status as a map, including index, indexes, block, and status. If ledger doesn't exist, returns an empty map.

### Parameter(s) {#ledgerInfo-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |

### Returns {#ledgerInfo-returns}

Returns a map with information about the requested ledger.

### Code Example {#ledgerInfo-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";

let flureeDbConn = flureenjs.connect(flureeServerUrl);

flureenjs
  .ledgerInfo(flureeDbConn, ledger)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
```

## **`ledgerList`** {#ledgerList}

Returns a promise that eventually contains a list of ledgers that the connected server is currently serving.

### Parameter(s) {#ledgerList-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |

### Returns {#ledgerList-returns}

Returns a list of ledgers serviced by the connected Fluree instance.

### Code Example {#ledgerList-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";

let flureeDbConn = flureenjs.connect(flureeServerUrl);

flureenjs
  .ledgerList(flureeDbConn)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
```

## **`listen`** {#listen}

Listens to all events of a given ledger. Supply a ledger identity, any key, and a two-argument function that will be called with each event. The key is any arbitrary key, and is only used to close the listener via close-listener, otherwise it is transparent to the listener. The callback function's first argument is the event header/metadata and the second argument is the event data itself.

### Parameter(s) {#listen-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |
| `key`        | any arbitrary id                                         |
| `callback`   | callback function/handler                                |

### Returns {#listen-returns}

Returns true if the listener is successfully added. Otherwise, an exception is returned.

### Code Example {#listen-example}

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const myKey = "supercalifragilisticexpialidocious";
var someFunction = function(header, data) {
    console.info("header:", header);
    console.info("data:", data);
  };
var listenerAdded? = flureenjs.listen(flureeDbConn, ledger, myKey, someFunction);
console.log("Added listener?", listenerAdded?);
```

## **`listeners`** {#listeners}

Return a list of listeners currently registered for each ledger along with their respective keys.

### Parameter(s) {#listeners-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |

### Returns {#listeners-returns}

Returns a list of listeners registered for the given connection object.

### Code Example {#listeners-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

var myListeners = flureenjs.listeners(flureeDbConn);
console.log("listeners: ", myListeners);
flureenjs.close(flureeDbConn);
```

## **`monitorTx`** {#monitorTx}

Monitors a ledger for a specific transaction id included in a block. Returns a promise that will eventually contain a response or an exception if the timeout period has expired. Also, the response itself may contain an exception, if the transaction resulted in an exception.

### Parameter(s) {#monitorTx-parameters}

| Name             | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| `connection`     | a connection object created using the `connect` function |
| `ledger`         | a string identifying both the network and ledger-id      |
| `transaction-id` | the transaction id returned by the `transact` function   |
| `timeout`        | timeout, in milliseconds                                 |

### Returns {#monitorTx-returns}

A JavaScript promise that eventually returns the results from the monitorTx function.

### Code Example {#monitorTx-example}

An example of an unsigned request to `monitorTx`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const myTxId =
  "f27e0b890bbc47e0bd67dc452fded9eb881548015d3e9860cf69bd5f19c20660";
flureenjs
  .monitorTx(flureeDbConn, ledger, myTxId, 6000)
  .then((resp) => {
    console.log("Returned", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`multiQuery`** {#multiQuery}

If you are submitting multiple FlureeQL queries at once (using the [multi-query syntax](/overview/query/advanced_query.mdx#multiple-queries)), that should be done through the `multiQuery` function.

### Parameter(s) {#multiQuery-parameters}

| Name        | Value                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function                                                           |
| `query-map` | a map of key/value pairs defining the query                                                                    |
| `options`   | an optional map of key/value pairs. Options can also be included in the `query-map` using the `:opts` keyword. |

### Returns {#multiQuery-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#multiQuery-example}

An example of an unsigned request to `multiQuery`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

const myMultiQuery = {
  collections: { select: ["*"], from: "_collection" },
  persons: { select: ["*"], from: "person" },
};
flureenjs
  .multiQuery(myDb, myMultiQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`newLedger`** {#newLedger}

Creates a new ledger given a "network/id". If the network specified does not exist, it creates a new network. This request returns a transaction id; the process does not wait for the ledger to be fully initialized before returning.

### Parameter(s) {#newLedger-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |
| `options`    | an optional map of key/value pairs                       |

#### Option(s)

| Key          | Value                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| `:alias`     | an alias for the ledger, if different than the id                                       |
| `:root`      | account id to bootstrap with (string). Defaults to connection default account id        |
| `:doc`       | doc string about this ledger                                                            |
| `:fork`      | If forking an existing ledger, reference to ledger. Must exist in network               |
| `:forkBlock` | If fork is provided, optionally provide the block to fork at. Defaults to latest known. |

### Returns {#newLedger-returns}

A JavaScript promise that eventually contains a transaction id. The transaction id can be used to query the results of the new ledger creation.

### Code Example {#newLedger-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/invoice";
flureenjs
  .newLedger(flureeDbConn, ledger)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`newPrivateKey`** {#newPrivateKey}

Generates a new private-public key pair using the Node.js (bundled) crypto module key. If the module is not available, an exception is thrown.

### Parameter(s) {#newPrivateKey-parameters}

Not applicable.

### Returns {#newPrivateKey-returns}

A map containing the `private` key, `public` key and account (or auth) `id`.

### Code Example {#newPrivateKey-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
let { private, public, id } = flureenjs.newPrivateKey();
```

## **`passwordGenerate`** {#passwordGenerate}

Generates a password auth record for an existing role, or a user. The user may exist, or if createUser? is true, the user is created.

### Parameter(s) {#passwordGenerate-parameters}

| Name         | Value                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function                                                                                 |
| `ledger`     | a string identifying both the network and ledger-id                                                                                      |
| `password`   | plain-text password                                                                                                                      |
| `user`       | a string value associated with the \_user/username predicate                                                                             |
| `opts`       | An optional map of key-value pairs. Supported options are:<br /> - `create-user?`: indicator whether or not to create the \_user record. |

### Returns {#passwordGenerate-returns}

Returns a promise that eventually contains the token or an exception

### Code Example {#passwordGenerate-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
const pwd = "flureeRocks!";
const user = "scott";
const opts = { "create-user?": false };
flureenjs
  .passwordGenerate(flureeDbConn, ledger, pwd, user, opts)
  .then((results) => {
    // token returned as user is automatically logged in
  })
  .catch((error) => {
    console.log(error);
  });

flureenjs.close(flureeDbConn);
```

## **`passwordLogin`** {#passwordLogin}

Attempts to authenitcate against a ledger for a provided password and either a user or auth. Returns a JWT, if successful.

### Parameter(s) {#passwordLogin-parameters}

| Name         | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| `connection` | a connection object created using the `connect` function     |
| `ledger`     | a string identifying both the network and ledger-id          |
| `password`   | plain-text password                                          |
| `user`       | a string value associated with the \_user/username predicate |
| `auth`       | a string value associated with the \_auth/id predicate       |
| `expire`     | requested time to expire token, specified in milliseconds    |

### Returns {#passwordLogin-returns}

Returns a promise that eventually contains the token or an exception

### Code Example {#passwordLogin-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
const pwd = "flureeRocks!";
const user = "scott";
const expire = 1200000; // 20 minutes
flureenjs
  .passwordLogin(flureeDbConn, ledger, pwd, user, expire)
  .then((results) => {
    // token returned as user is automatically logged in
  })
  .catch((error) => {
    console.log(error);
  });

flureenjs.close(flureeDbConn);
```

## **`predicateId`** {#predicateId}

Returns a JavaScript promise that eventually contains either the id of a predicate or nil if the predicate does not exist. Predicates can be indentified by name or unique tuple.

### Parameter(s) {#predicateId-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `predicate` | name of a predicate                                  |

### Returns {#predicateId-returns}

The id of a predicate or nil when the predicate does not exist.

### Code Example {#predicateId-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

var myPredicateName = "person/handle";
flureenjs
  .predicateId(myDb, myPredicateName)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`predicateName`** {#predicateName}

Returns a JavaScript promise that eventually contains either the id of a predicate or nil if the predicate does not exist. Predicates can be indentified by name or unique tuple.

### Parameter(s) {#predicateName-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `predicate` | identifier of a predicate                            |

### Returns {#predicateName-returns}

The name of a predicate or nil when the predicate does not exist.

### Code Example {#predicateName-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

flureenjs
  .predicateId(myDb, 50)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`publicKey`** {#publicKey}

Returns a public key from a message and a signature.
If the message is not correctly signed, an exception is thrown.

### Parameter(s) {#publicKey-parameters}

| Name        | Value                                                    |
| ----------- | -------------------------------------------------------- |
| `message`   | a string                                                 |
| `signature` | the signature derived from the message and a private key |

### Returns {#publicKey-returns}

The derived public key, or an exception if the message was not signed correctly.

### Code Example {#publicKey-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const message = "Fluree rocks!";
let { private } = flureenjs.newPrivateKey();
const signature = flureenjs.sign(message, private);

let public = flureenjs.publicKey(message, signature);
```

## **`publicKeyFromPrivate`** {#publicKeyFromPrivate}

Returns a public key given a private key.

### Parameter(s) {#publicKeyFromPrivate-parameters}

| Name      | Value           |
| --------- | --------------- |
| `private` | the private key |

### Returns {#publicKeyFromPrivate-returns}

The associated public key.

### Code Example {#publicKeyFromPrivate-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
let { private } = flureenjs.newPrivateKey();
let public = flureenjs.publicKeyFromPrivate(private);
```

## **`query`** {#query}

All single queries in FlureeQL syntax that include a `select` key should be issued through the `query` function.

### Parameter(s) {#query-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `query-map` | a map of key/value pairs defining the query          |
| `options`   | an optional map of key/value pairs                   |

### Returns {#query-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#query-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

const myQuery = {
  select: ["*"],
  from: "_collection",
};
flureenjs
  .query(myDb, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`refreshToken `** {#refreshToken}

Attempts to renew a valid token. If the token is not valid or has expired, an exception is thrown.

### Parameter(s) {#refreshToken-parameters}

| Name         | Value                                                                |
| ------------ | -------------------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function             |
| `jwt`        | a valid JSON Web Token                                               |
| `expire`     | requested time to expire token, specified in milliseconds (optional) |

### Returns {#refreshToken-returns}

Returns a promise that eventually contains the token or an exception

### Code Example {#refreshToken-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

let token;
const ledger = "test/chat";
const pwd = "flureeRocks!";
const user = "scott";
const expire = 1200000; // 20 minutes
flureenjs
  .passwordLogin(flureeDbConn, ledger, pwd, user, expire)
  .then((results) => {
    // token returned as user is automatically logged in
    token = results;
  })
  .catch((error) => {
    console.log(error);
  });

token = flureenjs.refreshToken(flureeDbConn, token, expire);

flureenjs.close(flureeDbConn);
```

## **`resolveLedger`** {#resolveLedger}

Resolves a ledger identity in the form of 'network/ledger-or-alias' and returns a two-tuple of [network ledger]. An alias lookup is always performed first, and if an alias doesn't exist it is assumed the provided name is a ledger id. If you are providing a ledger id, and wish to skip an alias lookup, a prefix of '$' can be used for the name portion of the ledger-id.

For example,

- testnet/testledger - Look for ledger with an alias or id of testledger on network testnet.
- testnet/$testledger - look for a ledger with id testledger on network testnet (skip alias lookup).

### Parameter(s) {#resolveLedger-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |

### Returns {#resolveLedger-returns}

Returns a two-tuple of [network ledger-id]

### Code Example {#resolveLedger-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myTuple = flureenjs.resolveLedger(flureeDbConn, ledger);

flureenjs.close(flureeDbConn);
```

## **`search`** {#search}

Returns a promise containing search results based on provided flake parts.

### Parameter(s) {#search-parameters}

| Name          | Value                                                |
| ------------- | ---------------------------------------------------- |
| `db-source`   | an asynchronous channel created by the `db` function |
| `flake-parts` | an array of flake-parts to use in an index-search.   |

### Returns {#search-returns}

Returns an array of flakes satisfying the search criteria.

### Code Example {#search-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);
let flakeParts = [17592186044438, 40];
flureenjs
  .search(myDb, flakeParts)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`session`** {#session}

Returns actual session object, containing cache, for a given ledger.

### Parameter(s) {#session-parameters}

| Name         | Value                                                    |
| ------------ | -------------------------------------------------------- |
| `connection` | a connection object created using the `connect` function |
| `ledger`     | a string identifying both the network and ledger-id      |

### Returns {#session-returns}

A JavaScript promise that eventually contains the session object.

### Code Example {#session-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);
let session = flureenjs.session(flureeDbConn, ledger);
```

## **`setDefaultKey`** {#setDefaultKey}

Sets a new default private key for an entire tx-group, network or db level.
The request will only succeed if signed by the default private key for the tx-group,
or, if only setting for a dbid, either using the default private key associated with
the tx-group or the network.

It will overwrite any existing default private key. The eventual result of the function
is either true, when request succeeded, or false, otherwise.

### Parameter(s) {#setDefaultKey-parameters}

| Name          | Value                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connection`  | a connection object created using the `connect` function                                                                                                                                                                                                                                                                                                                                  |
| `network`     | (optional) a string identifying the network (e.g., "test" when full ledger name is "test\chat")                                                                                                                                                                                                                                                                                           |
| `ledger-id`   | (optional) a string identifying the ledger within a network (e.g., "chat" when full ledger name is "test\chat")                                                                                                                                                                                                                                                                           |
| `private-key` | <ul><li>New private key for one of the following scenarios:</li><li>- tx-group, when neither `network` nor `ledger-id` is supplied</li><li>- network, when the `network` is supplied but the `ledger-id` is not provided</li><li>- ledger, when both the `network` and `ledger-id` are supplied</li></ul>                                                                                 |
| `options`     | <ul><li>An optional map of key-value pairs. The following keys are supported:</li><li>- `nonce` - Any long/64-bit integer value that will make this transaction unique. By default epoch milliseconds is used.</li><li>- `expire` - When this request should expire if not yet attempted. Defaults to 5 minutes.</li><li>- `signing-key`- private key to use in signing request</li></ul> |

### Returns {#setDefaultKey-returns}

A JavaScript promise that eventually contains the results.

### Code Example {#setDefaultKey-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const network = "test";
const ledgerId = "chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

// setting to private key that has auth in the ledger
const private =
  "25a42dd2d68117870c87c3db62fd74604e50c659db10294dbc1644d2a0618e17";

flureenjs
  .setDefaultKey(flureeDbConn, network, ledgerId, private)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
```

## **`setLogging`** {#setLogging}

Set the level of logging for Flureenjs.

### Parameter(s) {#setLogging-parameters}

| Name      | Value                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | an optional map of key/value pairs. Currently, only the level of logging can be set. `level` - valid values are `severe`, `warning`, `info`,`config`, `fine`, `finer`, `finest` |

### Returns {#setLogging-returns}

Not applicable.

### Code Example {#setLogging-example}

```javascript
flureenjs.setLogging({ level: "info" });
```

## **`sign`** {#sign}

Returns a signature for a message given a private key.

### Parameter(s) {#sign-parameters}

| Name          | Value         |
| ------------- | ------------- |
| `message`     | a string      |
| `private-key` | a private key |

### Returns {#sign-returns}

A signed message.

### Code Example {#sign-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const message = "FlureeDL rocks!";

let { private } = flureenjs.newPrivateKey();
let signature = flureenjs.sign(message, private);
```

## **`sparql`** {#sparql}

All queries in SPARQL syntax, regardless of type, should be issued through the `sparql` function. If you do not have `fdb-api-open` set to true (it is true by default), then you'll need to sign your query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

### Parameter(s) {#sparql-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `query`     | a string containing a SPARQL query                   |
| `options`   | an optional map of key/value pairs                   |

### Returns {#sparql-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#sparql-example}

An example of an unsigned request to `sparql` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);
var myDb = flureenjs.db(flureeDbConn, ledger);

var mySparqlQuery = `SELECT ?chat ?message ?person ?instant ?comments
      WHERE {
          ?chat   fd:chat/message  ?message;
                  fd:chat/person   ?person;
                  fd:chat/comments ?comments;
                  fd:chat/instant  ?instant.
      }`;
flureenjs
  .sparql(myDb, JSON.stringify(mySparqlQuery))
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });
flureenjs.close(flureeDbConn);
```

## **`sql`** {#sql}

Executes a query based on supported SQL syntax.

### Parameter(s) {#sql-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `query-map` | a map of key/value pairs defining the query          |
| `options`   | an optional map of key/value pairs                   |

### Returns {#sql-returns}

A JavaScript promise that eventually contains the results of the query or an error.

### Code Example {#sql-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

const myQuery = "SELECT * FROM person";
flureenjs
  .sql(myDb, myQuery)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`subid`** {#subid}

Returns a JavaScript promise that eventually contains either the subject id of a subject or nil if the subject does not exist.

### Parameter(s) {#subid-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |
| `subject`   | string identifying the subject identity              |

### Returns {#subid-returns}

The id of a subject or nil when the subject identity does not exist.

### Code Example {#subid-example}

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);

var mySubject = [ "_auth/id","TfC8s3vD6CoFCgyPWWJgcMSmfwMWuvx9T5J" ];
flureenjs.subject_id( myDb, mySubject) )
    .then( resp => {console.log('Success ', resp);})
    .catch( error => {console.log('Error ', error);})

flureenjs.close(flureeDbConn);
```

## **`transact`** {#transact}

Submits a transaction for a ledger. Returns a promise that will eventually have the result of the tx, the txid (if :txid-only option used), or an exception either due to an invalid transaction or if the timeout occurs prior to a response.

Will locally sign a transaction function if a private key is provided via `private-key` in the options, otherwise will submit the transaction to the ledger and request signature, provided the ledger group has a default private key available for signing.

Options is a map with the following possible keys:

- private-key - The private key to use for signing. If not present, a default
  private key will attempt to be used from the connection, if available.
- auth - The auth id for the auth record being used.
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

| Name          | Value                                                    |
| ------------- | -------------------------------------------------------- |
| `connection`  | a connection object created using the `connect` function |
| `ledger`      | a string identifying both the network and ledger-id      |
| `transaction` | a map of key/value pairs defining the transaction        |
| `options`     | an optional map of key/value pairs                       |

### Returns {#transact-returns}

A JavaScript promise that eventually contains the transaction id or an error.

### Code Example {#transact-example}

An example of an unsigned request to `transact`:

```javascript
const flureenjs = require("@fluree/flureenjs");
const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

var myTxn = [
  {
    _id: "_user",
    username: "jdoe",
  },
];
flureenjs
  .transact(flureeDbConn, ledger, myTxn)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

An example of a signed request to `transact`:

```javascript
const flureenjs = require("@fluree/flureenjs");
import { getSinFromPublicKey } from "@fluree/crypto-utils";

const publicKey = "...";
const privateKey = "...";
const auth = getSinFromPublicKey(publicKey);

const flureeServerUrl = "http://localhost:8090";
const ledger = "test/chat";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

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
flureenjs
  .transact(flureeDbConn, ledger, myTxn, myOpts)
  .then((resp) => {
    console.log("Success ", resp);
  })
  .catch((error) => {
    console.log("Error ", error);
  });

flureenjs.close(flureeDbConn);
```

## **`txToCommand`** {#txToCommand}

Helper function to fill out the parts of the transaction that are incomplete,
producing a signed command.

Optional opts is a map with the following keys. If not provided,
defaults will be attempted.

- auth - The auth id for the auth record being used. The private key must correspond to this auth record, or an authority of this auth record.
- expire - When this transaction should expire if not yet attempted. Defaults to 5 minutes.
- nonce - Any long/64-bit integer value that will make this transaction unique. By default epoch milliseconds is used.
- deps - Not yet implemented, list of dependent transactions.

If successful, will return a map with four keys:

- cmd - a map with the command/transaction data as a JSON string
- sig - the signature of the above stringified map
- id - the ID for this unique request - in case you want to look it up later, sha3 of 'cmd'
- db - the ledger for this transaction

### Parameter(s) {#txToCommand-parameters}

| Name          | Value                                               |
| ------------- | --------------------------------------------------- |
| `ledger`      | a string identifying both the network and ledger-id |
| `transaction` | a map of key/value pairs defining the transaction   |
| `options`     | an optional map of key/value pairs.                 |

### Returns {#txToCommand-returns}

A JavaScript promise that eventually contains the results, or an exception.

### Code Example {#txToCommand-example}

```javascript
const flureenjs = require("@fluree/flureenjs");
const private = "...";
const ledger = "test/chat";
const myTxn = [
  {
    _id: "_user",
    username: "jDaniels",
  },
];
var myOpts = {
  expire: Date.now() + 30000,
  nonce: 1,
};
let cmdMap;
flureenjs
  .tx__GT_command(flureeDbConn, ledger, myTxn, myOpts)
  .then((resp) => {
    cmdMap = resp;
  })
  .catch((error) => {
    console.log("Error ", error);
  });
```

## Testing: Generate Flakes {#testing-generate-flakes}

The functions `forwardTimeTravel` and `queryWith` provide the ability to
run what-if scenarios against a ledger.

In order to use what-if data, flakes must first be generated for the transactions.  
At this time, the API endpoint `gen-flakes` is invoked to create the list of flakes
that would be added to a ledger.

Consider the transaction,

```javascript
[
  {
    _id: ["person/handle", "dsanchez"],
    age: 71,
  },
];
```

The corresponding Node.js fetch code would be:

```javascript
fetch("http://localhost:8090/fdb/test/chat/gen-flakes", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "text/plain;charset=UTF-8",
  },
  referrerPolicy: "strict-origin-when-cross-origin",
  body: '[{\n  "_id":      ["person/handle", "dsanchez"],\n  "age": 71\n}]',
  method: "POST",
});
```

And the results will look something like the following. The contents of the `flakes`
array is used for the following functions.

```javascript
{
  "fuel": 599,
  "res": [
    {
      "_id": 351843720888323,
      "person/age": 71
    },
    {
      "_id": -11,
      "_tx/hash": "3ce27f8ffdcffd39f9be9a2c9665b08bd6cae91defcd2531e201493d4c5fe301",
      "_tx/id": "b93415dad2d742251a0424742dbadc458b000d6cc1eb6294650920894ede7c16",
      "_tx/auth": {
        "_id": 105553116266496
      },
      "_tx/nonce": 1617824831559,
      "_tx/tx": "{\"type\":\"tx\",\"db\":\"test/chat\",\"tx\":[{\"_id\":[\"person/handle\",\"dsanchez\"],\"age\":71}],\"nonce\":1617824831559,\"auth\":\"TfC8s3vD6CoFCgyPWWJgcMSmfwMWuvx9T5J\",\"expire\":1617824861559}",
      "_tx/sig": "1c30440220464a73c0fff6e6422880c62273819a8f6d542a85e05c46c1f460d5efe260e1f802203b755fec7b896117c0720e4b771003188b2c9d50f61889d3ba7c9fed37588eac"
    }
  ],
  "flakes": [
    [351843720888323,1002,70,-11,false,null],
    [351843720888323,1002,71,-11,true,null],
    [-11,99,"3ce27f8ffdcffd39f9be9a2c9665b08bd6cae91defcd2531e201493d4c5fe301",-11,true,null],
    [-11,100,"b93415dad2d742251a0424742dbadc458b000d6cc1eb6294650920894ede7c16",-11,true,null],
    [-11,101,105553116266496,-11,true,null],
    [-11,103,1617824831559,-11,true,null],
    [-11,106,"{\"type\":\"tx\",\"db\":\"test/chat\",\"tx\":[{\"_id\":[\"person/handle\",\"dsanchez\"],\"age\":71}],\"nonce\":1617824831559,\"auth\":\"TfC8s3vD6CoFCgyPWWJgcMSmfwMWuvx9T5J\",\"expire\":1617824861559}",-11,true,null],
    [-11,107,"1c30440220464a73c0fff6e6422880c62273819a8f6d542a85e05c46c1f460d5efe260e1f802203b755fec7b896117c0720e4b771003188b2c9d50f61889d3ba7c9fed37588eac",-11,true,null]
  ]
```

## **`forwardTimeTravel`** {#forwardTimeTravel}

Returns a promise containing a new db based on the provided db,
including the provided flakes. Flakes can contain one or more 't's,
but should be sequential and start after the current 't' of the provided
db. (i.e. if db-t is -14, flakes 't' should be -15, -16, etc.). Remember
't' is negative and thus should be in descending order.

A forward-time-travel db can be further forward-time-traveled.

A forward-time travel DB is held in memory, and is not shared across servers.
Ensure you have adequate memory to hold the flakes you generate and add. If
access is provided via an external API, do any desired size restrictions or
controls within your API endpoint.

Remember schema operations done via forward-time-travel should be done in a
't' prior to the flakes that end up requiring the schema change

### Parameter(s) {#forwardTimeTravel-parameters}

| Name        | Value                                                             |
| ----------- | ----------------------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function              |
| `flakes`    | an array of what-if flakes generated for one or more transactions |

### Returns {#forwardTimeTravel-returns}

A JavaScript promise that eventually contains the new database instance or an error.

### Code Example {#forwardTimeTravel-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);
var flakes = [...];
let newDb;
flureenjs.forwardTimeTravel(myDb, flakes)
  .then( resp => { newDb = resp;})
  .catch( error => {console.log('Error ', error);});

flureenjs.close(flureeDbConn);
```

## **`isForwardTimeTravel`** {#isForwardTimeTravel}

Returns true if provided database is a forward-time-travel db.

### Parameter(s) {#parameters-1}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |

### Returns {#isForwardTimeTravel-returns}

Returns true or false.

### Code Example {#isForwardTimeTravel-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);
var flakes = [...];
let newDb;
flureenjs.forwardTimeTravel(myDb, flakes)
  .then( newDb =>
    flureenjs.isForwardTimeTravel_db(dbNew)
        .then(results => {console.log(results);})
        .catch(error => {
            console.log("isForwardTimeTravel_db error", error);
        }))
  .catch( error => {console.log('Error ', error);});

flureenjs.close(flureeDbConn);
```

## **`queryWith`** {#queryWith}

Executes a query against a database source, with the given flakes applied.

### Parameter(s) {#queryWith-parameters}

| Name        | Value                                                |
| ----------- | ---------------------------------------------------- |
| `db-source` | an asynchronous channel created by the `db` function |

### Returns {#queryWith-returns}

Returns promise that eventually contains the results or an exception.

### Code Example {#queryWith-example}

An example of an unsigned request to `query` with the network, `test` and the ledger `chat`:

```javascript
const flureenjs = require('@fluree/flureenjs');
const flureeServerUrl = "http://localhost:8090";
var flureeDbConn = flureenjs.connect(flureeServerUrl);

const ledger = "test/chat";
var myDb = flureenjs.db(flureeDbConn, ledger);
let queryMap = {
  "query": {"select": "?nums",
            "where": [["$fdb", ["person/handle", "zsmith"], "person/favNums", "?nums"]]},
  "flakes": [...]
};

flureenjs.queryWith(myDb, queryMap)
  .then( results => {console.log(results)})
  .catch( error => {console.log('Error ', error);});

flureenjs.close(flureeDbConn);
```
