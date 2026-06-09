---
unlisted: true
id: prd-8
title: "PRD-8 — Full vs delta / CDC modes"
sidebar_label: "PRD-8 · Full vs delta/CDC"
sidebar_position: 8
tags: [task-library, operationalize, ingest, cdc, delta]
status: doc
---

# PRD-8 — Full vs delta / CDC modes

> **Task Library primitive.** Choose how a pipeline processes data over time — one-shot batch vs continuous streaming/CDC, and how the destination applies changes. Client-neutral.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | Pipeline → Configuration Panel → General → **Execution Mode**; Delta destination → **Write Mode** |
| **Type** | configuration |
| **Prerequisites** | A pipeline (`PRD-4`). |
| **Produces** | A pipeline tuned for full loads or incremental/CDC, with the right destination write semantics. |
| **Primary role** | Data Engineer. |
| **Status** | Doc (Ingest guide) |

## Purpose

Decide *how often and how much* a pipeline processes, and *how changes land*. This is the dependable refresh mechanism (preferred over the in-UI data-set scheduler, `ACQ-5`).

## Execution mode (Batch vs Streaming)

Set on the pipeline's **General** tab:

- **Batch** — processes all available data in a single run, then stops. Use for data already accumulated (relational/HDFS staging) — i.e. **full loads** or periodic catch-ups.
- **Streaming** — maintains origin connections and processes at user-defined intervals, running **continuously until manually stopped**. Use for stream platforms (e.g. Kafka) and ongoing **CDC**.

Offset behaviour ties in (`PRD-6`): **Start Pipeline** resumes from the saved offset (the CDC/streaming default — picks up only new/changed records), while **Reset Offsets & Start** reprocesses from scratch (a full reload, or after edits).

## Delta destination write modes (how changes apply)

For Delta Lake destinations, the **Write Mode** decides how incoming records merge with existing data:

| Write mode | Behaviour |
|---|---|
| Append Data | Add new data, leave existing in place |
| Overwrite Data | Replace all (or, with a condition, part of) the table |
| **Upsert Using Merge** | Insert/update/delete by merge condition + clauses + timestamp — the CDC workhorse |
| Update Table | Apply update rules per batch (condition-driven, not record-driven) |
| Delete from Table | Delete rows matching a condition per batch |

Schema handling: **Merge Schema** adds new columns automatically; **Overwrite Schema** locks to the first batch then stops on incompatibility; **No Schema Update** stops on surprises. Partition columns group like-valued records.

## Gotchas

- **CDC = Streaming + offset-resume + Upsert/Merge.** Mixing modes (e.g. reset-offset on a CDC pipeline) reprocesses everything — usually not what you want.
- **Reset offsets after edits**, but understand it's a full reprocess.
- **Choose schema-update mode deliberately** — *Overwrite Schema* will halt on later incompatible records; *Merge Schema* tolerates new fields.
- **Prefer Ingest over the UI scheduler** (`ACQ-5`) for dependable recurring/delta loads.

## Related tasks

- `PRD-6` Run — Start vs Reset Offsets & Start.
- `PRD-4` Configure stages — where execution mode and write mode live.
- `ACQ-5` Refresh & re-profile — the lighter, UI-side alternative.
- `PRD-9` Master ID / GR-change trigger — a CDC-driven Gold use.
