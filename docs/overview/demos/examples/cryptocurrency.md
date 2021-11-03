# Cryptocurrency

This example outlines how a user can create a simple cryptocurrency using Fluree.
The user will be able to check their own balance and add to other users' balances.

## Create a Schema {#create-a-schema}

The first step is to create a `wallet` collection with the predicates `wallet/balance`,
which tracks the amount of currency each user has, `wallet/user`, which references
a database `_user`, and `wallet/Name`, which is a unique name for the subject.

```json
[{
    "_id": "_collection",
    "name": "wallet"
},
{
    "_id": "_predicate",
    "name": "wallet/balance",
    "type": "int"
},
{
    "_id": "_predicate",
    "name": "wallet/user",
    "type": "ref",
    "restrictCollection": "_user"
},
{
    "_id": "_predicate",
    "name": "wallet/name",
    "type": "string",
    "unique": true
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": "_collection",
    "name": "wallet"
},
{
    "_id": "_predicate",
    "name": "wallet/balance",
    "type": "int"
},
{
    "_id": "_predicate",
    "name": "wallet/user",
    "type": "ref",
    "restrictCollection": "_user"
},
{
    "_id": "_predicate",
    "name": "wallet/name",
    "type": "string",
    "unique": true
}]' \
   [HOST]/api/db/transact
```

```graphql
mutation cryptoSchema ($mycryptoSchemaTx: JSON) {
  transact(tx: $mycryptoSchemaTx)
}

{
  "mycryptoSchemaTx": "[{\"_id\":\"_collection\",\"name\":\"wallet\"},{\"_id\":\"_predicate\",\"name\":\"wallet/balance\",\"type\":\"int\"},{\"_id\":\"_predicate\",\"name\":\"wallet/user\",\"type\":\"ref\",\"restrictCollection\":\"_user\"},{\"_id\":\"_predicate\",\"name\":\"wallet/name\",\"type\":\"string\",\"unique\":true}]"
}
```

```sparql
Transactions are not supported in SPARQL
```

### Add Sample Data {#add-sample-data}

After creating a schema you should add in your sample data or initial data.

We'll be creating two users, and two wallets.

```json
[{
    "_id": "_user$cryptoMan",
    "username": "cryptoMan"
     },
    {
    "_id": "_user$cryptoWoman",
    "username": "cryptoWoman"
    },
    {
    "_id": "wallet$cryptoMan",
    "name": "cryptoMan",
    "balance": 200,
    "user": "_user$cryptoMan"
    },
   {
    "_id": "wallet$cryptoWoman",
    "name": "cryptoWoman",
    "balance": 200,
    "user": "_user$cryptoWoman"
    }]
```

### Deciding Who Can Edit What {#deciding-who-can-edit-what}

Now, we are going to create rules around who can edit which predicates. Note that
there are many ways of building the same application. The steps in this tutorial
are not the only way, and may not even be the best way!

We're going to place the following restrictions on the predicates in the `wallet`
collection:

- `wallet/name` - only the owner of the wallet can edit
- `wallet/balance` - anyone can edit
- `wallet/user` - no one can edit.

First, we're going to create a function, which checks to see if the user attempting
to make the update `(?user_id)` is the owner of the wallet. The full function is:
`"(contains? (get-all (query (str \"{\\\"select\\\": [{\\\"wallet/user\\\":
[{\\\"_user/auth\\\": [\\\"_id\\\"]}]}], \\\"from\\\": \" (?sid) \" }\")) [\"wallet/user\"
\"_user/auth\" \"_id\"]) (?auth_id))"`,

First, we use `str` to create a query-string, `(str \"{\\\"select\\\":
[{\\\"wallet/user\\\": [{\\\"_user/auth\\\": [\\\"_id\\\"]}]}], \\\"from\\\": \"
(?sid) \" }\")`. The resulting query will be:

```json
{
  "select": [{"wallet/user": [{"_user/auth": ["_id]}]}],
  "from": SUBJECT-ID
}
```

The subject-id will belong to the wallet in question, and we access that `_id` via
the `(?sid)` function. We issue that query using the `query` function, and then
use `get-all` to retrieve the `_id` of the `_user/auth`.

`get-all` returns a set. In this case, it is a set of one, single `_id`. Then we
see if the set of `_id`s for the current `wallet/user`s contains the `_id` of the
`_auth` currently making the update `(?auth_id)`.

```json
[{
    "_id": "_fn$ownWallet",
    "name": "ownWallet?",
    "code": "(contains? (get-all (query (str \"{\\\"select\\\":
    [{\\\"wallet/user\\\": [{\\\"_user/auth\\\": [\\\"_id\\\"]}]}], \\\"from\\\":
    \" (?sid) \" }\")) [\"wallet/user\" \"_user/auth\" \"_id\"]) (?auth_id))"
},
   {
    "_id": "_rule$editOwnWalletName",
    "id": "editOwnWalletName",
    "doc": "A cryptoUser can only edit their own wallet/name",
    "fns": ["_fn$ownWallet"],
    "ops": ["transact"],
    "collection": "wallet",
    "predicates":  ["wallet/name"]
}]
```

Then, we'll use the built-in smart functions, `true` and `false` to make sure `wallet/balance`
can be updated by anyone, and the `wallet/user` cannot be edited by anyone.

```json
[{
    "_id": "_rule$editAnyCryptoBalance",
    "id": "editAnyCryptoBalance",
    "doc": "Any cryptoUser can edit any wallet/balance.",
    "fns": [["_fn/name", "true"]],
    "ops": ["all"],
    "collection": "wallet",
    "predicates": ["wallet/balance"]
    },

    {
    "_id": "_rule$cantEditWalletUser",
    "id": "cantEditWalletUser",
    "doc": "No one should ever be able to edit a wallet/user",
    "ops": ["transact"],
    "collection": "wallet",
    "predicates": ["wallet/user"],
    "fns": [["_fn/name", "false"]],
    "errorMessage": "You cannot change a wallet/user."
  }]
```

Now, we have three rules that we need to connect to the auth records. First, we'll
create a new predicate, `_auth/descId` (short for descriptive id), which will help
us easily identify auth records.

```json
[{
  "_id": "_predicate",
  "name": "_auth/descId",
  "type": "string",
  "unique": true
}]
```

In the following transaction, we'll group all three rules into `cryptoUser` role,
create two new `_auth` records, and add those `_auth` records to our `cryptoMan`
and `cryptoWoman` users.

In order to sign transactions as a particular auth record, that auth record's `_auth/id`
needs to be connected to a public/private key pair. To learn more, you can read
about how [to derive an auth/id](/concepts/identity/auth_records.md) from a public key.
You can also
[generate a public key, private key, and auth id](/concepts/identity/auth_records.md#generating_keys)
directly in the downloadable version of Fluree.

In the below example, we use a valid auth id/private key pair. If using this example
in production, you should generate your own public/private/auth id triple.

```json
[{
    "_id": "_role$cryptoUser",
    "id": "cryptoUser",
    "doc": "Standard crypto user",
    "rules": [["_rule/id", "cantEditWalletUser"], ["_rule/id", "editAnyCryptoBalance"],
    ["_rule/id", "editOwnWalletName"]]
    },
    {
    "_id": "_auth$cryptoWoman",
    "id": "Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP",
    "descId": "cryptoWoman",
    "doc": "cryptoWoman auth record",
    "roles": ["_role$cryptoUser"]
    },
    {
    "_id": "_auth$cryptoMan",
    "id": "TfDao2xAPN1ewfoZY6BJS16NfwZ2QYJ2cF2",
    "descId": "cryptoMan",
    "doc": "cryptoMan auth record",
    "roles": ["_role$cryptoUser"]
    },
    {
    "_id": ["_user/username", "cryptoMan"],
    "auth": ["_auth$cryptoMan"]
    },
    {
    "_id": ["_user/username", "cryptoWoman"],
    "auth": ["_auth$cryptoWoman"]
}]
```

### Ensure Balance Non-Negative {#ensure-balance-non-negative}

Next, we add an `_predicate/spec` that makes sure our `wallet/balance` is never
negative. The code for this is `(< -1 (?o))`. To see how to write smart functions,
you can go to the [SmartFunction](/guides/advanced/smart-functions/1.md) section.

Note, this transaction, and many of the subsequent transactions can be combined.
We separate out these transactions here for demonstration purposes.

```json
[{  "_id":  ["_predicate/name", "wallet/balance"],
    "spec": ["_fn$nonNegative?"],
    "specDoc": "Balance cannot be negative."
},
{
    "_id": "_fn$nonNegative?",
    "name": "nonNegative?",
    "code": "(< -1 (?o))"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{  "_id":  ["_predicate/name", "wallet/balance"],
    "spec": ["_fn$nonNegative?"],
    "specDoc": "Balance cannot be negative."
},
{
    "_id": "_fn$nonNegative?",
    "name": "nonNegative?",
    "code": "(< -1 (?o))"
}]' \
   [HOST]/transact
```

```graphql
mutation nonNegativeBalance ($nonNegativeBalanceTx: JSON) {
  transact(tx: $nonNegativeBalanceTx)
}

{
  "nonNegativeBalanceTx": "[
      {
        \"_id\": [\"_predicate/name\",\"wallet/balance\"],
        \"spec\":[\"_fn$nonNegative?\"],
        \"specDoc\":\"Balance cannot be negative.\"},{\"_id\":\"_fn$nonNegative?\",
        \"name\":\"nonNegative?\",\"code\":\"(< -1 (?o))\"}]"
}
```

```sparql
Transactions are not supported in SPARQL
```

### Restrict Crypto Spending {#restrict-crypto-spending}

At this point, we have a fairly useless cryptocurrency. Anyone can transact anyone
else's`wallet/balance`, and there are no protections against someone transacting
your `wallet/balance` to 0. In order to prevent this, we can create a rule that
only allows you to withdraw from your own `wallet/balance` or deposit in another
user's `wallet/balance`.

```json
[{
        "_id": "_fn$subtractOwnAddOthers?",
        "name": "subtractOwnAddOthers?",
        "code": "(if-else (ownWallet?)  (> (?pO) (?o)) (< (?pO) (?o))))",
        "doc": "You can only add to others balances, and only subtract from your
        own balance"
    },
    {
        "_id": ["_predicate/name", "wallet/balance"],
        "spec": ["_fn$subtractOwnAddOthers?"],
        "specDoc": "You can only add to others balances, and only subtract from
        your own balance. No balances may be negative"
    }]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
        "_id": "_fn$subtractOwnAddOthers?",
        "name": "subtractOwnAddOthers?",
        "code": "(if-else (ownWallet?)  (> (?pO) (?o)) (< (?pO) (?o))))",
        "doc": "You can only add to others balances, and only subtract from your
        own balance"
    },
    {
        "_id": ["_predicate/name", "wallet/balance"],
        "spec": ["_fn$subtractOwnAddOthers?"],
        "specDoc": "You can only add to others balances, and only subtract from
        your own balance. No balances may be negative"
    }]' \
   [HOST]/transact
```

```graphql
mutation restrictCrypto ($restrictCryptoTx: JSON) {
  transact(tx: $restrictCryptoTx)
}

{
  "restrictCryptoTx": "[{\"_id\":\"_fn$subtractOwnAddOthers?\",\"name\":
  \"subtractOwnAddOthers?\",\"code\":\"(if-else (ownWallet?)  
  (> (?pO) (?o)) (< (?pO) (?o))))\",\"doc\":\"You can only add to others balances,
  and only subtract from your own balance\"},{\"_id\":
  [\"_predicate/name\",\"wallet/balance\"],\"spec\":[\"_fn$subtractOwnAddOthers?\"],
  \"specDoc\":\"You can only add to others balances, and only subtract from your
  own balance. No balances may be negative\"}]"
}
```

### Testing Our Crypto {#testing-our-crypto}

We are not quite done with our example yet, but we can test it to this point.

When we submit a transaction without a signature, it is signed with the default
auth record. However, to add or subtract balance from a wallet, we need to sign
our transactions as a particular auth record. We do this by submitting a request
to the [`/command` endpoint](/reference/http/examples.md).

We can also use a tool in the user interface to sign transactions as a particular
private key. To access this tool, we need to go to `/flureeql`, select "Transact",
and then select "Own Private Key" from the dropdown.

The first item we will attempt is cryptoMan adding 5 to cryptoMan's own `wallet/balance`.
If using the user interface, you need to include the private key in the form. If
you're not using the user interface, you will need to sign the following transaction
with the private key. You will also need to specify cryptoMan's auth in either the
form or the [signed transaction](/concepts/identity/signatures.md#signed-transactions).

A request to `/command` will return a `_tx/id`. In order to see if the transaction
went through successfully, you will need to query:

```all
Private Key: 745f3040cbfba59ba158fc4ab295d95eb4596666c4c275380491ac658cf8b60c
Auth id: TfDao2xAPN1ewfoZY6BJS16NfwZ2QYJ2cF2
```

```json
{
  "select": ["*"],
  "from": ["_tx/id", 'TRANSACTION ID HERE' ]
}
```

If there is an error in the transaction, that will appear in `_tx/error`. If the
transaction was submitted successfully, there will not be a `_tx/error`.

If you are using the user interface, the "Results" editor will automatically show
you the results of issuing the above query after submitting a command (unless the
auth record you are using cannot view subjects in the `_tx` collection).

```all
Private Key: 745f3040cbfba59ba158fc4ab295d95eb4596666c4c275380491ac658cf8b60c
Auth id: TfDao2xAPN1ewfoZY6BJS16NfwZ2QYJ2cF2
```

```json
[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": 205
}]
```

<!-- ```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": 205
}]' \
   [HOST]/command
```

```graphql
mutation addCryptoWoman ($addCryptoWomanTx: JSON) {
  transact(tx: $addCryptoWomanTx)
}

{
  "addCryptoWomanTx": "[
      {\"_id\": "[\"wallet/name\",\"cryptoWoman\"],\"balance\":205}]"
}
```

```sparql
Transactions not supported
``` -->

In the following transaction, cryptoMan will attempt to add balance to his OWN wallet.
The transaction should fail with the error message, "You can only add to others
balances, and only subtract from your own balance."

If you are using the user interface, the error message will appear in the "Results"
editor. If you're not using the user interface, remember that a request to `/command`
will only return `_tx/id`, and you need to query `{ "select": ["*"],"from": ["_tx/id",
TRANSACTION ID HERE ] }` in order to see the error.

```all
Private Key: 745f3040cbfba59ba158fc4ab295d95eb4596666c4c275380491ac658cf8b60c
Auth id: TfDao2xAPN1ewfoZY6BJS16NfwZ2QYJ2cF2
```

```json
[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": 205
}]
```

<!--
```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": 195
}]' \
   [HOST]/transact
```

```graphql
mutation addCryptoWoman ($addCryptoWomanTx: JSON) {
  transact(tx: $addCryptoWomanTx)
}

{
  "addCryptoWomanTx": "[
      {\"_id\": "[\"wallet/name\",\"cryptoWoman\"],\"balance\":195}]"
}
```

```sparql
Transactions not supported
``` -->

We can try similar transactions for cryptoWoman. The following transaction should
succeed.

```all
Private Key: 65a55074e1de61e08845d4dc5b997260f5f8c20b39b8070e7799bf92a006ad19
Auth id: Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP
```

```json
[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": 195
}]
```

<!--
```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": "#(- (?pO) 5)"
}]' \
   [HOST]/transact
```

```graphql
mutation addCryptoWoman ($addCryptoWomanTx: JSON) {
  transact(tx: $addCryptoWomanTx)
}

{
  "addCryptoWomanTx": "[{\"_id\":[\"wallet/name\",\"cryptoWoman\"],\"balance\":\"#(- (?pO) 5)\"}]"
}
```

```sparql
Transactions not supported
``` -->

Whereas adding to her own wallet will fail. Even if she doesn't know her current
balance, she can use the database function, (`?pO`) to get the previous value of
her `wallet/balance`.

```all
Private Key: 65a55074e1de61e08845d4dc5b997260f5f8c20b39b8070e7799bf92a006ad19
Auth id: Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP
```

```json
[{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": "#(+ (?pO) 5)"
}]
```

<!-- ```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(+ (?pO) 5)"
}]' \
   [HOST]/transact
```

```graphql
mutation addCryptoMan ($addCryptoManTx: JSON) {
  transact(tx: $addCryptoManTx)
}

{
  "addCryptoManTx": "[{\"_id\":[\"wallet/name\",\"cryptoMan\"],\"balance\":\"#(+ (?pO) 5)\"}]"
}
```

```sparql
Transactions not supported
``` -->

Removing money from cryptoMan's wallet will also fail.

```all
Private Key: 65a55074e1de61e08845d4dc5b997260f5f8c20b39b8070e7799bf92a006ad19
Auth id: Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP
```

```json
[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(- (?pO) 5)"
}]
```

<!--
```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(- (?pO) 5)"
}]' \
   [HOST]/transact
```

```graphql
mutation addCryptoMan ($addCryptoManTx: JSON) {
  transact(tx: $addCryptoManTx)
}

{
  "addCryptoManTx": "[{\"_id\":[\"wallet/name\",\"cryptoMan\"],\"balance\":\"#(- (?pO) 5)\"}]"
}
```

```sparql
Transactions not supported
``` -->

### Crypto Spent = Crypto Received {#crypto-spent--crypto-received}

For this next section, we can submit the following transactions with the default
private key, so we can return to submitting requests to the `/transact` endpoint
(or in the user interface, selecting "Transact" and "Default Private Key" in `/flureeql`).

Now, we can add a spec, which makes sure that the total balance added to one (or
several accounts) is equal to the amount subtracted from another account. For this
purpose, we can use the `txSpec` predicate. `_predicate/spec`, which we used to
ensure that balances are non-negative, checks every flakes in a transaction that
contains a given predicate. On the other hand `_predicate/txSpec` is run once _per
predicate_ in a transaction. For example, if we create an `_predicate/txSpec` for
`wallet/balance`, our transactor will group together every flake that changes the
`wallet/balance` predicate and only run the `txSpec` _once_. `txSpec` allows use
to do things like sum all the wallet/balance values in a transaction.

The function `(objT)` takes no arguments, and sums all the true flakes in a transaction
for the given `_predicate`. Likewise, the function `(objF)` takes no arguments,
and sums all the false flakes in a transaction for the given `_predicate`. We want
to make sure that the sum of all of the `wallet/balance`s being retracted equals
the sum of those being added.

```json
[{
    "_id": ["_predicate/name", "wallet/balance"],
    "txSpec": ["_fn$evenCryptoBalance"],
    "txSpecDoc": "The values of added and retracted wallet/balance flakes need to
    be equal"
},
{
    "_id": "_fn$evenCryptoBalance",
    "name": "evenCryptoBalance?",
    "code": "(== (objT)  (objF))",
    "doc": "The values of added and retracted wallet/balance flakes need to be equal"
}]
```

```bash
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["_predicate/name", "wallet/balance"],
    "txSpec": ["_fn$evenCryptoBalance"],
    "txSpecDoc": "The values of added and retracted wallet/balance flakes need to
    be equal"
},
{
    "_id": "_fn$evenCryptoBalance",
    "name": "evenCryptoBalance?",
    "code": "(== (objT) (objF))",
    "doc": "The values of added and retracted wallet/balance flakes need to be equal"
}]' \
   [HOST]/transact
```

```graphql
mutation cryptoSpentReceived ($cryptoSpentReceivedTx: JSON) {
  transact(tx: $cryptoSpentReceivedTx)
}

{
  "cryptoSpentReceivedTx": "[{\"_id\":[\"_predicate/name\",\"wallet/balance\"],
  \"txSpec\":[\"_fn$evenCryptoBalance\"],\"txSpecDoc\":\"The values of added and
  retracted wallet/balance flakes need to be equal\"},{\"_id\":
  \"_fn$evenCryptoBalance\",\"name\":\"evenCryptoBalance?\",\"code\":
  \"(== (objT) (objF))\",\"doc\":\"The values of added and retracted wallet/balance
  flakes need to be equal\"}]"
}
```

```sparql
Transactions not supported
```

### Final Test {#final-test}

Now, all the pieces of our cryptocurrency are in place. We have created a cryptocurrency
with the following features:

1. Balances can never be negative.
2. A user may only withdraw from their own account.
3. A user may only add to another user's account.
4. When withdrawing or adding, the amount withdraw has to equal the amount added.

For example, with our final function in place, no user can perform the following
transaction, because it violates feature #4, as listed about.

We can try submitting the following transaction with cryptoWoman's private key.
The following transaction adds to cryptoMan's wallet and subtracts from cryptoWoman's
wallet. If we hadn't added the last function (crypto spent = crypto received), the
following transaction would have been valid. Now, if signed as cryptoWoman, it will
return the error, "The values of added and retracted wallet/balance flakes need
to be equal".

```all
Private Key: 65a55074e1de61e08845d4dc5b997260f5f8c20b39b8070e7799bf92a006ad19
Auth id: Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP
```

```json
[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(+ (?pO) 10)"
},
{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": "#(- (?pO) 5)"
}]
```

<!--
```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(+ (?pO) 10)"
},
{
    "_id": ["wallet/name", "cryptWoman"],
    "balance": "#(- (?pO) 5)"
}]' \
   [HOST]/transact
```

```graphql
mutation unevenSpend ($unevenSpendTx: JSON) {
  transact(tx: $unevenSpendTx)
}

{
  "unevenSpendTx": "[{\"_id\":[\"wallet/name\",\"cryptoMan\"],\"balance\":\"#(+ (?pO) 10)\"},{\"_id\":[\"wallet/name\",\"cryptWoman\"],\"balance\":\"#(- (?pO) 5)\"}]"
}
```

```sparql
Transactions not supported
``` -->

The following transaction spends as much cryptocurrency as it receives. However,
because it is withdrawing from cryptoMan and adding to cryptoWoman, only cryptoMan
can initiate the transaction. We can sign it as cryptoMan, and it will go through.

But if we sign it as cryptoWoman, it will return an error.

```all
Private Key: 65a55074e1de61e08845d4dc5b997260f5f8c20b39b8070e7799bf92a006ad19
Auth id: Tf6mUADU4SDa3yFQCn6D896NSdnfgQfzTAP
```

```json
[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(- (?pO) 10)"
},
{
    "_id": ["wallet/name", "cryptoWoman"],
    "balance": "#(+ (?pO) 10)"
}]
```

<!--
```curl
curl \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer $FLUREE_TOKEN" \
   -d '[{
    "_id": ["wallet/name", "cryptoMan"],
    "balance": "#(- (?pO) 10)"
},
{
    "_id": ["wallet/name", "cryptWoman"],
    "balance": "#(+ (?pO) 10)"
}]' \
   [HOST]/transact
```

```graphql
mutation unevenSpend ($unevenSpendTx: JSON) {
  transact(tx: $unevenSpendTx)
}

{
  "unevenSpendTx": "[{\"_id\":[\"wallet/name\",\"cryptoMan\"],\"balance\":\"#(- (?pO) 10)\"},{\"_id\":[\"wallet/name\",\"cryptWoman\"],\"balance\":\"#(+ (?pO) 10)\"}]"
}
```

```sparql
Transactions not supported
``` -->
