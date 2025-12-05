---
title: "Rule Views at Dataset Level"
date: 2023-07-29
categories: 
  - "classify"
  - "resolve"
  - "dq-dataset-views-classify"
  - "dq-dataset-views-resolve"
tags: 
  - "data-quality-rules"
  - "data-set"
---

A user can also analyze the Data Quality at the Dataset Level starting from the whole Dataset down to specific columns and then for each rule on that column.

Additionally, the user can also see the Data Quality score across the whole Data Source in the ‘My Data Sources’ section of the home screen.

Let us check out the Data Quality Rule Views at the Data Set level. These include:

1. Data Quality Tab View for the Data Set

3. Filtered view of Data Quality rules from their count at Data Set level

The image below shows where these two can be accessed from:

![](images/131_dq_dataset_view_1.png)

If you click on the Data Set name (marked 1) you are redirected to the Data Set Details screen with multiple tabs, as you may also recall from the related chapter on Data Set. One of these tabs is the Data Quality tab. Lets see what happens if this tab is clicked:

![](images/132_dq_dataset_view_2.png)

Obviously, this assumes that the _Tenant_ has already had some rules created and run on relevant Data Sets. As seen in the image above the numbered and marked sections signify the following:

1. Click on this Tab to display the details in the 3 panels below.  
    

3. The first Panel shows the list of all the columns as well as a special ‘All Columns’ row for displaying the aggregate details across all columns. Let’s say the user clicks on CRD\_DOB column.  
    

5. Clicking on a specific row of the first panel shows all the details for that row in the 2nd panel. This includes scores for those columns or ‘all columns’ if ‘all columns’ is clicked on. You can also see the listing of rules for that column / ‘all columns’ and summary of good, bad etc. records.
    - The user can also re-run the Rule from here using the ‘Re-run Rule’ button as well as export exceptions using the ‘Export Report’ button.  
        

7. Finally, the user can click on the pencil (‘Edit Rules’) icon to create more or manage the existing rules at this level. As in the case of the _Concept_ / _Semantic_ _object_ / _Catalog_ views, clicking this opens up a view similar to the main grid view of _Technical_ Rules from where they can be managed.

Upon clicking the edit icon as mentioned in # 5, the user can see the view as shown below:

![](images/133_dq_dataset_view_3.png)

As we can see in the image, the view lists the rules in the left panel which can be clicked to open on the right panel just like what happens in the main grid _Technical_ rules view. It even has the header control icons as in the main view to manage any of the rules.

One curious thing to note here is that we clicked on the rule and we’re seeing ‘Applied Columns’ in the right panel. But if you have checked out Technical rules: you’ll notice that ‘Applied Columns’ is not a tab for Technical rule view but only for Business rules.

So, why are we seeing this rule at a Data Set level view when it is clearly a _Business_ rule?

The reason is a simple one which we told in the earlier sections as well: each Business Rule is ultimately a technical rule after conversion and so the Rule views at Data Set level do include the Business rules which link to that specific Data Set, thus displaying the details for that specific Data Set.
