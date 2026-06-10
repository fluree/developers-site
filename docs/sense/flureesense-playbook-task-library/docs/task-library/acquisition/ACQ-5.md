---
id: acq-5
title: "ACQ-5 — Refresh schedule & re-profiling"
sidebar_label: "ACQ-5 · Refresh & re-profile"
sidebar_position: 6
tags: [task-library, acquisition, data-set, repeatable, refresh]
status: doc
---

# ACQ-5 — Refresh schedule & re-profiling

> **Task Library primitive.** Keeps a registered data set current as the underlying data changes. Client-neutral.

| | |
|---|---|
| **Module** | Classify |
| **Screen path** | `Data Sets` → `[Data Set]` → **Refresh Schedule** / **Re-Profile Data Set** |
| **Type** | `[repeatable]` per refresh |
| **Prerequisites** | `ACQ-2`/`ACQ-3` a registered, profiled data set; refresh preconditions met for the source. |
| **Produces** | Updated profiling (and re-run classification, relationships and DQ) reflecting current data — ad-hoc or on a schedule. |
| **Primary role** | Data Solution Analyst / DataOps. |
| **Status** | Doc |

## Purpose

Real data changes. This card keeps a data set's profile, classification, relationships and DQ baseline aligned with the latest data — either immediately (ad-hoc) or on a recurring schedule, including picking up delta (changed) records where conditions allow.

## Prerequisites

- A registered data set (`ACQ-2`/`ACQ-3`).
- The source able to supply refreshed/changed data (delta capability depends on the source and configuration).

## Steps — ad-hoc re-profile

1. Open the data set and go to **Refresh / Re-profiling**.
2. Click **Re-Profile Data Set** to re-profile immediately. This re-runs the registration pipeline steps (profile → classify → relationships → DQ) and **reconsiders the registration choices** (including the schema-handling route from `ACQ-2`).

## Steps — scheduled refresh

1. In the same area, select the **Scheduled** radio button.
2. Set **Start Time**, **Recurrence Pattern**, and related options.
3. Choose to profile the **whole** data set or a **sample** (whole is advisable unless very large).
4. Save. Refreshes then run on schedule as Jobs. *(Scheduled refresh is an emerging/beta capability and native scheduling is comparatively limited — for robust recurring or CDC loads use the managed Ingest route, `PRD-8`.)*

## Gotchas

- **Re-profiling reuses your registration choices** — if the original schema route or whole-vs-sample choice was wrong, fix it here, because re-profiling will faithfully repeat it.
- **Native scheduling is limited.** For dependable recurring/CDC refresh, prefer Ingest full-vs-delta pipelines (`PRD-8`) over the in-UI scheduler.
- **Delta depends on the source.** Getting changed-records-only requires the source and configuration to support it; otherwise it's a full re-profile.
- **DQ re-runs on refresh** — expect the data set's quality score to move; that's the horizontal DQ thread reassessing (`DQ-4`).

## Related tasks

- `ACQ-2` Register a data set — sets the initial schedule and profiling choices.
- `PRD-8` Full vs delta / CDC modes — the managed-pipeline refresh path.
- `DQ-4` Execute / re-run rules — DQ reassessment that refresh triggers.
- `MON-1` View jobs — monitor scheduled refresh runs.
