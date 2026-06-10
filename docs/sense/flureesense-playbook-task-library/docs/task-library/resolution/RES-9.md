---
id: res-9
title: "RES-9 — Golden record lineage & history"
sidebar_label: "RES-9 · Lineage & history"
sidebar_position: 9
tags: [task-library, resolution, golden-records, lineage]
status: doc
---

# RES-9 — Golden record lineage & history

> **Task Library primitive.** Provenance and change-log for each Golden Record. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Golden Record detail → **Lineage** tab / **History** tab |
| **Type** | `[repeatable]`, inspection |
| **Prerequisites** | Generated Golden Records (`RES-6`). |
| **Produces** | A view of which source records composed each Golden Record, and an append-only log of changes. |
| **Primary role** | Data Steward / Entity Admin. |
| **Status** | Doc |

## Purpose

Answer "where did this value come from?" and "what changed?" — essential for trust, audit, and the Data Practitioner | SME hand-off. Also exposes the project-level confidence and compression metrics.

## Lineage

Open a Golden Record and click the **Lineage** tab to see which specific source-system records were combined to form it. Highlighted values are the ones selected into the Golden Record. A **manual edit** (custom value) appears as a new lineage row whose source shows as the user (`RES-8`).

## History

The **History** tab is an append-only log: every change — first assignment, model re-run, or manual edit — appends an entry, newest on top, filterable/sortable.

## Confidence & compression (context)

- **Model Confidence** splits into High/Medium/Low and is reported separately for **Entities Resolved** (clustering quality) and **Entities Mastered** (value-selection quality).
- **Compression Ratio** indicates duplication — e.g. 1.6:1 means ~1 distinct record per 1.6 source records.

## Gotchas

- **History records both manual and run-driven changes** — use it to distinguish steward edits from model output.
- **Lineage reflects the last run** — after manual edits, re-run to see DQ/score effects (`RES-8`).
- **Use confidence + compression together** — high compression with low confidence is a flag to keep training (`RES-5`/`RES-6`).

## Related tasks

- `RES-8` Review / edit golden records — edits surface here.
- `PUB-2` Publish golden records — the reconciliation report complements lineage.
- `MON-3` Dashboards — track confidence/quality over time.
