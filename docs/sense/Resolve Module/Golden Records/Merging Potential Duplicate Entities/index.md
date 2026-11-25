---
title: "Merging Potential Duplicate Entities"
date: 2026-03-30
categories: 
  - "resolve"
  - "merging-potential-duplicates"
tags: 
  - "entity"
  - "golden-records"
---

Matching is good, but it is never perfect. Every so often an entity that plainly belongs to a Golden Record escapes the matching process and ends up sitting just outside it. Fluree Sense surfaces these as _Potential Duplicates_ on the [Relationships tab](/docs/sense/Resolve%20Module/Golden%20Records/Golden%20Records%20Lineage%20&%20Relationships/index.md#the-relationships-tab) of a Golden Record, and the _Merge Entities_ button lets an authorized user pull them in where they belong.

Think of it as the mirror image of [splitting records](/docs/sense/Resolve%20Module/Golden%20Records/Golden%20Records%20Lineage%20&%20Relationships/index.md#splitting-records-out-of-a-golden-record): splitting corrects a record that was wrongly included, merging corrects one that was wrongly left out.

## Merging a Potential Duplicate

Open a Golden Record, click the _Relationships_ tab, and you'll see the Potential Duplicate entities listed. Select the one you want to absorb and click _Merge Entities_.

<!-- SCREENSHOT NEEDED: Relationships tab Potential Duplicates list with the 'Merge Entities' button enabled -->

After you confirm, Fluree Sense invokes the same Delta Merge process used by [Fixing Tasks](/docs/sense/Resolve%20Module/Resolution%20Projects/Fixing%20Tasks/index.md) — clicking _Merge Entities_ is the equivalent of declaring a match between the two clusters, so the existing Match and Merge logic is reused rather than a separate code path. A _Job Triggered_ notification confirms the work has started.

Merging can take **up to five minutes**. While the job runs the screen shows a processing indicator, and the button is locked so a second merge cannot be triggered by accident. When the API responds successfully the screen refreshes on its own, and the count of remaining Potential Duplicates updates.

## What Changes After a Merge

A merge reshapes the cluster, so the effects are visible well beyond the Relationships tab:

| Screen | What changes after the merge |
| --- | --- |
| Golden Records list | Updated cluster composition and metadata. The record's _Updated Date_ is set to the current date, and it appears in the _Most Recent Golden Record Changes_ panel. |
| [Lineage](/docs/sense/Resolve%20Module/Golden%20Records/Golden%20Records%20Lineage%20&%20Relationships/index.md#the-lineage-tab) | The merged records appear under the unified cluster, and the cluster structure reflects the updated relationships. |
| [History](/docs/sense/Resolve%20Module/Golden%20Records/Viewing%20Golden%20Records%20History/index.md) | The merge event is logged with the old cluster ID(s), the new cluster ID, the user, the timestamp, and the action type. |
| Relationships | The merged entity no longer appears as a Potential Duplicate, and the remaining relationship values are updated. |
| Similar Entities | Values update to reflect the new cluster composition; the merged entity is no longer offered as a duplicate suggestion. |

The Golden Record itself is recalculated after every merge.

**System Validations**

1. Only users with edit rights to Golden Records can execute a merge. Users without those rights either do not see the _Merge Entities_ button, or see it disabled.

3. Who holds those rights depends on your Four-eyes check setting. With the Four-eyes check **OFF**, the _Project Admin_ and _Reviewer_ can merge. With the Four-eyes check **ON**, the _Project Admin_, _Reviewer_ and _Approver_ can merge.

5. The UI prevents duplicate clicks or re-triggering while a merge is already processing.
