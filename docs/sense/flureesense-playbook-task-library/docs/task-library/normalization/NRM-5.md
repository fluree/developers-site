---
id: nrm-5
title: "NRM-5 — Train via task import (export → vote → re-import)"
sidebar_label: "NRM-5 · Train via import"
sidebar_position: 5
tags: [task-library, normalization, training, import]
status: doc
---

# NRM-5 — Train via task import (export → vote → re-import)

> **Task Library primitive.** Bulk training by editing an exported task sheet. Carries the resolved **Vote** semantics. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Project → **Train Model** → **Import Training Tasks** |
| **Type** | `[repeatable]` per batch |
| **Prerequisites** | Generated tasks (`NRM-3`); tasks assigned to you; an answer key (which option is correct per task). |
| **Produces** | Bulk-applied training feedback, equivalent to on-screen review (`NRM-4`), under the same four-eyes flow. |
| **Primary role** | Reviewer (then Approver under four-eyes). |
| **Status** | Doc + Sample |

## Purpose

For many tasks, export the assigned set, mark the correct option per task in a spreadsheet, and re-import — faster than clicking through each task in `NRM-4`.

## ✅ Vote semantics (resolved)

The exported sheet gives up to **5 candidate options per task** (one row each). In the `Vote` column:

- **`1` = correct** — enter `1` next to the right option. **Exactly one `1` per task is required** for the sheet to be accepted.
- **`0` = incorrect** — optional negative feedback; useful to **break ties** between close candidates.
- **blank** = no vote on that option.
- **Anything other than `1` or `0`** errors on upload.

So in a five-row task, the typical pattern is one `1` and the rest blank (or `0` on a strong-but-wrong runner-up). *(A sample exhibiting a `0` on the top option and no `1` is an illustrative/partial export — as-is it would be rejected for lacking a positive vote.)* Confidence band letters (`H`/`M`/`L`) are informational. *(Also recorded in the Conventions appendix.)*

## Steps (click-by-click)

1. In **Train Model**, click **Import Tasks** and **Download the Import Tasks Template** — it contains only tasks assigned to you (a multi-role Admin downloads only their reviewer/approver tasks; an Admin-only user downloads all).
2. Edit per the popup's rules: for each `task_id`, put **`1`** next to the correct option (and optional `0`s). If you can't judge a task, **delete all its rows** rather than leaving it without a positive vote.
3. **Upload**, then review errors and check no task silently missed updating (validation violations are skipped).
4. **Approver (four-eyes ON):** download, optionally amend, and re-upload to approve — no change needed if accepting the Reviewer's votes.

## Field definitions (training-task export — 9 columns)

| # | Field | What it is | You edit? |
|---|---|---|---|
| 1 | `ID` | Business/task display key | No |
| 2 | `Name` | The item being classified | No |
| 3 | `Predictions` | A candidate class for this row | No |
| 4 | `Confidence Score` | Model score for the candidate (0–1) | No |
| 5 | `Confidence` | Band (`H`/`M`/`L`) | No |
| 6 | `task_id` | Groups the option rows of one task | No (key) |
| 7 | `dataset_id` | Source data-set id | No |
| 8 | `dataset_name` | Source data-set name | No |
| 9 | `Vote` | **Your feedback: `1` correct / `0` incorrect / blank** | **Yes** |

## Gotchas

- **One `1` per task is mandatory** — no positive vote = rejected; delete unjudgeable tasks entirely.
- **Only `1`/`0`/blank** — any other value errors the upload.
- **You can only vote on tasks assigned to you** that aren't already complete; others are ignored on import.
- **`0` is optional but strategic** — use it to break ties between near-equal candidates.
- **Four-eyes still applies** — imported reviewer votes go to Pending Approval under four-eyes ON.

## Related tasks

- `NRM-4` Train in UI — the on-screen equivalent and the governance flow.
- `NRM-3` Run & generate tasks — produces the exportable tasks.
- `NRM-6` Enrich source with outputs — what completed training feeds.
