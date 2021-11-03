---
sidebar_position: 1
---

# File System

Before you start Fluree for the first time, the contents of the Fluree directory
will be as follows (might be slightly different based on your version):

```all
fluree-0.15.0/
├── fluree_sample.properties
├── fluree_start.sh
├── fluree_server.jar
├── logback.xml
├── CHANGELOG.md
├── VERSION
└── LICENSE
```

## Key Files {#key-files}

* `fluree_sample.properties` - File that specifies the customizable Fluree properties.
* `fluree_start.sh` - Shell script to launch Fluree.
* `fluree_server.jar` - Fluree packaged into a JAR file.
* `logback.xml` - Fluree logging options. To change logging options see the
  [Logback](http://logback.qos.ch/) library documentation.

After Fluree successfully starts for the first time, if you are using the default
`fdb-storage-type` set to `file`, there will be additional items in your Fluree
instance folder. Your folder will look something like the below:

```all
fluree-0.15.0/
├── data/
├── fluree_sample.properties
├── VERSION
├── fluree_start.sh
├── fluree_server.jar
├── default_private_key.txt
├── logback.xml
├── CHANGELOG.md
└── LICENSE
```

### New Items {#new-items}

* `data/`
* `default_private_key.txt`

### data/ {#data}

The new `data` folder will contain all of your block data, consensus logs, as well
as ledger indexes. This folder can be moved or copied to a different Fluree instance
folder and run from the folder if you choose. This is a good option if you want
to use a newer Fluree version, but to keep all of your previous ledgers.

### default_private_key.txt {#default_private_keytxt}

This file contains the default private key for your ledgers. A new (and unique)
private key is generated every time you start up a new network, unless you already
have a valid private key in `default_private_key.txt`.

## Reset Fluree {#reset-fluree}

To completely reset your Fluree instance (erasing ALL ledger and transactor group
data), you can shut down your instance and delete `data/` and `default_private_key.txt`.
Don't do this unless you are sure you want to completely delete everything!

## Block Files and Index Files {#block-files-and-index-files}

Block files and indexes are stored in the folder listed in your settings as `fdb-storage-file-directory`.

This folder can be moved or copied to a different Fluree instance folder and run
from the folder if you choose. This is a good option if you want to use a newer
Fluree version, but to keep all of your previous ledgers.

Block files are never overwritten. For example, when the transactions for block
2 are issued, they will be written to a file for block 2 and never modified. If
using versioned blocks (see [Mutable Fluree](/concepts/infrastructure/mutability.md)),
block files may be renamed.

There are four different types of indexes that are written to file. These indexes
sort flakes by:

* subject-predicate-object-time : all flakes written to this index
* predicate-subject-object-time : all flakes written to this index
* object-predicate-subject-time : only references and tags are written to this index
* predicate-object-subject-time : indexed predicates are written to this index

The frequency at which new index files are written depends on your
[ledger configuration](/reference/fluree_config.md), specifically,
the `fdb-memory-reindex` option.
