---
title: Fluree in Docker - A Single Instance
tags: [docker, fluree, blockchain, database]
series: Fluree 🤝 Docker
cover_image: https://fluree-blog-assets.s3.us-east-2.amazonaws.com/blog-assets/fluree%2Bdocker.png
description: Walkthrough for getting Fluree running locally in a Docker container
---

Managing dependencies is a pain in the tuchus. Whether in the cloud, in a private data center, or just on your laptop, ensuring that you have the correct version of Java or Node or whatever other runtime works properly with both the application and the OS and all of the other dependencies can quickly turn into a nightmare. Docker solves this by bundling all of the dependencies together in a single image such that as long as the Docker runtime is deployed on the target infra, your app should function as desired. No muss, no fuss. 🥳

Let's walk through the set up necessary to get your Fluree backend up and running. (Deployment to a public cloud will be out of scope for this post). This will be the first of a 3 part series on working with Fluree in Docker. The next one will be about setting up a Transactor Group!

## Getting Started

To begin with, you will need to have Docker on your machine. Please visit the [Docker Getting Started Docs](https://www.docker.com/get-started) to get it set up, if you don't have it configured already.
Once Docker is installed and running you will need to grab the [Fluree ledger image](https://hub.docker.com/r/fluree/ledger) from DockerHub. The [Docker CLI](https://docs.docker.com/engine/reference/run/) is a great tool for managing images on your machine. We will use the `docker pull` command to grab the fluree/ledger image. Open a terminal and run:

```docker
docker pull fluree/ledger:latest
```

At the time of writing, this will pull the 1.0.0 beta 15 ledger image from Docker Hub, which is the most up-to-date version of Fluree. Once the Fluree ledger 1.0.0 is released, beta releases will go under their own tag. At any time, you can pull a specific release, if that is needed. You would simply define the image to pull using the tag like this: `fluree/ledger:1.0.0-beta14`.
You can see all of the release tags for Fluree in our [Github Repo](https://github.com/fluree/ledger/tags).

## Set up and run the container

Ok, you have the image, now what?
There are a couple of parameters which Fluree needs in order to start up correctly.
These can be passed in when starting the container using the `docker run` command.

You can simply start the image by calling `docker run fluree/ledger`, but this will not expose the ports you will need to have in order to use the HTTP endpoints. Internally, Fluree listens on port 8090 for the HTTP calls, so this port will need to be mapped to an exposed, public port on the container. This can be done with:

```console
docker run -p 8090:8090 fluree/ledger
```

The ports correspond to ExternalPort:InternalPort. So, if you have 2 containers running, you will need to map the first of the two to a different port and leave the second number as-is because that is the port which Fluree is listening on. So for your second container, you would pass `-p 8091:8090` or some other port number of your choosing.
This spins up Fluree inside of your container, you will see the default configs print to the terminal and some messages about the consensus and state of the server. You can see the container and some metadata by running `docker ps` in another terminal.

### Naming your Container

By default, Docker will assign your container both a CONTAINER_ID and a NAME, which you can see via the `docker ps` command or in the Docker Desktop UI. The name will be 2 randomly assigned words, but you can name your container when you initialize it with the `docker run` command. This is useful because you can then use that name to restart your container, if you stop it for whatever reason. (At this point stopping the container will lose any data, but in a bit, we will connect the container's file system to a local directoy for data persistence 🙌). You can do this by adding the `--name` flag to the `run` command, like this:

```console
docker run -p 8090:8090 --name ledger1 fluree/ledger
```

Now, when you run `docker ps`, the NAMES field will be `ledger1` instead of a randomized pair of words.

> One caveat to using the `--name` flag is that if you stop your container or kill the terminal, that name will still be associated with that container. So you may need to run `docker rm ledger1` to remove the container, if you want to `docker run` with the name ledger1 again. (This applies to the randomly-assigned container names as well. They will exist on the machine until they are removed.)

## Interacting with your Instance

Now that your ledger is up and running on your machine, there are a few ways for you to interact with the ledger.

### Admin UI

Every instance of Fluree contains a small uitility for working with the ledgers, called the AdminUI. This is a browser based UI maintained by the Fluree team for working with instances of Fluree, whether as a single instance or in a transactor group. Once you have your Fluree instance ready with the HTTP port exposed, you can start the Admin UI by going to `http://localhost:[EXPOSED PORT]` in your browser.
If you used the command above to start up your instance, use 8090 for the `[EXPOSED PORT]`.

> We have a [YouTube](https://youtube.com/c/fluree) video walkthrough of the AdminUI coming soon.

### HTTP Calls

Fluree also contains an HTTP client which exposes several [HTTP endpoints](https://docs.flur.ee/api/1.0.0/downloaded-endpoints/downloaded-examples) for programmatically working with Fluree. Any of these endpoints can be hit by calling <http://localhost:8090/fdb/[endpoint]> or if the endpoint is ledger specific <http://localhost:8090/fdb/[network]/[db][endpoint]>.

At startup, there are no dbs on your instance, so it is recommended to start by using the [/new-db](https://docs.flur.ee/api/1.0.0/downloaded-endpoints/downloaded-examples#new-db) endpoint first.

## Create a Persistent Volume

Fluree is a ledger and database. Both of these things require persisting data, which Docker does by default, but we'll want to configure it ourselves. To do that, we will need to do what is called mounting a volume to the container. This volume will live on after the container is spun down or goes offline for some reason in the place where we told it to be.

Fluree already has a mechanism for writing to a file system. In fact, there is a customizable parameter which enables you to specify the path in the file system where you would like Fluree to write its data. You can see all of the [configuration options](https://docs.flur.ee/docs/1.0.0/getting-started/fluree-anywhere#config-options) in the docs. The config we are interested in now is `fdb-storage-file-directory`. By default, this is set to `/var/lib/fluree` whether Fluree is being run in a container or in a JVM directly on a server. This means we can use some functionality in the Docker CLI to bind a directory in our local filesystem to this directory _inside_ the container. Docker run has a flag called --volume (aliased to -v) where you can specify the two directories to be bound together. It will look like this `-v "[local/path/to/dir]:[container/path/to/dir]"`.

For my example, I will tell my container to bind to `Users/treybotard/Projects/fluree-data/docker-blog/`. To put this together with the `run` command from above; your command should look like this:

```console
docker run -p 8090:8090 -v "/Users/treybotard/Projects/fluree-data/docker-blog/:/var/lib/fluree" fluree/ledger
```

Now that I've run this command, I can open up the AdminUI, add a new ledger to my Fluree instance, and when I path to my docker-blog folder, I will see 2 folders, `group/` and `ledger/`. These are the folders Fluree uses to maintain raft logs (in `group/`) and the encrypted indexes (in `ledger/`). I'm not going to go into too much detail here about this structure. If you are interested in reading more about how Fluree maintains the [indexes](https://docs.flur.ee/guides/1.0.0/architecture/indexes) or how Fluree interacts with the [file system](https://docs.flur.ee/guides/1.0.0/infrastructure/file-system) you can read more in the docs.

### Private key file

When using the `--volume` command to persist your data outside of the container, if a private key is not provided on start-up, Fluree will create a default private key. This key (whether provided or generated at startup) is used for a few access controls in developement mode. What this means is that if you want to reuse the same identity to access the persisted data, you will need to store your key outside of the container and pass it in when spinning up a fresh container. This can be done a few different ways, but for simplicity's sake, we'll just look at passing the private key into the container as an environment variable with `-e`. Using an environment variable requires passing in `-e FDB_GROUP_PRIVATE_KEY=[PRIVATE_KEY]` when starting the container.

> Now our command looks like this:

```console
docker run -p 8090:8090 -v "/Users/treybotard/Projects/fluree-data/Docker-blog/:/var/lib/fluree" --name ledger1 -e FDB_GROUP_PRIVATE_KEY=123456789 fluree/ledger:latest
```

## Docker start and stop

One very convient way to maintain my development environment is to use the `--name` flag on a container with a volume mounted on it. What this enables is the `stop` and `start` functionality in the Docker CLI. If i have a container specifically for a client project or a demo I am working on, I give it a meaningful name "docker-blog" and mount it to a volume stored next to the source code where I am working. I can then conveniently run `docker start docker-blog` when I am ready to work on the container, it knows which ports to uses and can spin up the container exactly the way it was when I ran `docker stop docker-blog` when I stopped working on it before.

## Other Convenience Commands and Flags

### `--rm`

If you are just testing out some some ledgers and are making some throw-away ledgers, I recommend adding the `--rm` flag. Going to spin up a named container which you forgot to spin down, but getting an error that the container name already exists gets old quickly. This will remove the container when you either CTRL+C or send SIGINT to the container some other way.

### `-d` and `attach`

If you have been spun up a Fluree container before, you will have seen that the output is relatively chatty. One easy way to not have to see that in your terminal is to pass the `-d` flag when starting up the container. This will run Fluree in a detached process and not print to the console. You can run `docker attach [container name]` to reattach to the console and see the logs in your terminal. If you didn't give the container a name, you can look it up with `docker ps -a` to see all the containers, including the ones which are stopped.

### `docker exec`

Sometimes, it can be very useful to have a bash terminal inside a running container _while Fluree is running_. You can use the `docker exec` command to run a command inside a running container. One useful way which I use this is to run `docker exec -it [container name] /bin/bash`. This opens a bash terminal in the working directory of my container where Fluree is running.

It can also be useful to access the file system in a container with Fluree inside it, even when Fluree is not running. To startup a container without initializing Fluree, you need to use `docker run`, but override the `--entrypoint`. That looks like this:

```console
docker run -it --entrypoint=bash fluree/ledger
```

This will start up a container and give you a bash terminal with which to explore.

With these commands, a large percentage of the functionality needed to work with Fluree locally can be achieved. Next week, we'll take a look at how to set up a Transactor Group (several Fluree instances networked together) in Docker using similar commands _and_ Docker compose!
