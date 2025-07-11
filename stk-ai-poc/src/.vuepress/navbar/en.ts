import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {
    text: "StackSpot AI CookBook",
    icon: "/assets/icon/Book.svg",
    prefix: "/",
    children: [
      {
        text: "Release Notes",
        icon: "/assets/icon/Tag.svg",
        link: "/article/",
      },
      {
        text: "Contents",
        icon: "/assets/icon/QuickCommand.svg",
        link: "troubleshooting.md" 
      },
    ],
  },
]);
