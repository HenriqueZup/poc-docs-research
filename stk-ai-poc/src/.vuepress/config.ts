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
      `\        
        <!-- Matomo -->
        <script>
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(["setCookieDomain", "*.stkpocvuepressthemehope.netlify.app"]);
          _paq.push(["setDomains", ["*.stkpocvuepressthemehope.netlify.app"]]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//localhost:8080/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        </script>
        <noscript><p><img referrerpolicy="no-referrer-when-downgrade" src="//localhost:8080/matomo.php?idsite=1&amp;rec=1" style="border:0;" alt="" /></p></noscript>
        <!-- End Matomo Code -->
      `,
    ],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});

