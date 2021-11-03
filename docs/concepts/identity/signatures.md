---
sidebar_position: 2
---

# Signatures

In Fluree, you can sign both queries and transactions. The signature proves that
 the issuer of a given query or transaction has access to the private key
  associated with the signature.

## `fdb-open-api` {#fdb-open-api}

For both queries and transactions, a signature is not required if the option
 `fdb-open-api` is set to true (default
 [config option](/reference/fluree_config.md) for the
  downloaded version of Fluree)
 In fact, the signature in signed query will be ignored if `fdb-open-api` is set
  to true.

In the case of transactions, if you send a transaction to `/transact` or to
 `/graphql`, the transaction will be signed with a default private key.

If you do need to specify a signature, such as in the case of testing out user
 permissions, you can submit a [signed transaction](#signed-transactions) to the
  `/command` endpoint. As of `v0.13.0`, you can also submit an unsigned command
   to the `/command` endpoint, but only when `fdb-open-api` is true.

## NPM Package {#npm-package}

Fluree has published a Javascript library that contains helper functions to help
users sign queries and transactions. This can be downloaded via npm,
`npm install @fluree/crypto-utils`.

The documentation (available on [GitHub](https://github.com/fluree/crypto-utils)),
guides you through how to generate keys, sign queries, and sign transactions.

We recommend using the Javascript library or the user interface for ease of use,
 but you can read more about how to sign queries and transactions manually below.

## User Interface {#user-interface}

Fluree also has a user interface to help users submit signed queries and transactions.

This can be found in the user interface by navigating to `/flureeql`. By
clicking the "sign" button, you can toggle whether or not there is an option to
sign queries and transactions. Note that the hosted version of Fluree does not
allow you to sign queries, because `fdb-open-api` is set to true for all hosted
accounts, so a signed query would be ignored regardless.

## Signed Queries {#signed-queries}

If `fdb-open-api` is set to true, then you do not need to sign your queries. In
fact, the signature in a signed query will be ignored if `fdb-open-api` is set
to true.

If you do need to sign your queries, you should have access to your private key.
Your private key needs to be
[connected to a valid auth record](/concepts/identity/auth_records.md) in the ledger.

### Headers {#headers}

You should submit a POST request should have the following headers:
`content-type`, `mydate`, `digest`, `signature`.

- `content-type`: `application/json`
- `mydate`: An RFC 1123 formatted date, i.e. Mon, 11 Mar 2019 12:23:01 GMT
- `digest`: The SHA256 hash of the stringified query body, formatted as follows:
  `SHA256={hashHere}`
- `signature`: A string containing the algorithm and signature, including other
  information, formatted as follows: `keyId="na",headers="(request-target) host
  mydate digest",algorithm="ecdsa-sha256",signature="{sigHere}"`.

If an authority is signing on behalf of an auth record, then the `_auth/id` of
the auth record in question needs to be listed as the `keyId` in the `signature`.

In order to get the actual signature (labelled `sig` above) that goes into the
larger signature value, you need to first create a signing string. Formatted as
follows: `(request-target): post {uri}\nmydate: {formattedDate}\ndigest:
SHA-256={digest}`.

Then, you should get the SHA2-256 hash of that signing string, and sign it using
Elliptic Curve Digital Signature Algorithm (ECDSA), specifically the
`secp256k1 curve`. The resulting signature is DER encoded and returned as a
hex-string. In addition, after adding 27 to the recoveryByte, that number is
converted into a hex string, and prepended to the rest of the signature.

### Body {#body}

The body of a signed query is same query as would be submitted in an unsigned
query.

### Example {#example}

```http
 {
      method: 'POST',
      headers: {
                content-type:       application/json,
                mydate:             Thu, 13 Mar 2019 19:24:22 GMT,
                digest:             SHA-256=ujfvlBjQBa9MNHebH8WpQWP7qQO1L+cI+JH//YvWTq4=,
                signature:          keyId="na",headers="(request-target) mydate digest",algorithm="ecdsa-sha256",signature="1c3046022100da65438f46df2950b3c6cb931a73031a9dee9faaf1ea8d8dd1d83d5ac026635f022100aabe5483c7bd10c3a468fe720d0fbec256fa3e904e16ff9f330ef13f7921700b"
            },
      body: { "select": ["*"], "from": "_collection"}
 }
```

## Signed Transactions {#signed-transactions}

If `fdb-open-api` is set to true, then you do not need to sign your transactions.
Each ledger comes with a default auth record, which is either provided by you
or automatically generated (see [config options](/reference/fluree_config.md)).
If`fdb-open-api` is set to true, then all transactions submitted to `/transact`
will be signed with this default private key unless otherwise specified.

All signed transactions need to be submitted to the
[`/command` endpoint](/reference/http/examples.md#command).
Transactions can be sent to the `/command` endpoint, regardless of whether
`fdb-open-api` is true or not. All transactions submitted will be attributed to
the auth record that signs the transactions, not the default auth record
(if there is one).

The `/command` endpoint takes a map with two keys:

Key | Description
--- | ---
cmd | Stringified command map
sig | (optional if `fdb-open-api` is true). ECDSA signature of the value of the
cmd key.
multiTx | (optional). Array of txids that

When submitting a transaction, the command map of type `tx` (transaction) needs
to have the following keys in the following order. Documentation on command of
type `new-db` and `default-key` is forthcoming.

### Command Map {#command-map}

Key | Description
--- | ---
type | `tx`, `new-db`, or `default-key`
db | `network/dbid`
tx | The body of the transaction
auth | `_auth/id` of the auth
fuel | Max integer for the amount of fuel to use for this transaction
nonce | Integer nonce, to ensure that the command map is unique.
expire | Epoch milliseconds after which point this transaction can no longer be
submitted.
deps | (optional, if no deps, simply exclude the key). An array of the `_tx/id`s
of any transactions this `tx` depends on. If any of the `_tx/id`s either do not
exist in the ledger or resulted in failed transactions, then the command will
not succeed.

#### Sig {#sig}

In order to get the `sig`, you need to get the SHA2-256 hash of the stringified
command. That hash is then signed using Elliptic Curve Digital Signature
Algorithm (ECDSA), specifically the `secp256k1 curve`. The resulting signature
is DER encoded and returned as a hex-string. In addition, after adding 27 to the
recoveryByte, that number is converted into a hex string, and prepended to the
rest of the signature.

### Verifying Signatures {#verifying-signatures}

ECDSA allows for recovery of the public key from a signature, so the original
transaction and signature are the only two things required in order to verify
that a signature is valid. There are online tools that allow you to
independently verify a signature based on the signature + original transaction.
[Our cryptography GitHub repos](/reference/crypto.md#js-cryptography) also have
functions that allow you to verify any signatures.

### Examples {#examples}

You can see examples of how to use signed transaction in the [example apps](/overview/demos/developer-hub.md).
