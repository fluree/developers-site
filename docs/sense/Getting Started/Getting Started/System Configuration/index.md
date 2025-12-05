---
title: "System Configuration"
date: 2023-07-24
categories: 
  - "system-configuration"
  - "user-management"
tags: 
  - "catalog"
  - "data-set"
  - "data-source"
---

**Supported Platforms**

Fluree Sense is deployable On-Cloud and On-Premise. While we encourage On-Cloud deployments, some enterprises have an On-Premises deployment requirement, and we have plans and configurations to support such requirements.  
  
For On-Cloud deployment of the application, Azure, AWS, GCP or other cloud platforms, and VPS can be leveraged.

**Supported Data Sources**

Fluree Sense is quite flexible and allows different types of Data Sources and can take Data in form of CSV as well as files and from RDBMS Tables. Currently, Fluree Sense can support the following Data Sources:

1. Cloud Data Sources: Files Hosted on Azure or AWS

3. Hadoop as Data Source: Files Hosted on HDFS

5. RDBMS Data Sources: Such as PostgreSQL, MS SQL or MySQL

7. Snowflake Data Source

**Supported Browsers and Clients**

Fluree Sense is meant to be used on the Desktop and Laptop form-factor. You will not get the proper User experience and detailed analytics if you try to access the application on a tab or mobile so please make sure that you’re using Desktop or Laptop for viewing the application.

Currently the application supports the following browsers:

- Chrome

- Mozilla Firefox

- Edge

The application supports typical screen resolutions of 1200 x 720, 1366 x 768 , 1920 x 1080 at 100 % zoom.

1. **Licensing & Tenant Setup**

**Product Flavors & Licensing Options**  
Fluree Sense comes as a suite of 3 products with the maximum advantage obviously being derived from an integrated use of all 3. You may however wish to license only a specific product out of the three. These are:

a) **Fluree Sense Ingest:** Data Pipeline Management with in-built features for labeling, data quality and transformation rules.

b) **Fluree Sense Resolve:** Data De-duplication and Cleansing through Machine Learning to generate records of truth or ‘Golden Records’. Comes integrated with Data Quality Management as an optional add-on.  
  
c) **Fluree Sense Classify:** Data Discovery, mapping of business to physical data with collaborative management. Run Data Classification and Parsing Projects through Machine Learning. Comes integrated with Data Quality Management as an optional add-on.

Some features such as Data Set Management, Data Source Management, Monitoring System Jobs etc. are required by both _Resolve_ and _Classify_. Hence, they are available in both. Additionally, Data Quality Management is an Add-On which can be licensed along with _Resolve_ or _Classify_.

**Introduction to Tenants**

A Tenant is the sandbox environment available to businesses from where they can access their raw data and make full use of the _Ingest, Resolve_ or _Classify_ products.

**Useful Note:** Throughout our documentation, it should be understood that the scope of any object of any type being mentioned is within a specific Tenant, unless otherwise mentioned.

**Tenant Creation Process**

- Tenants are Created by System Admins through an internal process which may not involve the client.

- Through Tenant Creation, ‘Tenant Admin’ type users are also created which help you manage your Tenant and add more users to your tenant. We’ll look at User Management shortly.

- Default Users, Default Catalogs, Default Data Source, Default User group and Default Data Sets are also created automatically during tenant creation to provide some sample data and basic set-up.
