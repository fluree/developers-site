---
id: acq-1
title: "ACQ-1 — Upload a file into a data source"
sidebar_label: "ACQ-1 · Upload a file"
sidebar_position: 2
tags: [task-library, acquisition, data-set, repeatable]
status: doc
---

# ACQ-1 — Upload a file into a data source

> **Task Library primitive.** Sequenced at Bronze · **B1 Acquire** (light route). Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → `Create New Data Set` → select data source → **Upload New File** |
| **Type** | `[repeatable]` per file |
| **Prerequisites** | `SET-1` a registered data source; `ACQ-0` a prepared file; entitlement to the target source. |
| **Produces** | The file placed physically into the chosen data source, ready to be defined and registered as a data set (`ACQ-2`). |
| **Primary role** | Data Acquisition Engineer / Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Get a local file into a registered data source so it can be turned into a data set. This is the **light/direct** acquisition route (upload in the UI). For recurring or CDC loads, prefer the managed route (Ingest land-to-Bronze, `PRD-2`).

## Prerequisites

- A registered data source (`SET-1`) you're entitled to.
- A prepared file (`ACQ-0`).

## Steps (click-by-click)

1. On the **Data Set Listing** screen, click **Create New Data Set** (top left).
2. From the list of **data sources you can access**, select the target source. Its existing files appear in the right panel.
3. Click the **Upload New File** icon, browse your local machine, and select the file. On success the file is **physically placed into the selected data source**, and the **Next** button enables.
4. Optionally select additional files/tables to create **multiple data sets** in one pass.
5. Proceed to **Define the data set** — continue in `ACQ-2`.

## Gotchas

- **The file lands in the data source you picked in step 2** — choose the right source first; you can't redirect it later without re-uploading.
- **File-size limits may apply at the server.** If you see a size error, raise it with support for a configuration adjustment rather than truncating the file.
- **You can only upload into sources you're entitled to** — if the source isn't listed, check `SET-1` content entitlements.

## Related tasks

- `ACQ-0` Prepare a source file — do this first.
- `ACQ-2` Register a data set from an uploaded file — the immediate next step.
- `ACQ-3` Register from an existing file — when the file is already in the source (no upload).
- `PRD-2` Land-to-Bronze pipeline — the managed alternative for recurring loads.
