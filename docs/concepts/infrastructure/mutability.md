---
sidebar_position: 7
---

# Mutable Fluree

While Fluree is an immutable ledger, there are several features that provide some
flexibility around hiding and removing data.

## Deleting Data {#deleting_data}

There is the standard way of [deleting data](/overview/transact/deleting_data.mdx). Using
this method, the data will not appear in a query against the current ledger, however
the record of that data being added and deleted from the ledger are still present.

Let's say, for example, you delete or overwrite a person's phone number. When you
query for that person, their phone number (the one you deleted) will not appear.
However, if you search for the history of all the updates made to that person, the
phone number will still appear. If you search for that person's data as of a previous
block, that phone number will still appear.

If you do not need to remove the traces of a certain piece of deleted data, then
this is a good option. Deleting data in this matter maintains the full integrity
of your blockchain.

## Hiding Flakes {#hiding-flakes}

> BETA FEATURE

Another option is hiding flakes:

- Hidden data does not appear in queries of the current ledger.
- Hidden data does not appear in queries of past ledgers.
- The integrity of the blockchain is maintained.

A `hide` request can have the following keys:

<!-- markdownlint-disable MD013 -->
Key | Required? | Description
-- | -- | --
hide | yes | Subject id, unique two-tuple, or flake-format
block | no | Optional block or range of blocks to return, options for the format of this value are the same as for block or history queries (see in [history](/overview/query/history_query.mdx)).
local | no | Defaults to `true`. Whether to hide flakes locally or across the entire network. Currently hiding flakes is only supported for a single server.

To hide flakes, you specify a given flake patten, such as
`[null, "person/handle", "jdoe"]`. In this case, any flakes where the predicate
is `person/handle`, and the object is `jdoe` will be matched, and hidden. To see
all the flakes it would impact, you could issue the following query to the `/history`
endpoint ([see example](/reference/http/examples.md#history)).

You can also add a `block` key-value pair, which limits the blocks hidden (this
works in the same way as the block key in history queries).

```all
// to see flakes to be hidden, issue to /history 

{
    "history": [null, "person/handle", "jdoe"]
}
```

To see an example of `hide` request, see the [API section on /hide](/reference/http/examples.md#hide).

When flakes are hidden, the original block files are renamed with a version tag,
for example `000000000000005:v1.fdbd`. A new `000000000000005.fdbd` is created that
omits the hidden flakes, as well as the original transaction `_tx/tx`. A single
hide request can impact multiple blocks and a single block can have flakes hidden
multiple times (i.e. `v2`, `v3`, etc).

Hiding flakes cannot be reversed, so make sure to double-check before issuing the
request. The only way to undo hidden flakes is to delete or rename the latest block
and remove the `v1` from the file name of the original block. Please only do this
if you understand the full repercussions.

Currently hiding flakes is only supported when using an open API.

## Purging Data {#purging-data}

Purging data is not currently supported, but will allow users to completely remove
any trace of a flake. Purging data is the most extreme option for mutable, and does
NOT maintain the integrity of the blockchain.

## Querying Across Ledgers {#querying-across-ledgers}

One common reason for wanting mutable data is to store personally identifiable information
(PII). One common way for dealing with PII is by storing the PII in one ledger and
non-sensitive data in a separate ledger. A single query can join data across multiple
ledgers (see the [query syntax](/overview/query/analytical_query.mdx#prefixes-key) here).

In this situation, the ledger with PII can be shared only with select users, and
information that should be deleted can be handled in any of the ways listed above:

- hiding data
- purging data.
