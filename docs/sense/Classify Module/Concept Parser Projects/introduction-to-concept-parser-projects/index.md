---
title: "Introduction to Concept Parser Projects"
date: 2023-08-03
categories: 
  - "introduction-concept-parser"
  - "classify"
tags: 
  - "data-set"
---

The Classify Product from _Fluree Sense_ comes with another powerful and unique feature: Machine Learning or AI-led Data Parsing capability. In the _Semantic Object_ Project, which we’ve seen earlier, we were defining a _Classifier_.  
  
Here, based on the _Classifier’s_ value, we will parse _Concepts_ further into _Sub-Concepts_ and predict values for the same. In real world use cases, let us look at a specific scenario carrying forward from the example we had taken for _Semantic Object Classification_ Projects.  
  
In the _Semantic Object Classification_ or SOC project, we had used Machine Learning to determine whether a given product was a beaker, a pipe, an electric wire, or some other such category. This could just as easily be an exercise to determine whether a patient is at risk of heart ailment or not, etc. But in this section, we’ll carry on with the first example.  
  
In the real world, this also corresponds to the problem where companies need to structure data about that product class and present it properly rather than as unstructured or free text data such as Product Description or Short Description etc.  
  
The below table shows an illustration of how raw data can be classified and parsed to provide customers with a structured, richer view about the Data Object.

| **Raw Data** | **Classification**  | **Concept Parser** |
| --- | --- | --- |
| A 4 feet long pipe with 3” diameter of red color is available. It is made of zinc. | Derived Classes Pipe | Sub-Concepts: Value after parsing:<br/>Length: 4 feet<br/>Diameter: 3 inch<br/>Color: Red<br/>Material: Zinc
A ½-inch diameter wire with 3 Ampere rating in a 30 mts bundle of pure copper 12 gauge. | Wire | Diameter:  ½ inch<br/>Ampere Rating : 3<br/>Gauge:  12<br/>Length : 30 mts<br/>Material : Copper
Grey-coloured hard glass beaker of 5 Litre capacity without spout. Certification ISO 3819. <br/><br/> And more such Long Description in Data Set.  | Beaker | Colour : Grey<br/>Capacity: 5 Litres<br/>Spout:  No<br/>Certification : ISO 3819<br/>Material:  Hard Glass 

As we see above, the data can be parsed to a set of key-value pairs, which may differ from each category or ‘_class._’  
  
In the context of our system, these are _Sub-Concepts_ of the associated _Concept_ \- ‘Product Description,’ linked to a classifier (‘Product Category’) for the Semantic Object: ‘Product’ in this case. The _Classifier_, of course, is another _Concept_ but of a special kind. And, this is basically what Machine Learning helps us with in _Concept Parser_ projects.
