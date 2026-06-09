---
unlisted: true
id: pub-2
title: "PUB-2 — Publish golden records"
sidebar_label: "PUB-2 · Publish golden records"
sidebar_position: 2
tags: [task-library, publishing, resolve, golden-records]
status: doc
---

# PUB-2 — Publish golden records

> **Task Library primitive.** Gold output — make the mastered single-source-of-truth consumable. Client-neutral.

| | |
|---|---|
| **Module** | Resolve |
| **Screen path** | Golden Records detail → **Publish** |
| **Type** | `[repeatable]` per publish |
| **Prerequisites** | Generated Golden Records at acceptable confidence/quality (`RES-6`/`RES-8`); a target data source (HDFS/Cloud File type) you can access. |
| **Produces** | A published target data set of Golden Records (the source of truth), optionally with a reconciliation report. |
| **Primary role** | Data Management lead / Entity Admin. |
| **Status** | Doc |

## Purpose

Publish the Golden Records as a named target data set so authorized users/teams can consume them from the data-set screens. There is **no system threshold** for publishing — you decide when confidence and quality are sufficient.

## Steps (click-by-click)

1. **Open the Golden Records detail** screen and click **Publish** (bottom-right). A pop-up opens for publishing info. (Available any time after the first successful generation.)
2. **Select the Target Data Source** — the list shows the Tenant's **HDFS / Cloud File Storage** sources you have access to.
3. **Optionally include a Reconciliation Report** — a CSV detailing how source data matched/merged into the Golden Records, generated in parallel and offered as a download (often within seconds).
4. **Review job completion** — publishing runs as a Job; track it in the System Jobs screen (`MON-1`).

## Gotchas

- **You choose when to publish** — there's no enforced confidence gate, so confirm quality (`RES-8`/`RES-9`) and DQ first.
- **Target must be a file-type source** (HDFS/Cloud File Storage) you're entitled to — RDBMS/Snowflake targets aren't offered here.
- **Take the reconciliation report** for audit/hand-off — it complements lineage (`RES-9`) and is easiest to grab at publish time.
- **Re-publish after material change** — published sets are snapshots; re-run + re-publish to refresh (or operationalize via `PRD-*`).

## Related tasks

- `RES-8` / `RES-9` — confirm quality, values and lineage before publishing.
- `PRD-1` Promote to production — for ongoing real-time/batch Golden-Record updates instead of manual re-publish.
- `PUB-1` Publish semantic data sets — the Classify-side equivalent.
