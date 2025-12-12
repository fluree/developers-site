---
title: "Editing Data Set Entitlements"
date: 2023-06-16
categories: 
  - "classify"
  - "resolve"
  - "editing-entitlements-resolve"
  - "editing-entitlements-classify"
tags: 
  - "data-set"
  - "data-source"
---

In an earlier [section](/docs/sense/Resolve%20Module/Data%20Sets/Data%20Set%20Object%20Roles%20&%20Entitlements/index.md), we looked at how Data Set Entitlements are set when creating a Data Set. However, it is quite possible that you may wish to edit those existing rights. This can be done from the _‘Data Entitlements_’ tab in the Data Set detail view.  
This tab only gets enabled if the logged-in user has the _Data Set Admin_ role.

To Edit Data Set Entitlements:

**Step 1:** **Click on the Entitlements Tab to Open it.**

You will be able to see two panels. On the left panel is the list of groups, based on which the right panel refreshes showing the current Entitlements in editable view.

**Step 2:** **Click on a Group, and then click on _View Users_.**

Once you click on a Group and _View Users_, the panel on the right will refresh to show the existing Entitlements for those users as well as the New User Default Settings.

**Step 3:** **Edit Entitlements, including the Default, in the right panel.**

Now that the existing Entitlements are shown in the right panel, you can edit them for the users and click on “_Apply Changes_” to save. You can even remove your own Entitlement if you wish.

Additionally, you can reset the New User Default Settings, which will apply to subsequent new users, but it can be overridden for any specific user from here.

![](images/31_dataset_detail_6.png)

**System Validations**

1. The Data Entitlements tab can only be opened by a user with the Data Set Admin role associated with that Data Set.

3. A change made to New User Default Settings will apply to any new user pertaining to the specific _Tenant_.

5. Press ‘Apply Changes’ to save your changes before exiting the page.
