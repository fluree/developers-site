---
id: res-6
title: "RES-6 — Train merging"
sidebar_label: "RES-6 · Train merging"
sidebar_position: 6
tags: [task-library, resolution, training, merging, governance]
status: doc
---

# RES-6 — Train merging

> **Task Library primitive.** Supervised training of the Golden-Record (mastering) model under four-eyes. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Project → **Train Model** (Mastering Training Tasks, Entities Mastered) |
| **Type** | `[repeatable]` until confidence plateaus |
| **Prerequisites** | Matching trained to an acceptable level (`RES-5`); merge tasks generated. |
| **Produces** | Completed merge-training tasks that improve which value is chosen for each Golden-Record attribute on re-run. |
| **Primary role (RACI)** | **R:** Reviewer (assigned) · **A:** Approver (four-eyes ON) · **R/A:** Project Admin |
| **Status** | Doc |

## Purpose

Teach the merging model which value to pick for each attribute when a cluster's records disagree (e.g. three candidate addresses → the most likely correct one). Simpler than matching — a single step per task.

## Steps (click-by-click)

1. Open **Train Model** → **Mastering Training Tasks**. The system auto-assigns; only the assigned Reviewer (or Admin) can complete a task.
2. **Single step — choose correct values.** For each attribute, the model's selected value shows at the top with all unique candidate values from the cluster below. Keep it, pick another, or type a free-form value. Click **Apply Selections** when done.
3. The task moves to **Pending Approval** (four-eyes ON) or **Completed** (OFF). When **all** are complete, **Re-run Model** activates (Admin only) to run the supervised merging model; watch merging confidence move per run.

## Gotchas

- **One step, but Apply Selections is required** to commit the task.
- **Merging respects authority and strategy** (`RES-4`) — if a value you'd expect isn't offered or chosen, check the merging strategy and data-set authority.
- **Re-run gated on all tasks complete**, Admin-only.
- **Train matching first** — merge quality depends on sound clusters (`RES-5`).

## Related tasks

- `RES-5` Train matching — must be reasonable before merging.
- `RES-4` Configure match/merge — sets the strategies merging follows.
- `RES-8` Review / edit golden records — inspect/adjust the merged output.
- `RES-7` Fix tasks — residual low-confidence merges.
