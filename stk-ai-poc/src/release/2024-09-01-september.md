---
title: "September 24"
description: Release Notes
category:
  - Release Notes
---

> In this section, you will find reference of new StackSpot features & relevant changes in the documentation.

<br/>

## **Features** 

### **Context Variables are now called Account Variables: Check out the differences and updates**

**Context Variables** are now called **Account Variables**, with changes that simplify the use and configuration of responses for Inputs within StackSpot.

#### **What are Account Variables?**

In StackSpot, **Account Variables** were created to make developers' work more accessible by reducing the repetition of responses for Inputs during the configuration of Stacks, Plugins, and Actions. These Variables are created and pre-configured by **Account Holders** or **Account Administrators** so that repetitive Input responses are not manually entered every time.

#### **Why use Account Variables?**

These variables allow the creation of a **friendly name** to reference reusable values across various parts of StackSpot, such as Plugins, Actions, Applications, and Infrastructures. It centralizes the management of these values, making updates fast and efficient.

#### **How do Account Variables work?**

Account Variables are interpolated in actions such as applying Plugins, executing Actions, creating Infrastructures and Workflows, and simplifying and automating operations within StackSpot.
This improvement aims to provide more flexibility and reduce errors, allowing you to quickly and efficiently configure responses throughout your StackSpot.

For more details, see the sections below:

- [**How to create Account Variables**](/en/home/account/organization/variables/create-variables)
- [**How to manage Account Variables**](/en/home/account/organization/variables/manage-variables)
- [**How to configure Account-level Context using Variables**](/en/home/account/organization/configure-context-account)
- [**How to configure Workspace-level Context using Variables**](/en/home/workspace/stacks-and-context/setup-context#configuring-context-values-using-account-variables)
- [**How to fill inputs with Variables when creating Plugins and Actions**](/en/create-use/create-content/variables)
- [**How to fill inputs with Variables when creating Applications and Infrastructures via the StackSpot EDP Portal**](/en/create-use/use-content/configure-inputs)
- [**How to fill inputs with Variables when creating Applications via STK CLI**](/en/create-use/use-content/application/create-app-cli)
- [**How to fill inputs with Variables when creating Infrastructures via STK CLI**](/en/create-use/use-content/infra/infrastructure)


### **Nunjucks Support for Jinja Expressions**

The **StackSpot Portal** now supports **Nunjucks**, a template engine that enhances Jinja expressions. This brings more flexibility to creating **Plugins** and **Actions**while keeping the familiar Jinja syntax (`{{ ... }}` for variables and `{% ... %}` for control structures). However, **Nunjucks does not support all Jinja features**, especially those relying on Python-native functionalities.

- **Example:** [**`computed-inputs`**](/en/create-use/create-content/yaml-files/advanced-inputs) in the Portal during Application or Infrastructure creation.

- **Compatibility:** Works both in the **CLI** and the **StackSpot Portal**.
To check for potential incompatibilities, [**use this `codepen`**](https://codepen.io/renanrodrigueszup/pen/XWLyvKB?editors=0011). More details in the [**official Nunjucks FAQ**](https://mozilla.github.io/nunjucks/faq.html#can-i-use-the-same-templates-between-nunjucks-and-jinja2-what-are-the-differences).


### **New Method for Configuring Single Sign-On (SSO) and New Group Mapping Feature:** How you configure SSO in your account has been updated. Changes include the form submission process and the configuration of Group Mapping.

Learn more about the changes and the new feature at:

- [**Configure SSO**](/en/home/account/organization/sso-group-mapping/sso-configuration)
- [**Group Mapping**](/en/home/account/organization/sso-group-mapping/group-mapping)

## **STK CLI: v6.20.0** {#stk-cli-v6-20-0}

- Added support for account variables.
- New feature to test Starters, now with support for the **`required-connection`** input type.
- Bug fixes and internal improvements.

<br/>