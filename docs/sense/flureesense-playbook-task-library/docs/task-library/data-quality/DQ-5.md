---
unlisted: true
id: dq-5
title: "DQ-5 — Review exceptions & remediate"
sidebar_label: "DQ-5 · Review & remediate"
sidebar_position: 5
tags: [task-library, data-quality, exceptions, remediation]
status: doc
---

# DQ-5 — Review exceptions & remediate

> **Task Library primitive.** Read rule results and feed them into remediation — the "reassess → remediate" close of the horizontal DQ loop at each layer. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Quality` → select rule → **Exceptions** tab / **Execution Results** → **Export Report** |
| **Type** | `[repeatable]` |
| **Prerequisites** | An executed run (`DQ-4`). |
| **Produces** | A reviewed exception set and an exportable report — the input to remediation (normalization at Silver, resolution at Gold, or source fixes). |
| **Primary role** | Data Quality Analyst (review); Business SME (disposition). |
| **Status** | Doc |

## Purpose

Turn rule output into action. Exceptions are the **records that matched the encoded exception condition** (i.e. failed the expectation). Reviewing them tells you whether the data, the rule, or the mapping needs to change — and where the horizontal DQ thread points next.

## Steps (click-by-click)

1. Select the rule in the left panel and open the **Exceptions** tab (also reachable from Execution Results). The score appears in the rules grid once the run completes.
2. Read the three possible outcomes:
   - **Run with exceptions** — exception records list in the lower-right panel.
   - **Run with no exceptions** — score is 100%, no records.
   - **Run errored** — no records; see the rule's error detail.
3. Click **Export Report** to download a CSV of all exceptions for offline triage / SME disposition.
4. Decide the remediation path (see below) and route it.

## Remediation paths (DQ is horizontal)

| Finding | Where it goes |
|---|---|
| Values inconsistent / non-standard | Normalize at **Silver** (`NRM-*`); reference data / valid-value rules (`DQ-3`). |
| Duplicates / conflicting records | Resolve at **Gold** (`RES-*`). |
| Wrong mapping inflating exceptions | Fix mappings (`MAP-1`), re-run model (`MAP-4`), re-run rule (`DQ-4`). |
| Rule mis-encoded (flagging good data) | Edit the exception condition (`DQ-1` convention) and re-run. |
| True source defect | Raise to the source owner; re-assess after the next refresh (`ACQ-5`). |

## Gotchas

- **Any tenant user can view/export** exceptions — but disposition is an SME/steward responsibility, not automatic.
- **Exceptions live in the data-lake cluster,** not the app metadata DB — expect a short wake-up delay on first view; it's not an error.
- **A surprising spike often means a mapping problem,** not a data collapse — check `MAP-*` before chasing the source.
- **Re-encode, don't argue with the engine.** If "good" records are flagged, the exception condition is likely inverted (see the `DQ-1` convention) — fix and re-run.
- **Reassess after remediation.** Remediation isn't done until the rule is re-run (`DQ-4`) and the score moves — that closing loop is the point of the horizontal thread.

## Related tasks

- `DQ-4` Execute / re-run rules — produces the runs reviewed here.
- `NRM-*` / `RES-*` — the Silver/Gold remediation destinations.
- `MAP-1` / `MAP-4` — fix and re-apply mappings when they distort exceptions.
- `MON-3` DQ dashboards — track score movement across the remediation loop.
