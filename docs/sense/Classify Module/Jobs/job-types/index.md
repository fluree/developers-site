---
title: "Job Types"
date: 2023-07-30
categories: 
  - "job-types-classify"
  - "job-types-resolve"
  - "classify"
  - "resolve"
tags: 
  - "catalog"
  - "data-set"
  - "entity"
---

Both _Classify_ and _Resolve_ provide for Viewing of Jobs. A Job very simply is a process triggered in non-blocking or asynchronous fashion where the user can go on working and moving from one screen to another while the job completes its work in the background. In this way, a job may take from a couple of minutes to even hours at times. The performance of a Job depends on the complexity, availability of memory and computing power (essentially the cloud specs) and amount of data.

Classify, as well as Resolve both provide Jobs to be viewed as per the table below:

| Jobs Sub Menu Item | When Triggered / Usage | Comments / Pre-requisites |
| --- | --- | --- |
| **Classify** |  |  |
| Jobs Queue | As soon as the API sends the request.  Remains in queue till picked up by cluster for processing. A job exits this and ends up in one of the other tabs for processing depending on what type of Job it is. | Common to both Classify & Resolve |
| Classify Jobs | _Tenant_ wide _Classification_ and is named as per the _Tenant_ name. Triggered every time Tenant wide _Classification_ is triggered : such as from Training of _Concepts_, ‘Run Model’ from any ad-hoc mapping screen etc. | Shows only one value in the panel as ‘run’ for the whole _Tenant_. Logs, and stages for each ‘run’ are displayed grouped.  |
| Project Jobs | In the case of _Classify_, these will be either the Jobs triggered for SOC type or Concept Parser type projects. Identified by the name of the Project |  |
| Dataset Jobs | Every time Data Set is registered (when created) or re-profiled. Identified by Data Set name | Common to both _Classify_ & _Resolve_ |
| Data Quality Jobs | Every time a _Technical_ or _Business_ _Data_ _Quality_ _rule_ is triggered as per schedule or manually. Named as per the Data Quality rule. |  |
| Published Project Jobs | _Classify_ Project or _Concept_ Parser project results are Published here as Data sets. Named as per the Project Name | The project should’ve run at-least once.   |
| Semantic Dataset Jobs | Triggered from _Technical_ _View_ of _Semantic_ _Object_ in Catalog through ‘Publish Semantic Data Set’ button.  |  |
| **Resolve** |  |  |
| Jobs Queue | As soon as the API sends the request.  Remains in queue till picked up by cluster for processing. A job exits this and ends up in one of the other tabs for processing depending on what type of Job it is. | Common to both _Classify_ & _Resolve_ |
| Project Jobs | Every time a Resolve Project is run. Identified by the Project name |  |
| Entity Jobs | Whenever an entity is changed and saved, this happens in the background to incorporate changes to the model. |  |
| Dataset Jobs | Every time Data Set is registered (when created) or re-profiled. Identified by Data Set name | Common to both _Classify_ & _Resolve_ |
| Data Quality Jobs | Every time a _Technical_ or _Business_ _Data_ _Quality_ _rule_ is triggered as per schedule or manually. Identified by the Data Quality rule. | Common to both _Classify_ & _Resolve_ |
| Published Project Jobs | _Resolve_ project results are published here as the Golden Records Data Set with optional Reconciliation report. | Project should’ve run at-least once. |

Apart from the pre-requisites or conditions mentioned above, a common pre-condition for a Job appearing in any of its respective tabs is that it should’ve passed the ‘Job Queue’ stage where it appears first.
