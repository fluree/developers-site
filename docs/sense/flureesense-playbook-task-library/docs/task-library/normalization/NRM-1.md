---
id: nrm-1
title: "NRM-1 — Create a SOC project (+ users/roles, four-eyes)"
sidebar_label: "NRM-1 · Create SOC project"
sidebar_position: 1
tags: [task-library, normalization, project, governance, four-eyes]
status: doc
---

# NRM-1 — Create a SOC project (+ users/roles, four-eyes)

> **Task Library primitive.** Silver · normalize & conform. **Governance is embedded here** — task assignment and four-eyes live in the project, not a separate workstream. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Projects` → `Create New Data Classification Project` (Steps 1–2) |
| **Type** | `[one-time]` per classification problem |
| **Prerequisites** | A catalog with the target Semantic Object (`MOD-*`); registered, mapped data sets (`ACQ-2`, `MAP-4`); the four-eyes decision. |
| **Produces** | A Semantic-Object-Classification (SOC) project shell with roles and four-eyes configured — the container for targeted classification/normalization. |
| **Primary role (RACI)** | **R/A:** Project Admin · **R (review):** Reviewer · **A (approve):** Approver (four-eyes ON) · **C:** Business SME |
| **Status** | Doc |

## Purpose

A SOC project solves a *targeted* classification problem (predict one classifier for one Semantic Object) — unlike tenant-wide ad-hoc classification. This card creates the shell and sets the **governance**: who reviews and who independently approves (four-eyes).

## The three roles & four-eyes

- **Project Admin** — full control (data sets, entitlements, re-run, delete); the creator defaults to Admin.
- **Reviewer** — gives 1st-level feedback to training tasks; **at least one is mandatory**.
- **Approver** — independently validates the Reviewer's feedback; required only when four-eyes is ON.

A user **cannot hold both Reviewer and Approver** on the same project, and the **Admin can't also be the Reviewer/Approver** for Next Step to enable. Four-eyes ON requires ≥1 reviewer + ≥1 approver; OFF requires ≥1 reviewer.

## Steps (click-by-click)

1. From **Projects**, click **Create New Data Classification Project**.
2. **Step 1 — Describe.** Choose **Project Type**, enter a **unique Name**, optional description. (Duplicate names are rejected.) Next.
3. **Step 2 — Add users & roles.** Move users into Admin / Reviewer / Approver, observing the four-eyes rules above. **Tick the role checkbox after moving each user**, or you'll get a warning. Next.
   *(Continue defining the classifier and data in `NRM-2`.)*

## Governance note (the outsourcing boundary)

The Reviewer/Approver split *is* the four-eyes control, and it maps cleanly onto the Data Practitioner | Business SME boundary: a practitioner can review while the business SME approves (or vice-versa). **Four-eyes cannot be changed after the project has run once** — set it deliberately. To remove yourself as the last Admin, assign another Admin first.

## Gotchas

- **Four-eyes is sticky after first run** — decide up front.
- **Role checkbox after moving** — moving a user to the right panel isn't enough; tick the role.
- **Admin ≠ Reviewer/Approver** for enablement — separate the duties.
- **One Reviewer is the floor**, even with four-eyes OFF.

## Related tasks

- `NRM-2` Define classifier + training/project data — the next steps (3–6).
- `MOD-*` / `MAP-4` — the catalog and mappings the project consumes.
- `RES-3` Create a resolve project — the same four-eyes pattern on the Gold side.
- `NRM-4` / `NRM-5` — train the project under this governance.
