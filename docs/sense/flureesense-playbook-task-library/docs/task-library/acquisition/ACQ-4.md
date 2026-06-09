---
unlisted: true
id: acq-4
title: "ACQ-4 — Bulk \"create all\" data sets"
sidebar_label: "ACQ-4 · Bulk create-all"
sidebar_position: 5
tags: [task-library, acquisition, data-set, repeatable, bulk]
status: doc
---

# ACQ-4 — Bulk "create all" data sets

> **Task Library primitive.** A one-click bulk registration of every content file in a source — use sparingly. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Source` detail screen → **Create All** |
| **Type** | `[repeatable]`, exceptional use |
| **Prerequisites** | `SET-1`; the **Data Source entitlement** for that source. |
| **Produces** | A data set registered for **every** content file in the source, with auto-generated unique names. |
| **Primary role** | Data Source Admin. |
| **Status** | Doc |

## Purpose

Trigger registration for *all* content files of a data source at once, instead of selecting them one by one (`ACQ-2`/`ACQ-3`). Convenient for a brand-new source you genuinely want fully registered — but it skips the per-file controls and duplicate checking, so it's reserved for exceptional cases.

## Prerequisites

- The **Data Source entitlement** for the source (any user with it can trigger this).
- A deliberate decision that you want *every* file registered — there is no per-file opt-out in this flow.

## Steps (click-by-click)

1. Open the **Data Source detail** screen for the source (you must be its admin/entitled).
2. Click **Create All**. The system generates a data set for each content file, appending numbers to names to keep them unique, and kicks off registration/profiling jobs.
3. Monitor progress in the **Jobs** tab.

## Gotchas

- **No duplicate check.** Unlike `ACQ-2`/`ACQ-3`, Create All does **not** check whether data sets already exist for those files — re-running can create parallel registrations.
- **Names get numeric suffixes** for uniqueness, so entries may *look* duplicated in the list but aren't. Plan to rename or curate afterward.
- **You lose per-file control** — schema-handling choices, targeted entitlements, and refresh settings aren't set per file here; expect to revisit (`ACQ-5`, entitlements) after the fact.
- **Use selectively.** The documentation explicitly recommends the selective `ACQ-2`/`ACQ-3` flow as the default; reserve Create All for genuine bulk needs.

## Related tasks

- `ACQ-2` / `ACQ-3` Register data sets — the recommended selective flows.
- `ACQ-5` Refresh & re-profile — set per-set refresh after a bulk create.
- `SET-1` Register a data source — where the Data Source entitlement is granted.
