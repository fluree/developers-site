---
sidebar_position: 8
---

# SQL

Structured Query Language, or SQL, is one of the most widely used database query
languages. Fluree supports a limited subset of
[SQL-92](https://en.wikipedia.org/wiki/SQL-92) syntax to query the flakes in a
database.

## Fluree SQL Restrictions {#fluree-sql-restrictions}

- Fluree only supports `SELECT`-based SQL queries including the optional `ALL`
  or `DISTINCT` modifiers to query a database.
- Fluree SQL keywords should either be in UPPERCASE or lowercase instead of
  Mixed cAse as the query parser will not recognize mixed case keywords.

## Single Collection Queries {#single-collection-queries}

`SELECT` queries use either simplified short variables for queries involving a
single collection, or qualified longer variables for queries involving more than
one collection.

### Short Form Variables {#short-form-variables}

Queries involving a single collection can use short form variables. For example,
to find all the known values of the `person/firstName` and `person/lastName`
predicates for all subjects within the person collection, we can use the query:

```sql
SELECT firstName, lastName FROM person
```

Since this query only involves a single collection (as specified by the `FROM`
clause), the SQL query engine infers the fully qualified predicate names from
the list of variables in the `SELECT` clause.

### Wildcard SELECT Clauses {#wildcard-select-clauses}

Fluree SQL `SELECT` clauses can also include `*` wildcards to indicate that all
the predicates for matched subjects should be returned instead of specific bound
variables. For example, the query `SELECT * FROM person` will return all known
predicate values for each subject within the person collection.

### Referencing Subjects Directly {#referencing-subjects-directly}

Variable names in Fluree SQL that represent the object of a flake are derived
from the collection and predicate name corresponding to that object. To query
for a subject id (`_id` predicate) directly however, you must use the special
`$` character in the query.

For example, to list the subject id and name for every subject within the
"person" collection, you'd issue the following query:

```sql
SELECT $, name FROM person
```

## WHERE Clauses {#where-clauses}

Fluree SQL `WHERE` clauses further restrict the flakes returned from a query to
those that meet specified conditions. We can use boolean relations like `<`,
`>`, and `=`, and we can combine those relations with the logical operations
`AND`, `OR`, and `NOT`.

`WHERE` clauses in Fluree SQL can also specify ranges of values with `BETWEEN`,
and set's of possible values with `IN`. `WHERE` clauses can also specify that
only predicates which are *not* set should match with the `NULL` keyword.

### WHERE Clause Examples {#where-clause-examples}

1. `SELECT * FROM person WHERE age = 18`
1. `SELECT name, email FROM person WHERE age > 18 OR team = 'red'`
1. `SELECT email FROM person WHERE age BETWEEN 18 AND 35`
1. `SELECT name FROM person WHERE email IS NOT NULL`

## Queries with Multiple Collections (JOIN Queries) {#queries-with-multiple-collections-join-queries}

You can use a `JOIN` query to specify multiple collections to query from, but
there are some additional requirements. Variables must be fully qualified, and
the query must have a join condition specified with the `ON` keyword. The `ON`
keyword supports all the conditions that the `WHERE` keyword does.

### Fully Qualified Variables {#fully-qualified-variables}

You have to use the fully qualified variables in `JOIN` queries by combining the
collection name and predicate name with a "." in between. For example, the
`title` predicate from the `job` collection would be `job.title`.

### JOIN Condition {#join-condition}

Fluree SQL uses `ON` clauses to specify the conditions for combining
collections. These conditions usually specify how predicates from one collection
should relate to predicates from another. Often, the `JOIN` condition is used to
specify objects as references to subjects from another collection. In these
cases, the subject placeholder (`$`), qualified by the collection, should be
used.

For example, the following SQL query finds the name and job title for all
subjects in a database holding a job:

```sql
SELECT person.name, job.title FROM person JOIN job ON person.job = job.$
```

That Fluree SQL query is equivalent to the following FlureeQL query:

```json
{
  "select": [ "?personName" "?jobTitle" ],
  "where": [
    [ "?person" "person/job" "?job" ],
    [ "?person" "person/name" "?personName" ],
    [ "?job" "job/title" "?jobTitle" ]
  ]
}
```
