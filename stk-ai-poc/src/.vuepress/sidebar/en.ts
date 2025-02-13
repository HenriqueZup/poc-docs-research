import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar([

        {
          text: "StackSpot AI",
          icon: "/assets/icon/StackSpot.svg",
          prefix: "/stackspot-ai/",
          expanded: true,
          children: [
            "about.md",
            "get-started.md",
            "concepts.md", 
            "extensions.md",
            "ide-usage.md",
            "coming-soon.md",          
    
          ],
        },
        {
          text: "Agents",
          icon: "/assets/icon/Agent.svg",
          prefix: "/agents/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "Knowledge Sources",
          icon: "/assets/icon/ServerNode.svg",
          prefix: "/knowledge-source/",
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
          prefix: "/quick-commands/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "Resources",
          icon: "/assets/icon/Resources.png",
          prefix: "/resources/",
          collapsible: true,
          expanded: false,
          children: "structure",
        },
        {
          text: "Troubleshooitng",
          link: "troubleshooting.md",
          icon: "/assets/icon/InfoCircle.svg",
        },
        {
          text: "Release Notes",
          icon: "/assets/icon/Tag.svg",
          link: "/release/",    
        },
        {
          text: "Features",
          icon: "/assets/icon/Resources.png",
          prefix: "/features/",
          collapsible: true,
          expanded: false,
          children: [
            
          ],
        },
    
]);
