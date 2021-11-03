# Technical Overview

Fluree is an immutable, time-ordered ledger.
Each block is an atomic update that is cryptographically signed to prevent tampering and linked
to the previous block in the chain.

You can run Fluree privately or as part of a federated network.
A private Fluree is a group of ledgers run on a single server, hosted either by you or by Fluree
for you.
Federated Fluree is a group of ledgers shared by a network. In addition to all the features of a
private instance of Fluree, running Fluree federated provides additional data integrity. With a
federated Fluree, the network uses an agreed-upon consensus algorithm to reach a shared state.  

You can find more in-depth information about both individual ledger
[infrastructure](/concepts/infrastructure/file_system.md) and
[network infrastructure](/concepts/infrastructure/network_infrastructure.md) in later sections.

## Data Model {#data-model}

This section is background on the way data is conceptualized in any given ledger in Fluree.
This section covers topics like flakes, blocks, and the subject-predicate-object model.

### Overview {#overview}

When a Fluree ledger is initialized, block 1 is created. This block contains certain important
metadata, including all the [System Collections](/concepts/infrastructure/system_collections.md)
needed to make ledger features work.

Each block corresponds to a moment in time, and the data in a block consists of a group of atomic
updates made to that ledger at a given point in time.

These atomic updates are very specially formatted logs. Each update is a called a [flake](#flakes).
Flakes are a specific fact at a specific point in time about a specific subject. No two flakes are the
same.

We will go into detail about the contents of the transaction response in the
[Block Metadata](#block-metadata) section. However, it is important to know that, every block
contains a hash, a timestamp, and the size of the block data (block-bytes).
In addition to all of the data that is added, updated, or deleted in that block.

We can think of the ledger at any given point in time as the combination of all the flakes up until
that point. For example, the ledger at block 5 is the result of "playing all of the flakes forward"
from blocks 1 through 5.

Rather than storing a copy of the entire ledger in each block, every block contains only flakes, or
facts about entities, that are different as of that block.

### Collections and Predicates {#collections-and-predicates}

A [collection](/overview/schema/collections.mdx) is analogous to a relational database table.
Every time you want a new type of item in your ledger, you would create a new collection.
For example, collections in your ledger might be person, company, and city.

Every collection has [predicates](/overview/schema/predicates.mdx). Predicates are analogous to
relational ledger columns. The features of a collection are its predicates. For example, the person
collection might have the following predicates: `person/firstName`, `person/lastName`,
and `person/age`.

Together, collections, and predicates make up a Fluree schema.

### Subject-Predicate-Object Model {#subject-predicate-object-model}

Every item in the ledger is called a `subject`. When you create a new subject, you need to specify
what collection it belongs to (for example, a person). When you create a subject, Fluree
automatically generates an `_id` for that subject. This `_id` is a long integer, which uniquely
references the subject in the ledger.

In addition to an `_id`, subjects can have an unlimited number of `predicate`s.
For example, when you create your person, you might give them a
`person/firstName`, `person/lastName`, and `person/age` - those are the predicates.

In addition to subjects and predicates, we have something called objects in Fluree.
The object is the value of the subject-predicate combination.
So, a subject could be `17592186044440` (a subject `_id`), a corresponding predicate could
be `person/firstName`, and a corresponding object could be `Mike`.

All together, a subject, predicate, and object together is called a triple.
These triples, or [RDF triples](https://www.w3.org/TR/rdf-concepts/), are a standard structure for
data, which allows Fluree to be compatible with other triple-store databases.
You can also take the triples created by the Fluree transactor and ingest them into a query engine
that can interpret triples.

### Flakes {#flakes}

Flakes are modified RDF triples. Because each block in a Fluree represents the ledger at a different
point in time, flakes not only contain a subject-object-predicate, but also a time `t`, and a
boolean (`true`/`false`). The sixth element of a flake is a JSON-object for metadata, which is not yet
fully implemented.

The `t` is a negative integer. `t` is a more granular notion of time than a block. A block with multiple
transactions will have multiple `t`s. Each block has a [metadata flake](#block-metadata) with the
predicate `_block/number` that links a `t` with a positive block integer.

For example, if in block 3, we add a person with a `person/firstName` of `Mike`, that triple is true
as of a given point in time. If in block 10, we change `Mike` to `Michael`, our transaction would
create two flakes: the first flake would retract the current value:

Part | Value
-- | ---
Subject | Relevant subject id
Predicate | person/firstName
Object | Mike
Time | - 15
Boolean | False
Metadata | {}

The second flake would assert the new fact:

Part | Value
-- | ---
Subject | Relevant subject id
Predicate | person/firstName*
Object | Michael
Time | - 15
Boolean | True
Metadata | {}

If you issue a [block query](/overview/query/block_query.mdx), you can see all the flakes issued at
a given block.  

> Really, when looking at a flake, the predicate name would not be displayed.
> Rather the predicate, like every other item in a Fluree ledger is a subject, and it has a subject id.
> So that predicate's subject id appears in the flake, not the name.

### Block Metadata {#block-metadata}

After the user issues a transaction, a Fluree transactor creates new [flakes](#flakes), which
represent the changes made to the ledger at that given point in time.
In addition to those flakes, there are also new flakes, which represent the metadata for that block
(this is distinct from the sixth element of a flake, where metadata for an individual flake will be
stored - not currently implemented).

This metadata is also in the form of flakes, and it is recorded in the ledger in the same way as any
other information. The difference is that metadata flakes are automatically generated and cannot
be edited. Some custom metadata can be
[included in your transaction](overview/transact/basics.md#adding-custom-metadata).

Metadata for each transaction is stored in the `_block` and `_tx` collections.
Both `_block` and `_tx` are search-able in the same way as any other information in the ledger.
