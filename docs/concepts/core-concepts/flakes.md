---
sidebar_label: Flakes
sidebar_position: 1
keywords:
    - architecture
    - flake
---
# Anatomy of a Flake

## Overview {#overview}

Every piece of data inside of a Fluree ledger is held in a data structure called
a Flake. A Flake is an atomic unit of information and can represent any conceivable
fact. It builds on top of the [W3C RDF](https://www.w3.org/RDF/) standard which
consists of a subject, predicate, and object (a "triple"). A Flake is a 6-tuple that
is optimized to achieve:

- A compact storage footprint
- Fast comparisons for queries
- Information required to provide Fluree's unique feature set

At a basic level, Fluree can be envisioned as a giant spreadsheet of data, with
every moment in time creating a new version that can instantly be referenced.
Each Flake defines a single cell in that giant spreadsheet, by identifying the row
number (subject ID), the column (predicate ID), and the cell's value (called object
in RDF). Data in Fluree is much more powerful than if it were in giant spreadsheet
however, it is a semantic graph database with time travel and provable provenance.
To capture some of this richness, a Flake needs to describe a bit more than just
subject, predicate and object.

A Flake's 6 elements are:

- `s` -> Subject id - analagous to the row number in a spreadsheet
  (long integer- 64 bits)
- `p` -> Predicate id - analagous to the column in a spreadsheet
  (positive integer - 32 bits)
- `o` -> Object - analagous to a cell value in a spreadsheet (mixed type)
- `t` -> Transaction reference (long negative integer)
- `op` -> Operation boolean - if adding Flake or retracting Flake (`true` or `false`)
- `m` -> Additional metadata for [RDF-star](https://w3c.github.io/rdf-star/) (nil,
  or a map keys/values) and other future functionality

The following example helps visualize how individual Flakes translate to the giant
spreadsheet analogy. Take, for example, the following set of Flakes:

```all
;; s     p          o             t   op  + (nil 'm' values)
;;---------------------------------------
  [25 'firstName' 'Jane'         -42 true]
  [25 'lastName'  'Doe'          -42 true]
  [25 'email'     'jane@doe.com' -86 true]
  [25 'username'  'janedoe'      -42 true]
  [26 'firstName' 'John'         -45 true]
  [26 'lastName'  'Smith'        -45 true]
  [26 'username'  'jsmith'       -45 true]
  [26 'follows'    25            -45 true]
  [26 'worksFor'   88            -45 true]
  [88 'company'   'ACME Inc"     -10 true]
```

These Flakes can be represented in a spreadsheet format as follows:

| \_id | firstName | lastName | email | username | follows | worksFor | company |
| ---- | --------- | -------- | -------- | ----- | ----- | -------- | -------- |
| 25   | Jane      | Doe      | jane@doe.com | janedoe  |       |     |       |
| 26   | John      | Smith    |              | jsmith   | _-> 25_ | _-> 88_  |  |
| 88   |         |         |            |        |         |        | ACME Inc |

Here we see some relationships in the `follows` and `worksFor` columns. John follows
Jane, and works for ACME Inc. Ultimately Flakes,while represented here as both a
list/set and a rectangle/spreadsheet, are made available as a high performing graph.

Cells with no values are considered 'sparse' meaning they consume no disk space unlike
what would happen in a relational database. This is just one of the characterstics
Fluree would share with a columnar database. In the right use cases, a graph can
have some of the benefits of a column database without many of the limitations.

### Flakes as Fluree's Foundation {#flakes-as-flurees-foundation}

The goal of Fluree is to be built from simple components, and the Flake - sitting
at the foundation of Fluree - exemplifies this goal. A Flake can represent any conceivable
fact and therefore Fluree, as a collection of Flakes, is a database of provable facts.
Facts importantly require time -- that a person is 16 years old is a fact only if
the context of time is attached. An assertion of truth without time is therefore
not a fact.

Fluree uses the Flake to represent _everything_ -- not just the data you store,
but data that contains the rules defining how a ledger operates. When a ledger
is loaded from its persistent storage, the first thing Fluree does before making
the ledger available for queries or transactions is query itself to load the rules
by which it should operate. So Flakes hold all data, including:

- The data end-users transact and store
- All the rules that govern a specific ledger (i.e. the schema, auth, roles, rules,
- SmartFunctions, ledger settings)
- All the transactional metadata

Because all of this is stored as Flakes, it means it is all queryable in the identical
way - whether you are querying for the data you stored, or querying transactional
metadata for a timestamp, hash, or identity that transacted it, or querying information
about the current (or previous) schema Fluree is using to enforce data consistency.

In the Flake format, the subject ID (`s`) is a long integer and can be thought of
as therow number in the giant spreadsheet analogy. Predicate IDs (`p`), and
transaction/time (`t`) are also subjects themselves, so their values in a Flake
are pointers to the respective subject that contain additional information about
them. Object values (`o`) can hold scalar values according to the defined schema
like a string, long integer, GeoJSON, etc - or they can be a reference to another
subject thus creating a graph, in which case `o` would hold the referenced subject
id value. Therefore, it is not uncommon that 4 of the 6 tuples in a Flake may all
be long integer subject ids (`s`, `p`, `o` and `t`, as ordered in the `spot` index
discussed more in the indexing section).

While you generally would not use a subject id in a query (probably because you
wouldn't know it ahead of time), utilizing subject ids in a Flake as a long integer
allows more compact storage and very fast comparisons. Strings both consume more
memory and disk space but also are quite slow for computers to compare. To address
the problem of making queries easy without knowing a subject id, Fluree allows you
to use any unique predicate + its value to automatically resolve the subject id
(i.e. `["username" "janeDoe"]` might resolve to subject id `42979877`). You can
have any number of unique predicates, so there are often many ways to resolve a
given subject without its long integer id. More information on Subject Identity
follows in the next section.

### Relation to RDF {#relation-to-rdf}

A Flake builds on the [W3C RDF](https://www.w3.org/RDF/) standard, often referred
to as "triples" (a 3-tuple of subject, predicate, object), to account for the additional
functionality Fluree provides.

In addition to `s`, `p`, and `o`, Fluree adds:

- The `t` (transaction ref) value points to the subject of the transaction metadata
  which itself is stored as additional Flakes. This allows every Flake to be tied
  back to its origins where cryptographic proofs exist to verify the data hasn't
  been tampered with in addition to the digital signature that ties together the
  Flake, and the originating transaction, to the identity of the person/machine
  that created it. In addition the `t` value also represents an atomic notion of
  time.
- The `op` is a boolean value that represents assertions and retractions across
  time. RDF triples have no notion of time - they represent a set of "facts" - which
  inheritly represent a single moment (time) of truth. Fluree's time travel requires
  us to know data that used to be true, but not longer is as of a moment in time.
  A Flake where `op` is equal to `false` in a ledger means it is a fact that used
  to be true, but no longer is. A `true` value for `op` means it is a newly asserted
  fact as of that moment in time (represented by the Flake's `t` value).
- The `m` meta is a compact form to store additional metadata for a Flake which
  can include RDF\* data, which in its native form is quite verbose. In addition
  it offers the flexibility to add new functionality to Fluree in the future
  (i.e. an expiration time for a Flake similar to the feature in Cassandra). `m`
  is not currently used.

#### RDF <-> Flakes {#rdf-flakes}

RDF represents an atomic unit of data, while a Flake represents an atomic unit of
data _in time_ and _with provenance_. Therefore to make RDF and Flakes interchangable
they need to represent the same thing, which means you must first choose a time.

Fluree tries to use concepts of a ledger and database as two related but different
things. We refer to a database in Fluree as immutable, and every transaction creates
a new database. 1,000 transactions means you have 1,000 immutable databases you
can query and each database represents a separate moment in time (this is immensely
efficient under the covers as explored in indexing guide).

Triples would sit in a database, Flakes would sit in a ledger (an append-only log).
Ignoring provenance for a moment, a database is a set of triples and is therefore
interchangable with RDF. A ledger has `op` values of both `true` and `false` adding
and removing facts. A single database at any moment in time however will only have
`true` `op` values, so we can ignore `op` when we've locked in time. To get to just
`s`, `p`, and `o` however we must also figure out what to do with `t` and `m`. These
values could either be dropped, or output as [RDF\*](#flake-vs-rdf-rdf-star-) data
at the expense of substantially larger file size.

### Subject Identity {#subject-identity}

RDF calls a unique entity or object a "subject". All Flakes for a given subject have
the identical subject id, which is long integer value in the `s` element of the Flake.
Knowing a subject id ahead of time may not be practical, as would be the case for
many queries. Therefore, any Subject Identity can be used to refer to a subject.

A Subject Identity is an unambiguous way to refer to a specifc subject within Fluree,
This can always be done with a subject id if you know it, but alternatively you can
use any or any predicate defined as unique (`unique: true`) along with the corresponding
unique value in the form of a two-tuple.

For example, if we have the following 4 Flakes that are about a subject we'll call
"Jane Doe"

```all
[45839457 'firstName' 'Jane'         -42 true]
[45839457 'lastName'  'Doe'          -42 true]
[45839457 'email'     'jane@doe.com' -86 true]
[45839457 'username'  'janedoe'      -42 true]
```

- _Technically, Fluree would not store the string predicate name exactly as shown
- above, i.e. `firstName`, in a Flake but instead the subject ID that points to the
- predicate's information including the name, data type, etc._

Representing this data visually as if in a spreadsheet, it would look like:

| ID       | firstName | lastName | email        | username |
| -------- | --------- | -------- | ------------ | -------- |
| 45839457 | Jane      | Doe      | jane@doe.com | janedoe  |

If both `email` and `username` were configured as unique predicates they could be
used as part of a Subject Identity. In this example data we therefore have 3 different
Subject Identities for Jane Doe (written as JSON in this example):

1. `45839457`
2. `["email", "jane@doe.com"]`
3. `["username", "janedoe"]`

In most cases for Fluree, any Subject Identity can be used to refer to a subject.
Therefore, the following three FlureeQL queries would return identical results:

```json
{"select": ["*"] from 45839457}
{"select": ["*"] from ["email", "jane@doe.com"]}
{"select": ["*"] from ["username", "janedoe"]}
```

### Flake Partitioning {#flake-partitioning}

Flake partitioning is the strategy to group similar data together so it is most likely
to satisfy as many queries as possible with the fewest chunks of the index(s) needed.

In addition to the core ledger log, Flakes ultimately get sorted in up to four
indexes to allow for fast querying. The primary index sorts all Flakes in a ledger
by `s`, then `p`, then `o`, then `t` - and then false then true values for `op`.
We call this primary index `spot` and it is an ideal context to describe how and
why Flakes get partitioned.

Fluree stores its indexes in a variation of a b-tree, like most databases do albeit
with their own variations. Fluree is no exception and one of these Fluree variations
is that the index data is stored as a persisted, immutable data structure. Cassandra
is an example of another database that uses immutable index files (they call these
SSTables).

Because Fluree actually has an independent, stateless database engine (query server),
the immutable index is chunked into ~100kb segments which on average hold ~3,000
Flakes ([Avro](https://avro.apache.org/) serialization is used). This allows chunks
of the index to be moved across the wire in a reasonable size as-needed, where they
are cached upstream with the guarantee that so long as index chunk remains 'active',
it never needs to get updated. Immutability guarantees can make some amazing things
possible in distributed systems.

Because we want to transport as few index chunks as possible upstream to satisfy
query needs, it then makes sense that if similar data is grouped together we will
achievethis in common (but not all) circumstances. For example, queries to get recent
data about an invoice are likely to be followed by another query about another recent
invoice. If all the data for the most recent invoices sits in a single index chunk,
we might be able to move just one 100kb index segment in-memory upstream and satisfy
all queries happening - even if the database itself could be many terabytes in size.
Fluree uses an LRU cache in query/edge servers to move index data in and out of
memory once the available memory becomes full.

Because the first item sorted in our `spot` index is `s`, the subject ID (64-bit
signed integer), we want similar data to have subject ids that are next to each
other. Fluree accomplishes this by ensuring every new subject goes into a defined
[collection](/overview/schema/collections.mdx), and each collection is allocated a range
of subject ids. When a new subject is created, it gets assigned its `s` value with
the next available subject id in that collection.

With the 64-bit integer `s`, the first 19 bits represent a number for the collection
which will be the same for all subjects in that collection, and the last 44 bits
(- 1) represent each subject, incrementing atomically (most recent subject has the
highest number).

Therefore, a `s` value is always the binary 64-bits that combines the collection
id (19 bits for a range of 0 -> 524,287 possible collections), and the atomically
incrementing count of subjects within that collection (44 bits for a range of
0 -> 17,592,186,044,415 possible subjects within a collection).

What if I have more subjects of a type than 17,592,186,044,415? There is no requirement
that the same type, or class, of subjects be in the same collection. If one wanted
they could store some invoices in one collection and others in another. One could
still query for all invoices, so that limit will not preclude larger numbers of the
same class of data. That said, the avilabile range within a single collection is
enough to identify every human on earth 2,200 times over - so there is a lot of space.

JavaScript considerations come into play, as JavaScript can only handle 53-bit integers
with precision. That means if you expect JavaScript to natively handle (without
a BigNum library) subject IDs you should keep the number of collections to a number
that can fit into 9 bits (44 + 9 = 53). That number is 511, and Fluree reserves the
first 20 collection ids, meaning you have 491 usable collections to maintain pure
JS compatibility.

Fluree reserves the first 20 collection ids, and the collection id of '0' is used
for the predicate collection. This results in predicate ids to start with 1, 2, 3,
etc... as the first 19 bit collection id is '0'. This is deliberate, as the `p`
value in a Flake that uses the predicate subject id is included with every Flake
and storage along with transport can be kept as small as possible with those smaller
numbers.

Translating the collection + count ids into `s` values with examples is demonstrated
below:

```all
// collection id: 0, subject count: 42 => 42
// .- collection-id -..--- count of subjects within collection --.
2r0000000000000000000000000000000000000000000000000000000000101010

// collection id: 1, subject count: 1 => 17592186044417
// .- collection-id -..--- count of subjects within collection --.
2r0000000000000000000100000000000000000000000000000000000000000001

// collection id: 1, subject count: 42 => 17592186044458
// .- collection-id -..--- count of subjects within collection --.
2r0000000000000000000100000000000000000000000000000000000000101010

// collection id: 42, subject count: 1 => 738871813865473
// .- collection-id -..--- count of subjects within collection --.
2r0000000000000010101000000000000000000000000000000000000000000001
```

This results in similar data being grouped together in the indexes, reducing the
chunks of index segments needed for common usage patterns.

### Utilizing 't' values {#utilizing-t-values}

The `t` value in a Flake is the subject ID of the transactional metadata that describes
how the Flake entered the ledger. It allows every Flake to be traced back to the
transaction that placed it there, which has cryptographic proofs retained.

If using our prior example of Jane Doe Flakes, the expanded Flake set, including
metadata, might look like:

```all
[45839457 'firstName' 'Jane'         -42 true]
[45839457 'lastName'  'Doe'          -42 true]
[45839457 'email'     'jane@doe.com' -86 true]
[45839457 'username'  'janedoe'      -42 true]
[-42      'hash'      '73d2f5'       -42 true] ; abbreviated 256 bit
[-42      'tx'        '{firstN ...}' -42 true] ; Original tx
[-42      'sig'       'd4573d2dacf5' -42 true] ; ECDSA sig of tx hash
[-42      'auth'      45839457       -42 true] ; Jane performed this tx
[-86      'hash'      'a5c487'       -86 true]
[-86      'auth'      12345678       -86 true] ; not Jane
[-86      'tx'        '{email: ...}' -86 true]
[-86      'sig'       'a1b2cd345f97' -86 true]
```

- _Note above is a subset of tx metdata Fluree stores with every transaction, and
  end-users can also include their own metadata as well (i.e. originating IP
 address, etc)_

As the `t` value is just another subject id, it can also be queried like any other
data. The following would return all of the metadata about transaction -42:

```json
{"select": ["*"] from -42}
```

If one wanted to list the hash and email of the person that transacted data for every
transaction, the following query would suffice:

```json
{"select": ["?t", "?hash", "?email"],
 "where": [["?t",    "hash",  "?hash"],
           ["?t",    "auth",  "?auth"],
           ["?auth", "email", "?email"]]}
```

Transactional metadata Flakes, like every Flake, also has a `t` value. Using a Flake
from the example above, `[-86 'hash' 'a5c487' -86 true]`, the `s` and `t` values
are both `-86`. This is because the transaction that put this Flake into the ledger
is itself.

It is worth noting that the original transaction string that was signed to prove
identity does not get included in the queryable indexes but it is always present
in the ledger blocks. This decision was made because it would effectively double
the size of every index and it is data that is needed primarily for auditing. To
get the original transaction string one can use the `block` query which operates
on the ledger and not the indexes. The `block` query can be used to find all data
for just a transaction (`t` value), or an entire block which will contain multiple
transactions. Permissions are still applied to `block` queries, so users may have
filtered views of the results.

### 't' as Time {#t-as-time}

Every new subject, being placed into its respective [collection](/overview/schema/collections.mdx),
atomically increments its subject id as described in [flake partitioning](#flake-partitioning).
`t`, for reasons [explained below](#why-negative-t-values-), atomically decrements.

Transactions in Fluree are [ACID compliant](https://en.wikipedia.org/wiki/ACID) and
processed in a defined order to facilitate these guarantees. Atomicity of decrementing
`t` values represents this order, and therefore represents a guarantee of "ledger
time".

Time is quite relative and measured with varying coarseness to varying decimal places.
`t` values guarantee what happened when regardless of an observer standpoint. While
Fluree does not currently process a transaction in < 1 ms, it is certainly our goal
and if multiple transactions happened in the context of a machine that only understood
milliseconds it would look like all transactions happened at the same time. `t`
keeps the outside world's perspective independent of guaranteed ordering.

Relating `t` to a wall clock time is possible using the timestamp attached to blocks
and stored in the `_block/instant` predicate as epoch milliseconds. A Block in Fluree
contains one or more transactions which allows for distributed systems to do validation
in 'chunks' under high volume instead of chatty consensus protocols being required
for every single transaction. While a transaction is done in a specific order related
to other transactions, a block becomes part of a ledger at a single moment in wall
clock time regardless of the internal ordering.

A `_block/instant` however is a machine's relative perception of time, and therefore
while in most circumstances it can be very useful to query a ledger as of any moment
in wall clock time, the only guarantee of true "ledger time" in Fluree is the `t`
value.

To see `_block/instant` and all other block metadata for all blocks in a ledger,
query:

```json
{"select": ["*"], "from": "_block"}
```

To issue a query to a database as of a previous moment in time, a block number,
`t` value, ISO-8601 time string or duration value can be used. In all cases Fluree
uses `t` under the covers - providing a value other than `t` will prompt Fluree to
query its data to find the nearest `t`. Examples:

```json
// Using a block number, looks up _block/transactions to get to 't'
{"select": ["*"], "from": "person", "block": 2}
// Using a 't' value, no conversion needed to 't'
{"select": ["*"], "from": "person", "block": -42}
// ISO-8601 time, looks up closest _block/instant value to get 't'
{"select": ["*"], "from": "person", "block": "2019-12-08T13:11:05Z"}
```

### Why Negative t Values? {#why-negative-t-values}

As discussed in [Flake Partitioning](#flake-partitioning), all Flakes are grouped
numerically near similar data (using the defined \_collection) by subject id (a
64-bit signed integer). The `_tx` collection, where `t` subjects live, gets the
entire negative number range of -1 -> -9,223,372,036,854,775,808 - giving ~ 9 quintillion
possible transactions for a ledger. If a transaction was issued every second of every
day, transaction subject ids would run out in 292,471,208,677 years - that's 20x
longer than the universe has existed. In the unlikely case subject ids ever ran
out, they could always be migrated to a number > 64 bits to increase the range.

While other subject IDs atomically increment with each new subject added within
their respective [collection](/overview/schema/collections.mdx), `t` values decrement atomically.
Because Fluree uses a 64-bit integer for subject Ids, the same usable number range
for `t` could have been achieved by using an unsigned integer and avoiding the special
treatment for negative `t` values. The reason this was decided against is to be
as compatible natively with JavaScript and web browsers as possible. Fluree has
a version of its database engine that runs entirely in JavaScript, and rich native
number support in JavaScript is lacking. JavaScript supports up to 53-bit signed
integers with precision. This means that without using the negative integers, half
of the possible subject Ids would be thrown out.

Also, when transporting data serialized as JSON, which is logical for a JavaScript
environment, numbers are represented as a string. So the 64-bit number of `-1` as
a UTF-8 encoded string consumes just 16 bits, while `-1000000` consumes 64-bits,
and `-9223372036854775808` (the max number of transactions) is a 160 bit string.
From a transport standpoint smaller numbers mean less bits going across the wire.
As a `t` value exists with every Flake, using a smaller numbers results in less
data transfer and a faster database. Therefore segmenting a huge chunk of an unsigned
64-bit integer to `t` subject ids would have resulted in more bandwidth.

### Flake vs RDF\* (RDF-star) {#flake-vs-rdf-rdf-star}

Adding information about triples is the goal of [RDF\*](https://w3c.github.io/rdf-star/),
and our Flake format certainly does exactly this with its `t`, `op`, and `m` values.
With the exception of `op`, which RDF\* does not contemplate as it relates to data
over time, it could be used to represent both `t` and `m`. In fact we have RDF-star
 export on the roadmap.

But the Flake is an internal representation meant to be [highly optimized](#overview)
for speed and compact storage. RDF-star, while a capable method of expressing metadata
about a triple, is neither compact nor speedy.

<!-- ### The Flake's power in a Graph

In graph terminology, a subject is a node, and predicates that point to other subjects are called edges - they are the lines between the nodes. Referring to related data directly means only needing the subject id of the data in question. This is what helps make traversing data relationships efficient in a graph data model. In practice, efficient index(s) that sort Flakes is required to make this work much as indexes are required in any other type of database. Relationships in a relational database require you to refer to other related data through a table structure as an intermediary, typically using foreign + primary keys defined in specific tables.  -->
