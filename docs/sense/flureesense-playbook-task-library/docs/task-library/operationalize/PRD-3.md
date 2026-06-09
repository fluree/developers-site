---
unlisted: true
id: prd-3
title: "PRD-3 — Create / clone a pipeline"
sidebar_label: "PRD-3 · Create / clone pipeline"
sidebar_position: 3
tags: [task-library, operationalize, ingest, pipeline]
status: doc
---

# PRD-3 — Create / clone a pipeline

> **Task Library primitive.** Start a new Ingest pipeline — cloning a known-good one is the recommended default. Client-neutral.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | Home → **Create New Pipeline** / Action Menu → **Clone** (Duplicate Pipeline) |
| **Type** | `[repeatable]` |
| **Prerequisites** | Ingest access; ideally an existing template pipeline to clone. |
| **Produces** | A new pipeline (blank or cloned) ready to design (`PRD-4`). |
| **Primary role** | Data Engineer. |
| **Status** | Doc (Ingest guide) |

## Purpose

Create the pipeline you'll design and run. **Cloning is recommended** whenever a similar pipeline exists — e.g. to move a new source table from Raw to Semantic, clone an existing raw-to-semantic pipeline and adjust. Build from scratch only when no suitable template exists.

## The home screen (orientation)

Four areas: **Create New Pipeline** (new or import), **Core Pipeline Area** (your pipelines with ID, last-edited, creator, and status — Running/Finished/Edited/Stopped/Cancelled/Error), **Filter Pipelines** (by name keyword), and the **Action Menu** (start, import/export, delete, **clone**).

## Steps (click-by-click)

**Clone (preferred):**
1. Find a similar pipeline in the Core Pipeline Area.
2. Open its **Action Menu** and choose **Clone / Duplicate Pipeline**.
3. Rename per convention and adjust origin/destination/params in design (`PRD-4`).

**Create new:**
1. Click **Create New Pipeline** (top-left).
2. Enter **title** (display name; follow the naming convention), optional **description**, and optional **label** (tag for fast filtering — labels list under the Create button).
3. **Save** → you land on the blank pipeline **design screen** (`PRD-4`).

## Gotchas

- **Clone over build** — fewer config gaps and a proven structure; only build new when nothing fits.
- **Naming convention matters** — the title is the display name and the basis for keyword filtering; labels give a second, faster filter axis.
- **Import is also an option** — pipelines can be imported/exported from the Action Menu for reuse across environments.

## Related tasks

- `PRD-4` Configure origin/processors/destination — design the cloned/new pipeline.
- `PRD-2` Land-to-Bronze — a common pipeline to clone first.
