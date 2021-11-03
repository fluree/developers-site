---
sidebar_position: 3
---

# Password Management

Passwords are less-secure than private keys, however they may be the best option
 for your infrastructure. If you have passwords enabled, users only have to manage
  those passwords, rather than private keys. Once a user signs in and retrieves
   a token, they can send permissioned queries and transactions without having
    to worry about signatures.

## Password Settings {#password-settings}

There are [several settings](/reference/fluree_config.md#password-and-jwt-token-settings)
that are used to handle passwords and tokens. Two of the main settings are:

`fdb-pw-auth-enable`: by default this is `true`.
`fdb-pw-auth-secret`: this can be any string. <!-- (SAME FOR EACH TX GROUP SERVER??) -->

Once we ensure these settings are how we like them, we can start our Fluree instance.

### Passwords API {#passwords-api}

There are three API endpoints associated with passwords - [generate, renew, and login](/reference/http/overview.md#password-authentication-endpoints).

When you generate a password, a new auth record is created in your given ledger.
 For example:

```json
[{
    "_id": 105553116267496,
    "_auth/id": "Tf9Sn7cR3dRpdVJYXiRYY2TeNhJLpb2eLDS",
    "_auth/salt": "371299876ee3328b4cd72dc3e25f3b0d",
    "_auth/type": "password-secp256k1"
}]
```

The salt, the normalized password, and the `fdb-pw-auth-secret` are all used to
 regenerate the private key, and sign a request on behalf of the user.

When you `generate`, `renew`, or `login`, the response is a token, which then
can be used in any subsequent request as authorization by placing the token the
Authorization header: `Headers: { Authorization: "Bearer TOKEN-HERE" }`. For
an implemention example refer to the [Comic Store](https://github.com/fluree/developer-hub)
repo located in the Fluree Developer Hub.
