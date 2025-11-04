---
title: "Key Terms and Concepts"
date: 2023-06-08
categories: 
  - "key-terms-and-concepts"
  - "classify"
tags: 
  - "catalog"
  - "data-set"
  - "data-source"
  - "entity"
---

- **Tenant:**  
    A _Tenant_ is a secure environment/workspace specific to a business set up for all operations related to the _Classify_ and _Resolve_ modules. It is possible that a multi-business group or a conglomerate may want to keep separate Tenants. The operational aspect to note is that whenever objects - be it _Catalog_, _Semantic Object_, Data Quality Rule etc. - are referred to by any user(s) in a _Tenant_, it only pertains to the user(s) or objects associated with that specific _Tenant_. Thus, a _Tenant’s_ objects and users only interact within themselves.

- **Catalog:**  
    A Catalog is the business data glossary, data dictionary or target data model that will be used as a reference for classifying data. A Catalog is composed of _Semantic Objects_ (or data entities) and their underlying business concepts (or entity attributes). An organization may have multiple _Catalogs_. The _Classify_ system can be trained to independently classify the same object against different data dictionaries, so a _Catalog_ will ultimately be the link between the logical business glossary, and the physical meta-data in the Data Lake.

- **Semantic Objects:**  
    A _Catalog_ will be made up of different Semantic Objects. These Objects can be considered as entities or subject areas within the data model. Note that a _Semantic Object_ is also referred to as an ‘_Entity_’ in the _Resolve_ module.

- **Business Concepts:**  
    Each Object within the _Catalog_ will be made up of different Concepts. These Concepts can be considered like the attributes within the entity.

- **Mapping:**  
    A user-provided link between a _Semantic Object_ and a data set, or a business concept and a data set column. Mappings are usually done by dragging and dropping a data set column from the left side of the screen to its corresponding concept on the right.

- **Training the Model**  
    1\. **By creating more mappings:** The fingerprinting or the act of deriving complex patterns in data columns becomes more and more precise as more and more data columns are mapped together. This leads to better classification prediction.  
    2\. **By upvoting or downvoting predictions:** Once predictions are made, having users agree or disagree on the predictions will provide further reinforcement and train the model.

Fluree Sense’s unique feedback capability provides for multiple-user feedback collection, assimilation and analysis, cleaning out duplicate upvotes.

- **Technical Object Model:**  
    It is the physical representation of a _Semantic Object_ based on the predicted classifications. The purpose of the object model is to physicalize the _Catalog_ into a table in a canonical data model. The model is made up of the target data model, which is the glossary turned into a table where the semantic object is expressed as an entity table and each business concept is a table attribute. In addition, the model contains the physical meta-data of the source tables that make up the target table for each distinct data source identified, as well as the primary and foreign key relationships that connect the source tables. This information can be fed into an automatically created Data Pipeline if you have the subscription for _Fluree Sense Ingest_, which operationalizes the transformation logic into code that can be scheduled and run.

- **Synonyms:**  
    A mapping between _Semantic Objects_ in the same _Catalog_, or between concepts spanning multiple _Catalogs_. For example, an enterprise may have two different lines of Business data dictionaries that have similar concepts that are expressed using different terms. A Synonym is a link between those concepts. Synonyms are created by dragging and dropping a concept from one Catalog to a concept from another _Semantic Object_ in the same _Catalog_, or from a different _Catalog_ altogether.
