---
id: map-1
title: "MAP-1 — Map columns to concepts & give feedback (UI)"
sidebar_label: "MAP-1 · Map & feedback (UI)"
sidebar_position: 1
tags: [task-library, mapping, classification]
status: doc
---

# MAP-1 — Map columns to concepts & give feedback (UI)

> **Task Library primitive.** *Route A* of mapping — interactive training in the UI. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → `[Set]` → Attributes / Train Object Model; and `Data Catalogs` → ad-hoc mappings (Object & Concept level) |
| **Type** | `[repeatable]` until the model is trusted |
| **Prerequisites** | A catalog (`MOD-*`) and registered data sets (`ACQ-2`/`ACQ-3`); classification must have run at least once to surface predictions. |
| **Produces** | Confirmed/curated mappings between data-set columns and catalog concepts, feeding the supervised classifier. |
| **Primary role** | Data Solution Analyst / SME (feedback). |
| **Status** | Doc |

## Purpose

Train the catalog by confirming, correcting, or rejecting the system's predicted mappings between columns and concepts. This is the no-file route — appropriate when the source-to-target map is small or still being discovered. (For a known, offline-analysed map, import it instead — `MAP-2`/`MAP-3`.)

## Mapping types you'll see

- **Predicted (ad-hoc)** — tenant-wide model predictions; lower trust.
- **Training (ad-hoc)** — provided specifically for training.
- **Manual** — created when a user upvotes or links a concept/object to a column/data set.

## Steps — give feedback at concept level

1. Open the catalog and view **ad-hoc mappings** at the **Concept** level (or use `MOD-4` Technical View).
2. For an accurate prediction, **upvote**. For a wrong one, click the **downvote**; the popup lets you: keep the existing mapping, downvote and **suggest an alternative** (counts as an upvote for that alternative), or downvote with no alternative (drops the prediction's score to zero).
3. Repeat at the **Semantic Object** level for data-set-to-object mappings (same mechanics, coarser grain).
4. Click **Run Model** in the footer to incorporate pending feedback and re-predict across the tenant. Downvoted mappings fall off after this run.

## How the score works

A mapping's **score = latest unique upvotes ÷ latest total votes** (or the system-generated score when no feedback exists yet). Counts next to the percentage show how many users agreed.

## Gotchas

- **Feedback isn't live until Run Model.** Votes are pending until you run the tenant classification (`MAP-4`); only then do downvoted mappings drop and scores recompute.
- **You can't vote twice** — the most recent feedback per user is the one counted; history is viewable from the vote counts.
- **Run Model is tenant-wide** — it re-predicts everything and may move unrelated scores; expect a job, not an instant update.
- **PII-tagged concepts mask data** for Read-Only users in samples/profiles (`tagging`), which can affect what reviewers see.

## Related tasks

- `MAP-2` / `MAP-3` — the import route (offline-analysed maps).
- `MAP-4` Run the classification model — applies pending feedback.
- `MOD-4` View object model — an alternate surface for the same feedback.
- `NRM-4` Train in UI — the project-level analogue of this interactive training.
