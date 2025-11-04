---
title: "Overview of Classify"
date: 2023-06-08
categories: 
  - "overview-of-classify"
  - "classify"
tags: 
  - "data-set"
  - "data-source"
---

- _Fluree Sense_ is a full end-to-end platform designed to Ingest, **Classify**, Resolve, and Consume Big Data.

- The _Fluree Sense Classify_ component is focused on tagging, profiling, and classifying data. To be more specific, _Classify_ is an analytic Data Discovery tool used for accelerating the data modeling process.

- The _Classify_ module works by allowing users to import their own data dictionaries or business glossaries as target models. Then, they can tag source data to the target model for a few business systems. _Classify_ will take source-to-target mappings from one system, learn if there are unique fingerprints in the data, and then predict source-to-target mappings for all other source systems discovered and analyzed in the Data Lake.

- Users can give feedback on the predictions that the model comes up with. This enables them to fine-tune the model and improve its predictions every run.

- In addition, _Classify_ also automates the process of physicalizing the data dictionary into a canonical target data model. It does this by reverse-discovering each source system's data structure to model out how to transform source data into the target data model. In case there are multiple transformations required (e.g., joining two tables to create one physical table), it will discover the relationships and save the transformation logic.

- If you have the subscription for _Fluree Sense Ingest_, you can publish the object model as Data Pipelines in _Fluree Sense Ingest_ to operationalize the creation of the physical target data model.
