---
sidebar_position: 7
---

# Functions in Transactions

Smart functions can also be used directly in transaction to derive a particular value. The role of smart functions directly used in transactions is to derive objects NOT to accept/reject transactions.

To use smart functions directly in transactions, we need to put our code inside of a string, and prefix the code with a `#`.

For example, to add ", Sr." to the end of a person's full name, we can use two built-in smart functions, `str` and `?pO`. `str` concatenates strings, and `?pO` retrieves the previous object. In this case, we expect the final object of `person/fullName` to be `Jane Doe, Sr.`.

```json
[{
  "_id": ["person/handle", "jdoe"],
  "fullName": "#(str (?pO) \", Sr.\")"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
  "_id": ["person/handle", "jdoe"],
  "fullName": "#(str (?pO) \", Sr.\")"
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation addSr ($addSrTx: JSON) {
  transact(tx: $addSrTx)
}

{
  "addSrTx": "[{\"_id\":[\"person/handle\",\"jdoe\"],\"fullName\":\"#(str (?pO) \\\", Sr.\\\")\"}]"
}
```

```sparql
Transactions not supported in SPARQL
```

## Compare and Set / Swap {#compare-and-set--swap}

An atomic compare and set function can protect the integrity of a transaction when it is formed based on the result of a query. Because there could be other transactions in-flight that modify the value between your query results and when your transaction gets executed, the compare-and-set (`cas`) SmartFunction can avoid updating a subject based on a stale value.

Say you wanted to add a 'Dr.' in front of every medical doctor's name. You issue a query for all people whose title is doctor, and do some logic to filter all names that don't already start with 'Dr.'. It happens that Jane Doe and John Smith are missing the Dr. prefix. A `cas` use might look like:

```json
[{"_id": 1234 
  "fullName": "#(cas \"Jane Doe\" \"Dr. Jane Doe\")"},
  "_id": 5678 
  "fullName": "#(cas \"John Smith\" \"Dr. John Smith\")"}
]
```

If between your query and this transaction getting executed another transaction from another user modified 'John Smith' to 'Johnathan Smith' this transaction will fail. The app developer can decide what to do, perhaps re-run the same query and logic and try the transaction again but with the updated values.

### cas as a Synthetic Lock {#cas-as-a-synthetic-lock}

In another example, say you had multiple microservices that required a synthetic lock on a value. `cas` can test that the lock still exists before updating a different value. In this example, each lock can have a unique `lock/id`, and if a lock is active then `isLocked` will be `true`.

```json
[{"_id": ["lock/id", 12345] 
  "isLocked": "#(cas true false)"},
 {"_id": 5678 
  "somePredicate": "Some Value"}
]
```

This example will cancel (make `false`) a lock at ["lock/id", 12345] only if the lock is still `true`. If the lock has already been modified to `false` by another transaction, this entire transaction will fail and 'somePredicate' will never get set with 'Some Value'.
