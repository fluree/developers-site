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

**Step 7. Define Data Sets:** Enter the following details about the file[s] and select the Next Step button when activated.

- **Name**  
 Provide the Display Name of the Data Set. The system will assign default names to the file[s] or Data Set, but the user can change them to a more understandable display name.

- **Description (Optional)**  
  The user can briefly describe the file’s content so that others can understand what is in the data set.

- **File Type**  
  Select CSV from the drop-down (limited for Sandbox Trial Users). In the complete solution, the user can select from various options based on the type of file uploaded. The user can also click the Automatically Detect button and have the system scan a few sample rows from the file and detect the data type and schema.

- **Delimiter**  
  Define the Delimiter associated with the file. If the file type Is CSV, it will default to Comma. If the file type Is Parquet or Delta, then specifying a delimiter is not needed.

- **Header Row Included**  
  It must be checked if the file has a header row. If the file does not have a header row, fill the Schema box to the right.

- **Schema**  
  Put the JSON values in this text box (NOTE: if the Header Row is selected, it will take precedence)
Once those values have been entered, the Next Step button will be activated.
![User Entitlements](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/6_dataset_entitlements-1.png)

**Step 8. Add User Entitlements:** The user can define which other users can access the data set from this screen. There will be a Default group which you can select from the Tenant environment.
Once the user selects a group, they will click the View Users button. It will display all Users in the selected Group in the right panel. From there, the user can choose from one of three roles to control data access:

- **Admin:** The admin has full rights to change data access control entitlements and any settings associated with the Data Set.  
- **Read Only:** In this mode, one can only view data samples and profiles but does not have the right to change any Data Set properties.
- **Read/Write:** Can change other data set properties, such as names and profile sample size, but cannot change data set entitlements.

Once the permissions are updated, click on the Next Step button.

![Dataset Scheduler](https://sensedocsdev.wpengine.com/wp-content/uploads/2023/05/7_dataset_scheduler_step_final-1.png)

**Step 9. Set the Refresh Schedule:** In this section, the user can configure the number of data sets to run a profile. If the Source was live (e.g., a live connection to a database or NoSQL source), the user could optionally schedule the frequency to refresh the data set by pulling live data from the Source. In the trial version, profile and data refresh scheduling will be disabled. Once the user clicks on the Save and Close button, the system will register the Data Set and trigger the creation of the data profile. This information will then be available when the user creates a new project.

