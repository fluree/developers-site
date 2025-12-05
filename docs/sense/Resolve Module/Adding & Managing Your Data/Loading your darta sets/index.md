---
title: Loading Your Data Sets
sidebar_position: 3
---

# Loading Your Data Sets

First, the users must ensure that data is available to add to a Resolve Project. They can directly upload CSV files, only up to 25 MB, into the default Data Source in the case of default Sandboxes also called Tenants. In a full deployment, the users can connect to live Data Sources and register multiple types of Data Sets, such as CSV, delimited File, Parquet, Delta, AVRO, etc. In addition, the users can change the File Upload Size restriction as per their needs.


Follow the steps below to upload data into your Sandbox area:

![Dataset List](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/3_dataset_list-1.png)
**Step 1. Go to Data Sets:** Click on the Data Set icon in the Navigation Bar.

**Step 2. Create New Data Sets:** Click on the Create New Datasets button at the top of the screen. It will trigger the workflow to register new Data Sets enabling you to define and describe them. The functionality will only provide access control to the desired users in the user environment who can see them.

![Create Dataset Step 2](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/4_dataset_create_step2-copy.jpg)

**Step 3. Select Data Source:** The panel on the left displays all available Data Sources previously registered. There will only be one Data Source in the Sandbox environment by default. Once the users select the Data Source from the list, it will get highlighted in blue, and the right panel will display all files that have been previously uploaded into that source. The user will see a few sample files in the Sandbox environment for selecting data.

**Step 4: Upload New File.** By default, the Upload New File button will be disabled until a Data Source is selected. After selecting the Data Source, click on Upload New File and follow the instructions to drag or upload a local file and add it to the Data Source.

**Step 5. Select File [s]:** Once the File is uploaded, it will appear on the Data Tables / Files List on the right panel. The uploaded File will be selected with a checkbox. The user can select one or more files to register as Data Sets.

**Step 6. Go to the Next screen:** Once at least one File is selected, the Next Step button will get activated, taking you to the Define Data Sets screen. Select one or more files and click Next Step.

![Define Data Sets Screen](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/5_dataset_create_step6-1.png)

**Step 7. Define Data Sets:** Enter the following details about your uploaded files, then click **Next Step** once it becomes active:

- **Name**  
  Provide a meaningful display name for the Data Set.  
  The system assigns a default name, but you can edit it.

- **Description (Optional)**  
  Briefly describe the contents of the file so others understand the data.

- **File Type**  
  Select the appropriate type from the dropdown.  
  In the Sandbox, only CSV is available.  
  In full deployments, options like Parquet, Delta, or AVRO are supported.  
  You can also use **Automatically Detect** to let the system infer schema and data type.

- **Delimiter**  
  Defines the delimiter (defaults to comma for CSV).  
  Not required for Parquet or Delta files.

- **Header Row Included**  
  Check this option if the file includes a header row.  
  If not, manually define the schema in the **Schema** field.

- **Schema**  
  Input JSON schema values here.  
  (Note: Header row takes precedence if selected.)


**Step 8. Add User Entitlements:** Here, you can define which users can access the data set.  
By default, you can select a **Group** from your Tenant environment.
Once a group is selected, click **View Users** to display all members in the right panel.  
You can assign one of the following **roles**:

- **Admin:** Full control, including data access and settings.  
- **Read Only:** Can only view data samples and profiles.  
- **Read/Write:** Can modify properties like name or profile sample size but cannot change entitlements.

Click **Next Step** when done.

![User Entitlements](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/6_dataset_entitlements-1.png)

**Step 9. Set the Refresh Schedule:** Here, users can configure the data refresh frequency or profile generation schedule. In a live deployment, users can pull live data at defined intervals.  
However, in the trial version, scheduling is disabled. Once done, click Save and Close to register the Data Set and trigger profile creation.The registered information becomes available when creating a new project.

![Dataset Scheduler](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/7_dataset_scheduler_step_final-1.png)
