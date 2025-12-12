---
title: "Registering / Profiling a Data Set"
date: 2023-06-16
categories: 
  - "classify"
  - "registering-profiling-resolve"
  - "resolve"
  - "registering-profiling-classify"
tags: 
  - "data-set"
  - "data-source"
---

As discussed in the section in [Creating Data Sets](/docs/sense/Resolve%20Module/Data%20Sets/Creating%20New%20Data%20Set/index.md), once a new Data Set is created, the process for profiling and registering is triggered as well. This process happens asynchronously and in steps. In the initial step, the Data Set sample and attributes are loaded and displayed. Then, in the next step, the profiling of the Data Set is undertaken. Next, as the _Classification_ task is run on the Data Set, Data Set Relationships are re-generated and DQ rules are re-run. While this happens, it is indicated through the progress bar/loader in various sections of the Data Set.

**Useful Note**: Please note that the _Data Set Quality_ and _Data Set Relationships_ tabs remain disabled till the full process completes. Also note that in case you have only the _Resolve_ subscription, the third and final panel in the Attributes screen of a Data Set will not show the _Classification_ information but a placeholder information indicating the licensing requirements, for which you need to contact support.
