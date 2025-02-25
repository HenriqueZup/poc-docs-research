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
       ` <!-- Matomo -->
          <script>
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://stkpocvuepressthemehopenetlifyapp.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/stkpocvuepressthemehopenetlifyapp.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          </script>
          <!-- End Matomo Code -->`
        ,
    ],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});

