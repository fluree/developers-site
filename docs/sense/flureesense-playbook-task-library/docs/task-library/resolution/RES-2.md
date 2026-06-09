---
unlisted: true
id: res-2
title: "RES-2 — Entity attributes, reference data & match/merge types"
sidebar_label: "RES-2 · Attributes & match types"
sidebar_position: 2
tags: [task-library, resolution, entity, match-type, reference-data]
status: doc
---

# RES-2 — Entity attributes, reference data & match/merge types

> **Task Library primitive.** Defines the attribute behaviour that drives matching and merging quality. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | `Entities` → Entity edit; **Define Data Quality Rules** popup |
| **Type** | `[one-time]` per entity (editable) |
| **Prerequisites** | An entity (`RES-1`). |
| **Produces** | Per-attribute **match types** (boost/penalty behaviour), reference-data (valid-value) rules, and the basis for merging strategy — the configuration the resolution algorithm relies on. |
| **Primary role (RACI)** | **R/A:** Entity Admin · **C:** Business SME |
| **Status** | Doc |

## Purpose

Tell the algorithm how each attribute behaves. The single most important setting is the **match type**, which controls how much an attribute boosts or penalizes the likelihood that two records are the same entity. Reference-data (OOB) rules and DQ on attributes also live here.

## Match types (boost/penalty)

Each attribute is assigned a type that sets the similarity required for it to count toward a match:

| Match type | Typical attributes | Similarity required |
|---|---|---|
| **Identity Keys** | SSN, passport/tax IDs, national codes | Perfect match |
| **Strong Identifiers** | Names, date of birth, gender, product descriptions | Strong fuzzy match |
| **Supplementary Identifiers** | Addresses, phone numbers, weights, measures | Strong fuzzy match |
| **Strong Descriptors** | Race, email, product family | Fuzzy match |
| **Supplementary Descriptors** | Industry codes, weights, measures, pack type | Fuzzy match |
| **Automatic Splitters** | Boolean flags that force records apart (e.g. manufacturer code) | Perfect match |

The algorithm sums boosts/penalties across attributes to decide if a record pair is the same entity. **At minimum, define an Identity Key and consider Splitters** — if these types aren't defined, project creation (`RES-4`) warns and stops.

## Reference data / DQ rules on attributes

Open **Define Data Quality Rules** (Entity Admin only) to create OOB rules per attribute — completeness, type, uniqueness, valid-value-from-reference-list, etc. (the same OOB catalogue as `DQ-3`). The **Reference Data List** rule opens the reference-data workflow (choose data set + column). Rules:

- are created **on Save**, take you as Rule Admin, and **run as part of the resolve project**;
- are **shared with Classify** — OOB rules defined here appear there and vice-versa (the horizontal DQ thread crossing modules).

## Gotchas

- **Match types are the lever** — wrong types are the usual cause of over- or under-matching; revisit them before retraining (`RES-5`).
- **Identity Key + Splitter are effectively required** for a sound model (project creation enforces).
- **DQ rules here run every resolve run** — they gate which values are "valid" for merging strategies like *combine all valid values* (`RES-4`).
- **Save is explicit** — rules aren't created until you press Save.

## Related tasks

- `RES-1` Create an entity — the model these settings configure.
- `RES-4` Configure match/merge model — uses these types and the identifier attribute.
- `DQ-3` Reference / valid-value rules — same OOB mechanism on the Classify side.
- `RES-5` Train matching — where mis-set types show up as bad clusters.
