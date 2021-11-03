---
sidebar_position: 2
---
# HTTP Examples

In order to ensure speed of processing queries and transactions, different types of queries and transactions should be issued to different endpoints. All requests, unless otherwise specified, should be POST requests.

## /dbs {#dbs}

A POST request with an empty object or a GET request to `/fdb/dbs` returns all the dbs in the transactor group. These requests do not need to be signed.

An example of an unsigned request to `/dbs`.

```http
Action: POST or GET
Endpoint: http://localhost:8090/fdb/dbs
Headers: None
Body: Null
```

## /new-db {#new-db}

A ledger id must begin with a network name followed by a `/` and a dbid. Network names and dbids may only contain lowercase letters and numbers. In your request, you must specify `db/id`.

If the network specified does not exist, it creates a new network. This request returns a command id, the request does not wait to ledger to be fully initialized before returning.

These requests do not need to be signed.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/new-db
Headers: None
Body: {"db/id": "test/one"}
```

## /nw-state {#nw-state}

This provides a status of the Fluree network as recorded by a particular (ledger or transact) server.  Status information includes raft state, list of servers in the Fluree network, list of ledgers, and the current # of transactions queued.

To retrieve the status, simply send an empty POST request to the `/nw-state` endpoint.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/nw-state
Headers: None
Body: None
```

The result is a map of key/value pairs, for example:

```http
{:snapshot-term 11,
 :latest-index 19940,
 :snapshot-index 19800,
 :other-servers [],
 :index 19940,
 :snapshot-pending nil,
 :term 11,
 :leader "myserver",
 :timeout-at 1611088055092,
 :this-server "myserver",
 :status "leader",
 :id 88389,
 :svr-state [{:id "myserver", :active? true}],
 :commit 19940,
 :servers {:myserver {:vote [11 true],
                      :next-index 19748,
                      :match-index 19940,
                      :snapshot-index nil,
                      :stats {:sent 0, :received 0, :avg-response 0}}},
 :raft {:version 3,
        :leases {:servers {:myserver {:id "myserver", :expire 1611088056918}}},
        :_work {:networks {:test "myserver"}},
        :_worker {:myserver {:networks {:test 1610570486137}}},
        :cmd-queue [{:test 0}],
        :new-db-queue [{:test 0}],
        :networks {:test {:dbs {:chat {:status "ready", :block 6, :index 1, :indexes {:1 1610570484628}},
                                :invoice {:status "ready", :block 5, :index 1, :indexes {:1 1610571471362}},
                                :test/nl-1 {},
                                :nl-2 {:status "ready", :block 2, :index 1, :indexes {:1 1610985470087}},
                                :test/nl-2 {}}}}},
 :voted-for "myserver",
 :open-api true,
 :timeout-ms 666}
```

## /export {#export}

This endpoint exports an existing ledger into either `xml` or `ttl`.

You can optionally specify a block (as an integer). If none provided, defaults to the most recent block.
You can optionally specify a format (`xml` or `ttl`). If none provided, defaults to `ttl`.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/export
Headers: None
Body: {"format": "ttl"}
```

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/export
Headers: None
Body: { "format": "xml" , "block": 10 }
```

## /delete-db {#delete-db}

This deletes a ledger. Deleting a ledger means that a user will no longer be able to query or transact against that ledger, but currently the actual ledger files will not be deleted on disk. You can choose to delete those files yourself - or keep them. You will not be able to create a new ledger with the same name as the deleted ledger.

Use the following request when Fluree server is running in open-api mode (i.e., fdb-open-api=true)

```http
Action: POST
Endpoint: http://localhost:8090/fdb/delete-db
Headers: None
Body: {"db/id": "NETWORK/DBID"}
```

When the Fluree server is running in closed-api mode (i.e., fdb-open-api=false), the request must be signed. The process to sign the delete-db request is the similar to signing queries and transactions; only the end-point is different. .

```http
Action: POST
Endpoint: http://localhost:8090/fdb/delete-db
Headers {:content-type :application/json,
           "Digest" "SHA-256=WRw/lfS4v6C7whgUKhbfJPxPQ3wNnRx99NPqDcBCe9M=",
           "X-Fluree-Date" "Wed, 1 Jul 2020 17:38:13 GMT",
           "Signature" "keyId=\"na\",headers=\"(request-target) x-fluree-date digest\",algorithm=\"ecdsa-sha256\",signature=\"1b3044022072efe51f308084a691310824d6065d1b413fcd5d6d7ca310b78e99013db6a08102201485659f379abf8fdf2421e73cb60de2f86394ad22039ec5c8cb475e69b7fc6b\",date=\"Wed, 1 Jul 2020 17:38:13 GMT\""},
 Body: {"db/id": "NETWORK/DBID", "auth": "AUTH-ID"}
```

## /add-server {#add-server}

This endpoint attempts to dynamically add server to the network. Please note, this is a beta feature in 0.13.0

Let's say you have two servers running, `ABC` and `DEF`, in order to get a third server, `GHI` to join the network, you need to start up server `GHI` with the following properties. Note the properties can be set in a property file or environment variables as well:

```http
./fluree_start.sh -Dfdb-join?=true -Dfdb-group-servers=ABC@localhost:9790,DEF@localhost:9791,GHI@localhost:9792 -Dfdb-group-this-server=GHI -Dfdb-group-log-directory=data/GHI/raft/ -Dfdb-storage-file-directory=data/GHI/fdb/ -Dfdb-api-port=8092
```

Then, once `GHI` is running a request needs to be sent to either of the two servers already in the network, `ABC` or `DEF`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/add-server
Headers: None
Body: {"server": "GHI"}
```

If a majority of the network agrees to the configuration change, `GHI` will then have a preset amount of rounds to sync up it's network state - for example, it's RAFT state. By default, the new server has 10 rounds, but if you changed `fdb-group-catch-up-rounds` in your properties, it could be more or less. Once its RAFT state is synced, the server will attempt to copy all block and index files from the other servers in the network. This should all happen in one try, however, if you have a large number of blocks or ledgers, you may need to shut down and restart `GHI` (please do let us know if you encounter issues. This is a beta feature, and any feedback on your experiences is helpful. You can reach us on Slack or at `support@flur.ee`).

Only one configuration change can be in process at once. Attempts to issues simultaneous additions or removals will be rejected.

## /remove-server {#remove-server}

This endpoint attempts to dynamically remove a server from the network. Please note, this is a beta feature in 0.13.0

Let's say you have three servers running, `ABC`, `DEF`, and `GHI`. If you want to shut down any of the servers, you can issue a request to any of the servers to shut down a given server.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/remove-server
Headers: None
Body: {"server": "GHI"}
```

If a majority of the network agrees to the configuration change, then `GHI` will be removed from the network. If `GHI` was the leader, then a new leader will be elected. Note, the running server will still have query access to the blocks it has received, but it will not be able to issue transaction and it will not receive updates.

Only one configuration change can be in process at once. Attempts to issues simultaneous additions or removals will be rejected.

## /query {#query}

All single queries in FlureeQL syntax that include a `select` key should be issued through the `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/query` endpoint. If you do not have `fdb-open-api` set to true (it is true by default), then you'll need to sign your query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

An example of an unsigned request to `/query` with the network, `dev` and the ledger `main`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/query
Headers: None
Body: { "select": ["*"], "from": "_collection"}
```

An example of a signed request to `/query`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/query
Headers: {
                content-type:       application/json,
                mydate:             Thu, 13 Mar 2019 19:24:22 GMT,
                digest:             SHA-256=ujfvlBjQBa9MNHebH8WpQWP7qQO1L+cI+JH//YvWTq4=,
                signature:          keyId="na",headers="(request-target) host mydate digest",algorithm="ecdsa-sha256",signature="1c3046022100da65438f46df2950b3c6cb931a73031a9dee9faaf1ea8d8dd1d83d5ac026635f022100aabe5483c7bd10c3a468fe720d0fbec256fa3e904e16ff9f330ef13f7921700b"
            }
Body: { "select": ["*"], "from": "_collection"}
```

## /multi-query {#multi-query}

If you are submitting multiple FlureeQL queries at once (using the [multi-query syntax](/overview/query/advanced_query.mdx#multiple-queries)), that should be done through the `/multi-query` endpoint.

An example of an unsigned request to `/multi-query`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/multi-query
Headers: None
Body: { "query1": { "select": ["*"], "from": "_collection"},
        "query2": { "select": ["*"], "from": "_predicate"}}
```

An example of a signed request to `/multi-query`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/multi-query
Headers: {
                content-type:       application/json,
                mydate:             Thu, 13 Mar 2019 19:24:22 GMT,
                digest:             SHA-256=6bc8bd9e8cf3079f2fe7c66b4151745ca80168c89835d9aaef6a79404fcb3018,
                signature:          keyId="na",headers="(request-target) host mydate digest",algorithm="ecdsa-sha256",signature="1c3046022100da65438f46df2950b3c6cb931a73031a9dee9faaf1ea8d8dd1d83d5ac026635f022100aabe5483c7bd10c3a468fe720d0fbec256fa3e904e16ff9f330ef13f7921700b"
            }
Body: { "query1": { "select": ["*"], "from": "_collection"},
        "query2": { "select": ["*"], "from": "_predicate"}}
```

To build the body of this query, create unique names for your queries, and set those as the keys of the your JSON query. The values of the keys should be the queries themselves.

For example, this query selects all chats and people at once.

```json
{
    "chatQuery": {
        "select": ["*"],
        "from": "chat"
    },
    "personQuery": {
         "select": ["*"],
        "from": "person"
    }
}
```

Any errors will be returned in a header, called `X-Fdb-Errors`. For example, incorrectCollection is attempting to query a collection that does not exist.

```json
{
    "incorrectCollection": {
        "select": ["*"],
        "from": "apples"
    },
    "personQuery": {
         "select": ["*"],
        "from": "person"
    }
}
```

The response will have a status of 207, and it will only return the response for `personQuery`.

```json
{
    "personQuery": [
      {
        "_id": 4303557230594,
        "person/handle": "zsmith",
        "person/fullName": "Zach Smith",
        "person/karma": 5
      },
      ...
    ]
}
```

## /block {#block}

FlureeQL [block queries](/overview/query/block_query.mdx) should be submitted to the `/block` endpoint. This does not include other types of queries (basic queries, history queries, etc) that might have a "block" key. This only includes queries like those in the linked section - queries that are returning flakes from a block or set of blocks.

An example of an unsigned request to `/block`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/block
Headers: None
Body: { "block": 5 }
```

## /history {#history}

FlureeQL [history queries](/overview/query/history_query.mdx) should be submitted to the `/history` endpoint. This only includes queries like those in the linked section.

An example of an unsigned request to `/history`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/history
Headers: None
Body: {
  "history": ["person/handle", "zsmith"],
  "block": 4
}
```

## /transact {#transact}

All unsigned transactions, except transaction issued through the GraphQL syntax, should be issued to the `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/transact` endpoint.

If you do not have `fdb-open-api` set to true (it is true by default), then you cannot use the `/transact` endpoint. You'll need to use the [`/command` endpoint](#command).

An example of an unsigned request to `/transact`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/transact
Headers: None
Body: [{
    "_id":    "_user",
    "username": "jdoe",
  }]
```

By specifying a `Request-Timeout` header, you can set a transaction timeout. The maximum transaction size that is currently permitted by Fluree is 2MB. A sufficiently large transaction can take 50 seconds or longer to be resolved. By default, your request will timeout after 60 seconds.

An example of setting your own custom timeout is below. The value provided to `Request-Timeout` is in milliseconds.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/transact
Headers: {"Request-Timeout": 10000 }
Body: [{
    "_id":    "_user",
    "username": "jdoe",
  }]
```

## /graphql Query {#graphql}

All queries and transactions in GraphQL syntax should be issued through the `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/graphql` endpoint. If you do not have `fdb-open-api` set to true (it is true by default), then you'll need to sign your query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

An example of an unsigned request to `/graphql`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/graphql
Headers: None
Body: {"query": "{ graph {
  chat {
    _id
    comments
    instant
    message
    person
  }
}
}"}
```

## /graphql Transaction {#graphql-transaction}

All queries and transactions in GraphQL syntax should be issued through the `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/graphql` endpoint. If you do not have `fdb-open-api` set to true (it is true by default), then you'll need to sign your GraphQL transaction like a query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

An example of an unsigned request to `/graphql`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/graphql
Headers: None
Body: {"query": "mutation addPeople ($myPeopleTx: JSON) {
  transact(tx: $myPeopleTx)
},
"variables": {
  "myPeopleTx": "[
    { \"_id\": \"person\", \"handle\": \"oRamirez\", \"fullName\": \"Oscar Ramirez\" },
    { \"_id\": \"person\", \"handle\": \"cStuart\", \"fullName\": \"Chana Stuart\" }]"
}}
```

## /sparql {#sparql}

All queries in SPARQL syntax, regardless of type, should be issued through the `/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/sparql` endpoint. If you do not have `fdb-open-api` set to true (it is true by default), then you'll need to sign your query ([signing queries](/concepts/identity/signatures.md#signed-queries)).

An example of an unsigned request to `/sparql`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/sparql
Headers: None
Body: "SELECT ?chat ?message ?person ?instant ?comments
 WHERE {
    ?chat   fd:chat/message  ?message;
            fd:chat/person   ?person;
            fd:chat/comments ?comments;
            fd:chat/instant  ?instant.
 }"
```

## /sql {#sql}

All queries in SQL syntax should be issued through the
`/fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/sql` endpoint. If you do not have
`fdb-open-api` set to true (it is true by default), then you'll need to sign
your query ([signing
queries](/concepts/identity/signatures.md#signed-queries)).

An example of an unsigned request to `/sql`:

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/sql
Headers: None
Body: "SELECT ?chat ?message ?person ?instant ?comments
 WHERE {
    ?chat   fd:chat/message  ?message;
            fd:chat/person   ?person;
            fd:chat/comments ?comments;
            fd:chat/instant  ?instant.
 }"
```

## /command {#command}

To see examples of sending a request to the `/command` endpoint, see [signed transactions](/concepts/identity/signatures.md#signed-transactions).

## /reindex {#reindex}

Available in `0.11.7` or higher. Reindexes the specified ledger.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/reindex
Headers: None
Body: None
```

This request may take some time to return. It will return a map, such as the following:

```json
{
    "block": 13,
    "t": -27,
    "stats": {
        "flakes": 899990,
        "size": 41435614,
        "indexed": 13
    }
}
```

## /reindex-fulltext {#reindex-fulltext}

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/reindex-fulltext
Headers: None
Body: None
```

This request may take some time to return. It will return a map, such as the following:

```json
{
    "block": 13,
    "t": -27,
    "stats": {
        "flakes": 899990,
        "size": 41435614,
        "indexed": 13
    }
}
```

## /hide {#hide}

This is a beta feature. To read about how it works, visit
[hiding flakes](/concepts/infrastructure/mutability.md#hiding-flakes).

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/hide
Headers: None
Body: {
  "hide": [387028092977154, "comment/message", "bad comment"],
    "local": true
}
```

## /gen-flakes {#gen-flakes}

Returns the list of flakes that would be added to a ledger if a given transaction is issued. The body of this request is simply the transaction. Note that this is a test endpoint. This does _NOT_ write the returned flakes to the ledger.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/gen-flakes
Headers: None
Body: [{
    "_id":    "person",
    "handle": "joanne",
  }]
```

## /query-with {#query-with}

Returns the results of a query using the existing ledger flakes, including flakes that are provided with the query.

The request expects a map with two key-value pairs:

| Key      | Value                                                                              |
| -------- | ---------------------------------------------------------------------------------- |
| `flakes` | An array of valid flakes                                                           |
| `query`  | A query to issue against the current ledger plus the flakes in the flakes value. |

The `t` on the flakes provided has to be current with the latest ledger. For example, if you used `gen-flakes`, but then issued a transaction, you will need to use `gen-flakes` again to generate new valid flakes.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/query-with
Headers: None
Body: {
  "query": {"select": ["*"], "from": "person"},
  "flakes": [[351843720888321, 1002, "JoAnne", -5, true, nil]]}
```

## /test-transact-with {#test-transact-with}

Given a valid set of flakes that could be added to the ledger at a given point in time and a transaction, returns the flakes that would be added to a ledger if a given transaction is issued.

The request expects a map with the following key-value pairs:

| Key      | Value                                                                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flakes` | An array of valid flakes                                                                                                                                        |
| `txn`    | A transaction to issue against the current ledger plus the flakes in the flakes value. This endpoint does _NOT_ actually write the transaction to the ledger. |
| `auth`   | (Optional) The `_auth/id` with which to issue the transaction.                                                                                                  |

The `t` on the flakes provided has to be current with the latest ledger. For example, if you used `gen-flakes`, but then issued a transaction, you will need to use `gen-flakes` again to generate new valid flakes.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/test-transact-with
Headers: None
Body: {
  "tx": [{ "_id": "person", "handle": "kReeves" }],
  "flakes": [[351843720888321, 1002, "JoAnne", -5, true, nil]]}
```

## /block-range-with-txn {#block-range-with-txn}

A POST request to `/fdb/[NETWORK-NAME]/[DBID]/block-range-with-txn` returns block stats, as well as flakes and transactions for the specified block(s).

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/block-range-with-txn
Headers: None
Body: {
  "start": 1,
  "end": 2}
```

## /health {#health}

A GET request to `/fdb/health` returns whether the server is ready or not. You are not able to test this endpoint in the sidebar. These requests do not need to be signed.

```http
Action: GET
Endpoint: http://localhost:8090/fdb/health
```

## /database-stats {#database-stats}

A POST request to `/fdb/[NETWORK-NAME]/[DBID]/database-stats` provides stats about the requested ledger.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/database-stats
Headers: None
Body: None
```

## /storage {#storage}

A GET request to `/fdb/storage/[NETWORK-NAME]/[DBNAME-OR-DBID]/[TYPE]` returns all key-value pairs of a certain type. You are not able to test this endpoint in the sidebar. These requests do not need to be signed.

```http
Action: GET
Endpoint: http://localhost:8090/fdb/storage/[NETWORK-NAME]/[DBNAME-OR-DBID]/[TYPE]
```

A GET request to `/fdb/storage/[NETWORK-NAME]/[DBNAME-OR-DBID]/[TYPE]/[KEY]` returns the value for the provided key.

```http
Action: GET
Endpoint: http://localhost:8090/fdb/storage/[NETWORK-NAME]/[DBNAME-OR-DBID]/[TYPE]/[KEY]
```

## /sub {#sub}

A POST request to `/fdb/sub` handles subscriptions. More documentation on this feature coming soon. You are not able to test this endpoint in the sidebar. These requests do not need to be signed.

## /new-keys {#new-keys}

A POST request with an empty object or a GET request to `/fdb/new-keys` returns a valid public key, private key, and auth-id. Learn more about [how identity is established in Fluree](/concepts/identity/auth_records.md#generating-a-public-private-key-auth-id-triple). These requests do not need to be signed.

## /pw/generate {#pwgenerate}

See the [Password Management Guide](/concepts/identity/password_management.md) for more information.

Returns a valid token for a given user or role. Sets a valid password for that user or role.

| Keys     | Required | Explanations                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| password | true     | A password string                                                                                                                                                                                                                          |
| user     | false    | You can pass in either a `_user/username` or a `subject _id`. An auth record with type `password-secp256k1` with the relevant salt will be created and attached to this `_user`. Either a user or roles must be provided.                  |
| roles    | false    | You can pass in an array of role subjects or two-tuples. An auth record with type `password-secp256k1` with the relevant salt will be created and all the specified roles will be attached to it. Either a user or roles must be provided. |
| expire   | false    | Expiration time in epoch ms.                                                                                                                                                                                                               |

If using a closed API, this request needs to contain a valid token in the header.

The below request will return a valid token for the user, which has permissions that correspond to the listed user's roles.

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/pw/generate
Headers:
Body: {
    "password": "appleSaucePanFried",
    "user": "myUser",
  "expire": "TIME IN EPOCH MS"
  }
```

## /pw/renew {#pwrenew}

See the [Password Management Guide](/concepts/identity/password_management.md) for more information.

This endpoint returns a valid JWT token. You need to pass a NON-expired JWT token in the header, and an expiration time (in epoch milliseconds from now), to the body of the request.

| Keys   | Required | Explanations                                       |
| ------ | -------- | -------------------------------------------------- |
| expire | false    | Expiration time in epoch ms from now. i.e. `1000`. |

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/pw/renew
Headers: { Authorization: "Bearer TOKEN-HERE" }
Body: { "expire": "TIME IN EPOCH MS" }
```

## /pw/login {#pwlogin}

See the [Password Management Guide](/concepts/identity/password_management.md) for more information.

| Keys     | Required | Explanations                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------- |
| password | true     | A password string                                                               |
| user     | false    | You must pass in your `_user/username`. Either a user or auth must be provided. |
| auth     | false    | You must pass in your `_auth_id` . Either a user or auth must be provided.      |
| expire   | false    | Requested time to expire in epoch milliseconds, i.e. `1000`.                    |

```http
Action: POST
Endpoint: http://localhost:8090/fdb/dev/main/pw/login
Headers: { Authorization: "Bearer TOKEN-HERE" }
Body: {
  "user": "myUsername",
  "password": "myPassword",
  "expire": "TIME IN EPOCH MS"
  }
```
