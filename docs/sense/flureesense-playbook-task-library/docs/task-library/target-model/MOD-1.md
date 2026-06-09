---
unlisted: true
id: mod-1
title: "MOD-1 — Import a catalog from file"
sidebar_label: "MOD-1 · Import catalog (file)"
sidebar_position: 1
tags: [task-library, target-model, catalog, import]
status: doc
---

# MOD-1 — Import a catalog from file

> **Task Library primitive.** Sequenced at Silver-prep · build the target model. The practical way to stand up a large catalog. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Catalogs` → `Create New Catalog` (Steps 1–2) → Semantic Object / Concept list → **Import File** |
| **Type** | `[one-time]` per catalog, `[repeatable]` to bulk-add objects/concepts |
| **Prerequisites** | Catalog Admin rights; a catalog shell (name + roles) created via `MOD-2` Steps 1–2; a filled import template. |
| **Produces** | A catalog (business glossary) of Semantic Objects and Concepts — the target model that classification, mapping (`MAP-*`) and DQ (`DQ-*`) operate against. |
| **Primary role** | Data Architect / Catalog Admin. |
| **Status** | Doc |

## Purpose

Bulk-load a catalog's **Semantic Objects** (classes/entities) and **Concepts** (their attributes) from a file, instead of typing them one by one. This is the recommended route for any non-trivial target model. Semantic Objects map/tag to data sets; Concepts map/tag to data-set columns.

## Prerequisites

- **Catalog Admin** on the target catalog — only an admin can import objects/concepts.
- A catalog shell already created through `MOD-2` Steps 1–2 (name + four-eyes roles); import adds the objects/concepts into it.
- A filled template (download it from the Import popup; see field table).

## Steps (click-by-click)

1. Complete `MOD-2` **Step 1 (Describe Catalog)** and **Step 2 (Define User Roles)** to create the shell.
2. From the **Semantic Object list** or **Concept list** screen, click the **Import File** icon.
3. In the popup, **Download Import Template** if you don't already have it.
4. Edit the template locally: leave row 1 (headers) intact, delete the example rows, and add your objects/concepts. Spelling matters (see Gotchas).
5. Upload the edited file as a normal upload and **review** the resulting Semantic Object and Concept lists against your master.

> CSV is one of several catalog import formats — semantic-graph files (`.owl`, `.ttl`, `.rdf`) can also be uploaded from the same Import popup to create the catalog (allow 5–10 min for the cluster to process). Use the CSV template route documented here for tabular glossaries.

## Field definitions (catalog import template — 7 columns)

| # | Field | Required | What it is | How to fill it |
|---|---|---|---|---|
| 1 | `sort_order` | No | Display/processing order | Sequential integer; controls concept order within the model. |
| 2 | `semantic_object_name` | Yes | The class/entity name | Must be unique within the catalog; exact spelling. The parent of its concepts. |
| 3 | `semantic_object_description` | No | Definition of the object | Plain-language scope for reviewers. |
| 4 | `concept_name` | Yes | The attribute name | The concept under the object on the same row; exact spelling. |
| 5 | `concept_description` | No | Definition of the concept | Helps mapping and DQ authoring later. |
| 6 | `concept_data_type` | No | Declared type | Leave **blank** if unknown; otherwise exactly one of `Int, String, Date, DateTime, Double, Float, Boolean`. |
| 7 | `concept_scrubber_type` | No | OOB cleaner/validator to apply | e.g. `Date` standardizes values to a valid date format; `None` for no scrubber. |

## Gotchas

- **Spelling is load-bearing.** Object/concept names must be spelt exactly; misspellings cause rows to be rejected or ignored — and they must later match `MAP-*` and `DQ-*` imports character-for-character.
- **Duplicate handling is asymmetric.** A duplicate *Concept* is ignored and the rest still import; a duplicate *Semantic Object* causes **none** of that object's concepts to import. De-duplicate first.
- **Missing required values error per row.** Rows missing `semantic_object_name` or `concept_name` are reported in the upload popup.
- **`data_type` spelling is strict** — use the exact allowed tokens or leave blank.
- **Only a Catalog Admin can import** — the Import option is disabled otherwise.
- **Semantic-graph import is slow to start** (cluster wake-up) — that's normal, not an error.

## Related tasks

- `MOD-2` Create a catalog in UI — builds the shell (Steps 1–2) and supports manual edits.
- `MOD-3` Import synonyms — only when harmonizing two catalogs/target models.
- `MOD-4` View technical / object model — verify the imported model.
- `MAP-2` / `MAP-3` — import the source-to-target mappings against this catalog.
- `DQ-1` — author business rules whose `Rule_Entity_Name`/`Rule_Attribute_Name` must match these names exactly.
