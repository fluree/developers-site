---
id: prd-1
title: "PRD-1 — Promote a project to Production"
sidebar_label: "PRD-1 · Promote to Production"
sidebar_position: 1
tags: [task-library, operationalize, production]
status: doc
---

# PRD-1 — Promote a project to Production

> **Task Library primitive.** Operationalize — move a finalized project from training to live, exposing it to real-time/batch updates. Client-neutral.

| | |
|---|---|
| **Module** | Classify / Resolve |
| **Screen path** | Project → **Promote To Production** (Resolve: Golden Records listing footer) |
| **Type** | `[one-time]` per project (re-configurable) |
| **Prerequisites** | A finalized project: in Training, with results/Golden Records from the latest run, and **no pending (incomplete) training tasks**; Project Admin rights. |
| **Produces** | A production project that stops generating training tasks and instead processes real-time/batch (delta) changes, exposing APIs for downstream consumption. |
| **Primary role** | Project Admin. |
| **Status** | Doc |

## Purpose

When a model has reached acceptable confidence, promote it to **Production**. The project then: stops generating training/fixing tasks, accepts real-time or batch delta changes from pipelines/APIs, processes them (directly or as production tasks), and locks down data-set changes.

## Steps (click-by-click, Resolve)

1. Click **Promote to Production** (Golden Records listing footer — enabled only for an Admin with preconditions met).
2. **Answer the configuration questions** in the pop-up:
   - **During merge:** *Always merge most recent changes* or *Let system decide*.
   - **Update changes:** *Automatically*, *After manual review*, *After manual review only for low-confidence*, or *…for low and medium confidence*.
   - **Four-eyes:** ON (separate reviewer & approver) or OFF (reviewer only).
   - **APIs to turn on:** *Real-time only* or *Real-time & scheduled*.
3. If scheduled APIs were chosen, **fill the scheduling options** (frequency, duration, timing; valid non-back-dated start date, time-zone/start time, and occurrences/end-date/no-end-date).
4. **Save & Finish.** You're redirected to the modified **production Project Home** (`PRD-9` covers Golden-Record change handling there).

*(Classify SOC/Concept-Parser projects promote analogously via the project's Promote to Production action.)*

## Gotchas

- **No pending tasks allowed** — all training tasks must be Completed (and Golden Records present in the latest run) before the button enables.
- **All config questions are mandatory** for Save & Finish.
- **"Automatically" means no review tasks** — choosing it generates **no** Golden-Record change tasks (`PRD-9`); a review option generates them.
- **Real-time-only hides the Batch tab** on the production home; scheduled adds it with its own validations.
- **Four-eyes defaults from the last Admin edit** — confirm it in the pop-up.

## Related tasks

- `RES-6` / `NRM-6` — finalize the model before promoting.
- `PRD-7` Orchestration — pipelines that call the exposed model APIs.
- `PRD-8` Full vs delta/CDC — the change modes feeding a production project.
- `PRD-9` Master ID / GR-change handling — production change tasks.
