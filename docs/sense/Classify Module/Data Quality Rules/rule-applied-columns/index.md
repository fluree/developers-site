---
title: "Rule Applied Columns"
date: 2023-07-29
categories: 
  - "classify"
  - "resolve"
  - "applied-columns-classify"
  - "applied-columns-resolve"
tags: 
  - "data-source"
  - "data-quality-rules"
---

Let’s circle back to the point when we were Creating a Business Rule. If you recall, in that flow we were able to review the existing Data Columns mapped to the primary _Concept_ of that rule. We could also add and remove mappings so as to re-adjust the _Concept_’s model before running or scheduling a Data Quality rule. This ability is provided as a flexible add-on feature for users.

Once the rule is created, we’re still able to manage these columns through the ‘Applied Columns’ Tab. To View and Edit the ‘Applied Columns’ of that rule:

**Step 1.** Open the _Business Rule_ from the Main Grid  
  
**Step 2.** Open the ‘Applied Column’ Tab  
  
**Step 3.** Upvote or Downvote any Mappings  
  
**Step 4.** Run model to Re-run the _Tenant_\-wide _Classification_ Model

![](images/134_dq_applied_columns.png)

The Run model button will activate if you’ve made any changes to the mappings and can be clicked to trigger the _Classification_ model and incorporate the impact of these changes in the model.

You may be wondering, what is the need to provide for _Tenant_ _Classification_ here?  
  
Data Quality and _Classification_ are closely linked as Data Quality score at _Catalog_ / _Semantic_ _Object_ and _Concept_ level represents the Quality score for business objects which can only be accurate if the mappings to business objects are regularly kept updated.
