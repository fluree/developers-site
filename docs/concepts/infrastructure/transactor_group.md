---
sidebar_position: 2
---

# Transactor Group

You can organize your project for running a transactor group in a few different ways.
We have example directories for setting up a transactor group in:

- [Different Folders](#setting-up-a-transactor-group-in-different-folders)
- [One Folder](#setting-up-a-transactor-group-in-one-folder)

These set-ups can be found in the [transactor-group-examples Github repo](https://github.com/fluree/transactor-group-examples). Begin by running the following command from your terminal:

```bash
git clone https://github.com/fluree/transactor-group-examples.git
```

## Transactor Group in Different Folders {#transactor-group-in-different-folders}

You can run a transactor group on three different ports on the same server by housing
each transactor's data and configuration in a different folder. When running this
type of configuration, you need to make sure to change `fdb-api-port` to ensure
that each transactor serves the UI to a different port. You also need to make sure
every server has the exact same `fdb-group-servers`. Finally, each server must have
a different `fdb-group-this-server`, and that server name needs to be one of the
ones specified in `fdb-group-servers`. An example below:

Key | Fluree-1 | Fluree-2 | Fluree-3
-- | -- | -- | --
fdb-api-port | 8090 | 8081 | 8082
fdb-group-this-server | myserver1 | myserver2 | myserver3
fdb-group-servers  | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792

To start this up very quickly, you can clone down the transactor-group-examples repo.

```bash
git clone https://github.com/fluree/transactor-group-examples.git
```

Then you can navigate to `different-folders/`. You'll see that `different-folders/`
contains three folders: `fluree-1`, `fluree-2`, and `fluree-3`.

You'll need to download any version of Fluree (0.13 and higher) and copy
`fluree_server.jar` into each folder: `fluree-1/fluree_server.jar`, `fluree-2/fluree_server.jar`,
and `fluree-3/fluree_server.jar`.

Now open three different terminal windows and navigate to `fluree-1/`, `fluree-2/`,
and `fluree-3/`, respectively.  In each of those terminal windows, you can issue
`./fluree_start.sh` to start.

When you see a log like the below, you can `cmd + click` on the URL to open the
admin UI for each server.

```bash
INFO  fluree.db.peer.http-api - Starting web server on port: 8090 with an open API.
INFO  fluree.db.peer.http-api -
INFO  fluree.db.peer.http-api - http://localhost:8090
INFO  fluree.db.peer.http-api -
```

You can try creating new ledgers, making transactions, etc, and all of the work
will be replicated on each of the three instances of Fluree that are running.

## Transactor Group in One Folder {#transactor-group-in-one-folder}

You can run a transactor group on three different ports on the same server and in
the same folder by providing each running instance a different properties file,
and changing key properies.

When running this type of configuration, you need to make sure to change `fdb-api-port`
to ensure that each transactor serves the UI to a different port. You also need to
make sure every server has the exact same `fdb-group-servers`. Finally, each server
must have a different `fdb-group-this-server`, and that server name needs to be
one of the ones specified in `fdb-group-servers`.

In addition, unlike when you run each instance from a different folder, you'll need
to specify different `fdb-group-log-directory` and `fdb-storage-file-directory`,
so each instance stores its block, index, and log files in a different location.

An example below:

Key | Fluree-1 | Fluree-2 | Fluree-3
-- | -- | -- | --
fdb-api-port | 8090 | 8081 | 8082
fdb-group-log-directory |  data/a/group/ | data/b/group/ | data/c/group/
fdb-storage-file-directory | data/a/ledger/ | data/b/ledger/ | data/c/ledger/
fdb-group-this-server | myserver1 | myserver2 | myserver3
fdb-group-servers  | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792

To start this up very quickly, you can clone down the transactor-group-examples repo.

```bash
git clone https://github.com/fluree/transactor-group-examples.git
```

Then you can navigate to `same-folder/` directory. You'll need to download any version
of Fluree (0.13 and higher) and copy `fluree_server.jar` into `same-folder/` folder:
`same-folder/fluree_server.jar`.

Now open three different terminal windows and navigate to `same-folder/` in each
one.

In each of those terminal windows, you can issue `./fluree_start.sh fluree_sample_1.properties`,
`./fluree_start.sh fluree_sample_2.properties`, and `./fluree_start.sh fluree_sample_3.properties`
respectively.

When you see a log like the below, you can `cmd + click` on the URL to open the
admin UI for each server.

```bash
INFO  fluree.db.peer.http-api - Starting web server on port: 8090 with an open API.
INFO  fluree.db.peer.http-api -
INFO  fluree.db.peer.http-api - http://localhost:8090
INFO  fluree.db.peer.http-api -
```

You can try creating new ledgers, making transactions, etc, and all of the work
will be replicated on each of the three instances of Fluree that are running.

## Dynamically Add a Server {#dynamically-add-a-server}

To dynamically add a server, you must have a valid transactor group up and running.
Let's use the configuration above where we run 3 Fluree instances out of the same
folder.

The settings for the first three servers are as follows:

Key | Fluree-1 | Fluree-2 | Fluree-3
-- | -- | -- | --
fdb-api-port | 8090 | 8081 | 8082
fdb-group-log-directory |  data/a/group/ | data/b/group/ | data/c/group/
fdb-storage-file-directory | data/a/ledger/ | data/b/ledger/ | data/c/ledger/
fdb-group-this-server | myserver1 | myserver2 | myserver3
fdb-group-servers  | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792 | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792

To start this up, we can clone down the transactor-group-examples repo.

```bash
git clone https://github.com/fluree/transactor-group-examples.git
```

Then you can navigate to `dynamic-config-change/` directory. You'll need to download
any version of Fluree (0.13 and higher) and copy `fluree_server.jar` into `dynamic-config-change/`
folder: `same-folder/fluree_server.jar`.

Now open three different terminal windows and navigate to `same-folder/` in each
one.

In each of those terminal windows, you can issue `./fluree_start.sh fluree_sample_1.properties`,
`./fluree_start.sh fluree_sample_2.properties`, and `./fluree_start.sh fluree_sample_3.properties`
respectively.

Wait until all three servers are up and running. Now we can add a fourth server.
In order to add the fourth server, we DO NOT have to shut down the first three servers.
We do not have to change their settings. We only have to do two steps:

1. Start up `myserver4` with the following settings:

Key | Value
-- | --
fdb-join? | true
fdb-group-catch-up-rounds | 10
fdb-api-port | 8083
fdb-group-log-directory |  data/d/group/
fdb-storage-file-directory | data/d/ledger/
fdb-group-this-server | myserver4
fdb-group-servers  | myserver1@localhost:9790, myserver2@localhost:9791, myserver3@localhost:9792, myserver4@localhost:9793

The `fdb-join?` is the setting that tells this Fluree instance to wait before initiating.
This instance will NOT initiate until another server (from fdb-group-servers) starts
feeding it log files. `fdb-group-catch-up-rounds` is the number of rounds to wait
until myserver4 is caught up with the other servers. If you have a lot of ledgers
or blocks already on the other instances, you may want to increase this.

First we need to start `myserver4`. To do this, you can open a terminal and issue
`./fluree_start.sh fluree_sample_4.properties`.

You'll see some logs like:

```bash
INFO  fluree.db.peer.http-api - Starting web server on port: 8083 with an open API.
INFO  fluree.db.peer.http-api -
INFO  fluree.db.peer.http-api - http://localhost:8083
INFO  fluree.db.peer.http-api -
INFO  f.d.ledger.consensus.tcp - TCP read channel closed for server: myserver4. Closing TCP loop.
INFO  f.d.ledger.consensus.tcp - TCP read channel closed for server: myserver4. Closing TCP loop.
```

<!-- markdownlint-disable MD029 -->
2. Issue a request to any active server (in this case, to server `myserver1`) to
  add `myserver4`.

```bash
  curl \
   -H "Content-Type: application/json" \
   -d '{"server": "myserver4"}' \
   http://localhost:8090/fdb/add-server
```

If adding the server is successful, you should see a log like:

```bash
Committing myserver4 add to the network configuration. Change command id: eeeda1b7-c939-4eea-885c-96b0e87f394b
```

If it was not successfully added, you'll see a message like:

```bash
WARN  fluree.raft.leader - Server myserver4 did not sync in the allotted number
of rounds. Please delete this server's files, and attempt to add again. Depending
on your network's connectivity, you may want to increase :fdb-group-catch-up-rounds.
```

This is a beta feature, so if you encounter any issues, please email `support@flur.ee`.

## Dynamically Removing a Server {#dynamically-removing-a-server}

If you have a server running, you can dynamically remove a server by issue a request
like the below to any server in the network (including the server to be removed).

```bash
  curl \
   -H "Content-Type: application/json" \
   -d '{"server": "myserver1"}' \
   http://localhost:8090/fdb/remove-server
```
