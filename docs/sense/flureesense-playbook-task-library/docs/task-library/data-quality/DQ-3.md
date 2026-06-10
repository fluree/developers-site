---
id: dq-3
title: "DQ-3 — Reference / valid-value (OOB) rules"
sidebar_label: "DQ-3 · Reference / valid-value rules"
sidebar_position: 3
tags: [task-library, data-quality, oob, reference-data]
status: guide
---

# DQ-3 — Reference / valid-value (OOB) rules

> **Task Library primitive.** Out-of-the-box rules — pre-built exception conditions needing minimal setup — with the valid-value (reference list) rule covered in depth. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Quality` → `Business Rules` (OOB step of the create flow) |
| **Type** | `[repeatable]` per concept |
| **Prerequisites** | A catalog/concept (`MOD-1`); for the valid-value rule, a **registered reference data set** (`ACQ-2`) holding the allowed values. |
| **Produces** | Pre-configured DQ rules (completeness, type, uniqueness, range, date order, outlier, valid-value) on a concept, growing DQ coverage cheaply. |
| **Primary role** | Data Quality Analyst / Rule Admin. |
| **Status** | Guide |

## Purpose

OOB rules package common checks behind a few selections. They're **Business Rules only**, created in the normal create flow (alone or alongside a custom rule). Each corresponds to a fixed **exception condition** (the convention from `DQ-1`).

## OOB catalogue (rule → exception condition)

| OOB rule | Exception condition (what it flags) |
|---|---|
| Must be Populated / Non-Null | value is null |
| Must be of the defined data type | value is not of the selected data type |
| Must have a valid value from the referenced list | value is **within** the list is *false* → flagged when not within |
| Must be a Unique value | frequency is greater than 1 |
| Must come Before | (date) is greater than threshold |
| Must come After | (date) is less than threshold |
| Must be Equal To | is not equal to threshold |
| Must be Greater Than | is less than or equal to threshold |
| Must be Less Than | is greater than or equal to threshold |
| Must Not Be a Statistical Outlier | z-score is greater than 3 |

Notes: date-order rules appear only when the concept's type is `DateTime`; if Resolve is licensed, these OOB rules also appear as entity DQ rules in Resolve.

## Valid-value (referenced data list) — the 6-step setup

This is the most-used OOB rule. It validates that every value of a concept comes from a list assembled from registered data-set column(s).

1. In the create flow's **OOB step**, choose **Must have a valid value from the referenced data list**.
2. Click the **edit pencil** to open the Reference Data setup.
3. Choose the **data source / data set** holding the valid values (dropdowns are dependent and filter to sets you have at least Read rights on).
4. Choose the **column** that contains the valid values.
5. Add the row to the **Reference Data List** (you may add more than one; **Apply Changes** enables once at least one row exists).
6. **Apply Changes**, then **Next Step** in the parent screen to create the rule (OOB rules are created on Next Step and can't then be reconfigured — only the description is editable).

> This is the UI equivalent of the `is not within` business-rule import in `DQ-1` (fields 18–20: `Within_List_Source_Name`, `Within_List_Source_Attribute_Name`, `Within_Filter`).

## Gotchas

- **One OOB rule of a given type per concept** — and once created (on Next Step), its condition/name/dimension are locked; cloning is disabled. Only the description is editable.
- **Reference data must be registered first** (`ACQ-2`) and visible to you (Read rights) or it won't appear in the dropdowns.
- **Coverage auto-grows** — reference-data rules (and `RES-2` entity reference data) generate valid-value checks, so DQ coverage expands as the model grows.
- **Type-gated rules** — date-order and outlier rules only show for compatible data types.

## Related tasks

- `DQ-1` Import business rules — the import equivalent (`is within`/`is not within`).
- `ACQ-2` Register a data set — register the reference list first.
- `RES-2` Entity attributes + reference data — the Resolve-side counterpart.
- `DQ-4` / `DQ-5` — execute and review.
