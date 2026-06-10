---
id: nrm-6
title: "NRM-6 — Enrich the source with project outputs"
sidebar_label: "NRM-6 · Enrich with outputs"
sidebar_position: 6
tags: [task-library, normalization, project, enrichment]
status: doc
---

# NRM-6 — Enrich the source with project outputs

> **Task Library primitive.** The normalized/predicted classifier becomes available as enrichment after a trained run. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | (automated on project run) |
| **Type** | `[automatic]` on run |
| **Prerequisites** | A trained SOC project with an acceptable confidence (`NRM-4`/`NRM-5` complete, re-run done). |
| **Produces** | The predicted classifier value attached to records — the normalized/conformed output that feeds publishing (`PUB-1`) and downstream consumers. |
| **Primary role** | Project Admin / Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Once trained, the project's predicted **classifier** is, in effect, a new conformed attribute on the Semantic Object. Running the trained model writes those predictions through, enriching the data with a standardized value (the Silver "conform" outcome).

## How it happens

- Enrichment is a **by-product of running the trained model** — there's no separate "enrich" button. Complete the tasks, **Re-run Model**, and the predictions populate.
- The classifier is a special predicted **Concept** on the object (declared in `NRM-2`), so it participates like any other concept downstream — visible in results, available to publish (`PUB-1`), and subject to DQ.
- Iterate until confidence plateaus; each supervised run should improve it before it flattens.

## Gotchas

- **No trustworthy enrichment without training.** The unsupervised first run's predictions aren't a finished product — train first.
- **Re-run is the trigger** — edits/feedback don't enrich until the model re-runs (and re-run is gated on tasks complete).
- **Stop at the plateau** — keep training only while confidence improves materially.

## Related tasks

- `NRM-4` / `NRM-5` — produce the trained model that enriches.
- `PUB-1` Publish semantic data sets — publish the enriched output.
- `DQ-4` Execute / re-run rules — reassess DQ after enrichment (horizontal thread).
