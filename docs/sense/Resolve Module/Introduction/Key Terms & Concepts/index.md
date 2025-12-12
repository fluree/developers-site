---
title: "Key Terms &amp; Concepts"
date: 2023-05-17
categories: 
  - "key-terms-concepts"
  - "resolve"
---

- **Tenant:**  
    A _Tenant_ is the secure environment / workspace specific to a business set up for all operations related to the _Classify_ and _Resolve_ modules. It is possible that a multi-business group or a conglomerate may want to keep separate _Tenants_. The operational aspect to note is that whenever objects - be it Catalog, Semantic Object, Data Quality Rule etc. - are referred to by any user(s) in a _Tenant_, it only pertains to the user(s) or objects associated with that specific _Tenant_. Thus, a _Tenant's_ objects and users only interact within themselves.

- **Data Set (or, Dataset):**  
    The collection of input data that will be matched and merged in order to create Golden Records. The user needs to register data sets to make them available in projects created for the _Resolve_ module. A data set can correspond to a flat file, database table, or a Hadoop file (made up of partitioned blocks of files in HDFS). Data Sets are created by selecting a file from a registered Data Source, and then defining who - within the _Resolve_ module - can access that file. Fluree Sense will profile the data so that it is available for users with permission to quickly scan and understand.

- **Entity:**  
    This represents the uniquely identifiable ‘thing’ in the data that the user is trying to cleanse and transform in _Resolve_. For example, the user may want to integrate data from multiple structured data sources and create a master ID key for each house or building referenced in any record. In this case, the _Entity_ is a Place and of Type: Building. Fluree Sense comes with knowledge about a variety of Entities out of the box:

| Entity Type | Entity Name | Entity Description |
| --- | --- | --- |
| Person | Individual | An individual person, be it a customer, employee or other party representing a single person.  |
| Person | Household | A collection of individual persons, typically a social or family unit sharing the same attributes pertaining to a specific location. |
| Person | Institution | A corporate legal person who has the capacity to enter into agreements or contracts, assume obligations, incur and pay debts, sue and be sued in his or her own right, and be held responsible for his or her actions. |
| Person | Legal Entity Parent | A collection of institutions grouped under a legal ownership hierarchy.  Use this entity to define related clusters of _Entities_ having the Entity Name  - Institution. |
| Place | Address | An _Entity_ which is used to describe a particular geographic place or position. |
| Place | Building | An _Entity_ which is used to describe a specific physical real estate location. |
| Thing | Contract | A voluntary, deliberate, and legally binding agreement between two or more persons. |
| Thing | Trade | An agreement between persons participating in a voluntary negotiation and the exchange of goods and/or services for something else (e.g., Person A exchanges a specific amount of money with Person B for some services provided by the latter). |
| Thing | Payment | A payment transaction or purchase transaction is a monetary transfer from a customer, client, or consumer, in exchange for goods or services provided by a merchant. |
| Thing | Financial Instrument / Security | A written contract that, when traded, confers an ownership position (equity) or a creditor relationship (debt). Or, it can also mean a derivative contract (option, future, swap, etc.) that is a fungible representation of some type of financial value. |
| Thing | Position | An investor's stake, i.e., a holding, in a particular asset (such as an individual security). |
| Thing | Deal | An agreement to buy or sell an Instrument or to enter into a _Contract_ with specified terms.  May include offerings to raise debt, equity or other sources of capital through Corporate Banking, Debt Capital Markets or Equity Capital Markets functions.  Types of deals include IPOs, secondary offers and investment-grade bond offerings. |

- **Project:**  
    The encapsulation of the work to integrate data and transform it to create a Golden Record for a specific Entity Type - using the _Resolve_ module. For example, you may want to integrate 5 data sets and delete duplication of data associated with the Entity Name: Individual that falls under the Entity Type: Person. Let’s suppose that in your use case, ‘Entity Name: Individual’ refers to individual customers. So here, the project is the act of creating Golden Records of your customers - using the Resolve module.  
      
    Similarly, a Project can also refer to the act of integrating 5 other data sets and resolving duplication of mortgage contract data. Each work effort can be managed within a Fluree Sense Project.

- **Entity Resolution (“Matching”):**  
    The act of scanning multiple records and multiple attributes within those records and determining whether those records are referring to the same _Entity_, regardless of whether there are any matching keys or consistent data between them. Typically, the function of these processes is based on fuzzy matching (e.g., “Steve” is similar to “Steven”), but Entity Resolution systems look at a vast number of attributes. For instance, based on the attributes, the Entity Resolution system has to decide whether records with the same names, but different addresses are referring to the same _Entity_ or not.

- **Golden Record:**  
    The master record comes out as a result of synthesizing data from multiple records together into one composite record - having no duplication - that has the best of all worlds.

- **Unsupervised Model:**  
    A model that runs without the need for human feedback. It can also be referred to as an untrained model. The _Resolve_ module uses unsupervised models to trigger both Entity Resolution (i.e., matching) and Golden Record creation (i.e., merging). Typically, unsupervised models generate an accuracy of at least 60%. Based on the quality of the data sources, the model results can be higher.

- **Supervised Model:**  
    A model that learns based on human feedback (the act of training the model). Once the unsupervised matching and merging models run, _Resolve_ generates training cases with specific conditions and scenarios that will allow the supervised model to learn the fastest. Each time the supervised model is run, it collects feedback, recalibrates the model and runs on the data. The accuracy should improve between the initial Unsupervised run and the first Supervised run. You can keep iterating and running through the Supervised Training loop until the accuracy stops making incremental improvements.

- **Task:**  
    In the _Resolve_ module, system-generated training cases are set up as Project Tasks. Tasks can be assigned to individuals who are entitled to access a Project. Tasks can be reviewed and then independently approved by a separate qualified approver based on how you configure the system.
