---
id: prd-9
title: "PRD-9 — Master ID lookup / GR-change trigger"
sidebar_label: "PRD-9 · Master ID / GR-change (Pending)"
sidebar_position: 9
tags: [task-library, operationalize, ingest, resolve, master-id, pending]
status: pending
---

# PRD-9 — Master ID lookup / GR-change trigger

> **Status: Pending detail.** The Ingest-orchestration side (the Master-ID lookup call) is not in current sources; the **Resolve production-changes side is documented** and captured below.

| | |
|---|---|
| **Module** | Ingest + Resolve |
| **Screen path** | Orchestration (Ingest) ↔ production Project Home (Resolve) |
| **Type** | `[repeatable]`, production |
| **Prerequisites** | Published golden records (`PUB-2`); a project in Production (`PRD-1`). |
| **Produces** | Incoming records resolved to a Master ID, and Golden-Record changes surfaced/processed in production. |
| **Primary role** | Data Engineer / Entity Admin. |
| **Status** | Pending (Ingest side); documented (Resolve side) |

## What it is

Two halves work together: an **Ingest orchestration** (`PRD-7`) calls the resolve model API to **look up the Master ID** for an incoming record (resolving it against existing golden records), and the **Resolve production project** processes the resulting **Golden-Record change** — directly or as a review task — per the promotion config (`PRD-1`).

## Resolve side — production Golden-Record changes (documented)

When a project is in Production, its Home screen changes to centre on incoming changes:

- **Project Data** — the API/source feeds; shows a **Batch Schedule** tab only if scheduled APIs were enabled at promotion.
- **Open Golden Record Change Tasks** — appears only when promotion chose a **manual-review** update option; a change (from a delta/CDC feed or a manual edit) lands here first. If **Automatically** was chosen, **no** change tasks are generated.
- **Most Recent Golden Record Changes** — once reviewed (or applied automatically), changes show here, filterable by last 24h / week / month / all; the eyeglass jumps to the Golden Records screen with the same filters.

So whether a Master-ID-resolved change needs human review is governed by the `PRD-1` "update changes" choice (Automatically / After manual review / …low / …low+medium confidence).

## ⏳ Pending / to-confirm

- The **Ingest-side Master-ID lookup** call (the API stage, request/response mapping, trigger wiring) is **not in current sources** — to-confirm with the platform/engineering team.

## Related tasks

- `PRD-1` Promote to production — sets the change-handling (review vs automatic) behaviour described above.
- `PRD-7` Orchestration — the (pending) Ingest pipeline that performs the lookup.
- `PUB-2` Publish golden records — the master set the lookup resolves against.
- `RES-8`/`RES-9` — review/lineage for the resulting changes.
