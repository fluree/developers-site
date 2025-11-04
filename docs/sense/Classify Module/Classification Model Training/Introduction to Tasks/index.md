---
title: "Introduction to Tasks"
date: 2023-07-05
categories: 
  - "classify"
  - "introduction-tasks"
tags: 
  - "data-set"
---

In this section, we’ll be talking about a specific type of Task we colloquially call ‘_Catalog Task_.’ In the system, this corresponds to two different types of Tasks:

- _Concept_ Class Training

- _Semantic Object_ Class Training

But before that, let us understand what is a ‘Task?’  
  
The Fluree Sense System provides for Model Training through a set of system-generated Tasks, which are essentially workflows to complete Feedback on predictions. These in turn act as training for the model to improve its predictions in subsequent runs - thereby increasing the confidence score. These tasks get generated every time the _Classification_ model is run in the _Tenant_.  
  
So what’s the difference between the Ad-hoc mappings and ‘_Catalog Task_’ mappings (or predictions), considering they are both just feedback workflow to upvote or downvote a mapping ?

**These are the main differences between Ad-hoc Mappings & Catalog Tasks:**

1. In the case of ad-hoc mappings, the predictions are available to all tenant users to provide their feedback whereas Tasks are available only to specific users (Reviewers, Approvers) to review and optionally change them.

3. Tasks are more refined predictions which should be prioritized for completion as they represent the minimal training set necessary to train the system.

5. Ad-hoc mappings will show counts and the history of the multiple users who have provided feedback to them. _Catalog Tasks_ (which are essentially mappings to provide feedback) do not show counts and Feedback History for the very reason that they are generated for a specific user to complete.
