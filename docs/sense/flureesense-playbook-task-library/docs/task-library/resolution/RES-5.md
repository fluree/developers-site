---
id: res-5
title: "RES-5 — Train matching (assign, review, approve)"
sidebar_label: "RES-5 · Train matching"
sidebar_position: 5
tags: [task-library, resolution, training, matching, governance]
status: doc
---

# RES-5 — Train matching (assign, review, approve)

> **Task Library primitive.** Supervised training of the entity-resolution (clustering) model under four-eyes. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Project → **Training Matching Tasks** (Entities Resolved) |
| **Type** | `[repeatable]` until confidence plateaus |
| **Prerequisites** | An unsupervised run with match tasks generated (`RES-4`). |
| **Produces** | Completed match-training tasks that raise clustering confidence on re-run. |
| **Primary role (RACI)** | **R:** Reviewer (assigned) · **A:** Approver (four-eyes ON) · **R/A:** Project Admin |
| **Status** | Doc |

## Purpose

Teach the matching model which records are the same entity. The system auto-assigns tasks; only the assigned Reviewer (or an Admin) can complete a task — others have read access.

## Steps (click-by-click)

A matching task spans up to **three steps**:
1. **Include similar clusters** — confirm which candidate clusters belong with the one under review (Match / No Match).
2. **Review the cluster's elements** — confirm the individual records within the cluster.
3. **Allocate orphaned records** — link any unmatched elements to the right cluster. The **Finish Task** button activates only once all orphans are placed.
4. On Finish, the task moves to **Pending Approval** (four-eyes ON) or **Completed** (OFF). When **all** tasks are complete, **Re-run Model** activates (Admin only) to run the supervised model; watch confidence and compression ratio change per run.

## Gotchas

- **Step 3 must be finished to save.** Auto-Save covers steps 1–2 (your Match/No-Match choices persist if you navigate away), **but step 3 is not auto-saved** — press **Finish** before leaving or you lose the orphan allocations (they only lock in on the next project run).
- **Assignment is enforced** — only the assigned Reviewer/Admin can act; reassign via Manage Project Tasks.
- **Re-run gated on all tasks complete**, Admin-only.
- **Iterate to the plateau** — confidence should rise from unsupervised → first supervised, then flatten; stop when gains are marginal (→ `RES-7`).

## Related tasks

- `RES-4` Configure match/merge — generates these tasks.
- `RES-6` Train merging — the next model after matching is sound.
- `RES-7` Fix tasks — residual low-confidence matches.
- `RES-2` Match types — adjust here if clusters look wrong.
