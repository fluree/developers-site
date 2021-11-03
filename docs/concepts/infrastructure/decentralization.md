---
sidebar_position: 8
---

# Decentralization

Fluree Enterprise Edition can be run as a decentralized ledger across organizational
boundaries. This differs from a [Fluree Transactor Group](/concepts/infrastructure/transactor_group.md),
which is designed to run within a single organization and can scale transaction load
while providing redundancy.

Decentralization expands decision making, and therefore trust around a ledger/db.
It is important to note that proof of a ledger's integrity can be accomplished without
decentralization. By integrity we mean identity around every transaction, tha
t it
hasn't been tampered with, and provenance for all data. To prove integrity, the
external party or parties you want to offer such proof will need access to the
ledger- something Fluree makes simple through permissioning. External parties can
also run a local query server to monitor and validate all new transactions.

What decentralization adds is (a) multiple parties have agreed to a certain set
of rules for a ledger, and (b) each party validates they still agree to those rules
with every transaction. Decentralization also ensures independently maintained copies
of the ledger, which can make it more challenging to alter history. However, the
best way to prove history is to publish Fluree's block hash to an external
source - something that can be done with or without decentralization (Fluree users
often use public blockchains to publish hashes to - i.e. Bitcoin, Ethereum or
Litecoin).

## Setting Up Decentralized Servers {#setting-up-decentralized-servers}

You would typically establish a decentralized network after creating an initial
[schema](/overview/schema/overview.md) and set of [SmartFunctions](/concepts/smart-functions/smartfunctions.md)
the group has agreed to. If any party in the decentralized network didn't agree
to this base set of "rules", that can simply be expressed by not participating.

The [identity](/concepts/identity/auth_records.md) of each participant must exist in
the ledger in the form of an _auth record, and generally they will have full access
to the ledger in order to properly validate transactions. While it is possible to
limit ledger access to particpants, [consensus](/concepts/infrastructure/consensus_algorithms.md)
will dictate that > 50% of the network can validate -- and validation requires you
have access to all of the data needed to do so. Because Fluree can combine multiple
ledgers dynamically, if different permissions were required for decentralized participants
it would generally be advised to utilize multiple ledgers instead of a single one.

Each decentralized party will connect to other ledger servers in the same way any
query server connects - with a set of IP addresses, presumably those of other decentralized
participants, and they connect with their respective [identity](/concepts/identity/auth_records.md).
The data the ledger will release to that identity will depend on the permissions
(via [SmartFunctions](/concepts/smart-functions/smartfunctions.md)). The servers prove
their identity by [signing](/concepts/identity/signatures.md) the connection request
with their private key. From there, a challenge is issued that must be signed
(to avoid any replay attacks), and the servers participate in a Diffie-Hellman key
exchange to encrypt traffic between them.

## Forming Blocks {#forming-blocks}

All valid, signed transactions sent to the network are forwarded to the other connected
servers via the [consensus](/concepts/infrastructure/consensus_algorithms.md) protocol's
log. This feature can be turned off, and a custom mechanism of forwarding transactions
can be utilized - this could be important if decentralized participants did have
different permissions.

Via the configured consensus protocol, the leader will broadcast the transaction
IDs that will constitute the next block. Each participant can independently process
those transactions to create a new block on their own, and the new resulting block
hash they independently compute is signed with their
[identity](/concepts/identity/auth_records.md) and forwarded to the leader.

The leader, after processing the transactions and computing its own block hash,
will collect the signed block hashes from decentralized participants. Once > 50%
of the hashes from participants (a) have arrived at the identical hash to its own
and (b) signed with a recognized decentralized identity, a new block is created.
This new block includes the signed hashes from the 3rd parties to allow independent
validation by each participant of the result. Participants check the hash to determine
there are at least 50% of valid participants arriving at the same result. Assuming
it agrees, it accepts and moves forward to the next block's creation. If they disagree,
they kick off a new leader election process per the configured consensus protocol.
