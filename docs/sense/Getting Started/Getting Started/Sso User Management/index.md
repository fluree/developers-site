---
title: "SSO User Management"
date: 2023-07-24
categories: 
  - "default"
  - "sso-user-management"
---

In the above sections, we’ve covered adding users from the UI or import. A user basically represents an identity and _Fluree Sense_ supports SSO based identification. This is configured during Tenant Setup by the System admin where the email is taken as the identity of the user as defined through Windows Active Directory.

Once the Tenant has been configured to be the one which uses SSO, the new users are also added according to a slightly modified mechanism – which considers **their** SSO identities.

These modifications are seen during the following:

1. During _Tenant_ Creation: The System Admin chooses the SSO option while creating the _Tenant_.

3. Adding _Tenant Admin_.

5. Adding / Managing New Users to the _Tenant_

There are other impacts as well on Group management, but we will cover these in detail in the coming days.
