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
    [
      "script",
      {},      
       ` <script>
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/stkpocvuepressthemehopenetlifyapp.matomo.cloud/container_aV0gfOSt.js'; s.parentNode.insertBefore(g,s);
          })();
        </script>`
        ,
    ],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});

