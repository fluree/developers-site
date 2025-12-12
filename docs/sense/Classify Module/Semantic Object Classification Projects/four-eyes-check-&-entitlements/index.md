---
title: "Four Eyes Check & Entitlements"
date: 2023-08-03
categories: 
  - "classify"
  - "entitlements-concept-parser"
tags: 
  - "data-set"
---

Let us look at the Four Eyes and Entitlement aspect of Step 2 of [Project Creation](/docs/sense/Classify%20Module/Concept%20Parser%20Projects/creating-a-project-initial-setup/index.md) in some more detail here.  
  
There are three types of roles in the system for any Project:

1. **Project Admin:** Project Administrators can make any modification to a project. This includes changing the quantity of data sets to include in the project, changing project user entitlements, re-running models or even deleting the Project. By default, the person creating the Project is in the Project Admin role.

2. **Reviewer:** This role provides 1st level feedback to a Training Task. It is mandatory to provide a Reviewer to a Resolve Project, and you can have more than one reviewer.

3. **Approver:** This role validates the feedback provided by the Reviewer. The System Administrator can set a parameter to determine whether independent Approvals (i.e., mandatory four-eye checks) are required.

A user can’t be assigned both Reviewer and Approver roles. The System will ensure that unique Reviewers and Approvers are assigned to individual tasks if the mandatory four-eye check option is enabled.

**System Validations**

1. If the four-eyes check is OFF (as shown in image), the approver column is disabled.

3. If the four-eyes is ON then at least 1 reviewer and at least 1 approver are required whereas if four-eyes check is OFF then at least 1 reviewer is required for Next Step to get enabled.

5. The user with the Admin role can’t be an approver or reviewer for Next Step to get enabled.

7. Each Project needs at least 1 user as Project Admin. There must be another Admin assigned before the logged-on user can be removed as Admin from the project.
