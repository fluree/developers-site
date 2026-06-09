---
unlisted: true
id: prd-7
title: "PRD-7 — Orchestration pipeline calling model APIs"
sidebar_label: "PRD-7 · Orchestration (Pending)"
sidebar_position: 7
tags: [task-library, operationalize, ingest, orchestration, pending]
status: pending
---

# PRD-7 — Orchestration pipeline calling model APIs

> **Status: Pending detail.** Stubbed for completeness — the orchestration specifics aren't in the current sources. The shape below is reliable; the click-by-click and field detail are to-confirm.

| | |
|---|---|
| **Module** | Ingest |
| **Screen path** | `Data Ingestion` → Pipeline (orchestration) |
| **Type** | `[repeatable]` |
| **Prerequisites** | Projects in Production exposing APIs (`PRD-1`). |
| **Produces** | A pipeline that orchestrates calls to the Classify/Resolve model APIs as part of a data flow. |
| **Primary role** | Data Engineer / DataOps. |
| **Status** | Pending |

## What it is (brief)

Once a project is promoted to Production (`PRD-1`), it **exposes APIs**. An orchestration pipeline wires calls to those model APIs into an Ingest flow — e.g. land data, call the classify/resolve API to enrich or master it, then write the result onward. It builds on the same canvas/stage model as any pipeline (`PRD-4`), typically using a Spark SQL / HTTP-style processor to invoke the API and a destination to persist results.

## ⏳ Pending / to-confirm

- The exact orchestration stage(s), API-call configuration, auth, and payload mapping are **not in the current sources**.
- When available, write to `PRD-4` depth (per-stage config + worked example), and cross-link `PRD-9` (Master ID / GR-change trigger).

## Related tasks

- `PRD-1` Promote to production — exposes the APIs this calls.
- `PRD-4` Configure stages — the canvas model reused here.
- `PRD-9` Master ID lookup / GR-change trigger — a specific orchestration use.
