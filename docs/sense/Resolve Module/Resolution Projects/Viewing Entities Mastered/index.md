---
title: "Viewing Entities Mastered"
date: 2023-05-19
categories: 
  - "resolve"
  - "viewing-entities-mastered"
tags: 
  - "catalog"
  - "data-quality-rules"
  - "data-set"
  - "data-source"
  - "entity"
---

To view “_Entities Mastered_”, click on “_View Results_” icon (marked **1**) in the lower right panel:

![](images/40_mastering-1.png)

This will bring up the **View Mastering Results** screen composed of three panels. The leftmost panel contains the list of resolved _Entities_ from the "_Entity Resolution_" process. If the user clicks on any entity name, the middle panel (Entity Information) populates with the "Golden Record" information, the attribute the model has chosen as the best value. Next to each attribute, the Confidence Score identifies how confident the model is that the selected value is the best.

![](images/41_project_entities_mastered_result.png "img-border")

If one clicks the name of each attribute, the third panel becomes populated, which contains the unique attribute value from each record in the cluster and the model score for that attribute. The highest scoring value is selected to go into the Golden Record.
