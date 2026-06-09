---
unlisted: true
id: mod-2
title: "MOD-2 — Create a catalog in the UI"
sidebar_label: "MOD-2 · Create catalog (UI)"
sidebar_position: 2
tags: [task-library, target-model, catalog]
status: doc
---

# MOD-2 — Create a catalog in the UI

> **Task Library primitive.** Builds the catalog shell and supports small/manual models. Steps 1–2 are the prerequisite for `MOD-1`. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Catalogs` → `Create New Data Catalog` (or **My Data Catalog** on the home screen) |
| **Type** | `[one-time]` per catalog |
| **Prerequisites** | Tenant access; the four-eyes decision for the catalog. |
| **Produces** | A catalog shell with roles, and (for small models) its Semantic Objects and Concepts entered by hand. |
| **Primary role (RACI)** | **R/A:** Catalog Admin · **C/R:** Catalog Reviewer · **A (approve):** Catalog Approver (four-eyes ON) |
| **Status** | Doc |

## Purpose

Create a catalog interactively. For large models, use the UI only for **Steps 1–2** (shell + roles) and then bulk-load via `MOD-1`. For small models, finish all four steps here. This card also establishes the **four-eyes roles** that govern catalog feedback.

## Prerequisites

- A decision on **four-eyes**: OFF (admin + reviewer) or ON (admin + reviewer + approver).
- The list of Semantic Objects and Concepts if entering manually.

## Steps (click-by-click)

1. **Step 1 — Describe Catalog.** Enter a unique **name** and select an **icon** (both required to enable Next), plus an optional description of the catalog's scope. Click **Next Step**.
2. **Step 2 — Define User Roles.** Assign **Catalog Admin**, **Catalog Reviewer**, and (if four-eyes ON) **Catalog Approver**:
   - Four-eyes **OFF** → at least 1 admin + 1 reviewer required.
   - Four-eyes **ON** → at least 1 admin + 1 reviewer + 1 approver required.
   *(For a large catalog, stop here and continue in `MOD-1`.)*
3. **Step 3 — Define Semantic Object(s).** Type each object name (+ optional definition) and click the **plus** button to add it. Click **Next Step**.
4. **Step 4 — Define Concepts per object.** Pick the parent object from the dropdown, type a concept name (+ optional definition), click **plus**. Repeat across objects, then **Save and Close**.

## Governance note (four-eyes)

The Approver role only exists when four-eyes is ON; the Approver can accept or amend the Reviewer's classification feedback but cannot edit objects/concepts or users. **Once the catalog has been used in a run, its four-eyes state cannot be changed** — set it deliberately at creation.

## Gotchas

- **Name + icon gate Step 1.** Duplicate catalog names are rejected with a prompt to rename.
- **Four-eyes is sticky after first run** — you can't flip it later, so decide up front.
- **Workflow saves on Next Step**, except screens with an **Apply Changes** button or pencil-edit icons, which save only on that action.
- **Soft-delete cascades** — deleting a catalog soft-deletes its objects/concepts, and mapped concepts drop off at the next classification run.

## Related tasks

- `MOD-1` Import a catalog from file — bulk-load objects/concepts into this shell.
- `MOD-4` View technical / object model.
- `NRM-1` / `RES-3` — projects reuse the same four-eyes pattern established here.
