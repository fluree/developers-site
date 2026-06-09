---
unlisted: true
id: prd-5
title: "PRD-5 — Validate & preview"
sidebar_label: "PRD-5 · Validate & preview"
sidebar_position: 5
tags: [task-library, operationalize, ingest, pipeline, validate]
status: doc
---

# PRD-5 — Validate & preview

> **Task Library primitive.** Check a pipeline before running it — issues, dry-run validation, then sample-data preview. Client-neutral.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | Pipeline → **Issues** tab → **Validate** → **Preview** (eye icon) |
| **Type** | `[repeatable]` |
| **Prerequisites** | A pipeline with at least one origin and one destination (`PRD-4`). |
| **Produces** | Confidence the pipeline runs cleanly origin→destination, plus a record-level look at the data through the stages. |
| **Primary role** | Data Engineer. |
| **Status** | Doc (Ingest guide) |

## Purpose

Catch errors before a full run. Three escalating checks: read the **Issues** tab, **Validate** (runs the stages with no data), then **Preview** (pushes a small data sample through chosen stages).

## Steps (click-by-click)

1. **Check Issues.** Open the **Issues** tab (top panel) — it lists errors and the stages they occur in. Clear all before proceeding.
2. **Validate.** Click **Validate** (top-right) to run the stages **without data**, confirming the pipeline can flow origin→destination and surfacing errors not visible statically.
3. **Preview.** Click the **eye** icon (top-right) to run a **sample** of real data through the pipeline. Choose **end-to-end** or a **specific stage** to debug, and inspect how records look at each stage.

## Gotchas

- **Validate ≠ Preview.** Validate is a no-data dry run (structure/connectivity); Preview pushes real sample data (transform behaviour). Do both.
- **Preview is sampled** — it won't catch volume/skew issues that only appear at full scale.
- **Clear Issues first** — a non-empty Issues tab blocks a clean run.
- **Use stage-scoped preview to debug** — point preview at the suspect stage rather than the whole flow.

## Related tasks

- `PRD-4` Configure stages — fix issues surfaced here.
- `PRD-6` Run (reset offset & run) — execute once validated.
