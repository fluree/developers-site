---
unlisted: true
id: set-1
title: "SET-1 — Register a data source"
sidebar_label: "SET-1 · Register a data source"
sidebar_position: 1
tags: [task-library, foundation, data-source, one-time]
status: doc
---

# SET-1 — Register a data source

> **Task Library primitive.** Sequenced by the Master Playbook at Bronze · **B1 Acquire**. Client-neutral.

| | |
|---|---|
| **Module** | Classify / Resolve (shared feature) |
| **Screen path** | `Data Sources` (left nav) → `Create New Data Source` |
| **Type** | `[one-time]` per source system |
| **Prerequisites** | Tenant access with rights to create a data source; connection details for the target system. |
| **Produces** | A registered, connection-validated data source that content files/tables hang off — the prerequisite for `ACQ-1`/`ACQ-3`/`ACQ-4`. |
| **Primary role** | Data Acquisition Engineer (credentials from Platform/Infra Engineer). |
| **Status** | Doc |

## Purpose

Register a source system so the platform can read raw content (files or tables) into Bronze. A data source is the connection-plus-entitlements wrapper; the individual files or tables inside it become **data sets** in a later task (`ACQ-1`–`ACQ-4`). One source system = one data source; register as many as needed.

## Prerequisites

- An account with rights to create a data source.
- The **source type** decided up front — it cannot be changed later (see Gotchas).
- Connection parameters for that type (account/host, key or credentials, container, path), with network reachability from the platform to the source.
- For file sources: the **relative path** to the files and the **container** name.

## Steps (click-by-click)

1. In the left navigation, open **Data Sources**, then click **Create New Data Source**.
2. **Step 1 — Identify the source.** Enter the **Name** (mandatory) and an optional **Description**, choose the **Data Source Type**, and pick a **Sub Type** if offered. Click **Next**.
3. **Step 2 — Connection.** Enter the connection parameters (vary by type/sub-type — see the field table). Click **Test and Validate**. **Next Step** stays disabled until validation passes; on success the connection string is saved for reuse.
4. **Step 3 — Add Admin Users.** You are automatically placed as **Data Source Admin**. Move any co-admins into the right panel, then click **Next Step**.
5. **Step 4 — Content entitlements** (*Set User Entitlements*). Optional but recommended when others need scoped access: select files/tables (left panel), choose the group then the users (middle panel), confirm (right panel), and click **Save & Close**. Admins already have access to all content; this grants access to non-admins.
6. The workflow is complete. You can save a draft and resume at any step, but finish all steps — an incomplete data source isn't useful.

## Connection fields (Step 1–2)

| Field | Required | What it is | How to fill it |
|---|---|---|---|
| Name | Yes | Display name of the data source | Use a purpose-named, source-agnostic label (e.g. *"Materials master — landing"*), not a vendor/client name. |
| Description | No | Free text | Note the source's role and refresh cadence. |
| Data Source Type | Yes | The connector family | Cloud file store, HDFS, RDBMS, or Snowflake (confirm the current list in `SET-4`). **Immutable after creation.** |
| Sub Type | Sometimes | Variant within a type | Set when prompted (e.g. the specific RDBMS engine). **Immutable after creation.** |
| Account / Host | Yes (type-dependent) | Cloud account or DB host | From the source's connection details. |
| Access Key / Credential | Yes (type-dependent) | Auth secret | Supplied by Platform/Infra; avoid pasting long-lived secrets into shared notes. |
| Container | Yes (cloud/file) | Cloud container name | The bucket/container holding the files. |
| Path | Yes (file types) | **Relative** path to the files within the container | Point at the folder, not a single file; files may be CSV, Parquet, etc. |

## Gotchas

- **Type and Sub-Type are permanent.** You cannot edit them after creation — to switch, create a new data source.
- **`Test and Validate` gates progress.** Next Step won't enable until the connection validates. A failure usually means a wrong key, container, or path, or a network/firewall block.
- **Data Source Admin is powerful.** An admin automatically receives access to *all* content in the source without per-file entitlement — assign deliberately.
- **You can't remove yourself as admin.** Another Data Source Admin must do it.
- **Deletion isn't available.** Removing a data source is not yet supported — switch an unused one off at the source system.
- **Non-admins see only entitled content.** A user lacking content entitlement won't see those files and can't build data sets from them.
- **Default Data Source / "clone default storage":** tenants ship with a Default Data Source (initial users get admin on it) pointing at default storage — fine for a quick start or sandbox. For a real engagement, register a purpose-named source. *(Doc gap: the consolidated help describes the default source but not explicit steps to clone its storage connection — confirm the exact clone path with the platform team before documenting it as a sub-route.)*
- First-time connections can be set up with support; the same pattern then repeats for later sources.

## Related tasks

- `SET-2` Manage groups & users — create the groups/users you'll entitle here.
- `SET-4` System configuration / supported sources — confirm the current type list first.
- `ACQ-1` / `ACQ-3` Register data sets — the next step; consumes this source's content.
- `ACQ-4` Bulk "create all" data sets — bulk-registers every content file in this source.
