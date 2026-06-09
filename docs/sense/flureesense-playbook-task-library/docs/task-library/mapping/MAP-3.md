---
unlisted: true
id: map-3
title: "MAP-3 — Import the STM map (tiered)"
sidebar_label: "MAP-3 · Import STM map"
sidebar_position: 3
tags: [task-library, mapping, classification, import, stm, pipeline]
status: doc
---

# MAP-3 — Import the STM map (tiered)

> **Task Library primitive.** *Route B (full)* — the source-to-target map (STM) that also feeds operational pipelines. Comes in three tiers of richness. Client-neutral.

| | |
|---|---|
| **Module** | Classify / Ingest |
| **Screen path** | Mapping import (feeds the object model and, downstream, pipelines) |
| **Type** | `[repeatable]` per source/data-set batch |
| **Prerequisites** | Catalog (`MOD-*`, exact names); registered data sets (`ACQ-2`/`ACQ-3`); completed STM analysis; PKs agreed (`ACQ-0`). |
| **Produces** | A source-to-target map with data types, keys, base paths and transformation logic — the artifact that both trains classification and (at the richest tier) drives the curated/canonical target build and Ingest pipelines. |
| **Primary role** | Data Architect / Data Engineer. |
| **Status** | Doc + Sample |

## Purpose

The STM (source-to-target map) expresses, per source column, where it lands in the target model and how it's transformed. Use the **tier** that matches what you have:

- **Tier 1 — concept-only** → use `MAP-2` (7-col). Start here when only column→concept pairing is known.
- **Tier 2 — STM with structure** (8 or 10 columns) → adds data types, primary keys, base path, and transformation logic. The standard mapping artifact.
- **Tier 3 — curated EDS** (31 columns) → a full engineering data sheet that also carries DQ, classification/governance tags, and explicit source/target physical paths. Use when the same sheet must drive the canonical build and operational pipelines.

## Prerequisites

- Exact catalog object/concept names (`MOD-1`) and registered data sets (`ACQ-2`/`ACQ-3`).
- Primary/business keys agreed with the SME (`ACQ-0`).

## Tier 2 — STM field definitions

**8-column shape** (minimal STM): `datasource_name`, `dataset_name`, `dataset_column_name`, `data_type`, `catalog_name`, `semantic_object_name`, `concept_name`, `data_transformation`.

**10-column shape** (STM with keys + path) adds two fields:

| # | Field | Required | What it is | How to fill it |
|---|---|---|---|---|
| 1 | `datasource_name` | Yes | Registered source | Exact name. |
| 2 | `dataset_name` | Yes | Registered data set | Exact name. |
| 3 | `dataset_column_name` | Yes* | Source column | Exact name. **Leave blank for a derived target** (e.g. a generated key) and put the logic in `data_transformation`. |
| 4 | `data_type` | No | Source/target type | e.g. `string`, `String(10)`. |
| 5 | `is_primary_key` | No | PK flag (10-col only) | `TRUE`/`FALSE`; mark the business/primary key column(s). |
| 6 | `catalog_name` | Yes | Target catalog | Exact name. |
| 7 | `basepath RRL` | No | Base path / namespace for the object (10-col only) | The target object's resource base path/IRI prefix. |
| 8 | `semantic_object_name` | Yes | Target object | Exact name. |
| 9 | `concept_name` | Yes | Target concept | Exact name. |
| 10 | `data_transformation` | No | Mapping/derivation logic | `Direct mapping`, a SQL/string expression (e.g. concat of source columns to form a business key), or a key generator for a derived target. |

> **Derived-target pattern:** for a generated key or a value composed from several columns, leave `dataset_column_name` **blank** and express the derivation in `data_transformation`. This is the signal that the target is computed, not copied.

## Tier 3 — curated EDS (31 columns)

The curated engineering data sheet carries everything Tier 2 does, plus DQ, governance/classification tags, and explicit physical paths. Group the columns as:

| Group | Columns | Purpose |
|---|---|---|
| **Source identity** | `source system`, `Raw Source Path`, `Source Path`, `Source Database Name`, `Source Table Name(s)`, `Source Column Name` | Locate the source physically. |
| **Key / format** | `Primary Key`, `Leading Zeroes`, `business key type`, `Column Sort Order` | Key handling (`business key type` e.g. `surrogate`), formatting, and order. |
| **Data quality** | `data profiling name`, `data quality rule name`, `data quality rules description`, `pseudo data quality rule/logic design`, `dq rule type (standard/exception)`, `exception reporting/remediation table/profile name` | Inline DQ design — note `dq rule type` uses **standard/exception**, consistent with the exceptional-condition convention in `DQ-1`. |
| **Classification & governance** | `data classification`, `data tagging (domain)`, `governance required`, `governance name` | Tags and stewardship. |
| **Transform & target** | `Transformation Logic`, `Target Path`, `Target Database Name`, `Target Table (Canonical Form)`, `Target Column Name`, `version no` | The canonical/curated landing and the logic to get there. |

*(Some EDS templates carry a few unlabeled/“None”/“unnamed” trailing columns — treat these as spreadsheet artifacts and ignore unless your template defines them.)*

## Gotchas

- **Pick the lowest tier that carries what you actually know** — don't fabricate keys or paths to fill a richer template.
- **Exact names on both sides** — source against registered data sets, target against the catalog; mismatches drop rows.
- **Blank source column = derived target** — pair it with `data_transformation`; a blank column *and* blank transformation is an error, not a direct map.
- **`is_primary_key` and `business key type` drive resolution and uniqueness DQ** — get them right (`ACQ-0`, `RES-2`).
- **The curated EDS is dual-purpose** — its DQ/governance columns are design inputs for `DQ-1` and the pipeline build (`PRD-*`), not just documentation.
- **Header drift:** normalize `semantic_name` → `semantic_object_name` before import.

## Related tasks

- `MAP-2` Import concept mappings — the Tier-1 (concept-only) entry.
- `MAP-4` Run the classification model — apply the imported map.
- `MOD-1` Import catalog — supplies exact target names.
- `DQ-1` Import business rules — consumes the EDS DQ design.
- `PRD-2` / `PRD-4` — pipelines built from the STM/EDS transformation logic.
- `RES-2` Entity attributes + reference data — keys/types inform match/merge.
