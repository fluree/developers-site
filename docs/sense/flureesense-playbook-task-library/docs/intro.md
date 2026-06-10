---
id: intro
title: FlureeSense Practitioner Playbook
sidebar_label: Overview
sidebar_position: 1
---

# FlureeSense Practitioner Playbook

Client-neutral practitioner documentation for FlureeSense — a semantic, supervised-ML data
management platform (data scanning, semantic classification, reference-data normalization,
entity resolution, data quality). Three modules — **Ingest**, **Classify**, **Resolve** —
plus **Data Quality** as an add-on.

## How this is organized

- **The Master Playbook** sequences work along the medallion architecture: **Bronze → Silver →
  Gold → Operationalize**.
- **The Task Library** (this section) holds reusable, client-neutral *primitives*, written once
  and referenced by ID (e.g. `SET-1`, `MAP-3`, `DQ-1`). The Playbook sequences them; it does not
  restate them.
- **Data Quality is horizontal** — assess at Bronze, normalize-as-remediation at Silver,
  resolve-as-remediation at Gold.
- **Governance is embedded** — task assignment and four-eyes review live inside the Silver/Gold
  project steps, not as a separate workstream.

## Reading a Task Library card

Every card follows the same shape: a metadata header (Module · Screen path · type tag ·
prerequisites · what it *Produces* · primary role · status), then **Purpose →
Prerequisites → Steps → Field definitions** (import tasks only) **→ Gotchas → Related tasks**.

> The **Task Library** below is complete across all ten sections. The conventions and resolved
> decisions are gathered in [Appendix A](./conventions.md). The Master Playbook narrative, the
> Roles & Operating Model / RACI, and the Archetype lenses are written on top of this library.
