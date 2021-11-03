# Identity & Access Managment (IAM)

This example will give you an idea of how you can implement a basic Identity & Access
Management system with Fluree's password authentication API and built-in data permission
features. To follow along, you will need to have some API testing software handy
(like [Postman](https://postman.com) or [Insomnia](https://insomnia.rest)) in order
to use password authentication.

Identity and access management is a system that uses authentication, authorizations,
and user roles to provide the appropriate level of access to a data source for a
user. In this example, we'll be using Fluree's Password API to handle authentication;
smart functions and the `_rule` collection to handle authorization, and the `_role`
and `_auth` collections to set up our user roles.

## Setting Up {#setting-up}

For this example, we'll create a basic illusion ledger for a magicians' guild. Magicians
like to keep their illusions secret, so we'll implement roles for our users which
will only allow trusted magicians to see sensitive information, such as how exactly
an illusion is performed. We'll leave less sensitive information, like names and
basic descriptions open to querying by users who have not gained the trust of the
guild.

### Open / Closed API {#open--closed-api}

For the purposes of this example, we'd recommend setting the API to open, especially
when adding or editing the ledger schema. With the API set to open, any queries
or transactions that aren't properly authenticated will be considered the actions
of the default `root` user. This will bypass any data security roles set in the
schema. If the API is set to closed, any improperly authenticated queries or transactions
will be rejected outright. If you are receiving unexpected results for your queries
/ transactions, be sure you're not adding any unneeded quotes to your header settings
(i.e. Postman and Insomnia do not require quotations for setting strings in header
value fields).

### Initial Schema {#initial-schema}

You can copy/paste the following schema transaction into the Fluree Admin dashboard,
to create the `illusion` collection and user roles in the ledger.

```json
[
  {
    "_id": "_collection",
    "name": "illusion"
  },
  {
    "_id": "_predicate",
    "name": "illusion/name",
    "type": "string",
    "doc": "The name of the magic illusion"
  },
  {
    "_id": "_predicate",
    "name": "illusion/description",
    "type": "string"
  },
  {
    "_id": "_predicate",
    "name": "illusion/equipment",
    "type": "string",
    "multi": true,
    "doc": "Equipment required to do the illusion"
  },
  {
    "_id": "_predicate",
    "name": "illusion/difficulty",
    "type": "int",
    "doc": "How hard the illusion is to pull off (scale of ten)"
  },
  {
    "_id": "_predicate",
    "name": "illusion/instructions",
    "type": "string",
    "doc": "How to do the illusion (magicians' eyes only)"
  },
  {
    "_id": "_role#initiate",
    "id": "initiate",
    "doc": "A base level user who has not earned the trust of the guild",
  },
  {
    "_id": "_role#magician",
    "id": "magician",
    "doc": "A user who has achieved the title of magician. Entrusted with the secrets
    of the guild"
  }
]
```

### Seed Data {#seed-data}

```json
[
  {
    "_id": "illusion#1",
    "name": "Cabinet Escape",
    "description": "The magician is bound and placed in a cabinet, and must escape
      unaided",
    "equipment": [
      "illusion handcuffs",
      "slippery rope",
      "cabinet w/ secret trap door"
    ],
    "difficulty": 7,
    "instructions": "Have trained assistant handcuff you, and tie you up with a
    illusion knot. After being placed in cabinet, drop through trap door. Remove
    handcuffs and rope, move to platform to return to stage in puff of smoke"
  },
  {
    "_id": "illusion#2",
    "name": "Flying",
    "description": "The magician appears to fly about the stage.",
    "equipment": [
      "multi-million dollar computer controlled wire rig",
      "harness"
    ],
    "difficulty": 10,
    "instructions": "Put on harness underneath clothing. Attach wire array to harness.
      Profit"
  }
]
```

### Registering & Logging In Users {#registering--logging-in-users}

We'll be using the [Password Authentication API](/concepts/identity/password_management.md)
to create our users. Using your API testing software, send a POST request with the
following body to `http://localhost:8090/fdb/[NETWORK-NAME]/[DBID]/pw/generate`.

```json
{
  "user": "greenhorn",
  "password": "alakazam",
  "create-user?": true,
  "roles": [["_role/id", "initiate"]],
  "expire": 999999999
}
```

To create a user with the role of "magician", change the replace `initiate` with
`magician`.

Under the hood, Fluree is creating new `_user` and `_auth` records, associating
them together, and associating the specified role with the `_auth` record.

You should receive a long string that looks something like this. (Shortened for readability)

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....Vvon__pAMa6BRQoAaT_zG_qt0pSI`

This is the [JSON Web Token](https://jwt.io) (JWT) that will be passed in each HTTP
request to authenticate the user. This string must be sent with each request in the
`Authorization` header, formatted as such:

`Authorization: "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....Vvon__pAMa6BRQoAaT_zG_qt0pSI"`

Sending an object containing the `user` and `password` key/value pairs of an existing
user to the `pw/login` endpoint will return a JWT to use for authentication as well.
The following object would be included in the POST request body to login the created
user.

```json
{
  "user": "greenhorn",
  "password": "alakazam",
  "expire": 999999999
}
```

### Query Permissions {#query-permissions}

Let's try to query some illusions. With a valid JWT set in the Authorization header,
send the following query to your Fluree ledger's `query` endpoint.

```json
{
  "select": ["*"],
  "from": "illusion"
}
```

Oh no! All that was returned were some empty brackets (if your API is set to closed,
or you properly formatted your `Authorization` header). This is because we forgot
to make rules for our user roles. A role must be given permissions before it can
access any data, and we'll use the `rules` predicate to aggregate those permissions.
Using the built-in `true` smart-function, we will now transact some rules to apply
to our roles, so that our users can access the appropriate data for their trust level.
Transact the following array in the admin dashboard to give our each role appropriate
query permissions for the `illusion` collection:

```json
[
  {
    "_id": "_rule#initiatePermission",
    "id": "initiatePermission",
    "doc": "The permissions for an initiate level user",
    "collection": "illusion",
    "predicates": [
      "illusion/name",
      "illusion/description",
      "illusion/difficulty"
    ],
    "fns": [["_fn/name", "true"]],
    "ops": [
      "query"
    ]
  },
  {
    "_id": "_rule#magicianPermission",
    "id": "magicianPermission",
    "doc": "Query permissions for a magician level user",
    "collection": "illusion",
    "predicates": [
      "*"
    ],
    "fns": [["_fn/name", "true"]],
    "ops": [
      "query"
    ]
  },
  {
    "_id": ["_role/id", "initiate"],
    "rules": ["_rule#initiatePermission"]
  },
  {
    "_id": ["_role/id", "magician"],
    "rules": ["_rule#magicianPermission"]
  }
]
```

With those permissions now applied, an "initiate" user's queries to the `illusion`
collection should only return the `illusion/name`, `illusion/description`, and
`illusion/difficulty` predicates, while the "magician" user should have access to
all of the predicates.

### Transaction Permissions {#transaction-permissions}

Now that we have querying permissions set for our user roles, let's talk transaction
rules. Obviously, we don't want any "initiates" making changes to the `illusion`
collection, but what if a magician wants to add a new illusion, or update an old
one? That's as easy as updating our existing `magicianPermission` rule to allow transactions.

In the admin dashboard, transact the following block to allow "magician" users the
ability to update and add to the `illusion` collection.

```json
[
  {
    "_id": ["_rule/id", "magicianPermission"],
    "ops": ["transact"]
  }
]
```

Alternatively, to get the same effect from the outset, you could apply the `all`
tag to the `_rule/ops` predicate to allow query & transaction operations.

Now, try transacting the following block as an "initiate", and then attempt the
same transaction as a "magician" user.

```json
[
  {
    "_id": "illusion#new",
    "name": "Sawed in Half",
    "description": "Using a magic box, you can saw a person in half",
    "equipment": [
      "dramatic looking saw",
      "2-piece magic box w/ wheels",
      "2 flexible assistants"],
    "difficulty": 8,
    "instructions": "Be sure to have the assistant representing the lower half preloaded
    in their box compartment. Onstage, have the 'top-half' assistant get into the
    box, with the 'lower-half' sticking their legs out at the properly coordinated
    time, close the box, and do the dramatic sawing performance. Wheel the box halves
    around to sell the trick."
  }
]
```

Unlike an unauthorized query attempt, an unauthorized transaction attempt will
return an error from Fluree.

So now, we have a collection of magical illusions, accessible both by initiates
and magicians, but with the magicians' secrets guarded from untrusted eyes. Our
magicians also have the ability to update and add new illusions to the collection.
