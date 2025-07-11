---
title: "Setembro 23"
description: Release Notes
---
## Features  

### **O que há de novo?**

- [**Novo Dashboard de Insights no Estúdio**](/create-use/studio/insights)
Agora o Dashboard de Insights traz a opção de adicionar ou remover painéis, e navegar por gráficos de entidades como Plugins e Stacks.

- [**Nova arquitetura de Runtime Engine**](/deployment/runtime-engine/intro-runtime-engine)  
A nova arquitetura facilita o **deploy**, **destroy** e **rollback**, tanto de Aplicações quanto de Infraestruturas. Além disso, agora Runtime disponibiliza a configuração de ambientes durante o deploy e melhora o uso de Connection Interfaces na plataforma. Saiba mais detalhes nas seguintes páginas:

  - [**Configuração Inicial**](/deployment/runtime-engine/getting-started-runtime).  
  - [**Deploy de uma Infraestrutura**](/deployment/runtime-engine/deploy-infra).  
  - [**Deploy de Aplicação**](/deployment/runtime-engine/app-deployment).  
  - [**Usar Repositórios Privados durante o deploy**](/deployment/runtime-engine/private-repos)

- [**Versionamento Semântico de Stacks**](/create-use/create-content/stack/stack-version)
Agora o versionamento de Stacks é do tipo Semântico. Isso significa que versões pode evoluir de forma independente. Confira mais detalhes na página de Stacks e Versionamento de Stacks.

- [**Nova versão de Plugins**](/create-use/create-content/plugin/v2-migration-guide)  
Na v2 dos Plugins é possível usar mais de uma Connection Interface do mesmo tipo, Implementação de Alias (apelidos) para as Connection Interfaces e mais. Confira os detalhes [**no guia de migração de Plugin v1 para v2**](/create-use/create-content/plugin/v2-migration-guide).  

- **Criação de `app.yaml`**
Ainda na v2 dos Plugins, agora há um novo arquivo **`yaml`**: o **`app.yaml`**.

- **Criação de `infra.yaml`**
Outro arquivo **`yaml`** também foi criado: o **`infra.yaml`**. 

> Atenção: [app.yaml e infra.yaml agora são **app-spec.yaml** and **infra-spec.yaml**](create-use/create-content/yaml-files/spec-file.md)

- [**Novos atributos no `plugin.yaml`**](/create-use/create-content/yaml-files/plugin-yaml)  
Com o Deploy por Plugin na v2, novos atributos foram adicionados no **`plugin.yaml`**.  

- [**Criação de Links Dinâmicos**](/create-use/create-content/plugin/dynamic-links)
Os criadores de conteúdo na StackSpot podem gerar Links que se ajustam automaticamente aos parâmetros atuais da Aplicação.

- [**Criação de feature de gerenciar links em Aplicações e Infraestruturas**](/create-use/use-content/application/manage-links-in-app)  
Agora você pode integrar ferramentas externas a uma Aplicação ou Infraestrutura por meio de Links. Podem ser estáticos ou incorporados. Confira mais detalhes na [**seção sobre Links**](/create-use/use-content/application/manage-links-in-app).

- Nova forma para [**criar Aplicações**](/create-use/use-content/application/create-app-portal) e [**Infraestrutura**](/create-use/use-content/infra/infrastructure.md) no Portal.
Agora é possível fazer deploy por Plugin na StackSpot. E você pode seguir uma nova jornada de criação de Aplicações e Infraestruturas no Portal.

- [**Exemplo de criação de Infraestrutura com Deploy por Plugin**](/home/stackspot/examples/app-and-infra/example-create-infra)  
Confira um exemplo do início ao fim para criar uma Infraestrutura fazendo o Deploy por Plugin.

---

- [**Atualização no menu da documentação**](https://docs.stackspot.com/)  
Você verá um novo menu de Criar e Usar Conteúdo. A mudança veio para facilitar a navegação na documentação da StackSpot.

- [**Onboarding guiado de acesso de Parceiros no Catálogo de Serviços**](/service-catalog/partner-use/partners-on-catalog)
Os Parceiros têm acesso a um guia que apresenta todas as seções disponíveis no Catálogo de Serviços.

- [**Atualização no parâmetro `--environment`**](/create-use/create-content/plugin/v2-migration-guide)  
O parâmetro **`--environment`** foi alterado para **`--env`** ou **`-e`**.

- [**Atualizações na página e nos comandos do STK CLI**](/home/stk-cli/commands)  
A página de comandos passou por uma nova organização, que melhora a visibilidade e rastreabilidade dos comandos. As descrições dos comandos também foram atualizadas para refletirem todas as mudanças realizadas para suportar as novas funcionalidades da plataforma.
