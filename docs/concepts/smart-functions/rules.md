---
sidebar_position: 5
---

# Rules

When creating a rule, you specify a collection, predicate/s, and smart functions. That rule can then be connected to particular auth records.

For example, an auth can be connected to a role that references rules in the `person` collection and the `person/handle` predicate. If that auth record issues a query or transaction that includes `person/handle`, then the smart functions attached to the auth's roles are triggered.

- If all of the smart functions return true, then the transaction goes through or the query results get returned.

- If at least one of the smart functions returns false, then the transaction is rejected, or, in the case of a query, the results are returned without `person/handle`.

## Rules Usage {#rules-usage}

Predicate and collection specs apply exclusively to transactions, and are universal for everyone in the ledger. Rules, as explained above, can be used for queries as well as transactions. Rules can control what end users* in a ledger see and do. They cannot control what a node-operator or administrator of a hosted Fluree ledger can see, but they can control what those individual can do (transact). Anyone who is running their own node in Fluree, or who is the administrator of a hosted Fluree ledger, always has full access to **view** any item in any ledger in their network. Query peers, however, can be connected to a Fluree ledger or network as a permissioned user.

When an end user connects to a ledger, effectively their ledger is custom to them (and their requested point in time). Any data they do not have access to doesn't exist in their ledger. This means you can give direct access to the ledger to any user, and they can run ad-hoc queries without concern that data might be leaked. This is a very powerful concept that can drastically simplify end-user applications.

For example, if a supply chain is running a federated Fluree, ledger administrators who manage each supply chain member's transactor group will have root access to view all ledgers. Individuals within each company, however, can all have direct access to the ledger. Those individuals however, will effectively see different ledgers, depending on their permissions.

Rules are useful for the following purposes:

1. Limiting what end-users can see or do.
2. Creating rules around transactions that are not universal - for either end users or node-operators/hosted ledger admins.

Universal restrictions, such as "people can only update their own profile page" should be in the relevant collection or predicate specs. However, role-specific restrictions should be placed in rules. For example, in a chat application, you might want a specific type of network participant, a `chatUser` to only be able to edit their own chats, but you could also have a `chatModerator` who can edit anyone's chats. This type of differentiated roles in a ledger are best suited for rules (although they can also be written as collection and predicate specs).

\* End users specifically refer to users who do not directly run a node or manage a hosted ledger. Every end user needs to have their own auth record, and both view and edit restrictions can be attached to that auth record.
