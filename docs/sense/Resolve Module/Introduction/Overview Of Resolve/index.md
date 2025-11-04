---
title: "Overview of Resolve"
date: 2023-05-16
categories: 
  - "overview-of-resolve"
  - "resolve"
---

- _Fluree Sense_ is a full end-to-end data transformation platform designed to ingest, classify, and cleanse big data with an aim to create de-duplicated data. Big data, processed with _Fluree Sense_, is fit for enterprise consumption.

- The _Fluree Sense Resolve_ module focuses on integrating, matching, and merging data from various structured data sources to create cleansed master data that is ready to be used for analytics, reporting, and all other needs.

- _Resolve_ works by grouping data with similar properties together, disambiguating where there is likely overlap (e.g., two different records may represent the same entity but have different and unique ID keys), and merging the data from the linked records together (e.g., take the name from Record A, but the phone number from Record B).

- _Resolve_ is a learning-based system. This means that there are no set rules that the system follows. Rather, it learns through a feedback-response mechanism. In this learning approach, the system presents output based on initial conditions, and then the user provides feedback on the output, which improves the system’s confidence (the probability of coming up with the desired output).

- Once data is matched and merged to remove duplication, it can be published for consumption.

* * *

The end objective is to generate a set of **Golden Records,** also called the _Golden Records Dataset_, that can become the single source of truth for information about the data we are trying to work with.

Since data with the same properties can be spread across multiple datasets/files/sources containing millions of records, the _Resolve_ module is a powerful way to use Machine Learning to remove duplication, create **Golden Records**, and understand Big Data in a better way.
