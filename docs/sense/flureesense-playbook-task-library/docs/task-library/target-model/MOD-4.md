---
unlisted: true
id: mod-4
title: "MOD-4 — View the technical / object model"
sidebar_label: "MOD-4 · View object model"
sidebar_position: 4
tags: [task-library, target-model, catalog]
status: doc
---

# MOD-4 — View the technical / object model

> **Task Library primitive.** A verification/inspection lens on the catalog. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Catalogs` → `[Catalog]` → Semantic Object → **Technical View** toggle |
| **Type** | `[repeatable]`, inspection |
| **Prerequisites** | A catalog (`MOD-1`/`MOD-2`); for mappings to appear, classification must have run (`MAP-4`). |
| **Produces** | A column-level view of how physical data maps to each object/concept, and a rendered object model image. |
| **Primary role** | Data Architect / Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Inspect the catalog from the data side: which data-set columns map to each concept, and how the physical tables assemble into each Semantic Object. Use it to verify imports (`MOD-1`), sanity-check mappings (`MAP-*`), and give feedback.

## Steps (click-by-click)

1. Open a **Semantic Object** in the catalog.
2. Toggle **Technical View** (top-right).
3. Click a **Concept** to see its column mappings, or **All Concepts** to see data-set-level mappings. The left panel lists concepts with mapping counts; the right shows the mappings.
4. To see the assembled model, open **View Semantic Object Model** from the Technical View — it renders as a zoomable image you can right-click to save.

## What you can do here

- **Give feedback** on mappings (upvote/downvote) exactly as in the business/ad-hoc view — Technical View is just a different lens on the same mappings (`MAP-1`).
- **Jump to training:** a concept with no mappings shows a placeholder whose link opens that concept's **Train Model** workflow.

## Gotchas

- **No mappings until classification runs.** A freshly imported catalog shows empty mapping counts until `MAP-4` has run on the tenant.
- **Counts differ by design.** A concept's list-screen count reflects **High-confidence** mappings only; the popup shows High + Medium + Low — so the numbers won't match.
- **The model image is a snapshot** — re-open after a classification run to see changes.

## Related tasks

- `MOD-1` / `MOD-2` — the catalog being inspected.
- `MAP-1` Give feedback (UI) — feedback from this view.
- `MAP-4` Run the classification model — populates the mappings shown here.
- `PUB-1` Publish semantic data sets — reached from the object-model view.
