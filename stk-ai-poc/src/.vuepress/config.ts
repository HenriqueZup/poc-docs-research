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

  head: [
    
    ["script", { async: true,  src: "https://cdn.matomo.cloud/stkpocvuepressthemehopenetlifyapp.matomo.cloud/container_aV0gfOSt.js" }],
    
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});

