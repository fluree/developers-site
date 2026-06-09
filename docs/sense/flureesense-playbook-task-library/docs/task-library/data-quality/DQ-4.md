---
unlisted: true
id: dq-4
title: "DQ-4 — Execute / re-run rules"
sidebar_label: "DQ-4 · Execute / re-run"
sidebar_position: 4
tags: [task-library, data-quality, execution]
status: doc
---

# DQ-4 — Execute / re-run rules

> **Task Library primitive.** Runs rules to produce scores and exceptions — the "assess" beat of the horizontal DQ thread, repeated at each layer. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Quality` → rule grid / `Execute Business Rule`; **Re-run Rule** in the Rule Definition and Run Execution Results tabs |
| **Type** | `[repeatable]` |
| **Prerequisites** | Rules created (`DQ-1`/`DQ-2`/`DQ-3`) and data present. |
| **Produces** | A rule **run**: a DQ score and exception records, recorded in run history. |
| **Primary role** | Rule Executor / Rule Admin. |
| **Status** | Doc |

## Purpose

Execute rules to generate scores and exceptions. Rules can run **once now** (Save & Run), on a **schedule**, or **ad-hoc** via Re-run. Because DQ is horizontal, you'll run the same rules repeatedly — to baseline at Bronze, then to reassess after normalization (Silver) and resolution (Gold).

## Steps (click-by-click)

- **Run now at creation:** in the rule's Schedule step, keep **Once** and click **Save & Run**.
- **Re-run an existing rule:** open the rule and click **Re-run Rule** (available in the *Rule Definition* and *Run Execution Results* tabs, and in some Data Set / Concept result grids). Use this after editing a rule or after mappings change.
- **Run many at once:** select rules in the grid and use the bulk-run control.

## Gotchas

- **Re-run does not save.** If you edited a rule, **Save first**, then Re-run — otherwise the run uses the last saved definition, not your edits.
- **Mind the queue.** There's no hard limit on bulk selection, but runs process as queued jobs — avoid more than ~10 at once to keep compute reasonable.
- **A business rule fans out.** On run it's translated into one or more technical rules across all mapped columns, and may trigger a tenant classification so object/concept scores reflect current mappings (`MAP-4`).
- **Failed compile → no run.** A rule that fails validation shows in red with an error symbol and keeps displaying its **last successful** score; fix the exception condition/columns and re-run.
- **Cluster wake-up delay.** First execution/exception retrieval may lag a minute or two while the data-lake cluster wakes — not an error.

## Related tasks

- `DQ-1` / `DQ-2` / `DQ-3` — the rules being run.
- `DQ-5` Review exceptions & remediate — read and act on the output.
- `MON-3` DQ dashboards — trend scores across runs.
- `ACQ-5` Refresh & re-profile — refresh re-runs DQ automatically.
