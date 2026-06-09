---
unlisted: true
id: dq-1
title: "DQ-1 — Import business rules (25-field)"
sidebar_label: "DQ-1 · Import business rules"
sidebar_position: 1
tags: [task-library, data-quality, import, business-rules, benchmark]
status: guide
---

# DQ-1 — Import business rules (25-field)

> **Task Library primitive.** The depth benchmark for import cards. **Data Quality is horizontal** — this same primitive is used to assess at Bronze, normalize-remediate at Silver, and resolve-remediate at Gold. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Quality` → `Business Rules` → **Import New Business Rules** |
| **Type** | `[repeatable]` per rule batch |
| **Prerequisites** | A catalog with **exact** object/concept names (`MOD-1`); for valid-value rules, the reference data set registered (`ACQ-2`); for the importer to default you as Rule Admin, you're the importing user. |
| **Produces** | Business rules defined against semantic objects/concepts that auto-apply to every mapped column — assessed and re-assessed as the horizontal DQ thread. |
| **Primary role (RACI)** | **R/A:** Data Quality Analyst / Rule Admin · **C:** Business SME (owns the expectation) · **I:** Data Stewards |
| **Status** | Guide |

## Purpose

Bulk-load **business rules** — rules described *semantically* (against an object/concept), so they execute for **all** data-set columns mapped to that concept, and automatically extend to newly mapped columns. Contrast with technical rules (`DQ-2`), which are bound to specific data sets/columns.

## ⚠️ Convention — encode the EXCEPTIONAL condition

A business rule flags records that **match** the condition you encode, so you encode the *failing* case — the **reverse** of the correct-data expectation:

| Expectation (what good data looks like) | Encode the exception as |
|---|---|
| Field must be populated | `value` **is null** |
| Length must be ≤ N | `length` **is greater than** N |
| Must be ≥ 13 | `value` **is less than** 13 |
| Must be one of {1,2,3} | `value` **does not equal** 1 **AND** … **does not equal** 3 |
| Must be unique | `frequency` **is greater than** 1 |
| Must be in a reference list | `value` **is not within** [list] |

This resolves the instructions-vs-sample ambiguity in favour of the **exceptional condition** (confirmed by the worksheet Instructions, the UI's *"Flag an exception when"* framing, and the bundled sample). A lone-looking `is not null` in a multi-sequence rule is a **not-null guard** (so empties aren't flagged as invalid-value), ANDed with the real exception test — not a "passing condition." *(Also captured in the Conventions appendix.)*

## Prerequisites

- Catalog object/concept names finalized and spelt exactly (`MOD-1`) — any mismatch rejects the row.
- For `is within`/`is not within` rules: the valid-value **data set registered** (`ACQ-2`) and its column name known (`DQ-3`).

## Steps (click-by-click)

1. Go to **Data Quality → Business Rules** and click **Import Rules**. Download the **Business Rule** template (it differs from the Technical template — you can't mix the two).
2. Edit the template (see the 25-field reference). One rule = one or more **rows**; multi-condition rules use one row per **sequence** with a shared `Rule_Name`.
3. Upload — ideally **in batches** to localize errors. The importer **skips malformed rows and imports the valid ones**; errors are summarized by count.
4. Review created rules in the Business Rules grid. The importing user is defaulted to **Rule Admin**; add other users from the UI.
5. Execute now or on schedule — see `DQ-4`.

## Field definitions (Business Rule import template — 25 columns)

| # | Field | Req | What it is / how to fill |
|---|---|---|---|
| 1 | `Catalog` | ✓ | Catalog hosting the objects/concepts. Must match exactly or the rule is rejected. |
| 2 | `Rule_Name` | ✓ | Any name; **must repeat across all rows** of a multi-sequence rule. Name it for the expectation (e.g. *"name length must not exceed 128"*). |
| 3 | `Rule_Description` | | Free text. |
| 4 | `DQ_Dimension` | ✓ | One of: `Accuracy, Completeness, Consistency, Timeliness, Uniqueness, Validity`. |
| 5 | `Rule_Attribute_Name` | ✓ | The **primary concept** the DQ score is counted against. Exact catalog name. |
| 6 | `Rule_Entity_Name` | ✓ | The Semantic Object parent of the primary concept. Exact name. |
| 7 | `Rule_Type` | ✓ | `Business Rule`. |
| 8 | `Rule_Sequence_ID` | ✓ | Order of this condition within the rule: `1`, then `2`, … Default `1`. |
| 9 | `Rule_Sequence_Type` | | `Single attribute` or `Multi-attribute` (compare two concepts). |
| 10 | `Left_Entity_Name` | ✓ | Object of the concept in **this** condition — need not equal the rule-level object (e.g. comparing Guarantor vs Customer). Exact name. |
| 11 | `Left_Attribute_Name` | ✓ | Concept(s) in this condition. Comma-separate for combined measures (e.g. `Customer ID,Customer Name` for compound uniqueness). Exact names. |
| 12 | `Left_Attribute_Value_Type` | ✓ | Property measured: `value, length, regex, max, min, sum, average, product, standard deviation, frequency, z-score, precision, sum between, difference between, product between, quotient between, custom calculation`. |
| 13 | `Left_Calculation` | (cond) | SparkSQL expression (no `SELECT`) — **required only** when value type = `custom calculation`. e.g. `today()-Last Record Update Date`. |
| 14 | `Left_Operator` | ✓ | `is null, is not null, equals, does not equal, is greater than, is greater than or equal to, is less than, is less than or equal to, begins with, does not begin with, ends with, does not end with, contains, does not contain, is within, is not within, between, not between, is Luhn, is not Luhn`. |
| 15 | `Left_Threshold` | (cond) | Comparison value. **Required** for: equals, does not equal, the four greater/less operators, begins/ends/contains (and their negations). |
| 16 | `Lower_Limit` | (cond) | Lower bound when operator is `between`/`not between`. |
| 17 | `Upper_Limit` | (cond) | Upper bound when operator is `between`/`not between`. |
| 18 | `Within_List_Source_Name` | (cond) | For `is within`/`is not within`: the **data set** holding the valid-value list. Must match a registered data set exactly. |
| 19 | `Within_List_Source_Attribute_Name` | (cond) | For within rules: the **column** in that data set holding the valid values. Exact name. *(Header is `…_Attribute_Name`; instruction prose's `…_Column_Name` is drift.)* |
| 20 | `Within_Filter` | (cond) | For within rules: a filter to scope the valid-value list (reference a column in the within-source and the filter condition). |
| 21 | `Right_Entity_Name` | (cond) | **Multi-attribute** only: object of the comparison concept. |
| 22 | `Right_Attribute_Name` | (cond) | Multi-attribute only: the comparison concept. |
| 23 | `Right_Attribute_Value_Type` | (cond) | Multi-attribute only: property measured on the right concept (same list as #12). |
| 24 | `Right_Calculation` | (cond) | Multi-attribute custom expression (mirrors #13). |
| 25 | `Rule_Sequence_Operation` | (cond) | How this sequence joins the next: `AND` / `OR`. Set on each row except the last sequence. |

> **Anchor to 25 fields.** Some legacy samples ship **24 columns, omitting `Within_Filter`**. Use the 25-field template; `Within_Filter` sits at position 20, between `Within_List_Source_Attribute_Name` and `Right_Entity_Name`.

## Worked patterns (genericized)

- **Completeness** — one row: `value | is null`.
- **Validity (length)** — one row: `length | is greater than | 128`.
- **Uniqueness** — one row: `frequency | is greater than | 1`.
- **Compound uniqueness** — `Left_Attribute_Name = "Concept A,Concept B"`, `frequency | is greater than | 1`.
- **Valid value set {1,2,3}** — three rows, same `Rule_Name`, seq 1–3, each `value | does not equal | n`, joined `AND` (record is an exception only if it equals none of the allowed values).
- **Conditional** — *"if Status = Active then Name not null"*: seq 1 `Status value equals "Active"`, seq 2 `Name value is null`, joined so a record with Active status and null name is flagged.
- **Valid value from reference list** — `value | is not within`, with `Within_List_Source_Name` + `Within_List_Source_Attribute_Name` (+ optional `Within_Filter`); usually preceded by an `is not null` guard sequence. See `DQ-3`.

## Gotchas

- **Exact names everywhere** — Catalog, object, concept, data-set, column, operator and value-type spellings must match the system; bad rows are skipped (the rest still import).
- **Multi-sequence = repeat `Rule_Name`** across rows; the wrong/blank name splits one rule into several.
- **Encode the exception, not the expectation** — the single most common authoring error (see the convention box).
- **`Within_*` rules need a registered list** — an unregistered data set or wrong column name rejects the rule.
- **Threshold appears conditionally** — supply it when the operator needs it; omit for `is null`/`is not null`/`is within`.
- **Import in batches** — easier error triage; errors are reported by count of failed rules.
- **Business rules expand automatically** — when a new column maps to the concept, the rule starts covering it (no re-import).

## Related tasks

- `MOD-1` Import catalog — supplies the exact object/concept names.
- `DQ-2` Create a technical rule — column-specific rules (the other rule type).
- `DQ-3` Reference / valid-value (OOB) rules — the `is within` pattern in depth.
- `DQ-4` Execute / re-run rules — run these rules.
- `DQ-5` Review exceptions & remediate — read and act on results.
- `MAP-3` STM/EDS — the curated EDS DQ columns are design inputs for these rules.
