import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {
    text: "StackSpot AI CookBook",
    icon: "/assets/icon/QuickCommand.svg",
    prefix: "/quick-commands/",
    children: [
      {
        text: "Test toggle menu link1",
        icon: "/assets/icon/StackSpot.svg",
        link: "quick-command.md",
      },
      {
        text: "Test toggle menu link2",
        icon: "/assets/icon/QuickCommand.svg",
        link: "configure-collection.md" 
      },
    ],
  },
]);
