# Introduction

Fluree is a graph database that:

- Supports semantic web standards
- Has deep cryptographic integration, providing a fine-grained security model
- Supports seamless horizontal scaling
- Provides a pluggable storage interface, letting you pick the storage layer
  most appropriate for your application

This tutorial teaches you the essentials for _using_ Fluree. It focuses on the
interface you'll use when building an application that uses Fluree as its
primary data store, and the data model Fluree provides. It doesn't cover
database administration like scaling and backup, and it doesn't go into
architectural concerns like which storage system to use. It assumes you have
some experience working with databases.

Over the course of the tutorial, you'll take on the role of a cryptozoologist
tracking mystical cryptids like chupacabras and yetis across the globe. You'll
use Fluree to record your observations and to coordinate with other researchers.
You'll also see how you can use Fluree's security features to protect these rare
creatures by keeping sensitive data out of the hands of the unscrupulous. You
will learn:

- How to install and start a Fluree database running on your machine
- How to perform CRUD (create, read, update, delete) operations
- What a graph database is and how it differs from relational databases
- What an RDF triple store is, and the implications for you
- How using JSON-LD and semantic data can help you

As a cryptozoologist, your passion has led you to quit your day job and dedicate
yourself full-time to the understanding and preservation of the world's most
mysterious creatures. You're like the Steve Irwin of barely-imaginable beings,
except instead of putting your head inside crocodile mouths, you're observing
from afar and recording your observations to share with the world.

To get started, you'll first need to install and run a database.

## Running Fluree

```bash
docker run -p 58090:8090 -v `pwd`/data:/opt/fluree-server/data fluree/server
```

This downloads and starts Fluree's [Standalone Server Instance](https://hub.docker.com/r/fluree/server). The server is
responsible for storing the data we give it and handling our queries. It's just
one possible way to interact with Fluree, but it's the one we'll be relying on
in this tutorial.

## The Fluree Interface

Once the server is running, you can open http://localhost:58090/ in your browser
to view a description of the Fluree's HTTP API. Every programming language has
libraries for handling HTTP requests, so your application should be able to
interact with the Fluree server via HTTP using whatever library you're most
comfortable with.

You can also use a standalone application like
[Postman](https://www.postman.com/) to make API calls. This is a great choice if
you're not a programmer because it provides a friendly UI that will aid you with
constructing API requests. It also has features for saving and organizing API
requests which are useful even to seasoned programmers.

If you'd like to work with Postman, our Cookbook of common use case examples is available as a public collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/27883365-96c11ee4-8357-4072-a0bc-f624c232c547?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D27883365-96c11ee4-8357-4072-a0bc-f624c232c547%26entityType%3Dcollection%26workspaceId%3Deed3ac8f-f457-4b1c-ac9f-07267b33ddd9)

We'll also show our examples as curl commands that you can copy and run from the
command line.

To start using Fluree to store data, you must first create a _ledger_. Whereas
in a relational database management system (RDBMS) you'd create a _database_ to
hold your data, in Fluree you create a ledger. A ledger is a record of all the
transactions (data insertions, updates, and deletes), and all of your
transactions and queries will run against a ledger.

To create the ledger, you must send an API request to the `/fluree/create`
endpoint:

```sh
curl --location 'http://localhost:58090/fluree/create' \
--header 'Content-Type: application/json' \
--data '{
  "ledger": "cryptids",
  "insert": {
    "@id": "my-first-cryptid",
    "name": "Freddy the Yeti"
  }
}'
```

Now that we have a server running and know how to interact with it, we're ready
to start storing some cryptid data!
