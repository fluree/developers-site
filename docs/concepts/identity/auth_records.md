---
sidebar_position: 1
---

# Auth Records

Auth records control identity in Fluree and are tied to specific public-private
key pairs.

## Generating a Public-Private Key/Auth Id Triple {#generating_keys}

There are many ways to generate valid public-private key/auth id triple:

1. In the downloadable version of Fluree, you can run the following command to
   generate a public key, private key, and auth id. `./fluree_start.sh :keygen`
2. In the user interface, in either the hosted or the downloadable version, you
   can go to Permissions and View Permissions by Auth. From there, you can click,
   "Generate Keys" to generate valid keys. You can also do so from FlureeQL -> Transact.
3. The [`@fluree/crypto-utils`](https://github.com/fluree/crypto-utils) library
   has a `generateKeyPair` function that will generate a `public` and `private`
   key pair. `getSinFromPublicKey` will return an account id given a public key.
   This library is available on [npm](https://www.npmjs.com/package/@fluree/crypto-utils).
4. The [`@fluree/crypto-base`](https://github.com/fluree/crypto-base) library
   has a `generate_key_pair` function that will generate a `public` and
   `private` key pair. `account_id_from_private` or `account_id_from_public`
   will return an account id given a private or public key, respectively. This library
    is available on [npm](https://www.npmjs.com/package/@fluree/crypto-base).
5. The Clojurescript library, `fluree.crypto` has a function `generate-key-pair`,
   `account-id-from-private`, and `account-id-from-public` that return a public
   and private key, as well as an account id. This library is available on
   [clojars](https://clojars.org/fluree.crypto), and the code is on [GitHub](https://github.com/fluree/fluree.crypto).

Once you have a valid auth record (and you have saved the private key
somewhere!), you must add the auth record to a ledger.

```json
[{
    "_id": "_auth",
    "id": "kh90sdlsdmyFakeAuthId",
    "doc": "My temporary auth record"
}]
```

Any roles that you add to this auth record set permissions for transactions and
queries that are signed with this auth record.

### Auth/Role/Rule Structure {#auth-role-rule-structure}

Individual permissions, such as read and write access to a collection, are
encoded in rules. The smart functions attached to these rules are listed in the
`_rule/fns` predicates. Rules, in turn, are grouped into roles (via the
`_role/rules` predicate). For instance, a chatUser role might include the
following rules:

- Read access for all chats
- Read access for all people
- Read and write access for own chats

<p align="center">
    <img
        src="https://s3.amazonaws.com/fluree-docs/roleChatUser.svg"
        alt="Diagram shows a role, chatUser, that is comprised of three rules:
        read access for all chats and people, as well as read and write access
        for own chats."
    />
</p>

Another role, dbAdmin might include read and write access to all users, as well
as token issuing permissions (tokens are only relevant to the hosted Fluree).

<p align="center">
    <img src="https://s3.amazonaws.com/fluree-docs/roleDbAdmin.svg"
    alt="Diagram shows a role, dbAdmin, that is comprised of two rules:
    read and write access for all users and the ability to generate and revoke tokens."/>
</p>

These roles are then assigned to different auth entities (via the `_auth/roles`
predicate). For instance, an administrator auth subject and a standardUser auth
subject. The administrator auth subject would need multiple roles, such as
dbAdmin and chatUser. The standardUser auth subject would only need the
chatUser role.

<p align="center">
    <img
        src="https://s3.amazonaws.com/fluree-docs/authEntities.svg"
        alt="Diagram shows two auth entities, adminstrator and standardUser.
            Administrator is assigned two roles: dbAdmin and chatUser.
            standardUser is only assigned one role - chatUser."
    />
</p>

Auth entities govern access to a ledger. Auth entities are issued tokens (in the
hosted version) or sign queries/transactions, and that auth subject's
permissions are applied to every ledger action that they perform.

An auth subject does not need to be tied a user. All auth entities can be used
independently. However, a common use case is to assign auth entities to ledger
users (via the `_user/auth` predicate). Users can have multiple auth records,
but multiple users cannot share the same auth record.

### User and Auth Entities {#user-and-auth-entities}

Permissions are always linked to an `_auth` subject that is making the request.
Roles containing permission rules are referenced from the `_auth` subject (via
the `_auth/roles` predicate).

A `_user`, which can be a human or app/system user, can be connected to several
different `_auth` entities. However, all transactions are performed as `_auth`
records, not as `_user`s.

### Roles {#roles}

Roles' purpose is simply to group a set of rules under a common name or ID that
can be easily assigned to a user.

Roles are assigned to a specific `_auth` subject under the multi-cardinality
predicate `_auth/roles`.

Having roles be assigned to an `_auth` record, rather than to a `_user` allows
a `_user` to have access to different data, based on which `_auth` they use to
authenticate. Additionally, `_auth` records can be added or revoked from a
`_user` without having to edit the actual `_auth` record.

The ability to override roles at the auth subject allows a more limited (or
possibly expanded) set of roles to the same user depending on how they
authenticate. If, for example, a social media website authenticated as a user,
 it might only have access to read a limited set of data whereas if the user
 logged in, they may have their full set of access rights.

 Note that, by default, all ledgers have a built-in `["_role/id", "root"]` role
 with access to everything inside a ledger.

### Rules {#rules}

Rules control the actual permissions and are stored in the special system
collection `_rule`. Like all Fluree functionality, it is defined as data that
 you can transact as you would any data.

See an example of [using rules](/concepts/smart-functions/rule_example.md) here.

### Authority {#authority}

Authority is a feature of Fluree that allows one entity, an authority, to act on
 behalf of another entity, an auth. This feature adds convenience at the expense
  of security, and should only be used if this trade-off is well understood.

Any given transaction can be signed by the `_auth` issuing that transaction (if
 they have a private key), or by another `_auth` that is listed in the original
  auth record's `_auth/authority`.

For example, we might have two parties: the IT Team and Alba. The IT team has a
 public-private key pair, but employees do not. Rather than make employees keep
  track of (and secure) a private key, employees might just use a username and
   password. The IT Team's public-private key pair is below.

```all
IT Team

Auth Id:                Tf5q9TVMoJ2MSATxN5XhAizBMSBEUGuy8aU
Public Key:             023f5b5873e70988dcc91cef76e13402888a0d51c8d68eea6976a8b0fab4a05c43
Private Key:            a12f89d64f966d431ea4fff850baf01f501438ccea53b6f6bb041e9eed559a76
```

To test this out, we can add two auth records:

```json
[{
    "_id": "_auth$IT",
    "id": "Tf5q9TVMoJ2MSATxN5XhAizBMSBEUGuy8aU",
    "doc": "IT Team's auth",
    "roles": [[ "_role/id", "root" ]]
},
{
    "_id": "_auth",
    "id": "Alba",
    "doc": "Alba's auth",
    "authority": ["_auth$IT"],
    "roles": [[ "_role/id", "root" ]]
}]
```

Now, let's say Alba wants to issue a transaction creating a new person. She
 cannot sign her own transaction, because she does not have a private key
 . However, she can send transaction to the IT Team, who can sign it for her.

The IT Team (the authority in this case) has to verify whether or not the person
 who sent them is, in fact, Alba. Fluree does not control how or whether you do
  this. The IT Team may have an app that uses a username/password schema for
   authentication, they can require Alba to write her transaction on a piece of
    paper and hand deliver it to IT. From Fluree's perspective, it doesn't matter.
     The IT Team then can issue Alba's transaction (for example
     `[{"_id": "person", "handle": "aJohnson", "fullName": "Aimee Johnson" }]`)
      signed with the following information (you can sign a transaction using
       the UI by selecting `Transact` and `Sign`).

```all
Auth Record:    Alba
Private Key:    a12f89d64f966d431ea4fff850baf01f501438ccea53b6f6bb041e9eed559a76
```

```json
[{
    "_id": "person", 
    "handle": "aJohnson", 
    "fullName": "Aimee Johnson" 
}]
```

Additionally, the rules that apply to whether the above transaction is valid is
 based on the rules attached to issuing auth record (Alba, in this case), and
  NOT to the rules issued to the authority (the IT team).

Furthermore, there is no proof, other than the Authority's protocols that the
 person who issued the transactions is who they say they are.

Authorities can be a very useful tool to allow users of Fluree to issue
 transactions without maintaining private keys, but this approach is less secure
  and does not provide cryptographic proof that a particular individual issued a
   given transaction. There is, however, a record of when a transaction is
    issued by an authority in the `_tx/authority` predicate.
