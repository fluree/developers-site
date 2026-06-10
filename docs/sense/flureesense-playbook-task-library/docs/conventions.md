---
id: conventions
title: "Appendix A — Conventions & resolved decisions"
sidebar_label: "Appendix A · Conventions"
sidebar_position: 3
tags: [appendix, conventions]
status: doc
---

# Appendix A — Conventions & resolved decisions

> The authoring conventions every card follows, and the resolution of the open items flagged during drafting. Cards reference this page rather than restating it.

## A1 · DQ rules encode the *exceptional* condition

A rule flags records that **match** the condition you write, so you encode the **failing** case — the reverse of the correct-data expectation.

| Expectation | Encode as |
|---|---|
| Must be populated | `value is null` |
| Length ≤ N | `length is greater than N` |
| Must be ≥ 13 | `value is less than 13` |
| One of {1,2,3} | `value does not equal 1` AND … AND `does not equal 3` |
| Must be unique | `frequency is greater than 1` |
| In a reference list | `value is not within [list]` |

This resolves the instructions-vs-sample ambiguity in favour of the **exceptional condition**, confirmed by three independent sources: the worksheet Instructions text, the UI's *"Flag an exception when"* framing, and the bundled sample import. A lone-looking `is not null` inside a multi-sequence rule is a **not-null guard** (so empties aren't flagged as invalid-value), ANDed with the real exception test — **not** a "passing condition." Used by `DQ-1`, `DQ-2`, `DQ-3`, and the EDS `dq rule type (standard/exception)` column in `MAP-3`.

## A2 · SOC training `Vote` semantics

In the training-task import sheet (`NRM-5`), per `task_id` (up to 5 candidate rows):

- **`1` = correct.** Exactly **one `1` per task is mandatory** for the sheet to be accepted.
- **`0` = incorrect.** Optional negative feedback, useful to break ties.
- **blank** = no vote.
- Anything other than `1`/`0` errors on upload.

If a task can't be judged, delete **all** its rows rather than submit it without a positive vote. (A sample showing a `0` on the top option and no `1` is an illustrative/partial export — as-is it would be rejected for lacking a positive vote.)

## A3 · DQ business-rule import anchors to the 25-field set

Author against the **25-column** Business Rule template, which includes **`Within_Filter`** at position 20 (between `Within_List_Source_Attribute_Name` and `Right_Entity_Name`). Some legacy samples ship **24 columns, omitting `Within_Filter`** — don't anchor to those. See `DQ-1` for the full field-by-field guide.

## A4 · Naming-drift normalizations

| Use | Not | Where it appears |
|---|---|---|
| `semantic_object_name` | `semantic_name` | some STM/mapping maps (`MAP-2`/`MAP-3`) |
| `Within_List_Source_Attribute_Name` (template header) | `…_Column_Name` (instruction prose) | DQ business-rule template (`DQ-1`) |
| `data_transformation` is a free-text logic field | (mis-typed as numeric when empty) | STM/mapping samples (`MAP-2`/`MAP-3`) |

Always anchor to the **template header row**, not prose, when they disagree.

## A5 · Card status values

`doc` (grounded in the consolidated docs/PDF) · `guide` (import card written to field-level depth) · `pending` (artifact not yet available — stubbed honestly) · `deferred` (out of scope for now by request).

## A6 · Pending / deferred items (tracked)

- `DQ-2` — Technical Rules **import tab** not in current sources (Pending).
- `NRM-7` — Concept Parser flow + training template (Deferred by request).
- `PRD-7` — Orchestration pipeline calling model APIs (Pending detail).
- `PRD-9` — Master ID lookup / GR-change trigger (Pending detail; Resolve production-changes side is documented).
- `SET-1` — explicit "clone default storage" sub-route (doc gap; confirm with platform team).
- `SET-3` — SSO group-mapping behaviour (to-confirm).
