---
title: "Setembro 24"
description: Release Notes
---

> Nesta seção, você encontra: Referência das novas features da StackSpot & alterações relevantes na documentação.

<br/>

## **Features** 

### **Variáveis de Contexto agora se chamam Variáveis da Conta: confira as diferenças e novidades**

As **Variáveis de Contexto** agora são chamadas de **Variáveis da Conta**, com mudanças que simplificam o uso e a configuração de respostas para Inputs dentro da StackSpot.

#### **O que são as Variáveis da Conta?**

Na StackSpot, as **Variáveis da Conta** foram criadas para facilitar o trabalho dos desenvolvedores ao reduzir a repetição de respostas para Inputs durante a configuração de Stacks, Plugins e Actions. Essas Variáveis são criadas e pré-configuradas pelos **Account Holders** ou **Administradores da Conta** para que as respostas repetitivas para Inputs não precisem ser inseridas manualmente toda vez.

#### **Por que usar Variáveis da Conta?**

Essas variáveis permitem a criação de um **nome amigável** para referenciar valores reutilizáveis em várias partes da StackSpot, como Plugins, Actions, Aplicações e Infraestruturas. Isso centraliza a gestão desses valores, tornando atualizações rápidas e eficientes.

#### **Como as Variáveis da Conta funcionam?**

As Variáveis da Conta são interpoladas em ações como a aplicação de Plugins, execução de Actions, criação de Infraestruturas e Workflows, simplificando e automatizando as operações dentro da StackSpot.
Essa melhoria visa proporcionar mais flexibilidade e evitar erros, permitindo que você configure respostas de maneira rápida e eficiente em toda a sua StackSpot.

Para mais detalhes, confira as seções: 

- [**Como criar Variáveis da Conta**](/home/account/organization/variables/create-variables)
- [**Como gerenciar Variáveis da Conta**](/home/account/organization/variables/manage-variables)
- [**Como configurar Contexto a nível de Conta utilizando Variáveis**](/home/account/organization/configure-context-account)
- [**Como configurar Contexto a nível de Workspace utilizando Variáveis**](/home/workspace/stacks-and-context/setup-context#configurar-valores-de-contexto-utilizando-variáveis-da-conta)
- [**Como preencher inputs com Variáveis na criação de Plugins e Actions**](/create-use/create-content/variables)
- [**Como preencher inputs com Variáveis na criação de Aplicações e Infraestruturas via Portal StackSpot EDP**](/create-use/use-content/configure-inputs)
- [**Como preencher inputs com Variáveis na Criação de Aplicações via STK CLI**](/create-use/use-content/application/create-app-cli)
- [**Como preencher inputs com Variáveis na Criação de Infraestruturas via STK CLI**](/create-use/use-content/infra/infrastructure)

### **Suporte a Nunjucks para Expressões Jinja**

Agora o **Portal da StackSpot** suporta **Nunjucks**, uma engine de templates que amplia as capacidades das expressões Jinja. Isso permite maior flexibilidade na criação de **Plugins** e **Actions**, mantendo a familiaridade com a sintaxe Jinja (**`{{ ... }}`** para variáveis e **`{% ... %}`** para controle de fluxo). No entanto, **Nunjucks não oferece todos os recursos do Jinja**, especialmente aqueles que dependem de funcionalidades nativas do Python.

- **Exemplo de uso:** [**`computed-inputs`**](/create-use/create-content/yaml-files/advanced-inputs) no Portal durante a criação de Aplicações ou Infraestruturas.

- **Compatibilidade:** funciona tanto na **CLI** quanto no **Portal da StackSpot**.

Para verificar possíveis incompatibilidades, [**utilize este `codepen`**](https://codepen.io/renanrodrigueszup/pen/XWLyvKB?editors=0011). Para mais detalhes, confira o [**FAQ oficial do Nunjucks**](https://mozilla.github.io/nunjucks/faq.html#can-i-use-the-same-templates-between-nunjucks-and-jinja2-what-are-the-differences).


### **Nova forma de configurar Single Sign-On (SSO) e nova funcionalidade de Mapeamento de Grupos:** 

A configuração do SSO na sua conta foi atualizada. Entre as mudanças, estão o preenchimento dos formulários e a configuração do Mapeamento de Grupos.

Confira mais detalhes sobre as mudanças e a nova funcionalidade em:

- [**Configurar SSO**](/home/account/organization/sso-group-mapping/sso-configuration)
- [**Mapeamento de Grupos**](/home/account/organization/sso-group-mapping/group-mapping)

## **STK CLI: v6.20.0** {#stk-cli-v6-20-0}

- Suporte adicionado para variáveis de conta.
- Nova feature para testar Starters, agora com suporte ao input do tipo **`required-connection`**;.
- Correções de bugs e melhorias internas.

<br/>