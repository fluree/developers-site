---
unlisted: true
id: set-4
title: "SET-4 — System configuration & supported sources"
sidebar_label: "SET-4 · System configuration"
sidebar_position: 4
tags: [task-library, foundation, reference, one-time]
status: doc
---

# SET-4 — System configuration & supported sources

> **Task Library primitive.** A reference card — check it *before* `SET-1` and `ACQ-*` so source-type and environment choices are valid. Client-neutral.

| | |
|---|---|
| **Module** | Getting Started (System configuration) |
| **Screen path** | `System Configuration` (reference) |
| **Type** | `[one-time]` per environment / reference |
| **Prerequisites** | None to read; tenant provisioning is a System-Admin activity. |
| **Produces** | The constraints that bound `SET-1` (source type), client access, and licensing scope. |
| **Primary role** | Platform / Infrastructure Engineer (provisioning); System Admin (tenant creation). |
| **Status** | Doc |

## Purpose

Establish the platform's deployment, source, client and licensing constraints so downstream choices are valid the first time — particularly the **data source type** picked in `SET-1` (which is immutable) and which **module(s)** a tenant is licensed for.

## Supported deployment

- Deployable **On-Cloud** (Azure, AWS, GCP, or other cloud / VPS) or **On-Premise**. On-Cloud is the encouraged default; On-Premise is supported where required.

## Supported data sources

| Type | Examples |
|---|---|
| Cloud file store | Files hosted on Azure or AWS |
| Hadoop | Files hosted on HDFS |
| RDBMS | PostgreSQL, MS SQL, MySQL |
| Snowflake | Snowflake source |

> This list feeds the **Data Source Type** choice in `SET-1`. Confirm the current supported list at configuration time — it can expand between releases.

## Supported clients

- **Desktop / laptop only.** Tablet and mobile are not supported for the full experience and analytics.
- **Browsers:** Chrome, Mozilla Firefox, Edge.
- **Resolutions:** 1200×720, 1366×768, 1920×1080 at 100% zoom.

## Product flavours & licensing

FlureeSense is a suite of three products, strongest used together but licensable individually:

| Product | Scope |
|---|---|
| **Ingest** | Data pipeline management with labeling, data quality and transformation rules. |
| **Resolve** | ML de-duplication and cleansing to produce Golden Records. Data Quality is an optional add-on. |
| **Classify** | Data discovery, business-to-physical mapping, classification and parsing projects via ML. Data Quality is an optional add-on. |

Shared features — **Data Set Management, Data Source Management, Job Monitoring** — appear in both Resolve and Classify. **Data Quality Management** is an add-on licensable with Resolve or Classify.

## Tenants

- A **Tenant** is the sandbox environment from which a business accesses its raw data and uses Ingest / Resolve / Classify. Unless stated otherwise, every object's scope is *within a tenant*.
- **Tenant creation** is a System-Admin internal process that may not involve the client. It also creates the initial **Tenant Admin** user(s) and seeds defaults: default users, catalog, data source, user group, and data sets.
- Default **data set** creation can be **suppressed on request**.

## Gotchas

- **Source type is chosen here-and-now, immutably.** Validate the type against this list before `SET-1`; the wrong type means starting a new source.
- **Resolve-only tenants** won't show Classification information on the data-set Attributes screen — a licensing placeholder appears instead (`ACQ` profiling still runs).
- **Defaults are seeded automatically** — expect a default data source/catalog/group on a fresh tenant.

## Related tasks

- `SET-1` Register a data source — uses the supported-type list above.
- `SET-2` Manage groups & users — the people layer within the tenant created here.
- `ACQ-1`…`ACQ-5` — acquisition runs within the licensed module(s).
