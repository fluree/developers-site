---
title: "Default Catalogs"
date: 2023-05-18
categories: 
  - "default-catalogs"
  - "resolve"
tags: 
  - "catalog"
---

Whenever a dedicated environment called _Tenant_ is created, the system creates a _Default Catalog_ for the _Resolve_ module. Remember, the module should be licensed for the workflow to continue optimally. A _Catalog_ can be compared to a business dictionary, a glossary, or a key-value store. It contains the business entities and their attributes. The system further maps the business entities and their attributes to datasets and dataset columns, respectively.  
  
You will learn more about _Catalogs_ in detail as we discuss the use cases for another Fluree module: _Classify_. But for the purpose of _Resolve_, it is important to note that a default blank _Catalog_ is provided with the product. We also have the _FlureeSense System Catalog,_ which already contains a set of entities and their attributes. However, this catalog is different from _Default Catalog_ because instead of a blank slate, it contains a predefined sample data dictionary .  
  
In summary, the _Default Catalog_ allows the user to create and store their data dictionary or vocabulary as entities and their attributes, even if they don’t have _Classify_ License.  
  
Please note that though we don’t need _Catalogs_ for resolving data quality or duplication issues, we do need _Entities_. These _Entities_ (or _Semantic Objects_ as they’re called in _Classify_ ) need to reside in _Catalogs_, i.e., their data dictionary.
