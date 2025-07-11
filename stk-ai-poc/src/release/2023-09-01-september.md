---
title: "September 23"
description: Release Notes
category:
  - Release Notes
---

> In this section, you will find reference of new StackSpot features & relevant changes in the documentation.

## **Features**

### **What's new?**

- [**New Insights Dashboard in the Studio**](/en/create-use/studio/insights)  

The Insights Dashboard offers a way to add or remove panels. You can also check graphs of entities such as Plugins and Stacks.

- [**Stacks Semantic Versioning**](/en/create-use/create-content/stack/stack-version)

Stack versioning is now semantic, the versions can evolve alone. See more details on the [**Stack Versioning page**](/en/create-use/create-content/stack/stack-version).  

- [**New Runtime Engine architecture**](/en/deployment/runtime-engine/intro-runtime-engine)  

The new architecture is an easier way to **deploy**, **destroy**, and **rollback** Applications and Infrastructures.

- You can configure environments during deployment.

- Connection Interfaces improvements on the platform.

Find more details on the pages below:

- [**Set Up**](/en/deployment/runtime-engine/getting-started-runtime).  
- [**Infrastructure Deployment**](/en/deployment/runtime-engine/deploy-infra).  
- [**Deploy Applications**](/en/deployment/runtime-engine/app-deployment).
- [**Use Private Repositories during a deployment**](/en/deployment/runtime-engine/private-repos).

- **New Plugin Version**  
In the Plugin v2, you can:

- Use more than one Connection Interface of the same type.

- Implement an Alias for Connection Interfaces and more.

- If you use the a Plugin v1, you need to migrate to v2. For more details [**check the migration guide**](/en/create-use/create-content/plugin/v2-migration-guide).  

- [**Creation of `app.yaml`**](/en/create-use/create-content/yaml-files)  
Also in v2 of the Plugins, there is now a new **`yaml`** file: **`app.yaml`**.

- [**Creation of `infra.yaml`** and **`app.yaml`**]
Another **`yaml`** file has also been created: **`infra.yaml`**.

> Disclaimer: [app.yaml and infra.yaml are now on **app-spec.yaml** and **infra-spec.yaml**](create-use/create-content/yaml-files/spec-file)

- [**New attributes in `plugin.yaml`**](/en/create-use/create-content/yaml-files/plugin-yaml) . 
With Plugin Deployment in v2, new attributes have been added to **`plugin.yaml`**.

- [**Create Dynamic Links**](/en/create-use/create-content/plugin/dynamic-links)  
Content creators can generate links that adjust to the current parameters of the application.  

- [**Create a feature to manage links in Applications and Infras**](/en/create-use/use-content/application/manage-links-in-app)  
You can integrate external tools in your Application or Infrastructure via Links. It can be static or embedded.

- New way to [**create Applications**](/en/create-use/use-content/application/create-app-portal) and [**Infrastructure**](/en/create-use/use-content/infra/infrastructure) on StackSpot Platform.

You have a new way to create Applications and Infrastructures in our Platform.

- [**New example to create Infrastructure and deploy via Plugins**](/en/home/stackspot/examples/app-and-infra/example-create-infra)
Check an example of how to create an Infrastructure and deploy via Plugins.

---

## **Documentation Changes**

- [**Documentation menu update**](https://docs.stackspot.com/en/)  
You'll see a new Create and Use Content menu. It makes it easier to navigate the StackSpot documentation.

- [**Service Catalog: A guided onboarding on the Partner access**](/en/service-catalog/partner-use/partners-on-catalog)  

Partners can check a guide with the available sections in the Service Catalog.

- [**Parameter update**](/en/create-use/create-content/plugin/v2-migration-guide)  
The **`--environment`** parameter has been changed to **`--env`** or **`-e`**.

- [**Updates on the STK CLI commands page**](/en/home/stk-cli/commands/index).
Improvements on the commands page. The command descriptions are up to date with the new platform changes.