---
unlisted: true
id: mon-3
title: "MON-3 — Consumption & DQ dashboards"
sidebar_label: "MON-3 · Consumption & DQ"
sidebar_position: 3
tags: [task-library, monitoring, dashboards, data-quality]
status: doc
---

# MON-3 — Consumption & DQ dashboards

> **Task Library primitive.** Tenant-level usage and the source/target DQ view — the "reassess" lens of the horizontal DQ thread. Client-neutral.

| | |
|---|---|
| **Module** | All |
| **Screen path** | Header → **Consumption Report** icon; DQ charts at Catalog / Object / Concept / Data Set rule views |
| **Type** | `[repeatable]`, monitoring |
| **Prerequisites** | Usage and (for target DQ) published/golden data with rules applied. |
| **Produces** | Visibility of licence consumption and tenant-level source/target data-quality trends. |
| **Primary role** | Data Management lead / Steward. |
| **Status** | Doc |

## Purpose

See, at a glance, how much of your licence you've consumed and how data quality is trending across the tenant — the standing measure that the horizontal DQ thread (`DQ-*`) rolls up into.

## Consumption Report (header)

Click the **Consumption Report** icon in the header. It shows:

- **Usage** — consumed records/data vs. your **licensed allocation** (top boxes).
- **Source Data Quality** — tenant-level DQ on source data (bottom).
- **Target Data Quality** — tenant-level DQ on target data; **starts populating only once target records with applicable rules exist** (golden records, published data sets).

## DQ rule views (chart per scope)

Beyond the header report, DQ is viewable at **Catalog / Semantic Object / Concept / Data Set** scope (object/concept/catalog views require a Classify licence). Each typically shows a **history chart** of the rule's runs with DQ %, the overall score, and Good / Bad / Total record counts — so you can watch a score move across remediation cycles (`DQ-5`).

## Gotchas

- **Target DQ is empty until there's target data** — don't read "no target quality" as a problem before golden/published sets exist.
- **Scope-level views are licence-gated** — Resolve-only tenants won't see Catalog/Object/Concept DQ views.
- **Trend, don't snapshot** — use the history charts to confirm remediation worked, not a single run.

## Related tasks

- `DQ-4` / `DQ-5` — the runs and remediation these dashboards trend.
- `PUB-1` / `PUB-2` — produce the target data that target-DQ measures.
- `RES-9` — project confidence/compression complements DQ here.
