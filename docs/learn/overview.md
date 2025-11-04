# Fluree Overview

Fluree is a graph data management platform for **secure, shareable, composable
and verifiable systems of record**. It is a new category of data system that
unlocks new possibilities.

While other data systems offer tradeoffs in terms of performance and data
modeling, they all create _data silos._ Fluree is designed to let you treat
disparate data sources as a single logical database - while maintaining security
and privacy. It's the world's premier _sharing-first_ database.

## What sets Fluree apart?

Two main features set Fluree apart:

- Support for JSON-LD (JSON linked data), providing a universal system for
  representing and referencing data
- Deep cryptographic integration, providing a fine-grained security model that
  allows any level of access within your organization or the open internet

To understand why JSON-LD is important, let's talk about how current data
systems create silos. Most data systems create their own bespoke data
representations; you might use `address` to denote a person's address in your
system, while I use it to denote a URL. These representations only make sense
within the context of the parent system. It's like how the word _burro_ means
_donkey_ in Spanish and _butter_ in Italian.

If you ask someone to pass you the butter in Italian, you are unlikely to
receive a donkey. The context makes the meaning clear. JSON-LD is a web standard
for supplying the context for data.

JSON-LD also provides a standard for identifying and referencing data. Whereas
RDBMS's have primary and foreign keys for identifying and referencing data
within the parent system, Fluree's JSON-LD integration allows you to give your
entities a _universal_ identifier. When your data has a universal identifier,
any other entity can reference it, even if it doesn't belong to the same system,
just as any web page can link to any other web page.

JSON-LD introduces just enough structure to power a _decentralized global
information repository_. With it, unrelated orgs (across the world or within an
enterprise) can publish datasets and you can interact with them as if they
belonged to the same logical database. Because, in fact, they do, and JSON-LD
provides the logical glue.

Ultimately, what's exciting about JSON-LD is not actually JSON-LD in and of
itself. JSON-LD is a standard that organizations have converged on to implement
an idea; the underlying idea is to enable tools to describe the full context for
data so that it's universally understandable, regardless of what system it
belongs to. It's a universal language for representing data, and that unlocks
possibilities for collaboration and coordination that haven't been possible
until until now.

With the increased ability to share data comes an increased need to secure it.
In exposing your database to consumers, you need to be able to specify exactly who
can access what data, and what actions they can perform.

Fluree lets you do this because it implements a data-centric approach to
security, enforcing access at the data layer. This approach emphasizes the
security of data itself rather than the security of applications or networks. In
a data-centric security framework, security policies and protocols are defined
and enforced at the data layer, rather than deferred to a server, application,
or network

Data owners can manage data policies, including data access control, at the data
layer in order to restrict data access at the dataset, row, column, or cell
level. Data owners may define very granular and arbitrary rules to determine
access privileges. Different stakeholders can define their own unique access
policies around the same data, as per the requirements of their own data
governance contexts or dataset-specific sharing agreements.

This data-centric framework of embedding data security policies within the data
itself allows a single data set to service multiple consumers, even with varying
degrees of credentialed access.

## How can Fluree help you?

Fluree unlocks new possibilities and removes old pain points.

- **Safely expose your database directly.** Fluree's fine-grained security model
  and support for verifiable credentials let you expose your database so users
  can query it directly - without an intermediary API layer. Your customers will
  love you for giving this kind of power.
- **Compose databases across your org, or across the world.** With Fluree, you
  can treat separate databases as if they logically belong to the same database.

Read more domain-specific use cases:

- Fluree for software-as-a-service apps
- Fluree for the enterprise
- Fluree for data science
- Fluree for researches

## Feature rundown

* Query languages supported
  * SPARQL
  * GraphQL
  * SQL
  * FlureeQL
* JSON-LD data representation
* SHACL schema validation
* Data-centric security model
* HTTP API
* Natively temporal with support for time travel
