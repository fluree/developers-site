---
title: "Viewing Resolve Project Confidence"
date: 2023-05-19
categories: 
  - "resolve"
  - "project-confidence"
tags: 
  - "data-quality-rules"
  - "data-set"
  - "data-source"
---

There are two important measures related to Golden Records. One is the _Model Confidence_, and the other is _Data Quality_. Let us look at _Confidence_ first. The _Confidence_ is shown separately for _Entities Resolved_ and _Entities Mastered_. The Model Confidence in _Resolve_, and typically across the product is split into High, Medium and Low confidence records, which together give the combined confidence figure.

The _Confidence_ for _Entities Resolved_ is a measure of how confident the system feels about the grouping of individual records i.e. clusters generated. Similarly, the Confidence of _Entities Mastered_ is a measure of how confident the system feels that the most representative attributes were picked in the clusters to generate ‘Golden records’.

The _Compression Ratio_ is a measure of how many distinct records it could derive from the multiple Data Sets which in turn is an indication of the level of duplication and scattered nature of legacy data of the system. For example, a Compression Ratio of 1.6:1 means that on average there was only one distinct logical record for every 1.6 records concerning the entity in the project.
