---
unlisted: true
id: prd-6
title: "PRD-6 — Run (start vs reset offset & start)"
sidebar_label: "PRD-6 · Run pipeline"
sidebar_position: 6
tags: [task-library, operationalize, ingest, pipeline, run]
status: doc
---

# PRD-6 — Run (start vs reset offset & start)

> **Task Library primitive.** Execute a validated pipeline — and choose whether to resume from the offset or start fresh. Client-neutral.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | Pipeline → **Start** (green button, top-right) → *Start Pipeline* / *Reset Offsets & Start* |
| **Type** | `[repeatable]` |
| **Prerequisites** | A validated, issue-free pipeline (`PRD-5`). |
| **Produces** | A running pipeline that moves/transforms data origin→destination; status visible on the home screen and in jobs. |
| **Primary role** | Data Engineer / DataOps. |
| **Status** | Doc (Ingest guide) |

## Purpose

Turn the pipeline on. The **Start** button's drop-down offers two modes that differ in where processing resumes — a frequent source of confusion, so choose deliberately.

## Steps (click-by-click)

1. Confirm no errors remain (Issues tab) and that you've validated/previewed (`PRD-5`).
2. Click the green **Start** button (top-right). From its drop-down choose:
   - **Start Pipeline** — turns on and **resumes from where it left off** (uses the saved **offset**; if it was partway through a file it continues from that position). This is the usual way to start a **Streaming / Change-Data-Capture** pipeline.
   - **Reset Offsets & Start** — starts **from scratch**, ignoring prior offsets. **Recommended after you've made edits/changes** to the pipeline.
3. Monitor status (Running/Finished/Stopped/Error) on the home screen and in **Jobs** (`MON-1`).

## Gotchas

- **Resume vs reset is the key decision.** *Start* continues from the offset (right for ongoing streaming/CDC); *Reset Offsets & Start* reprocesses from the beginning (right after edits, or for a clean batch re-run).
- **Edited the pipeline? Reset offsets.** Resuming after edits can produce inconsistent results.
- **Streaming runs until stopped** — a streaming pipeline maintains origin connections and processes at intervals continuously; stop it manually (`PRD-8`).

## Related tasks

- `PRD-5` Validate & preview — required before running.
- `PRD-8` Full vs delta/CDC — batch vs streaming and offset semantics.
- `MON-1` View jobs — track the run.
