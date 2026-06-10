---
id: res-1
title: "RES-1 — Create an entity"
sidebar_label: "RES-1 · Create an entity"
sidebar_position: 1
tags: [task-library, resolution, entity]
status: doc
---

# RES-1 — Create an entity

> **Task Library primitive.** Gold · resolve & master. An Entity in Resolve is the same construct as a Semantic Object in Classify. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | `Entities` → Create New Entity Model |
| **Type** | `[one-time]` per entity |
| **Prerequisites** | Catalog Admin / Entity Admin rights; a target catalog. |
| **Produces** | An entity model (objects + attributes) that resolve projects (`RES-3`) match and merge into Golden Records. |
| **Primary role** | Data Architect / Entity Admin. |
| **Status** | Doc |

## Purpose

Define the **Entity** — the uniquely identifiable "thing" (person, place, or thing) you'll resolve. An Entity is the Resolve-side name for a Classify **Semantic Object**, so it carries attributes (= concepts) and can be referenced by many data sets.

## Out-of-the-box entities

Resolve ships with entity templates you can use directly, including (Type → Name): Person → Individual / Household / Institution / Legal Entity Parent; Place → Address / Building; Thing → Contract / Trade / Payment / Financial Instrument / Position / Deal. Each has a default model with sensible concepts and built-in handling (name normalization, address validation, date formatting) that the unsupervised model uses without training.

## Steps (outline)

1. Open **Entities** in Resolve.
2. Create a new entity model — either start from an **OOB entity** (recommended where one fits) or define a **custom** entity in a customized catalog.
3. Define its attributes and types in `RES-2` (attributes, reference data, match/merge types).

## Gotchas

- **Prefer an OOB entity when one fits** — you inherit built-in matching knowledge and identifier handling for free.
- **Custom entities need the type discipline of `RES-2`** — especially the Identity-Key and Splitter attribute types, or project creation will warn and block (`RES-4`).
- **Entity = Semantic Object** — a model built in Classify (`MOD-*`) is reusable here; don't rebuild it.

> *Doc note:* the consolidated help references entity creation/management but is thin on explicit click-by-click; treat the create flow as "start from OOB or custom catalog, then define attributes in `RES-2`" and confirm UI specifics in-app.

## Related tasks

- `RES-2` Entity attributes + reference data + match/merge types — the substance of the model.
- `MOD-1` / `MOD-2` — the Classify-side equivalent (objects/concepts).
- `RES-3` Create a resolve project — consumes this entity.
