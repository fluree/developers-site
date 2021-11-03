---
sidebar_position: 4
---

# In-Memory Fluree

You can run Fluree in memory for testing purposes. To run Fluree in-memory, you
must be running only one single server (not in a transactor group).

To do so, you will need to specify the following config options:

1. `fdb-consensus-type` as `in-memory`
2. `fdb-storage-type` as `memory`.

Full-text indexing and full-text search are not available when running Fluree in-memory.

To try this out, we can clone down the transactor-group-examples repo.

```bash
git clone https://github.com/fluree/transactor-group-examples.git
```

Then you can navigate to the `in-memory/` directory. You'll need to download any
version of Fluree (0.13 and higher) and copy `fluree_server.jar` into `in-memory/`
folder: `in-memory/fluree_server.jar`.

Then, you can open a terminal window and navigate to `in-memory/`. Issue `./fluree_start.sh`
to start running Fluree in-memory.

When running Fluree in-memory, nothing is written to disk, and all data is lost
when the instance is shut down.
