import { defineUserConfig } from "vuepress";
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'


import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
    },
    "/br/": {
      lang: "br",
    },
  },

  plugins: [
    slimsearchPlugin({
      // options
      indexContent: true,
      customFields: [
        {
          name: 'description',
          getter: (page) => page.frontmatter.description,
          formatter: 'Description: $content',
        },
      ],
      hotKeys: [
        {
          key: "k",
          meta: true,
        },
      ],
    }),
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});

