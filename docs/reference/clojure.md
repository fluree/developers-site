# Clojure

<!-- [![cljdoc badge](https://cljdoc.org/badge/com.fluree/db)](https://cljdoc.org/d/com.fluree/db/CURRENT) -->

Fluree has a Clojure client.

## A note on terminology {#a-note-on-terminology}

If you are familiar with Datomic, Datahike, Datascript, or Crux (or other Clojure triple-store+ databases) you may wonder at the difference in terminology between those databases and Fluree. Fluree uses [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) terminology to describe the relationships between entities, or subjects.

Here's a quick glossary of how your knowledge may map on to Fluree's terminology:

| Clojure Triple-Store+ term | Fluree term |
| -------------------------- | ----------- |
| entity                     | subject     |
| attribute                  | predicate   |
| value                      | object      |
| datom                      | flake       |

## Setup {#setup}

Make sure you have a running Fluree ledger service to connect to. See the
[Getting Started](/overview/getting_started.mdx) docs for more details.

Add to the artifact to your dependencies:

Leiningen -

```clojure
[com.fluree/db "1.0.0-rc22"]
```

deps.edn -

```clojure
com.fluree/db {:mvn/version "1.0.0-rc22"}
```

Require the api and establish a connection to your Fluree server:

```clojure
(require '[fluree.db.api :as fdb])

(def conn (fdb/connect "http://localhost:8090"))

(def ledger "example/test")

@(fdb/new-ledger conn ledger)
```

## Transacting {#transacting}

`transact` is used to make any changes to the ledger, either adding data or schema. It's all data, and it all uses the same api to effect changes.

### Schema {#schema}

All data transacted into a ledger must conform to a schema. We'll transact a basic schema below. See the [Schema](/overview/schema/overview.md) documentation for more details.

Create a collection, which you can think of as a type of entity, or a relational database table.

```clojure
;; creates book and author collections
@(fdb/transact conn ledger [{:_id :_collection :_collection/name :book}
                            {:_id :_collection :_collection/name :author}])

;; can also use strings like in the Fluree docs:
;; {"_id" "_collection" "_collection/name" "author"}
```

Create some predicates for the collection, analogous to entity attributes or relational database columns.

```clojure
@(fdb/transact conn ledger [{:_id :_predicate
                             :_predicate/name :author/name
                             :_predicate/doc "An author's complete name."
                             :_predicate/unique true
                             :_predicate/type :string
                             :_predicate/upsert true}

                            {:_id :_predicate
                             :_predicate/name :book/title
                             :_predicate/doc "A book's title."
                             :_predicate/unique true
                             :_predicate/upsert true
                             :_predicate/fullText true
                             :_predicate/type :string}
                            {:_id :_predicate
                             :_predicate/name :book/notes
                             :_predicate/doc "Any notes about the book"
                             :_predicate/type :string}
                            {:_id :_predicate
                             :_predicate/name :book/authors
                             :_predicate/doc "A book's authors."
                             :_predicate/type :ref
                             :_predicate/multi true
                             :_predicate/restrictCollection :author}
                            {:_id :_predicate
                             :_predicate/name :book/tags
                             :_predicate/doc "Tags for categorizing books."
                             :_predicate/type :tag
                             :_predicate/multi true}])

```

### Data {#data}

Insert some subject data that conforms to the schema we've created. See the [Transact](/overview/transact/basics.md) documentation for more details.

```clojure
;; adding data
@(fdb/transact conn ledger [{:_id :book
                             :book/title "Watership Down"
                             :book/tags [:rabbits :fiction]
                             :book/authors [{:_id :author :name "Richard Adams"}]}
                            {:_id :book
                             :book/title "The Joy of Clojure"
                             :book/tags [:programming :non-fiction]
                             :book/authors [{:_id :author :name "Michael Fogus"}
                                       {:_id :author :name "Chris Houser"}]}
                            {:_id :book
                             :book/title "Cryptonomicon"
                             :book/tags [:fiction :sci-fi]
                             :book/authors [{:_id :author :name "Neal Stephenson"}]}])

@(fdb/transact conn ledger [{:_id [:book/title "Cryptonomicon"]
                             :book/notes "I rly liked it."}])

;; updating a single-cardinality predicate
@(fdb/transact conn ledger [{:_id [:book/title "Cryptonomicon"]
                             :book/notes "I really liked it."}])

;; updating a multi-cardinality predicate
@(fdb/transact conn ledger [{:_id [:book/title "The Joy of Clojure"]
                             :book/title "The Joy of Clojure"
                             :book/tags [:favorite]}])  ; adding the :favorite tag

;; retracting a predicate
@(fdb/transact conn ledger [{:_id [:book/title "Cryptonomicon"] :book/notes nil}])

;; retracting multi-cardinality member
@(fdb/transact conn ledger [{:_id [:book/title "The Joy of Clojure"]
                             :_action :delete
                             :book/tags [:favorite]}]) ; only removing :favorite tag

;; retracting a whole subject
@(fdb/transact conn ledger [{:_id [:book/title "Watership Down"] :_action :delete}])

```

## Querying {#querying}

### Analytical queries {#analytical-queries}

The syntax for these queries is similar to datalog and eql. These don't support keywords for matching on flake values in the `:where` clause.

The `query` function takes a `db` value to execute a query against, as well as a query map. See the docs for [Analytical queries](/overview/query/analytical_query.mdx) and [Basic queries](/overview/query/basic_query.mdx) for more details.

```clojure
;; store the current immutable database value. See API docs for getting a prior version of a db, applying permissions to a db, and other options.
(def db (fdb/db conn ledger))

;; all books
@(fdb/query (fdb/db conn ledger) {:select {"?book" [:*, {:book/authors [:*]}]}
                              :where [["?book" "book/title" nil]]})

;; all non-fiction books
@(fdb/query (fdb/db conn ledger) {:select "?title"
                              :where [["?book" "book/title" "?title"]
                                      ["?book" "book/tags" "non-fiction"]]})

```

### History queries {#history-queries}

[History queries](/overview/query/history_query.mdx) can show you the raw history of a subject. Use `:pretty-print` to get back maps of predicate names to object values instead of raw flake data.

```clojure
;; see the history of the "Cryptonomicon" book.
@(fdb/history-query (fdb/db conn ledger) {:history ["book/title" "Cryptonomicon"] :pretty-print true})
```

### Block queries {#block-queries}

[Block queries](/overview/query/block_query.mdx) return all of the raw flake data stored in a block. Use `:pretty-print` to get back maps of predicate names to object values instead of raw flake data.

```clojure
;; see all the flakes from block 3
@(fdb/block_query-async conn ledger {:block 3 :pretty-print true})
```

### Other query languages {#other-query-languages}

In addition to the FlureeQL syntax used above, Fluree also supports queries in other query languages: [SQL](/overview/query/sql.md), [SPARQL](/overview/query/sparql.md), [GraphQL](/overview/query/graphql.md). These can be used from Clojure by supplying a database value and a query string, or, in the case of GraphQL, a query map.

```clojure
@(fdb/sql (fdb/db conn ledger) "select * from book")

@(fdb/sparql (fdb/db conn ledger) "SELECT ?title WHERE { ?book fd:book/title ?title; fd:book/tags \"sci-fi\".}")

@(fdb/graphql conn ledger {:query "{graph { book { _id title}}}"} )

```

## Async API {#async-api}

All of the interactions with the Fluree ledger server are performed asynchronously, returning a promise. If you prefer to work with `core.async` channels instead of promises, there are `-async` variants of all the functions mentioned here that will return a `core.async` channel which will receive the result when the operation has finished.

```clojure
(require '[clojure.core.async :as async])

(async/<!! (fdb/query-async (fdb/db conn ledger) {:select ["*"] :from "book"}))
```
