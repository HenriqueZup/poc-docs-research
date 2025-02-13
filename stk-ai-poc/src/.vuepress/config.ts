import { defineUserConfig } from "vuepress";

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

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});

