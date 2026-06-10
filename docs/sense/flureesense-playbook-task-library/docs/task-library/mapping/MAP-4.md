---
id: map-4
title: "MAP-4 — Run the classification model"
sidebar_label: "MAP-4 · Run classification"
sidebar_position: 4
tags: [task-library, mapping, classification]
status: doc
---

# MAP-4 — Run the classification model

> **Task Library primitive.** The step that applies mappings/feedback and re-predicts across the tenant. Both mapping routes converge here. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → Classify; or `Data Catalogs` → **Run Model** (ad-hoc mapping screens / Applied Columns) |
| **Type** | `[repeatable]` |
| **Prerequisites** | Mappings exist — imported (`MAP-2`/`MAP-3`) or via UI feedback (`MAP-1`). |
| **Produces** | Updated tenant-wide predictions: confirmed mappings reinforced, downvoted ones dropped, scores recomputed, object/concept counts refreshed. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Run the supervised classifier so pending mappings and feedback take effect. Whether you imported a map (Route B) or trained in the UI (Route A), nothing is "live" until the model runs — this is the convergence point.

## Steps (click-by-click)

1. After importing mappings or giving feedback, open an ad-hoc mapping screen (object or concept level), the **Applied Columns** tab of a rule, or the data-set **Classify** action.
2. Click **Run Model**. The tenant-wide classification runs as a **Job** — monitor it in the **Jobs** tab (`MON-1`).
3. When complete, downvoted mappings have dropped, scores reflect the latest votes, and mapped-data-set/column counts on the catalog are refreshed.

## Gotchas

- **It's tenant-wide, not scoped.** Run Model re-predicts across the whole tenant and incorporates *all* pending changes, not only yours — expect broader movement and a job, not an instant local update.
- **DQ runs are coupled.** Some rule flows trigger a classification run as part of running the rule, because DQ scores at object/concept level depend on current mappings (`DQ-1`/`rule-applied-columns`).
- **Run after feedback, not before.** Feedback (`MAP-1`) and imported maps stay pending until this runs.
- **Watch the queue.** Avoid firing many heavy runs at once; they process as queued jobs.

## Related tasks

- `MAP-1` / `MAP-2` / `MAP-3` — produce the mappings this applies.
- `MOD-4` View object model — verify results after the run.
- `MON-1` View jobs — track the run.
- `DQ-4` Execute / re-run rules — DQ reassessment that depends on current mappings.
