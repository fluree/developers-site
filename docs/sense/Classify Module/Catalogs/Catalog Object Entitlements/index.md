---
title: "Catalog Object Entitlements"
date: 2023-06-24
categories: 
  - "catalog-object-entitlements"
  - "classify"
tags: 
  - "data-set"
---

Like data sources or Data Sets, users of a _Catalog_ also need to be provided with defined roles (or entitlements) when it is created. These can also be changed when editing a _Catalog_. The following entitlements are available to be assigned:

1. **Catalog Admin:** The _Catalog Admin_ has the entitlement to edit and add more _Semantic Objects_ and the associated _Concepts_ to the _Catalog_. The logged-in user is considered the _Catalog Admin_ by default, but they also can add more users (with any given role). The _Catalog Admin_ can also re-assign _Catalog_ Classification Tasks to Reviewers and Approvers or override feedback by a Reviewer / Approver. The _Catalog Admin_ can also edit the users and delete the _Catalog_.  
      
    

3. **Catalog Reviewer:** The _Catalog_ Reviewer cannot add/remove or edit _Semantic Objects_ and _Concepts_, edit users etc. The Reviewer can simply train the _Catalog_ _Classification_ model by giving feedback to tasks at _Semantic Object_ or _Concept_ level. This is similar to the Project Reviewer role for Projects.  
      
    

5. **Catalog Approver:** The _Catalog_ Approver cannot add/remove or edit _Semantic Objects_ and _Concepts_, edit users etc. But they can simply approve the _Catalog Classification_ model feedback given by the Reviewer by keeping it as it is - and saving or changing it. A _Catalog Approver_ will only be available for Catalog tasks when Four-eyes Check is ON for that _Catalog_.
