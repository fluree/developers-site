---
unlisted: true
id: mod-3
title: "MOD-3 — Import synonyms (optional)"
sidebar_label: "MOD-3 · Import synonyms"
sidebar_position: 3
tags: [task-library, target-model, catalog, import, optional]
status: doc
---

# MOD-3 — Import synonyms (optional)

> **Task Library primitive.** `[optional]` — only when harmonizing **two** target models. Skip if there is a single catalog. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Catalogs` → `[Catalog]` → **Import Synonyms** |
| **Type** | `[optional]`, `[one-time]` per harmonization |
| **Prerequisites** | **Two** catalogs/target models that need to be linked (`MOD-1`/`MOD-2`). |
| **Produces** | Equivalence links (an `owl:equivalentClass`-style mapping) between objects/concepts in two catalogs, so the two models can be treated as one. |
| **Primary role** | Data Architect / Catalog Admin. |
| **Status** | Doc + Sample |

## Purpose

When you have **two** target models — for example a full standard and a simplified variant — synonyms declare that an object/concept on the *left* catalog is equivalent to one on the *right*. This lets classification and downstream consumers treat the two as harmonized.

> **When to skip:** if the engagement has a single target model, you don't need this. Synonyms only earn their keep when reconciling two models.

## Prerequisites

- Two catalogs already created (`MOD-1`/`MOD-2`), each with the objects/concepts you intend to link.
- Exact object/concept names from both catalogs (links resolve by name match).

## Steps (click-by-click)

1. Open the target catalog under **Data Catalogs**.
2. Choose **Import Synonyms**.
3. Download/prepare the synonyms template (see field table), fill the left↔right pairs, and upload.
4. Review the created equivalence links.

## Field definitions (synonyms template — 6 columns)

The template pairs a left-catalog object/concept with its right-catalog equivalent. Every field must match an existing name exactly.

| # | Field | Required | What it is |
|---|---|---|---|
| 1 | `left_catalog_name` | Yes | Source catalog of the left term. |
| 2 | `left_semantic_object_name` | Yes | Object in the left catalog. |
| 3 | `left_concept_name` | Yes* | Concept in the left catalog (*for concept-level links). |
| 4 | `right_catalog_name` | Yes | Catalog of the equivalent right term. |
| 5 | `right_semantic_object_name` | Yes | Equivalent object in the right catalog. |
| 6 | `right_concept_name` | Yes* | Equivalent concept in the right catalog (*for concept-level links). |

## Gotchas

- **Name matches must be exact** on both sides — a typo silently fails to link.
- **Object-level vs concept-level** — pair objects with objects and concepts with concepts; don't cross levels.
- **This is a harmonization tool, not a mapping tool** — to map *source data* to a target model use `MAP-2`/`MAP-3`, not synonyms.

## Related tasks

- `MOD-1` / `MOD-2` — create the two catalogs being harmonized.
- `MAP-2` / `MAP-3` — source-to-target data mapping (distinct from model harmonization).
