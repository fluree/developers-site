---
unlisted: true
id: acq-2
title: "ACQ-2 — Register a data set from an uploaded file"
sidebar_label: "ACQ-2 · Register data set (upload)"
sidebar_position: 3
tags: [task-library, acquisition, data-set, repeatable]
status: doc
---

# ACQ-2 — Register a data set from an uploaded file

> **Task Library primitive.** The canonical *define → entitle → schedule → register* flow. `ACQ-3` reuses these steps. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → `Create New Data Set` → (after `ACQ-1` upload) `Define Data Set` |
| **Type** | `[repeatable]` per file |
| **Prerequisites** | `ACQ-1` an uploaded file in a data source. |
| **Produces** | A registered, profiled data set with entitlements and a refresh schedule — and, once classification runs, columns tagged to catalog concepts. The unit everything downstream operates on. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Turn an uploaded file into a registered data set: name and describe it, declare its structure, set entitlements and a refresh schedule, then trigger registration and profiling. Registration also kicks off classification (Classify-licensed tenants), which tags columns to catalog concepts.

## Prerequisites

- A file uploaded into a data source (`ACQ-1`).
- For the *Map to Existing Catalog Schema* route: a catalog whose semantic-object concept names already match the file's column names (`MOD-1`/`MOD-2`).

## Steps (click-by-click)

1. **Define Data Set.** Provide:
   - **Name** (must be unique — duplicates are blocked with an alert),
   - optional **Description**,
   - **File type** and **delimiter**,
   - whether a **Header Row** is included,
   - a **schema**, if there is no header row.
   You can click **Automatically Detect** to have the system infer file type, delimiter and schema — handy when unknown, but slower, and it can't trigger the fast 1:1 classification route below.
2. **◇ Decision — schema handling** (when *Header Row Included* is checked, the schema box becomes a dropdown):
   - **Infer Schema from Header** *(default)* — standard ML classification tags columns to concepts.
   - **Map to Existing Catalog Schema** — a faster 1:1 map of columns to concepts; opens two dependent dropdowns (**Catalog**, then **Semantic Object**) which must both be set before **Next** enables. Use when column names already match a catalog exactly (e.g. an ERP extract against a purpose-built catalog).
   You can mix routes across multiple data sets registered together. If **Header Row Included** is *unchecked*, type the schema into the input box instead.
3. **Add User Entitlements.** Select a user group (left), **View Users**, then grant each user **Admin**, **Read-Only**, or **Read/Write** (right). At least one entitlement enables **Next Step**. Optionally set **New User Default Settings** so future tenant users inherit a default entitlement (leave blank for none).
4. **Refresh Schedule.** Choose **Once** (one-time) or **Scheduled Refresh** (set Start Time, Recurrence Pattern, etc. — see `ACQ-5`). Choose to profile the **whole** data set or a **sample** (profile the whole set unless it's very large).
5. Click **Save and Close**. **Registration and profiling** run as a background **Job** — watch the top-hat notification and the **Jobs** tab. You can continue other work while it completes.

## What registration does (async)

Registration/profiling runs in steps: load the sample and attributes → profile the data set → run classification → regenerate data-set relationships → re-run DQ rules. Progress shows via loaders in the relevant panels.

## Field reference (Define Data Set)

| Field | Required | What it is | How to fill it |
|---|---|---|---|
| Name | Yes | Data set display name | Unique within the tenant; descriptive and client-neutral. |
| Description | No | Free text | Note source and grain. |
| File type | Yes | Format | CSV, Parquet, etc.; or use **Automatically Detect**. |
| Delimiter | Yes (CSV) | Field separator | Match the prepared file (`ACQ-0`). |
| Header Row Included | Yes | Whether row 1 is headers | Drives the schema-handling dropdown in step 2. |
| Schema | Conditional | Column definitions | Required only when no header row. |
| Schema handling | Conditional | Infer vs Map-to-Existing | See the decision point. |

## Gotchas

- **Name uniqueness blocks the flow** — you'll be alerted on a duplicate.
- **Automatically Detect ≠ fast classification.** Detect is convenient but slower and *cannot* trigger the 1:1 *Map to Existing Catalog Schema* path; choose Map-to-Existing deliberately when names already align.
- **Map-to-Existing needs an exact name match** between columns and the chosen Semantic Object's concepts — otherwise use Infer.
- **Quality & Relationships tabs stay disabled** until the full registration/profiling job completes.
- **Resolve-only tenants** show a licensing placeholder instead of classification info on the Attributes screen.
- **Profile the whole set** unless it's huge; sampling weakens profiling and DQ baselining.
- **Re-profiling reconsiders these choices** (schema route included) — set them correctly now (`ACQ-5`).

## Related tasks

- `ACQ-1` Upload a file — supplies the file.
- `ACQ-3` Register from an existing file — same define steps, different file selection.
- `ACQ-5` Refresh & re-profile — the schedule set in step 4.
- `MAP-1`/`MAP-4` — classification tagging and running the model after registration.
- `MOD-1`/`MOD-2` — the catalog used by *Map to Existing Catalog Schema*.
