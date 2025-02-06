import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  {
    text: "StackSpot AI CookBook",
    icon: "/assets/icon/StackSpot.svg",
    prefix: "/stackspot-ai/",
    children: [
      {
        text: "Bar",
        icon: "/assets/icon/StackSpot.svg",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "/assets/icon/StackSpot.svg",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
]);
