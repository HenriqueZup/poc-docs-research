import { navbar } from "vuepress-theme-hope";

export const ptNavbar = navbar([
  {
    text: "StackSpot AI CookBook",
    icon: "/assets/icon/Book.svg",
    prefix: "/br/",
    children: [
      {
        text: "Release Notes",
        icon: "/assets/icon/Tag.svg",
        link: "/br/article/",
      },
      {
        text: "Contents",
        icon: "/assets/icon/QuickCommand.svg",
        link: "/br/troubleshooting.md" 
      },
    ],
  },
]);
