---
id: nrm-3
title: "NRM-3 — Run model & generate prediction tasks"
sidebar_label: "NRM-3 · Run & generate tasks"
sidebar_position: 3
tags: [task-library, normalization, project]
status: doc
---

# NRM-3 — Run model & generate prediction tasks

> **Task Library primitive.** The first (unsupervised) run that produces predictions and training tasks. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Project → **Run** (final setup step or *Managing Project Data*) |
| **Type** | `[repeatable]` |
| **Prerequisites** | A defined project (`NRM-2`). |
| **Produces** | Initial predictions and a set of **training tasks** for reviewers to act on (`NRM-4`/`NRM-5`). |
| **Primary role** | Project Admin. |
| **Status** | Doc |

## Purpose

Run the project to get first results. The first run is **unsupervised** (no human feedback yet); subsequent runs incorporate training and should improve confidence.

## Steps (click-by-click)

1. From the final setup step (or **Managing Project Data**), click **Run**.
2. The run dispatches as a **Job** — track it in the **Jobs** tab (`MON-1`) and keep working.
3. When complete, the Project Home shows initial results and generated **training tasks**, assigned to reviewers.

## Gotchas

- **First run won't be confident.** Treat unsupervised output as a starting point — most projects need training (`NRM-4`/`NRM-5`) before they're trustworthy.
- **Re-run only after tasks are completed.** The **Re-run Model** button stays disabled until outstanding tasks are done; re-running prematurely wastes a cycle.
- **It's a targeted run,** not tenant-wide — it classifies only this project's classifier (contrast `MAP-4`).

## Related tasks

- `NRM-2` Define classifier & data — must be complete first.
- `NRM-4` Train in UI / `NRM-5` Train via import — act on the generated tasks.
- `MON-1` View jobs — monitor the run.
