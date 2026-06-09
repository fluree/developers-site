---
unlisted: true
id: set-3
title: "SET-3 — SSO user management"
sidebar_label: "SET-3 · SSO user management"
sidebar_position: 3
tags: [task-library, foundation, sso, one-time]
status: doc
---

# SET-3 — SSO user management

> **Task Library primitive.** A configuration variant of `SET-2` for SSO-enabled tenants. Client-neutral.

| | |
|---|---|
| **Module** | Getting Started (Tenant administration) |
| **Screen path** | Configured during tenant setup (System Admin); affects the `Manage Groups & Users` flows |
| **Type** | `[one-time]` per tenant |
| **Prerequisites** | Tenant created with the SSO option selected; an identity provider (e.g. Active Directory). System Admin involvement. |
| **Produces** | A tenant where user identity is the SSO email, so users authenticate through the IdP rather than a local password. |
| **Primary role** | System Admin (with Tenant Admin for day-to-day user management). |
| **Status** | Doc (limited published detail — see note) |

## Purpose

When a tenant is SSO-enabled, a user's **email is their identity**, resolved through the configured identity provider (e.g. Windows Active Directory) rather than a local username/password. This card flags where the standard people-management flow (`SET-2`) changes under SSO.

## Where SSO changes the flow

SSO is chosen by the **System Admin at tenant creation**. Once enabled, the user-handling steps differ at three points:

1. **Tenant creation** — the System Admin selects the SSO option.
2. **Adding the Tenant Admin** — done against the SSO identity.
3. **Adding / managing tenant users** — uses the SSO-aware mechanism (email-as-identity) rather than setting a local password as in `SET-2`.

## Prerequisites

- The tenant must have been **created with SSO selected** — it is not a toggle you flip afterward from the practitioner UI.
- A configured identity provider with the users' emails as their directory identities.

## Gotchas

- **Decide SSO at tenant-creation time.** Retrofitting is a System-Admin/setup activity, not a self-service Tenant Admin change.
- **Identity = email.** Where `SET-2` sets a password, SSO defers authentication to the IdP; the email must match the directory identity.
- **Group-management nuances exist under SSO** but are not fully specified in the current consolidated help.

> **Doc gap / confirm:** the consolidated help states there are further SSO impacts on group management that are not yet documented in detail. Treat the exact SSO group-mapping behaviour as **to-confirm** with the platform/setup team before relying on it in an engagement.

## Related tasks

- `SET-2` Manage groups & users — the non-SSO baseline these steps modify.
- `SET-4` System configuration — supported platforms and tenant-setup context.
