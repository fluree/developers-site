---
id: nrm-2
title: "NRM-2 — Define the classifier + training/project data"
sidebar_label: "NRM-2 · Define classifier & data"
sidebar_position: 2
tags: [task-library, normalization, project, classifier]
status: doc
---

# NRM-2 — Define the classifier + training/project data

> **Task Library primitive.** Steps 3–6 of SOC project setup — what to predict and what to learn from. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | Project setup, Steps 3–6 (continues from `NRM-1`) |
| **Type** | `[one-time]` per project (editable) |
| **Prerequisites** | `NRM-1` project shell; concepts mapped with **High** confidence on the chosen data sets (`MAP-4`). |
| **Produces** | A fully defined SOC project: target object, classifier, features, training data and project data — ready to run. |
| **Primary role** | Data Solution Analyst. |
| **Status** | Doc |

## Purpose

Define *what* the project predicts and *what it learns from*: pick the Semantic Object, declare the classifier (the predicted property), choose the feature concepts, and split data into training vs. project sets.

## Steps (click-by-click)

3. **Select the Semantic Object** to classify — choose the **Catalog**, then a **single Semantic Object** that already exists in it.
4. **Define the classifier + its reference data.** Name a new **Classifier** (unique within the object) — it becomes a special predicted Concept on that object. Then point to the **single data set** and the **single column** that holds the classifier's possible values.
5. **Add training data.** Provide the **feature concepts** (not raw columns) the classifier depends on, then choose data sets whose columns are mapped with **High** confidence to those concepts. If a chosen data set lacks all the features, the system blocks it.
6. **Add project data.** Choose the data sets the model will actually run on. **Training and project data sets cannot overlap** — the system enforces this. Then run the model (`NRM-3`).

## Gotchas

- **Features are concepts, not columns.** You supply Semantic-Object concepts; the platform resolves them to mapped columns — so mapping quality (`MAP-4`) directly limits the model.
- **High-confidence mappings required** on the feature data sets, or the set won't move to the right panel.
- **No overlap between training and project data** — a core ML rule the system enforces.
- **Classifier name must be unique** within the object; it persists as a predicted concept.
- **Read-rights warning is soft** — you can include a data set you lack read rights to, but think twice.

## Related tasks

- `NRM-1` Create the SOC project — Steps 1–2.
- `NRM-3` Run model & generate prediction tasks — the next step.
- `MAP-4` Run classification — ensures the feature mappings exist.
