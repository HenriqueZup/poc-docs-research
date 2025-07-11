import { sidebar } from "vuepress-theme-hope";

export const ptSidebar = sidebar({
  "": [
    {
      text: "StackSpot AI",
      icon: "/assets/icon/StackSpot.svg",
      prefix: "/br/stackspot-ai/",
      expanded: true,
      children: [
        "about.md",
        "get-started.md",
        "concepts.md", 
        "extensions.md",
        "ide-usage.md",
        "coming-soon", 
      ],
    },
    {
      text: "Agentes",
      icon: "/assets/icon/Agent.svg",
      prefix: "/br/agents/",
      collapsible: true,
      expanded: false,
      children: "structure",
    },
    {
      text: "Knowledge Sources",
      icon: "/assets/icon/ServerNode.svg",
      prefix: "/br/knowledge-source/",
      collapsible: true,
      expanded: false,
      children: [
        "ks.md",
        "create-knowledge-source.md",
        "add-knowledge-source-workspace.md",
        "update-knowledge-source.md",
        "create-update-via-api.md",
        "ks-default.md",  
        "manage-knowledge-source.md",
      ],
    },
    {
      text: "Quick Commands",
      icon: "/assets/icon/QuickCommand.svg",
      prefix: "/br/quick-commands/",
      collapsible: true,
      expanded: false,
      children: "structure",
    },
    {
      text: "Recursos",
      icon: "/assets/icon/Resources.png",
      prefix: "/br/resources/",
      collapsible: true,
      expanded: false,
      children: "structure",
    },
    {
      text: "Troubleshooitng",
      link: "/br/troubleshooting.md",
      icon: "/assets/icon/InfoCircle.svg",
    },
    {
      text: "Release Notes",
      icon: "/assets/icon/Tag.svg",
      link: "/br/release/",    
    },
  ],
});
