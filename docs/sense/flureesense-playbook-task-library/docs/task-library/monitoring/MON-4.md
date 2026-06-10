---
id: mon-4
title: "MON-4 — Global search"
sidebar_label: "MON-4 · Global search"
sidebar_position: 4
tags: [task-library, monitoring, search]
status: doc
---

# MON-4 — Global search

> **Task Library primitive.** Find any object fast across the tenant. Client-neutral.

| | |
|---|---|
| **Module** | All |
| **Screen path** | Header **search bar** (top) |
| **Type** | `[repeatable]`, navigation |
| **Prerequisites** | None. |
| **Produces** | A cross-object result list with drill-down to each item's screen. |
| **Primary role** | Any user. |
| **Status** | Doc |

## Purpose

Jump straight to a data set, column, object, concept, or tag without navigating the menus — useful for verification and day-to-day work.

## What it searches & how

Type a term in the header search bar. It matches (on a **partial-match** basis) across: **Data Sets, Data Set Columns, Semantic Objects, Concepts, and Tags** — searching both the **Name and Description** fields (so a hit may not visibly contain your term in its name).

- **Result listing** (left) — drill-down tabs per object type; click an item to open its screen.
- **Refine** (top) — restrict to specific object types by selecting/deselecting them.
- **Tag search** — find concepts by tags such as privacy markers (`Catalog` tagging).

## Gotchas

- **Partial match on Name *and* Description** — results may look unrelated by name but match on description; that's expected.
- **Object types are licence-gated** — Semantic Objects / Concepts / Tags checkboxes are disabled on a Resolve-only tenant (no Classify), since those have no meaning without Classify.

## Related tasks

- `MOD-4` View object model · `ACQ-2` Register data set — common destinations from a search hit.
