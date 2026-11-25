---
title: "Semantic Objects Concepts"
date: 2023-06-24
categories: 
  - "classify"
  - "semantic-objects-concepts"
tags: 
  - "data-set"
---

It will be useful to discuss a little about _Semantic Objects_ and _Concepts_ here. As we create the _Catalog_ above, which is like a Data Dictionary of the business - it is pertinent to note the following:

1. _Semantic Objects_ can interchangeably be referred to as Classes or as Entities in the ‘Resolve’ module. They contain attributes or properties which are Concepts. They can be mapped or ‘tagged’ to Datasets.

3. _Concepts_ or _Entity Attributes_ are the main building blocks and get mapped, ‘tagged’ or linked to Dataset columns to discover the underlying data relationships.

## Renaming a Semantic Object or Concept Inline

Names and descriptions rarely survive first contact with a real business — you'll want to adjust them as your understanding of the data sharpens. You don't need to go through a full edit flow to do it.

In the list of _Semantic Objects_ and in the list of _Concepts_ within a Catalog, each row carries a pencil icon. Click it to edit the name or the description in place, then save. The change is written to the database immediately, so it survives a page refresh.

<!-- SCREENSHOT NEEDED: Semantic Object list showing the pencil icon for inline editing of name and description -->

**System Validations**

1. You need that Catalog's _Catalog Admin_ rights to edit inline. For any other user the pencil icon is disabled.

3. Names must be unique within the Catalog — editing a Semantic Object or Concept to a name that already exists is rejected.

5. On a successful save you'll see a "Changes Saved Successfully" confirmation.
