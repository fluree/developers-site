---
id: nrm-4
title: "NRM-4 — Train in the UI (assign, review, approve)"
sidebar_label: "NRM-4 · Train in UI"
sidebar_position: 4
tags: [task-library, normalization, training, governance, four-eyes]
status: doc
---

# NRM-4 — Train in the UI (assign, review, approve)

> **Task Library primitive.** Interactive training under embedded four-eyes governance. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Project → **Train Model**; reassignment via **Manage Project Tasks** |
| **Type** | `[repeatable]` until confidence plateaus |
| **Prerequisites** | A run that generated tasks (`NRM-3`). |
| **Produces** | Completed training tasks (reviewed, and approved under four-eyes), feeding the supervised re-run. |
| **Primary role (RACI)** | **R:** Reviewer · **A:** Approver (four-eyes ON) · **R/A:** Project Admin (may act on any task) |
| **Status** | Doc |

## Purpose

Train the classifier by confirming/correcting predictions on each task, then (under four-eyes) having a separate Approver validate. This is the on-screen route; the bulk route is `NRM-5`.

## Steps (click-by-click)

1. Open **Train Model** from Project Home, or pick up tasks from **My Open Tasks / All My Tasks / All Tasks**.
2. **Review each task** (single extended panel, drop-down driven):
   - **Option A** — keep the pre-selected highest-confidence classifier; press the tick.
   - **Option B** — pick another from up to 5 options; or **None of the above** → choose from all classifiers → or **None of the above** again → type a **manual** classifier (mandatory to finish).
   - **Option C** — make the same choice across rows, select them, and **Finish** in bulk.
   On completion a task moves to **Pending Approval** (four-eyes ON) or **Completed** (OFF).
3. **Approve (four-eyes ON).** The Approver opens **Pending for Approval** tasks, confirms or amends the Reviewer's choice, and presses **Finish**.
4. **Re-run the model** once **all** tasks are complete (the button is disabled until then).

## Useful behaviours

- A task shows as **Reviewed** to a Reviewer but **Pending Approval** to an Approver — to avoid confusion.
- **Review Prior Feedback** (Admin or the original author) lets you change earlier feedback across runs without four-eyes — a simple replacement — then re-run.
- **Reassignment** of tasks is done from **Manage Project Tasks**, not the Train Model screen.

## Gotchas

- **Re-run is gated on all tasks complete.**
- **Manual classifier needed** when nothing fits — and duplicate manual inputs are rejected.
- **Progress saves per row**, but a task stays *pending with you* until you press **Finish** (and a refresh reverts an un-finished *None of the above* to the default).
- **Prior ad-hoc feedback/counts are hidden here** to remove bias — they're only visible in *View Results* / *Review Prior Feedback*.

## Related tasks

- `NRM-3` Run & generate tasks — produces these tasks.
- `NRM-5` Train via task import — the bulk alternative.
- `NRM-1` Create SOC project — sets the four-eyes governance applied here.
