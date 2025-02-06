import { navbar } from "vuepress-theme-hope";

export const ptNavbar = navbar([
  {
    text: "StackSpot AI CookBook",
    icon: "/assets/icon/StackSpot.svg",
    prefix: "/br/stackspot-ai/",
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
