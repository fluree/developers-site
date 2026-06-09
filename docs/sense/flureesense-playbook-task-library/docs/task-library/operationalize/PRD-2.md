---
unlisted: true
id: prd-2
title: "PRD-2 — Land-to-Bronze pipeline"
sidebar_label: "PRD-2 · Land-to-Bronze"
sidebar_position: 2
tags: [task-library, operationalize, ingest, pipeline, bronze]
status: doc
---

# PRD-2 — Land-to-Bronze pipeline

> **Task Library primitive.** The managed acquisition route — an Ingest pipeline that loads source data into Bronze. Client-neutral.

| | |
|---|---|
| **Module** | Ingest (white-labeled StreamSets: Data Collector + Transformer) |
| **Screen path** | `Data Transformation` → Pipeline (canvas) |
| **Type** | `[repeatable]`, recurring |
| **Prerequisites** | A reachable source (file store / Delta Lake / RDBMS); cluster access (Databricks/HDInsight/EMR/Hadoop). |
| **Produces** | Source data landed in a Bronze destination on a repeatable basis — the managed alternative to UI upload (`ACQ-1`). |
| **Primary role** | Data Engineer / DataOps. |
| **Status** | Doc (Ingest guide) |

## Purpose

For recurring or large loads, use a managed **Ingest pipeline** instead of UI upload. A pipeline describes the flow **origin → processor(s) → destination** and runs on Apache Spark on a cluster, so it can transform the full data set. A land-to-Bronze pipeline reads from the source origin and writes, minimally transformed, to the Bronze destination.

## Anatomy (the three stages)

- **Origin** — the source (commonly **ADLS Gen2**, **Delta Lake**, or **Files**); at least one required.
- **Processor(s)** — optional transforms between origin and destination (`PRD-4` lists them); for pure landing you may use none or just type/format handling.
- **Destination** — where data lands (ADLS Gen2, Delta Lake, Files, or JDBC); at least one required.

## Steps (outline)

1. Create or clone a pipeline (`PRD-3`).
2. Configure the **origin** (the source) and a **Bronze destination**, with any minimal processors (`PRD-4`).
3. **Validate** then **preview** (`PRD-5`).
4. **Run** — batch for a one-time/periodic load, streaming/CDC for continuous (`PRD-6`, `PRD-8`).

## Gotchas

- **At least one origin and one destination** or the pipeline won't validate/run.
- **Prefer cloning a known-good landing pipeline** over building from scratch (`PRD-3`).
- **Bronze = minimal transformation.** Keep heavy reshaping for Silver/Gold pipelines; land raw-ish and transform later.
- **Cluster availability gates it** — pipelines run on the configured Spark cluster; a cold cluster adds startup latency.

## Related tasks

- `ACQ-1` Upload a file — the light/manual acquisition alternative.
- `ACQ-3` Register from existing file — register the landed data as a data set.
- `PRD-3`/`PRD-4`/`PRD-5`/`PRD-6` — create, configure, validate, run.
- `PRD-8` Full vs delta/CDC — recurring/continuous modes.
