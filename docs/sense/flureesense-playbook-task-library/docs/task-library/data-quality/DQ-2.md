---
id: dq-2
title: "DQ-2 — Create a technical rule"
sidebar_label: "DQ-2 · Technical rule (Pending)"
sidebar_position: 2
tags: [task-library, data-quality, technical-rules, pending]
status: pending
---

# DQ-2 — Create a technical rule

> **Status: Pending artifact.** Stubbed for completeness — the Technical Rules **import tab** is not yet available in the project sources, so the field-level import guide is deferred. The conceptual outline below is reliable; the import template specifics are to-confirm.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Quality` → `Technical Rules` |
| **Type** | `[repeatable]` per rule |
| **Prerequisites** | A registered data set (`ACQ-2`/`ACQ-3`). |
| **Produces** | A rule bound to **specific** data sets/columns (vs. the semantic, auto-expanding business rule). |
| **Primary role** | Data Quality Analyst / Rule Admin. |
| **Status** | Pending |

## What a technical rule is

A **technical rule** is described against specific data sets and columns, and executes **only** for those — unlike a business rule (`DQ-1`), which is semantic and auto-applies to every column mapped to a concept. Internally, a running business rule is **translated into one or more technical rules** across the identified columns/tables.

Use a technical rule when the check is genuinely physical/local (one table, one column) and there's no value in expressing it semantically.

## Convention

The **same exceptional-condition convention as `DQ-1`** applies — encode the failing case ("Flag an exception when …"). See the convention box in `DQ-1` and the Conventions appendix.

## Creating one (outline)

The on-screen create flow mirrors the business-rule flow (select scope → exception conditions with value type / operator / threshold → entitlements → schedule). Bulk import is also supported, but **the Technical Rules import template is downloaded from the Technical view and differs from the Business template** — you cannot mix the two in one file.

## ⏳ Pending / to-confirm

- The **Technical Rules import tab** and its field definitions are **not in the current project sources**. Do not document import field-by-field until that template is captured.
- Once available, write this card to `DQ-1` depth (per-field table + worked patterns).

## Related tasks

- `DQ-1` Import business rules — the semantic, auto-expanding alternative and the convention reference.
- `DQ-4` Execute / re-run rules.
- `DQ-5` Review exceptions & remediate.
