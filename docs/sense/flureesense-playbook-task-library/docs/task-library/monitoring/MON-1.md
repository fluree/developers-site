---
unlisted: true
id: mon-1
title: "MON-1 — View jobs"
sidebar_label: "MON-1 · View jobs"
sidebar_position: 1
tags: [task-library, monitoring, jobs]
status: doc
---

# MON-1 — View jobs

> **Task Library primitive.** Track the asynchronous jobs that almost every action triggers. Client-neutral.

| | |
|---|---|
| **Module** | Classify / Resolve |
| **Screen path** | `Jobs` (left nav) |
| **Type** | `[repeatable]`, monitoring |
| **Prerequisites** | Any triggered job. |
| **Produces** | Visibility of job progress, stage, and success/failure. |
| **Primary role** | Any user (their own jobs); Admins (project/catalog jobs). |
| **Status** | Doc |

## Purpose

Nearly everything heavy — registration/profiling, classification runs, rule executions, resolve runs, publishing — runs as a **non-blocking job**. The Jobs screen is where you confirm it queued, watch its stages, and catch failures. Jobs can take minutes to hours depending on data and cluster.

## Job types (where things land)

A job first sits in **Jobs Queue**, then moves to a typed tab once the cluster picks it up:

| Tab | Triggered by |
|---|---|
| Classify Jobs | Tenant-wide classification (Run Model, concept training) |
| Project Jobs | SOC / Concept-Parser (Classify) or Resolve project runs |
| Dataset Jobs | Data-set registration / re-profiling (both modules) |
| Data Quality Jobs | Business/technical rule executions (both modules) |
| Published Project / Semantic Dataset Jobs | `PUB-1`/`PUB-2` publishing |
| Entity Jobs (Resolve) | Saving entity-model changes |

## What you can observe

Date/time triggered, current **stage** (profiling, classifying, clustering, …), and success/failure. Data-set registration updates **per stage** (sample/profile visible before DQ/ER diagram finish). Status refreshes every few seconds; filter by status (e.g. "not yet started today").

## Gotchas

- **Queue first, always.** A job appears in **Jobs Queue** before processing — "not started" right after triggering is normal.
- **Stuck at Not Started?** Occasionally an environment/DBR hiccup leaves a job not even in the queue — re-trigger once (see `MON-2` for logs).
- **Stages update incrementally** for registration — don't wait for full completion to use early outputs.

## Related tasks

- `MON-2` View logs — drill into a failed stage.
- `MAP-4` / `NRM-3` / `RES-4` / `DQ-4` / `ACQ-2` — common job sources.
