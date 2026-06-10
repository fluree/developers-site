---
id: prd-4
title: "PRD-4 — Configure origin, processors & destination"
sidebar_label: "PRD-4 · Configure stages"
sidebar_position: 4
tags: [task-library, operationalize, ingest, pipeline, stages]
status: doc
---

# PRD-4 — Configure origin, processors & destination

> **Task Library primitive.** Design the pipeline on the canvas — the substance of an Ingest pipeline. Client-neutral.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | Pipeline **canvas** (Main Canvas · Configuration Panel · Stage Selector) |
| **Type** | `[repeatable]` per pipeline |
| **Prerequisites** | A pipeline (`PRD-3`); source/destination paths and credentials. |
| **Produces** | A fully wired pipeline: configured origin(s), processors, and destination(s), with global parameters set — ready to validate (`PRD-5`). |
| **Primary role** | Data Engineer. |
| **Status** | Doc (Ingest guide) |

## Purpose

Build the data flow by dragging stages onto the canvas and configuring each. A pipeline needs **at least one origin and one destination** to validate and run.

## The design screen (three components)

- **Main Canvas** — drag, drop and connect stages; **Auto-Arrange** tidies layout.
- **Configuration Panel** — per-stage (and pipeline-global) settings across tabs; missing mandatory fields show a **warning icon**.
- **Stage Selector** (right) — the gallery of stages to drag in (toggle with the 9-box grid icon).

**First, set global parameters** on the pipeline-level Configuration Panel (four tabs). The **General** tab carries name/description/labels and the **Execution Mode** drop-down (**Batch** or **Streaming** — see `PRD-8`). **Parameters** set environment/config variables (e.g. container name) globally or per-stage.

## Origins

At least one required. Common origins: **ADLS Gen2**, **Delta Lake**, **Files**. For CSV on an ADLS Gen2 origin, typical settings: Data Format = Delimited, Includes Header = TRUE, Delimiter = Comma, Quote = `"`, Escape = `\`, Schema = Infer from Data. A Delta Lake origin reads a managed/unmanaged table by **table path**.

## Processors (transform between origin & destination)

Use as many as needed:

| Processor | Does |
|---|---|
| Aggregate | Group calculations (SQL GROUP …) |
| Deduplicate | Remove duplicate records |
| Field Remover | Drop/keep specific columns |
| Filter | Pass only records matching a condition |
| Join | Join two input streams |
| Type Converter | Cast field data types |
| Field Renamer | Rename fields — source→target **column mapping** |
| Field Order | Reorder output columns |
| Delta Lake Lookup | Lookup against a Delta table (join for a single value) |
| Stream Selector | Route records to streams by condition |
| Spark SQL Expression | Record-level SELECT/SQL transforms, constants, UDFs |

## Destinations

At least one required. Common: **ADLS Gen2**, **Delta Lake**, **Files**, **JDBC** (relational). Delta Lake destinations support write modes (`PRD-8`): Append, Overwrite, **Upsert Using Merge**, Update Table, Delete from Table — plus partition columns and Merge/Overwrite/No-Schema-Update behaviour.

## Gotchas

- **Warning icons = unfilled mandatory fields** — clear them per stage or the pipeline won't validate.
- **One origin + one destination minimum.**
- **Field Renamer = your column mapping** stage (source model → target model); pair with Type Converter for casts.
- **Global vs stage parameters** — set shared values (container names) globally; stage-only values locally.
- **Schema choices bite at the destination** — *Overwrite Schema* updates once at start then stops on incompatible records; *Merge Schema* adds new columns; *No Schema Update* stops on surprises (`PRD-8`).

## Related tasks

- `PRD-3` Create/clone — produces the pipeline to configure.
- `PRD-5` Validate & preview — check the wired pipeline.
- `PRD-8` Full vs delta/CDC — execution mode and Delta write modes.
- `MAP-3` STM/EDS — the transformation logic these stages implement.
