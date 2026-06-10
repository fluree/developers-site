---
id: set-2
title: "SET-2 — Manage groups & users"
sidebar_label: "SET-2 · Manage groups & users"
sidebar_position: 2
tags: [task-library, foundation, tenant-admin, one-time]
status: doc
---

# SET-2 — Manage groups & users

> **Task Library primitive.** Sequenced at project Setup; underpins every entitlement and four-eyes assignment downstream. Client-neutral.

| | |
|---|---|
| **Module** | Getting Started (Tenant administration) |
| **Screen path** | `Tenant Admin Management` → `Manage Groups & Users` |
| **Type** | `[one-time]` per tenant, then `[repeatable]` as people join/leave |
| **Prerequisites** | The logged-in user holds the **Tenant Admin** role (created by the system administrator). |
| **Produces** | Groups and user identities that feature-level entitlements (`SET-1`, `ACQ-2`) and project roles/four-eyes (`NRM-1`, `RES-3`) are assigned against. |
| **Primary role** | Tenant Admin. |
| **Status** | Doc |

## Purpose

Set up the people layer of the tenant: create groups, add users, and maintain them. Groups are the unit you entitle data sources, data sets, catalogs and projects against, so getting this right early makes every later assignment a group pick rather than a per-person chore.

## Prerequisites

- **Tenant Admin** role — this is provisioned by the system administrator during tenant setup; it cannot be self-granted.
- A naming convention for groups (e.g. by domain or by function) decided before you create them.

## Context: the three role tiers

- **System Admin** — Fluree-side; manages tenant deployments. Out of scope for practitioners.
- **Tenant Admin** — manages the tenant, its users and its groups. This card's actor.
- **Tenant Users** — everyone else; gets feature-specific roles (data source / data set / catalog / project) covered in the relevant cards.

Every tenant ships with a **Default group** (renamable) plus default users, catalog, data source and data sets.

## Steps — add a group

1. Open **Manage Groups & Users** from the Tenant Admin Management screen.
2. Click the **Add a Group** (plus) icon.
3. Enter a **Group name** (must be unique to the tenant) and an optional description. Click **Save**. The group appears in the left panel, ready to receive users.

## Steps — add a user (UI)

1. Open **Manage Groups & Users**. Groups show on the left, that group's users on the right. (Expect several system-generated users by default.)
2. Select the target **group** on the left.
3. Click the **Add Users** icon and complete the popup (see field table). Click **Save**.
4. Review the new user on the right panel.

### Add-user fields

| Field | Required | Example | Validation |
|---|---|---|---|
| Username | Yes | `j.doe` | Must be unique. |
| First Name | Yes | `Jane` | — |
| Last Name | Yes | `Doe` | — |
| Email | Yes | `jane.doe@example.com` | Must be unique **across the tenant**. |
| Password | Yes | (set one) | Strong-password policy applies. |

## Steps — import users (bulk alternative)

1. From the Tenant Admin home screen, open the **Users** screen.
2. Click **Import Users**.
3. **Download the import template**, add the new users, and **upload** it.
4. Review the errors/results returned by the import.

## Steps — manage existing users

- **Move a user to another group:** use the group drop-down next to the user.
- **Delete a user:** click the minus icon next to the user. This is a **soft-delete** — it blocks login but retains the record.

## Gotchas

- **Email uniqueness is per-tenant, not global.** The same email can exist in more than one tenant, but notifications only fire for the tenant where the event occurred.
- **Default group / default users are expected.** Don't be alarmed by system-generated users; you can rename the default group.
- **Group names must be unique within the tenant.**
- **Tenant Admin can't be self-assigned** — it originates from the system administrator.

## Related tasks

- `SET-3` SSO user management — how this differs when the tenant uses SSO identities.
- `SET-1` Register a data source — entitle the groups created here.
- `ACQ-2` Register a data set — assigns Admin / Read-Only / Read-Write per group/user.
- `NRM-1` / `RES-3` — assign project roles and four-eyes reviewers/approvers from these users.
