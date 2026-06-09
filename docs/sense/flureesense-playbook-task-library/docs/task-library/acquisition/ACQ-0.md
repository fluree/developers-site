---
unlisted: true
id: acq-0
title: "ACQ-0 — Prepare a source file for ingestion"
sidebar_label: "ACQ-0 · Prepare a source file"
sidebar_position: 1
tags: [task-library, acquisition, prep, repeatable]
status: doc
---

# ACQ-0 — Prepare a source file for ingestion

> **Task Library primitive.** A pre-flight checklist done *outside* the platform before `ACQ-1`/`ACQ-2`. Client-neutral.

| | |
|---|---|
| **Module** | n/a (file preparation, outside the UI) |
| **Screen path** | — |
| **Type** | `[repeatable]` per file / per refresh |
| **Prerequisites** | Access to the raw extract; agreement on the business key with the SME. |
| **Produces** | A registration-ready file: unique, clean headers; a known delimiter; a defined primary key — so `ACQ-2` profiling, classification and STM mapping succeed first time. |
| **Primary role** | Data Acquisition Engineer. |
| **Status** | Doc (best-practice, sample-implied) |

## Purpose

Most registration and classification problems trace back to the file, not the platform. Preparing the extract before upload prevents columns being silently dropped, schema mis-detection, and broken keys downstream in mapping (`MAP-*`) and DQ (`DQ-*`).

## Prerequisites

- The raw extract in a supported format (CSV is the common case; Parquet and others are supported).
- The **business key** for the entity confirmed with the SME (which column or column-combination uniquely identifies a record).

## Preparation checklist

1. **Unique headers.** Every column name must be distinct. Duplicate headers cause columns to be merged or ignored during registration.
2. **Clean header names.** Avoid leading/trailing spaces and stray punctuation. Spelling matters — names that don't match are not resolved and get ignored when importing mappings later (see `MAP-2`/`MAP-3`).
3. **One header row.** Ensure a single header row at the top. If the file has no header, you'll either supply a schema at registration or let the system infer/detect it (`ACQ-2`).
4. **Known delimiter & encoding.** Confirm the delimiter (comma, tab, pipe) and that the file is UTF-8 where possible — you'll declare the delimiter at registration.
5. **Define the primary key.** Identify the PK column (or composite). The PK drives uniqueness DQ rules, STM keys, and resolution matching. If no natural key exists, note that a surrogate/derived key will be created at the mapping tier (a derived target has a *blank source column* — see `MAP-3`).
6. **Strip obvious junk rows.** Remove footer totals, blank separator rows, and export banners that aren't data.
7. **Right-size the file.** Server-level file-size limits may apply; if you hit one, raise it with support rather than silently truncating.

## Gotchas

- **Header spelling is load-bearing.** A misspelled or extra-spaced header silently breaks later concept mapping imports — the item is ignored, not flagged loudly.
- **Duplicate headers are the #1 silent failure.** De-duplicate before upload.
- **No header row is fine — but be deliberate.** Decide up front whether you'll infer, detect, or hand-supply the schema in `ACQ-2`; don't leave it to chance.
- **Composite keys need to be agreed, not guessed.** The SME owns what makes a record unique; capture it now to avoid re-mapping.
- **File-size errors are a support conversation,** not a reason to cut rows.

## Related tasks

- `ACQ-1` Upload a file into a data source — the next step.
- `ACQ-2` Register a data set from an uploaded file — consumes the prepared file.
- `MAP-3` Import STM map — where the defined/derived keys are expressed.
- `DQ-1` Import business rules — uniqueness/completeness rules lean on the PK chosen here.
