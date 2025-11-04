---
title: "Data Set Object Roles &amp; Entitlements"
date: 2023-06-16
categories: 
  - "role-entitlements-classify"
  - "classify"
  - "resolve"
  - "role-entitlements-resolve"
tags: 
  - "data-set"
  - "data-source"
---

When creating a Data Set, the logged-in user needs to provide Entitlements to that Data Set to themself and other users associated with the _Tenant_. These Entitlements are:

- **Admin:** The admin has full rights to change data access control Entitlements and any settings associated with the Data Set.  
    

- **Read Only:** Users with this Entitlement can only view data samples and profiles, but they do not have the right to change any Data Set properties.  
    

- **Read/Write:** This Entitlement allows the users to change other Data Set properties, such as names and profile sample size, but cannot change Data Set entitlements.

Data Set Entitlements can be set during the _Data Set Creation_ flow as well as when editing an existing Data Set. For every Data Set, its admin can also decide what will be the default rights that a new User pertaining to the corresponding _Tenant_ will get. Below is an example of how this is configured during the Data Set Creation flow.

![](images/16_dataset_entitlements.png)
