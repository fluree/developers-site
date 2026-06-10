---
id: mon-2
title: "MON-2 — View logs"
sidebar_label: "MON-2 · View logs"
sidebar_position: 2
tags: [task-library, monitoring, logs]
status: doc
---

# MON-2 — View logs

> **Task Library primitive.** Drill into a job stage to diagnose failures. Client-neutral.

| | |
|---|---|
| **Module** | Classify / Resolve |
| **Screen path** | `Jobs` → job → stage → **Log** |
| **Type** | `[repeatable]`, monitoring |
| **Prerequisites** | A job (typically a failed or stalled one). |
| **Produces** | Stage-level processing detail to diagnose or escalate failures. |
| **Primary role** | Any user; support escalation. |
| **Status** | Doc |

## Purpose

When a job fails or stalls, the **Log** for the relevant stage shows what happened — the basis for self-fixing or escalating to support.

## Steps (click-by-click)

1. In **Jobs** (`MON-1`), open the job and locate the failed/relevant **stage**.
2. Click the **Log** button on that stage.
3. Read the detail; **copy it (or screenshot)** for the support team if the cause isn't obvious.

## Gotchas

- **Logs are per stage** — open the specific failing stage, not just the job.
- **Some errors are environmental** (cluster/DBR), not your config — if a job shows "Not Started" long after triggering and isn't even queued, just **re-trigger once**.
- **Fix-and-retry is fine** — if the log points to an intuitive config problem (a rule, data set, or pipeline setting), adjust it and re-run the job.

## Related tasks

- `MON-1` View jobs — find the job/stage first.
- `DQ-4` / `PRD-6` — common sources of failures worth logging.
