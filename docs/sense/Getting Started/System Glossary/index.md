---
id: sense-glossary
title: System Glossary
sidebar_position: 1
---

# System Glossary

## Fluree Sense Glossary in relation to Ontology Terms

You will find a number of terms used in **Fluree Sense** that are well known to the **Data community**.  
We’ve described the key ones [here](https://sensedocsdev.wpengine.com/key-terms-and-concepts/) for **Classify** and [here](https://sensedocsdev.wpengine.com/key-terms-concepts/) for **Resolve**.  

However, it is also useful to understand this glossary in relation to equivalent **Ontology terms**.  
The table below provides a ready-reckoner.

---

### Context…

<details>
<summary><strong>Read More →</strong></summary>

You will find a number of terms used in Fluree Sense that are well known to the Data community. We've described the key ones [here](https://sensedocsdev.wpengine.com/key-terms-and-concepts/) for **Classify** and [here](https://sensedocsdev.wpengine.com/key-terms-concepts/) for **Resolve**.  
However it is also useful to understand this glossary in relation to equivalent **Ontology terms**. The table below provides a ready-reckoner.

<div style={{overflowX: "auto"}}>

| # | Context | Term | Definition | Related Term(s) | Related Context | Relationship |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Semantic Modeling (RDF) | Ontology | An ontology is a formal description of knowledge as a set of concepts within a domain and the relationships that hold between them. It ensures a common understanding of information and makes explicit domain assumptions thus allowing organizations to make better sense of their data. An ontology provides a framework for representing shareable and reusable knowledge across a domain. | Class | Semantic Modeling (RDF) | Child or Member of an Ontology |
|   |   |   |   | Data Catalog | Fluree - Classify / Resolve | Equivalent to an Ontology |
| 2 | Semantic Modeling (RDF) | Class | A semantic class (rdfs: Class) represents an abstraction of a collection of business objects and thus forms part of an Ontology. For example, a 'Person' is a class which could have people with multiple names (the objects or instances). | Ontology | Semantic Modeling (RDF) | Parent or Container of a Class |
|   |   |   |   | Property | Semantic Modeling (RDF) | Child or Member of a Class |
|   |   |   |   | Semantic Object | Fluree - Classify | Equivalent to a Class |
|   |   |   |   | Entity | Fluree - Resolve | Equivalent to a Class |
| 3 | Semantic Modeling (RDF) | Property | A (rdfs: Property) is used to add attributes to classes. Example: the 'Person' class may have properties like 'First Name', 'Last Name' and 'Age'. | Class | Semantic Modeling (RDF) | Parent or Container of a Property |
|   |   |   |   | Concept | Fluree - Classify | Equivalent to a Property |
|   |   |   |   | Attribute | Fluree - Resolve | Equivalent to a Property |
| 4 | Fluree - Classify / Resolve | Data Catalog | A Catalog is the business data glossary, data dictionary or target data model that will be used as a reference for classifying data. A Catalog is composed of Semantic Objects (or data entities) and their underlying business concepts (or entity attributes). An organization may have multiple Catalogs. | Semantic Object | Fluree - Classify | Child or Member of a Data Catalog |
|   |   |   |   | Ontology | Semantic Modeling (RDF) | Equivalent to a Data Catalog |
| 5 | Fluree - Classify | Semantic Object | A Catalog will be made up of different Semantic Objects. These Objects can be considered as entities or subject areas within the data model. Note that a Semantic Object is also referred to as an ‘Entity’ in the Resolve module. | Data Catalog | Fluree - Classify / Resolve | Parent or Container of a Semantic Object |
|   |   |   |   | Concept | Fluree - Classify | Child or Member of a Semantic Object |
|   |   |   |   | Class | Semantic Modeling (RDF) | Equivalent to Semantic Object |
|   |   |   |   | Entity | Fluree - Resolve | Equivalent to Semantic Object |
|   |   |   |   | Data Set | Fluree - Classify / Resolve | Mapped to one or more Semantic Objects |
| 6 | Fluree - Classify | Concept | Each Semantic Object within the Data Catalog is made up of different Concepts. These Concepts are the various properties of the Semantic Object. For example, for the 'Bank Account' Semantic Object, 'Account Number', 'Account Type' etc. are Concepts. | Semantic Object | Fluree - Classify | Parent or Container of a Concept |
|   |   |   |   | Property | Semantic Modeling (RDF) | Equivalent to Concept |
|   |   |   |   | Attribute | Fluree - Resolve | Equivalent to Concept |
|   |   |   |   | Data Set Column | Fluree - Classify / Resolve | Mapped to one or more Concepts |
| 7 | Fluree - Classify | Synonym | A mapping between Semantic Objects in the same Catalog, or between concepts spanning multiple Catalogs. For example, an enterprise may have two different lines of Business data dictionaries that have similar concepts that are expressed using different terms. A Synonym is a link between those concepts. | Concept | Fluree - Classify | Linking of one Concept to another via a Synonym |
| 8 | Fluree - Resolve | Entity | This represents the uniquely identifiable ‘thing’ in the data that the user is trying to cleanse and transform in Resolve. This is the equivalent of a 'Class' in RDFS and of a 'Semantic Object' in Fluree - Classify. | Data Catalog | Fluree - Classify / Resolve | Parent or Container of an Entity |
|   |   |   |   | Attribute | Fluree - Resolve | Child or Member of an Entity |
|   |   |   |   | Class | Semantic Modeling (RDF) | Equivalent to Entity |
|   |   |   |   | Semantic Object | Fluree - Classify | Equivalent to Entity |
|   |   |   |   | Data Set | Fluree - Classify / Resolve | Mapped to one or more Entities |
| 9 | Fluree - Resolve | Attribute | The property or aspects that describes an 'Entity' is an attribute. This is the equivalent of a 'Property' in RDFS and of 'Concept' in Fluree - Classify. | Entity | Fluree - Resolve | Parent or Container of an Attribute |
|   |   |   |   | Property | Semantic Modeling (RDF) | Equivalent to Attribute |
|   |   |   |   | Concept | Fluree - Classify | Equivalent to Attribute |
|   |   |   |   | Data Set Column | Fluree - Classify / Resolve | Mapped to one or more Attributes |
| 10 | Fluree - Classify / Resolve | Data Set | The collection of input data that will be transformed and worked on, in Classify or Resolve. In the case of Resolve for example, we match and merge 'Data Set(s)' in order to create Golden Records in Resolve. Similarly we map & tag Data Set(s) to Concepts & Semantic Objects in Classify. | Semantic Object | Fluree - Classify | Can be mapped to a Data Set |
|   |   |   |   | Entity | Fluree - Resolve | Can be mapped to a Data Set |
| 11 | Fluree - Classify / Resolve | Data Set Column | Each Data Set is composed of a set of columns which refer to a specific aspect of that Data Set. In the context of relational databases, a column is a set of data values, all of a single type, possibly bound by specific constraints (such as not null, unique etc.) | Concept | Fluree - Classify | Can be mapped to a Data Set Column |
|   |   |   |   | Attribute | Fluree - Resolve | Can be mapped to a Data Set Column |

</div>
</details>

