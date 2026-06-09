---
unlisted: true
id: pub-1
title: "PUB-1 — Publish semantic data sets"
sidebar_label: "PUB-1 · Publish semantic data sets"
sidebar_position: 1
tags: [task-library, publishing, classify, snapshot]
status: doc
---

# PUB-1 — Publish semantic data sets

> **Task Library primitive.** Silver output — materialize classified/conformed data as consumable data sets. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Semantic Object → **Technical View** → **View Object Model** → **Publish Semantic Data Sets** |
| **Type** | `[repeatable]` per publish |
| **Prerequisites** | Classified data sets with confirmed mappings (`MAP-4`); a target data source to publish into. |
| **Produces** | New target data set(s) collating the discovered/conformed data for a Semantic Object — a snapshot consumers can use, optionally refreshed by a pipeline. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Turn the model's discovered mappings into actual, queryable **semantic data sets** — a collated view of an object's data drawn from across sources. Useful when, e.g., customer data is scattered across many systems and you want one consolidated data set for that object.

## Steps (click-by-click)

1. From the Semantic Object's **Technical View**, open **View Object Model**, then click **Publish Semantic Data Sets**.
2. In the pop-up, choose the **Data Sources** to draw from and review the **pre-generated, editable** target data-set names.
3. Select the **Target Data Source** where the data sets will be published; optionally edit target names and choose a **pipeline** for regular updates (beta).
4. **Publish.** The button enables only once a Target Data Source is set and every chosen row has a **valid, non-blank** target name. The publish runs as a Job (`MON-1`).

## Gotchas

- **Publish is gated** on a target source + valid non-blank names for all chosen rows.
- **Names are pre-generated but editable** — rename to a client-neutral, purpose-clear convention before publishing.
- **Pipeline-backed refresh is beta** — for robust recurring publication prefer the managed Ingest route (`PRD-*`).
- **Mappings must be sound first** — publish reflects current mappings, so run/curate classification (`MAP-1`/`MAP-4`) before publishing.

## Related tasks

- `MOD-4` View object model — the screen this launches from.
- `MAP-4` Run classification — ensure mappings are current.
- `PRD-2` / `PRD-8` — managed pipelines for recurring publication/refresh.
- `PUB-2` Publish golden records — the Resolve-side equivalent.
