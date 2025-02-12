import { defineUserConfig } from "vuepress";
import markdownItAnchor from 'markdown-it-anchor';
import oramaSearchPlugin from "./plugins/vuepress-plugin-orama-search/vuepress-plugin-orama-search.js";


import theme from "./theme.js";
import { hopeTheme, navbar } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",

  theme: hopeTheme(
    {
      custom:true,
    },
  ),

  locales: {
    "/": {
      lang: "en-US",
    },
    "/br/": {
      lang: "br",
    },
  },

  extendsMarkdown: (md) => {
    md.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({
        safariReaderFix: true, // Adiciona um fix para evitar problemas de renderização
        class: "custom-header-anchor", // Classe personalizada para evitar conflitos
      }),
    });
  },

  plugins: [
    oramaSearchPlugin({
      endpoint: "https://cloud.orama.run/v1/indexes/henrique-stk-poc-vuepress-netlify-app-i1ru8k",
      apiKey: "1HMcb8uJAebYgoI6doXYx7UcbxtY4KRX",
    }),
  ],

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
