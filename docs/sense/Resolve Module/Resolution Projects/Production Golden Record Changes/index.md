---
title: "Project Home & Golden Record Changes for Projects in Production"
date: 2024-07-11
categories: 
  - "resolve"
  - "resolve-production-gr-changes"
---

In this section, we'll cover the modified Project home screen and how the Golden record changes appear to the user , due to any real time or batch updates.

**Precondition**: The modified Project Home screen, as seen in the example image below, is available only when the project is in Production.

![](images/prod_home2.png)

**Let us review the various sections of this screen**:

1. **Project Data** : This section is changed and will display two tabs - if you opted for both Real Time & Schedule updates during configuration. This shall display just the Real Time API information if Schedule API's are not opted for during configuration.

3. **Project Users**: This section is not changed and is the same as when the project was in training. As an Admin, you can still edit to add/remove or change entitlements of the Project.

5. **Golden Records**: This section has also changed and you will notice that the configuration options that were opted for are displayed here for any project user to view.

7. **Open Golden Record Change Tasks**: This is a different section which has replaced the earlier Match training section section available during Training. This will display the Golden Record Tasks if any have been generated.

9. **Most Recent Golden Record Changes**: As the long name suggests, this shows the most recent changes to golden records. These changes can be due to manual edit's or through delta updates in the Data Sources of the Project.

Let us understand these sections in detail.

**Project Data**

The project data section contains the information about the API's or Data Sources that are the source for all updates flowing in , into the project . This could be through various feeds. Depending on how the project was Promoted to production, the 'Batch Schedule' tab may or may not be there. For example, if the user chose to consider only Real Time API's during 'Promote to Production' , then the 'Batch Schedule' tab will not be present.

In case however it is present, the Batch schedule tab displays the last run details as well as the schedule configuration information such as time, schedule frequency etc. This can be seen in the image below.

![](images/batch_view.png)

**Project User**

The Project User section is the same as it was earlier without any changes. Users can be added or removed by a Project Admin and they will be considered for assignment. If a user is removed, the admin can manually re-assign any pending tasks on that user to another user.

**Golden Records**

The Golden Records section is changed as compared to it's previous look in a production dashboard. Here the user can see the Data Quality score as well as the information which was configured during promotion of the Project to Production in textual question - answer form. The project Admin can also Edit this information, but this has certain implications. We will take this up in a later section.

**Open Golden Records Change Task**

This panel or section sits next to the Golden record changes, on the left. As the name suggest it contains tasks which are not yet persisted as actual changes on the golden record. A Golden record change will appear here first (before moving to the 'Most Recent Golden Record Changes' panel when: 1) If the user had promoted the project to production specifying that changes be updated with some form of manual review and 2) a Golden record change happens: whether through a delta / update pipeline / feed or manually. In the image below , in configuration question # 2 , we can see the various options which provide for manual review. If 'Automatically' has been chosen as the option, **no** 'Golden record Change Tasks' will get generated.

![](images/config_screen.png)

Only once these tasks are reviewed and reach the completion stage , they automatically disappear from this left panel of Home screen, and appear as new rows in the '_Most Recent Golden Record Changes_' panel on the right.

**Completing a Golden Record Change Task**

A Golden Record Change Task is how a production change waits for your judgement before it becomes real. Getting it from _In Review_ to _Completed_ is what actually persists the change.

If you've worked through [Fixing Tasks](/docs/sense/Resolve%20Module/Resolution%20Projects/Fixing%20Tasks/index.md) in training, this will feel familiar — deliberately so. A Golden Record Change Task has the same look, feel and three-screen flow as a _Match Fixing_ task, including how the second screen and the Orphan screen behave. The only visible difference is the heading, which reads **Golden Records Change Task**.

You can open these tasks from two places: the _Open Golden Record Change Tasks_ panel on the production Project Home screen, and the _All Tasks_ screen (via the eyeglass icon). They also appear in your _Open Tasks_ section on the Resolve Home screen if they're assigned to you and still open.

How many people need to touch a task depends on your Four-eyes setting:

| Four-eyes check | What's required |
| --- | --- |
| OFF | Review the change |
| ON | Review **and** approve the change |

<!-- SCREENSHOT NEEDED: Golden Records Change Task open from the production Project Home screen, showing the three-screen Match Fixing style flow -->

When you press _Finish_ and the task reaches _Completed_:

1. The task disappears from the _Open Golden Record Change Tasks_ panel.

3. Fluree Sense triggers the Delta Match Fixing algo to persist the change into the Golden Record.

5. Data Quality rules are re-run against that specific Golden Record.

7. The change appears at the top of the _Most Recent Golden Record Changes_ grid, with its _Last Updated Date_ refreshed.

This normally takes well under ten minutes, but because it isn't instant you may need to refresh the screen to see the change land in the right-hand grid.

Here are the other things worth knowing:

- **A _Task Type_ column** on the tasks grid tells you whether a task is _Match_ or _Merge_, and it's both sortable and filterable. The same column appears on the main tasks grid opened by the eyeglass icon.

- **Your progress auto-saves** on every screen, exactly as in Training tasks. If you close a task without pressing _Finish_ or _Next_, your changed values are still there when you reopen it, and the task stays at the same stage.

- **Tasks can be re-assigned** by the Project Admin from _All Tasks_, following the same validations as Training task re-assignment.

- **Visibility follows the Training rules.** You see tasks assigned to you; a Project Admin sees all tasks assigned to anyone. Once a task has passed your stage, the _Finish_ button and radio buttons are disabled for you.

> **NOTE**: Manually editing a Golden Record does **not** generate a Change Task, even on a project configured for manual review. That change moves straight to the _Most Recent Golden Record Changes_ panel instead. Tasks are generated for real-time and batch delta changes.

**Most Recent Golden Record Changes**

In production stage, the focus of the user may be to review / check on changes that are coming in - whether through real time / batch updates from pipeline OR from a manual edit of a Golden record by a user. Therefore, perhaps the most important panel in this Project Home screen is the : "_Most Recent Golden Record Changes_" . The changes showing here will come through either 'Automatically' or after 'Manual Review' as per the configuration options chosen when moving the project to Production.

In either case , such changes show up in this panel in the Project Home screen. The user can easily filter for changes happening in Last 24 hours, Last week, Last month or all of the changes.

![](images/task_panel.png "img-border")

Additionally the user can also press on the eye-glass icon to be taken to the main Golden record screen which we've already covered as part of Resolve projects. Here also, the user can filter for only those golden records which've changed in: Last 24 hours, Last week, Last month or All Changes.
