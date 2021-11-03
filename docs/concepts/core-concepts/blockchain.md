---
sidebar_label: Blockchain
sidebar_position: 3
keywords:
    - architecture
    - blockchain
---
# Blockchain & Fluree's Ledger

## Overview {#overview}

Data integrity and trust is an important capability for many applications. As we
increasingly share data across boundaries (organizational, geographic, even departmental)
it is important that those receiving information have the ability to validate its
integrity. As machine learning and AI become more prevelant and make important decisions
on their own, the algorithms should be validating the information they are using
to make decisions, especially when those decisions have significant implications.
We should also be able to trace back the data that was used to make these decisions,
whether the decision was made by an alogorithm or a human.

Collaboration around data also requires a common frame of reference. A traditional
data silo needs only to collaborate with the application that sits in front of
it - and even then reproducability of data can be valuable yet traditional databases
don't provide it. Once data is strategically leveraged by many consumers, and may
have multiple data producers, being able to agree on data becomes critical. Much
in the way software source control gave one version of truth and enabled collaborative
software development, similar capability is needed to effectively collaborate around
data.

Fluree has many capabilties that come together which make what it does possible,
but at the core of Fluree's data integrity is how its ledger is managed and how
blockchain plays a role. It is important to note that Fluree is interested in solving
problems around data which will vary from use case to use case, and for that reason
customers have a large amount of control of how these technologies are utilized.
Where a capability is transparent, it is 'always on' (like
[merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) generation from new
[Flakes](docs/concepts/core-concepts/flakes)). Other capabilities have tradeoffs, and Fluree
tries to give the end user a large degree of control on what they feel is important
for their use case, letting them focus on the parts that are important to them and
keeping the parts that are not out of the way.

"Blockchain" is a loaded word that typically comes with a preconceived notion based
on whatever blockchain technology someone has had experience with. If one has experience
with multiple technologies, the highest level of comparison of Fluree vs everything
else is:

- **Fluree is data-centric:** What we mean is that the primary way you interact
 with Fluree is more like interacting with a database. You attempt to mutate data,
  and that attempt will trigger business rules (Fluree SmartFunctions) to validate
  if it is allowed. Almost every other blockchain technology is
  application-centric - you call a business process (i.e. SmartContract) and it
  in turn will store data in its proprietary silo as needed. This isn't a
  better/worse distinction, or even an either/or distinction, however Fluree's view
  on the benefits of being more data-centric are well documented.
- **Fluree is a private blockchain:** Fluree's network and consensus will be more
  like Hyperledger Fabric than public blockchains like Bitcoin and Ethereum. This
  in no way means the data housed in Fluree cannot be made publicly available -
  it can and often is - this distinction is only focused on who gets to vote on
  the validity of a transaction. Public/Private is a fairly big tradeoff, offering
  different benefits - while not common, Fluree has plenty of customers that utilize
  both in the context of a single solution.
- **Fluree is fast:** This is really a side effect of the prior point, but it is
  frequently asked so separately noted. As a private network, voting on consensus
  becomes possible as you can calculate the majority. This means the speed of the
  blockchain can work as fast as >50% of the network can communicate and agree -
  there is no need to wait 10s of seconds to 10s of minutes to allow a full decentralized
  network to gossip and agree. Generally transactions can be expected to finalize
  in Fluree in hundreds of milliseconds, and queries in milliseconds, or even sub-millisecond.
- **Fluree is a DLT:** Blockchain is really a type of distributed ledger technology.
  There is no definitive definition of what is a blockchain, but it is our view
  we are probably more in the DLT family than constrained entirely into the specific
  blockchain sub-category.

While an agreed upon definition of blockchain may be elusive, blockchains have the
following things in common and we'll address how Fluree handles each one of them
here:

- Blockchains have a way to prove identity
- Blockchains are tamper-resistant
- Blockchains can reproduce prior states
- Blockchains operate on a set of agreed upon rules (Fluree SmartFunctions)
- Blockchain operators come to agreement via a consensus protocol

### Proving Identity {#proving-identity}

Every transaction, at the point is gossiped amongst transaction servers, must be
digitally signed utilizing asymetric cryptography by way of ECDSA, and specifically
utilizing the secp256k1 curve. While this solution offers immense individual security,
it is also recognized that many applications of Fluree may not want to require end-users
to hold their own cryptographic private keys. Fluree offers options to give
flexibility -including a more traditional password authentication model and an
'authority' model where an application, or other identity, can transact on behalf
of another user but still utilize the end-user's permissions. Fluree can also be
run as a 'root access' database like a traditional database might run, where it
is isolated via firewall from all but the application server(s) that are controlling
security. These alternative methods still end up cryptographically signing transactions
but in some cases transparently for the operators of Fluree, ultimately ensuring
Fluree is always operating the same way regardless of which method is used. This
gives Fluree operators the flexibiltiy to migrate from a network protectected environment
(db behind firewall with root access allowed) to a cryptographically protected environment
(end users holding private keys) or anywhere inbetween, at any time, and can even
run these methods simultaneously.

Fluree is also in progress of natively supporting DIDs - W3C decentralized identifiers
that can originate from different sources (differnt DID methods), or Fluree can
act as a DID repository itself.

Regardless of the method of proving identity, validating that identity is the first
step. An identity must exist in the Fluree ledger (as an `_auth` record), and in
the case of ECDSA the `_auth/id` predicate holds a RIPEMD-160 hashed version of
the public key. Signatures are done on the SHA2-256 hash of the transaction payload
and include a recovery byte which allows validation without requring the sender
to publish their private key. One of the benefits of the secp256k1 curve is the
ability to derive the public key from a signature, and the recovery byte makes this
process a bit more efficient, which is done according to the algorithm in
[SEC1v2](https://www.secg.org/sec1-v2.pdf) section 4.1.6.

Avoiding public key disclosure can be important in some extremely sensitive environments,
and while a signature on a transaction ultimately exposes the public key for the
first time, the transaction can also remove the _auth/id for the user and create
a new one - meaning it is possible for an end user to utilize a new auth for every
transaction. While not necessary in most scenarios, the capability is available.

### Tamper resistance {#tamper-resistance}

Fluree generates a SHA-3 256 hash that is included as the `_tx/hash` predicate value
for every processed transaction. This is not to be confused with the `_tx/id`, which
itself is a hash of the original transaction payload. The `_tx/hash` is a hash of
*Flakes* that are the *result* of processing that original transaction payload.

Flakes are hashed utilizing a consistent sorting order and serialization. A block
includes one or more end-user transactions in addition to a block transaction which
is created by the current ledger leader. Therefore, a block always has 2 or more
transactions. The metadata in the block transaction includes the previous block's
hash, and like the other transactions has its own transaction hash value. All transaction
hashes within a block are placed in a merkle tree and result in a single merkle
root hash - which is the block hash.

Fluree guards against brute force attacks to determine content within a transaction
from its hash by requring a nonce to be included in every signed transaction and
encouraging end users to utilize a random seed for that nonce. Proper use of a nonce
prevents the ability reverse-engineer the content of a transaction. Even without
the nonce, this would only be possible if someone had broken the SHA-3 hashing algorithm
or had prior knowledge about the transaction's contents and it was operating on
a value with low entropy. Regardless, the nonce adds an extra layer of protection.

The block hash represents a provable state of every current and historic piece of
the data that makes up a Fluree ledger. If the block hash is published, it allows
a ledger to be provable even without decentralized consensus. It is important to
note that many of the data provenance and data trust characterstics that might be
thought of as requiring a decentralized blockchain do not actually require decentralization.
While decentralization may incrementally add trust, a ledger is fully auditable
by anyone with access to the content and hashes. Publishing a block hash periodically
eliminates any sort of revisionist history that could otherwise be possible, and
for this reason some of Fluree's customers periodically publish their block hashes
to a public blockchain. This could be accomplished however via any method of publishing
a hash with time attached to it, including printing the hash on a piece of paper
and sending it through the post office so it has a time stamp. The end result is
largely the same - decentralized consensus is not a requirement to prove tamper
resistance and integrity, but it may be desirable for other reasons.

### Reproducing state {#reproducing-state}

Fluree acts as an append-only log, where a new block is generated that contains
the Flakes that represent the delta in the ledger's state (and updated version of
a database). Every previous version can be reproduced by playing the ledger forward
from the beginning of the ledger, but Fluree makes this instantly accessible and
queryable via its Time Travel capability - made possibly by Fluree's special bi-temporal
indexing method.

### SmartFunctions (customizable rules) {#smartfunctions}

SmartFunctions are the way in which end users can build custom rules that govern
the ledger. They can be utilized for both permissioning and enforcing query (view)
permissions as well as transaction (write) permissions - however in the context
of this blockchain discussion the focus here is on trasactions/writes.

SmartFunctions are custom business rules, even custom function that might be leveraged
across business rules, stored as data (code as data) in the ledger itself. While
Fluree always uses the latest version of SmartFunctions to enforce the ledger, every
historical version is available and all provenance trackable. A SmartFunction can
even be developed that requires voting across multiple parties to update a SmartFunction.
In Fluree everything is data.

Fluree, while executing SmartFunctions, calculates a utilization metric called Fuel.
Fuel is similar to Ethererum Gas but is present to prevent situations like infinite
loops in SmartFunctions, but can also be leveraged to meter usage, bill different
parties, test different methods of optimization, or other capabilities.

### Consensus {#consensus}

Fluree uses the Raft protocol for consensus. While we previously suported PBFT,
it was not being utilized and has been removed for the time being. The code base has a pluggable protocol for consensus
and new consensus protocols can be added.
