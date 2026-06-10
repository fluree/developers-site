---
id: nrm-7
title: "NRM-7 — Concept Parser project + training"
sidebar_label: "NRM-7 · Concept Parser (Deferred)"
sidebar_position: 7
tags: [task-library, normalization, concept-parser, deferred]
status: deferred
---

# NRM-7 — Concept Parser project + training

> **Status: Deferred (by request).** Stubbed for index completeness. The Concept Parser flow and its training template are deferred for now; this card is intentionally minimal and will be written to full depth when prioritized.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Concept Parser Projects` |
| **Type** | `[one-time]` per parsing problem |
| **Prerequisites** | — (to be detailed) |
| **Produces** | Parsed sub-concepts extracted from a composite field (to be detailed). |
| **Primary role** | Data Solution Analyst. |
| **Status** | Deferred |

## What a Concept Parser project is (brief)

A Concept Parser project breaks a **composite field** into structured **sub-concepts** (for example, splitting a free-text description into typed components), with optional **Reference Data** for the sub-concepts and a training loop analogous to SOC projects — including the same **four-eyes** review/approve governance and bulk **task import**.

## ⏳ Deferred

- Full click-by-click setup (initial setup, training & project data, reference-data-for-sub-concepts, export/publish results), the training template fields, and gotchas are **deferred by request**.
- When prioritized, write to `NRM-1`/`NRM-5` depth, reusing the embedded-governance and export→vote→re-import patterns.

## Related tasks

- `NRM-1` Create SOC project — shares the project/governance pattern.
- `NRM-5` Train via task import — shares the import-training pattern.
