---
id: res-8
title: "RES-8 — Review / edit golden records"
sidebar_label: "RES-8 · Review / edit GRs"
sidebar_position: 8
tags: [task-library, resolution, golden-records]
status: doc
---

# RES-8 — Review / edit golden records

> **Task Library primitive.** Inspect and manually correct the mastered output. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Project Home → **Golden Records** → Master Id → **Edit Records** |
| **Type** | `[repeatable]` |
| **Prerequisites** | A resolved/mastered project (`RES-6`). |
| **Produces** | Reviewed and (where needed) manually corrected Golden Records, with history updated. |
| **Primary role** | Entity Admin (edit); any project user (view). |
| **Status** | Doc |

## Purpose

Review the Golden Records the model produced and override individual attribute values where the automatic choice is wrong — choosing a different source value or entering a custom one.

## Steps (click-by-click)

1. From **Project Home**, open **Golden Records** and click a **Master Id**.
2. Click **Edit Records** (enabled for **Entity Admin**). Attributes list on the left; values/sources on the right.
3. **Edit one attribute at a time:** select it, then choose an alternative source value (the highest-confidence option is highlighted) or type a **custom value** in the text box.
4. **Apply Changes.** The Golden Record updates and the edit is recorded in **History** (`RES-9`).

## What "results" show

- **Entities Resolved** — clusters of matched records with a confidence level (View Results, advanced search by data set/confidence).
- **Entities Mastered** — the Golden Record's chosen value per attribute, each with a confidence score; clicking an attribute shows every candidate value and its model score.

## Gotchas

- **Edit Records needs Entity Admin** — otherwise the button is disabled.
- **One attribute at a time** — the edit screen is per-attribute by design.
- **DQ/score impact shows only after a re-run.** Manual edits don't recompute score/quality until the model runs again — so **edit in batches, then re-run** the project.
- **Custom values appear in lineage** as a row sourced to the user (`RES-9`).

## Related tasks

- `RES-6` Train merging — produces the values reviewed here.
- `RES-9` Lineage & history — see where values came from and what changed.
- `PUB-2` Publish golden records — publish once confidence/quality is acceptable.
