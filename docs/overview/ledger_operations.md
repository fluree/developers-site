# Ledger Operations

This section discusses the ledger operations that are possible with Fluree.

## Creating a New Ledger {#creating-a-new-ledger}

You can create a new ledger through the user interface, or through the APIs.

See the section for
[creating a new ledger in the Reference Docs](/reference/http/examples.md#new-db).

## Deleting a Ledger {#deleting-a-ledger}

You can delete a ledger through the user interface or APIs. This will delete the ledger and all
associated files from all the servers in a network.

See the section for [deleting a ledger in the Reference Docs](/reference/http/examples.md#delete-db).

## In-Memory Fluree {#in-memory-fluree}

You can run Fluree in memory for testing purposes. To do so, simply specify `fdb-consensus-type`
as `in-memory` and `fdb-storage-type` as `memory`.
At this time, you can only run a single, centralized ledger in memory.

## Setting Your Own Private Key {#setting-your-own-private-key}

To use your own private key, first please see the section on
[public and private keys](/concepts/identity/auth_records.md#generating_keys) to see what is and
isn't valid as a private key.

If you have a valid private key, encoded with
[Base58Check Encoding](/concepts/identity/auth_records.md#generating_keys), then you can add
your private key to a `default_private_key.txt`. You can also change the name of the file that holds
the private key by changing the `fdb-group-private-key-file` config option (see below).

You can also run `./fluree_start.sh :keygen` to generate a public key, private key, and account id.
This will not start Fluree, it will just return those three pieces of information.

## Setting Up a Transactor Group {#setting-up-a-transactor-group}

Currently, transactor groups only support the Raft consensus algorithm to agree on a shared state
for a network of ledgers. With Raft, a total of `n` servers can support `f` failures: n = 2f + 1. This
means that anything less than 3 servers can sustain no failures, 5 servers can sustain two failures.

You can test a decentralized Fluree on a single computer (different ports) or on multiple computers.
Each member of Fluree needs to have its own folder containing
`fluree-ledger.standalone.jar`, `fluree_sample.properties`, and `fluree_start.sh`.

Before starting any of the servers, make sure to set `fdb-group-servers` and
`fdb-group-this-server`.

All the members of the transactor group need to have the same `fdb-group-servers`.
All of the servers participating in ledger-group should be listed in the format of server-id@host:port,
for example to run them all on one machine, you would list:

`fdb-group-servers=myserver1@localhost:9790,myserver2@localhost:9791,myserver3@localhost:9792`

Each server should have a different `fdb-group-this-server`, which should be the server-id
(from `fdb-group-servers`).

Other configuration options that are relevant to setting up a transactor group are:

`fdb-group-timeout`, `fdb-group-heartbeat`, `fdb-group-log-directory`,
`fdb-group-snapshot-threshhold`, `fdb-group-log-history`.

See the full explanation for those settings in [config options](#config-options).
