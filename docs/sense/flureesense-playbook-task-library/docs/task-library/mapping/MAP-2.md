---
unlisted: true
id: map-2
title: "MAP-2 — Import concept mappings"
sidebar_label: "MAP-2 · Import concept mappings"
sidebar_position: 2
tags: [task-library, mapping, classification, import]
status: doc
---

# MAP-2 — Import concept mappings

> **Task Library primitive.** *Route B (entry)* — import an offline-analysed source-to-target map. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Catalog / object-model import (mapping import) |
| **Type** | `[repeatable]` per source/data-set batch |
| **Prerequisites** | A catalog (`MOD-*`) with exact object/concept names; registered data sets (`ACQ-2`/`ACQ-3`); a completed source-to-target analysis. |
| **Produces** | Column→concept mappings loaded in bulk, so the classifier starts from a curated map rather than discovering from scratch. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc + Sample |

## Purpose

When the source-to-target mapping has already been worked out offline (the common pattern for well-understood ERP/source schemas), import it instead of training in the UI. `MAP-2` covers the **concept-mapping** shape; `MAP-3` covers the fuller, tiered **STM** shape with keys, paths and transformation logic.

## Prerequisites

- Catalog object/concept names finalized (`MOD-1`) — mappings resolve by exact name.
- The relevant data sets registered (`ACQ-2`/`ACQ-3`) so `dataset_name`/`dataset_column_name` resolve.

## Field definitions (concept-mapping template — 7 columns)

Maps a source column to a target concept. Names on both sides must match registered/cataloged names exactly.

| # | Field | Required | What it is | How to fill it |
|---|---|---|---|---|
| 1 | `datasource_name` | Yes | Registered data source (`SET-1`) | Exact name. |
| 2 | `dataset_name` | Yes | Registered data set (`ACQ-2`) | Exact name. |
| 3 | `dataset_column_name` | Yes | Source column | Exact column name; blank only for a derived target (then supply logic). |
| 4 | `catalog_name` | Yes | Target catalog (`MOD-1`) | Exact name. |
| 5 | `semantic_object_name` | Yes | Target object | Exact name. *(Some templates label this `semantic_name` — treat as the same field; standardize to `semantic_object_name`.)* |
| 6 | `concept_name` | Yes | Target concept | Exact name. |
| 7 | `data_transformation` | No | Mapping logic | `Direct mapping` for 1:1, or an expression for derived values; blank = direct. |

## Gotchas

- **Exact names or the row is ignored.** Source side resolves against registered data sets; target side against the catalog. A mismatch on either side drops the row silently.
- **Header-name drift:** the field is `semantic_object_name`; a `semantic_name` header appears in some legacy maps — normalize to `semantic_object_name` before import.
- **`data_transformation` looks numeric in some samples** because it's empty there — it's a free-text logic field; ignore the apparent type.
- **One concept can take many columns** (across sources) — that's expected; the classifier reconciles them.
- **This is the lighter shape.** If you need primary keys, base paths, or surrogate/derived-key logic, use `MAP-3`.

## Related tasks

- `MAP-3` Import STM map (tiered) — the fuller shape (keys, paths, transforms, curated EDS).
- `MAP-1` UI feedback — curate after import.
- `MAP-4` Run the classification model — apply the imported map.
- `MOD-1` Import catalog — provides the exact target names.
