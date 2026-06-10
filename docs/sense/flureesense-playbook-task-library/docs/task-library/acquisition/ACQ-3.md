---
id: acq-3
title: "ACQ-3 — Register a data set from an existing file"
sidebar_label: "ACQ-3 · Register data set (existing file)"
sidebar_position: 4
tags: [task-library, acquisition, data-set, repeatable]
status: doc
---

# ACQ-3 — Register a data set from an existing file

> **Task Library primitive.** A variant of `ACQ-2` where the file is already in the source. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → `Create New Data Set` → select data source → select existing file/table |
| **Type** | `[repeatable]` per file/table |
| **Prerequisites** | `SET-1` a registered source containing the file/table; entitlement to that content. |
| **Produces** | A registered, profiled data set — identical outcome to `ACQ-2`, without an upload step. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Register a data set from content **already present** in a data source — a file landed by a managed pipeline (`PRD-2`), an RDBMS/Snowflake table, or a previously uploaded file. Identical to `ACQ-2` apart from selecting an existing item instead of uploading.

## Prerequisites

- A registered data source (`SET-1`) whose content you're entitled to. You will not see files you lack entitlement to (`SET-1` content entitlements).

## Steps (click-by-click)

1. On the **Data Set Listing** screen, click **Create New Data Set**.
2. Select the **data source**; its existing files/tables appear in the right panel.
3. **Select the existing file/table** (one or several for multiple data sets) — skip the upload icon.
4. Continue with the **Define → Entitle → Refresh → Register** steps exactly as in **`ACQ-2`** (define name/type/delimiter/header/schema; the *Infer vs Map-to-Existing Catalog Schema* decision; entitlements; refresh schedule; Save and Close to trigger the registration/profiling job).

> **Two-layer note:** the define-and-register mechanics live once in `ACQ-2`; this card only documents the different *selection*. Don't duplicate those steps when sequencing the Playbook — reference `ACQ-2`.

## Gotchas

- **Entitlement gates visibility.** A missing file usually means a `SET-1` content-entitlement gap, not a missing file.
- **RDBMS/Snowflake tables register the same way** — select the table as the content item.
- All `ACQ-2` gotchas apply (name uniqueness, Automatically-Detect limits, whole-vs-sample profiling, disabled tabs until the job finishes).

## Related tasks

- `ACQ-2` Register from an uploaded file — the canonical define/register steps.
- `ACQ-4` Bulk "create all" — register every content file in a source at once.
- `PRD-2` Land-to-Bronze pipeline — the managed route that drops files into the source.
