---
unlisted: true
id: res-7
title: "RES-7 — Fix tasks"
sidebar_label: "RES-7 · Fix tasks"
sidebar_position: 7
tags: [task-library, resolution, fixing-tasks]
status: doc
---

# RES-7 — Fix tasks

> **Task Library primitive.** Final manual cleanup of low-confidence matches/merges after training plateaus. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Project → **Fixing Tasks** (wrench icon, Entities Resolved) |
| **Type** | `[repeatable]`, low volume |
| **Prerequisites** | A trained model that has reached its confidence threshold (`RES-5`/`RES-6`). |
| **Produces** | Manually corrected residual cases, applied to Golden Records in near-real-time. |
| **Primary role** | Reviewer (then Approver under four-eyes). |
| **Status** | Doc |

## Purpose

Once training hits diminishing returns (typically around **80%** confidence, tweakable per deployment), the model surfaces only the **low-confidence** residual cases as **Fixing Tasks** for manual resolution — the "fix what ML can't" step.

## How it works

- Two kinds, mirroring training: **Match Fixing** and **Merge Fixing**.
- The internal **cluster-picker** returns only the low-confidence matches to fix.
- The in-task workflow is **identical to the training task** (`RES-5`/`RES-6`) — same steps, same four-eyes review/approve and reassignment.
- **No Re-run needed.** Unlike training, fixes apply to **each task in near-real-time** — Golden Records update per task rather than in a bulk re-run. (Accessed via the wrench icon in *Entities Resolved* on Project Home; also called *Matching Remediation* tasks.)

## Gotchas

- **No re-run button — that's expected.** Each fix persists immediately; don't wait for a batch run.
- **Low volume by design** — if you have many fixing tasks, the model likely needs more training (`RES-5`/`RES-6`), not manual fixing.
- **Four-eyes still applies** — fixes route through review/approval like training.

## Related tasks

- `RES-5` / `RES-6` — train first; fixing is the residual step.
- `RES-8` Review / edit golden records — broader manual editing.
