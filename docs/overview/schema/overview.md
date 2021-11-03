---
sidebar_position: 1
---

# Schema Overview

Much like a relational database, before storing your records in a Fluree ledger, you must first register a schema which consists of collections (similar to tables) and predicates (similar to columns).

Defining and updating schemas is done through regular ledger transactions (in JSON) by writing to the special pre-defined system collections. This also means that all information regarding the schema is stored in the ledger as [flakes](/concepts/technical_overview.md#flakes), in the same way as any other type of information.

Most examples in the documentation use the [Basic Schema](/guides/schema/1.md). The Basic Schema section provides an introduction to schema, but this section goes into more detail.

## Validation {#validation}

Fluree validates all updates written against the ledger's schema, ensuring each change meets all of the defined restrictions (i.e. data type, multi-cardinality, uniqueness).

Beyond validating types, Fluree allows custom validation that can further restrict predicate values. This level of validation is done by specifying an optional spec for a [collection](/concepts/smart-functions/collection_spec.md) or [predicate](/concepts/smart-functions/predicate_spec.md).

## References {#references}

Being a graph database, the special type of ref (reference) is core to traversing through data. Any predicate of type ref refers (links/joins) to another entity. These relationships can be navigated in both directions. For example, listing all invoices from a customer record is trivial if the invoice is of type ref, and once established an invoice automatically links back to the customer.

## System Collections {#system-collections}

When a new ledger is created, the first transaction, issued automatically by Fluree, initializes system collections and predicates.

These system collections govern various ledger behaviors, such as schema, user rules, smart functions. Each of these system collections and their predicates is discussed in its respective section. The below list compiles all of the built-in collections in one place, and you can follow the link to any particular section for more information.

## All System Collections {#all-system-collections}

All ledgers are created with the following collections.

| Collection                               | Description                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| [\_collection](/overview/schema/collections.mdx) | Schema collections list                                                                       |
| [\_predicate](/overview/schema/predicates.mdx)   | Schema predicate definition                                                                   |
| [\_tag](/overview/schema/tags.md)               | Tags                                                                                          |
| [\_fn](/overview/schema/smartfunctions.mdx)           | ledger functions                                                                              |
| [\_user](/overview/schema/identity.md#_user)    | ledger users                                                                                  |
| [\_auth](/overview/schema/identity.md#_auth)    | Auth records. Every db interaction is performed by an auth record which governs permissions.  |
| [\_role](/overview/schema/identity.md#_role)    | Roles group multiple permission rules to an assignable category, like 'employee', 'customer'. |
| [\_rule](/overview/schema/identity.md#_rule)    | Permission rules                                                                              |
| [\_block](/overview/schema/metadata.md#_block)  | Block metadata                                                                                |
| [\_tx](/overview/schema/metadata.md#_tx)        | ledger transactions                                                                           |
| [\_setting](/overview/schema/settings.md)       | ledger settings                                                                               |
