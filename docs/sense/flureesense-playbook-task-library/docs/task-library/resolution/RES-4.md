---
id: res-4
title: "RES-4 — Configure the match/merge model"
sidebar_label: "RES-4 · Configure match/merge"
sidebar_position: 4
tags: [task-library, resolution, project, matching, merging]
status: doc
---

# RES-4 — Configure the match/merge model

> **Task Library primitive.** Steps 3–5 of the resolve project — data sets, authority, attribute usage, merging strategy, and attribute mapping. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Project setup, Steps 3–5 (continues from `RES-3`) |
| **Type** | `[one-time]` per project (editable) |
| **Prerequisites** | `RES-3` project shell; entity match types set (`RES-2`); entitled data sets. |
| **Produces** | A runnable resolve model: ranked data sets, per-attribute usage and merging strategy, and physical-to-logical attribute mappings. |
| **Primary role** | Data Solution Analyst / Data Architect. |
| **Status** | Doc |

## Purpose

Configure *how* the project matches and merges: which data sets, their **authority** order, which attributes participate in matching vs. merging, and how each merged value is chosen. Then map physical columns to the entity's logical attributes and run the unsupervised model.

## Steps (click-by-click)

3. **Select & rank data sets.** Add entitled data sets to the right panel. **Order them by authority** (up/down or drag): higher = more trusted, which the merging model favours for Golden-Record values. **Check for Duplicates** (on by default) also looks for duplicates *within* a data set — uncheck for speed if intra-set dupes aren't expected.
4. **Edit the entity model for the project.** For each attribute set:
   - **Attribute Usage** — `Match`, `Merge`, `Both` (default), or `Excluded`. Excluded attributes don't appear for mapping and (if excluded from merge) won't appear in Golden Records.
   - **Merging Strategy** — `Let system select the best value` (default), `Always update with the latest value`, `Always select from this source`, or `Combine/Concatenate all valid values` (valid = no failed DQ rule). Disabled if the attribute isn't used in merging.
   - **Optional Source** — appears only for *Always select from this source*; pick the data set to source that attribute from.
   - The **Identifier at Source** (primary-key-like) attribute is **required** and reappears in Step 5 even if excluded.
5. **Map physical attributes to the entity model.** Drag each source column (left) onto its logical concept (right). Fulfil the **Identifier mapping** requirement, fine-tune any pre-existing Classify mappings (remove with the `-`, add new), then click **Run Model** to trigger the unsupervised run.

## Gotchas

- **Authority ranking is consequential** — it's how merging breaks ties; rank your cleanest source highest.
- **Identity Key / Splitter types must exist** (`RES-2`) or creation warns and stops; the **Identifier** attribute is mandatory for mapping even if you excluded it.
- **Exclude deliberately** — an excluded attribute disappears from mapping and Golden Records.
- **Combine/Concatenate respects DQ** — only values that pass DQ rules are combined, linking merge quality to `RES-2`/`DQ`.
- **Pre-existing mappings may pre-fill** from Classify when their multi-user score clears threshold — review them rather than assuming they're right.
- **Run Model is the unsupervised first run** — expect to train afterward (`RES-5`/`RES-6`).

## Related tasks

- `RES-3` Create the resolve project — Steps 1–2.
- `RES-2` Match/merge types — the per-attribute behaviour referenced here.
- `RES-5` Train matching / `RES-6` Train merging — improve on the unsupervised run.
- `RES-7` Fix tasks — clean up residual low-confidence cases.
