---
title: "Fix Issues from View Results"
date: 2026-03-30
categories: 
  - "resolve"
  - "fix-issues-view-results"
tags: 
  - "entity"
  - "data-set"
---

[Fixing Tasks](/docs/sense/Resolve%20Module/Resolution%20Projects/Fixing%20Tasks/index.md) are generated for you once a model passes its confidence threshold — typically around 80%. That works well when you want the system to tell you what needs attention. But sometimes you're scrolling through [View Results](/docs/sense/Resolve%20Module/Resolution%20Projects/Viewing%20Entities%20Resolved/index.md), you can see with your own eyes that a cluster is wrong, and waiting for a Task to be generated is beside the point.

_Fix Issues_ handles that case. It lets you resolve an entity directly from the View Results page, confirming Match, No Match or Not Sure yourself and correcting the cluster association on the spot.

The key difference from Fixing Tasks is worth stating plainly: **there is no confidence threshold here.** Any record in the Matcher View Results can be fixed, whatever its confidence level. And because you're editing a result rather than completing a Task, the record is modified directly.

## Fixing a Result

1. Navigate to the _View Results_ page and click the _View Results_ icon.

3. Select the specific Entity you want to correct.

5. Click the _Fix Issue_ button. A _Cluster & Suggested Cluster_ pop-up opens.

7. Choose one of the three radio options — _Match_, _No Match_ or _Not Sure_.

9. Click _Next_ and work through the remaining screens.

11. Press _Finish Fixing_. The modal closes and the grid shows the updated record.

<!-- SCREENSHOT NEEDED: View Results page with an entity selected and the 'Fix Issue' button highlighted -->

<!-- SCREENSHOT NEEDED: Cluster & Suggested Cluster pop-up showing the Match / No Match / Not Sure radio options -->

Once you finish, Fluree Sense triggers delta processing for the impacted cluster, exactly as a Fixing Task would.

## What to Expect

If you've used [Train Model](/docs/sense/Resolve%20Module/Resolution%20Projects/Training%20Matching%20Tasks/index.md), the fixing screens will be familiar — a Match fix opens the same three screens. A few things differ, though, and they matter:

- **The wording changes to match what you're doing.** Because you are editing a result and not a Task, the headings and buttons say _Result_ rather than _Task_ — most visibly, the button reads _Finish Fixing_ instead of _Finish Task_.

- **There is no review or approval step.** The Four-eyes check does not apply here. The change is applied the moment you press _Finish Fixing_ — there is no Reviewer or Approver stage to pass through.

- **Your progress is saved as you go.** All three screens auto-save, just as they do in Train Model.

- **Clusters behave as they do in training.** The Match and Merge modals scroll properly when a cluster has many entries, show the cluster name, and support horizontal scrolling.

- **The outcome matches the equivalent Fixing Task.** The same API and algorithm are triggered; the only difference is that a result is being altered rather than a Task completed.

> **NOTE**: Because fixing here bypasses the Task workflow entirely, there is no record of the change in the Tasks screens. If you need the change to carry a Reviewer and Approver trail, use a [Fixing Task](/docs/sense/Resolve%20Module/Resolution%20Projects/Fixing%20Tasks/index.md) instead.
