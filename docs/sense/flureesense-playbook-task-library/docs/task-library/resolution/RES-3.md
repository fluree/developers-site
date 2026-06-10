---
id: res-3
title: "RES-3 — Create a resolve project (+ users/roles, four-eyes)"
sidebar_label: "RES-3 · Create resolve project"
sidebar_position: 3
tags: [task-library, resolution, project, governance, four-eyes]
status: doc
---

# RES-3 — Create a resolve project (+ users/roles, four-eyes)

> **Task Library primitive.** Gold · resolve & master. **Governance embedded** — four-eyes is configured in the project. Mirrors `NRM-1`. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | `Projects` → `Create New Project` (Steps 1–2) |
| **Type** | `[one-time]` per resolution effort |
| **Prerequisites** | An entity (`RES-1`/`RES-2`); registered, entitled data sets (`ACQ-2`); the four-eyes decision. |
| **Produces** | A resolve project shell scoped to one entity, with roles and four-eyes set — the container for matching/merging. |
| **Primary role (RACI)** | **R/A:** Project Admin · **R:** Reviewer · **A:** Approver (four-eyes ON) · **C:** Business SME |
| **Status** | Doc |

## Purpose

Create the project that integrates several data sets and resolves duplication for **one entity type**, producing Golden Records. Sets the same three-role, four-eyes governance as the normalization side.

## The three roles & four-eyes

Identical pattern to `NRM-1`: **Project Admin** (creator default, full control), **Reviewer** (1st-level feedback, **mandatory**, can be several), **Approver** (independent validation, required only under four-eyes ON). A user can't be both Reviewer and Approver; the Admin can't double as Reviewer/Approver for Next Step. Four-eyes ON → ≥1 reviewer + ≥1 approver; OFF → ≥1 reviewer. **Four-eyes can't change after the project has run.**

## Steps (click-by-click)

1. From the Home page, click **Create New Project**.
2. **Step 1 — Describe.** Enter a **unique Name**, select the **Catalog**, then the **Entity** (entities populate from the catalog; default is the Sense Default Catalog). Optional description. (Duplicate names rejected.) Next.
3. **Step 2 — Add users & roles.** Add users (only from your own Tenant/Group) into Admin / Reviewer / Approver per the four-eyes rules. Next.
   *(Continue with data sets and the match/merge model in `RES-4`.)*

## Gotchas

- **Entity drives everything downstream** — pick the right one; it determines attributes and match types.
- **Only same-Tenant/Group users** are addable (System Admins manage Tenant/Group membership).
- **Four-eyes sticky after first run.**
- **Keep an Admin** — assign another before removing yourself.

## Related tasks

- `RES-1` / `RES-2` — the entity the project resolves.
- `RES-4` Configure match/merge model — Steps 3–5.
- `NRM-1` Create SOC project — the analogous Classify-side governance.
