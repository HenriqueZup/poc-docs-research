import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, ptNavbar } from "./navbar/index.js";
import { enSidebar, ptSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "henrique-stk-poc-vuepress.netlify.app",

  logo: "/assets/image/stackspot-ai-light.svg",
  logoDark: "/assets/image/stackspot-ai-dark.svg",

  navbarLayout: {
    start: ["Brand"],
    //center: ["Links"],
    end: ["Links", "Language", "Repo", "Outlook", "Search"], // "Links" foi adicionado para exibir no esquerda da navbar.
  },

  darkmode: "toggle",

  docsDir: "src",

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: '<footer><picture><img src="/assets/image/logo-light-footer.svg" alt="Logo StackSpot"></picture><p>© 2022 StackSpot. All rights reserved</p></footer>',

      displayFooter: true,

      // blogLocales: {
      //   article: "/release/",
      //   release: "Release Notes",
      // },

      // metaLocales: {
      //   editLink: "Edit this page on GitHub",
      // },
    },

    /**
     * Portuguese locale config
     */
    "/br/": {
      // navbar
      navbar: ptNavbar,

      // sidebar
      sidebar: ptSidebar,

      footer: '<footer><picture><img src="/assets/image/logo-light-footer.svg" alt="Logo StackSpot"></picture><p>© 2022 StackSpot. Todos os direitos reservados</p></footer>',

      displayFooter: true,

      // page meta
      // metaLocales: {
      //   editLink: "在 GitHub 上编辑此页",
      // },
    },
  },

  blogLocales: {
    release: "Release Notes",
  },

  blog: {
    sidebarDisplay: "mobile",
  },

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": {
  //       hint: "Password: 1234",
  //       password: "1234",
  //     },
  //     "/zh/demo/encrypt.html": {
  //       hint: "Password: 1234",
  //       password: "1234",
  //     },
  //   },
  // },

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // comment: {
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    // },

    // search: {
    //   locales: {
    //     '/': {
    //       placeholder: 'Search...',
    //     },
    //     '/br/': {
    //       placeholder: 'Buscar...',
    //     },        
    //   },
    //   hotKeys: [
      
    //   ],

    // docsearch: {
    //   appId:"DLA8CH4FAG",
    //   apiKey: "3d1c2f136e87162a759c83fc677f02d1",
    //   indexName: "stk_index",
    //   locales: {
    //     '/': {
    //       placeholder: 'Search Documentation',
    //       translations: {
    //         button: {
    //           buttonText: 'Search Documentation',
    //         },
    //       },
    //     },
    //     '/br/': {
    //       placeholder: 'Buscar na Documentação',
    //       translations: {
    //         button: {
    //           buttonText: 'Buscar na Documentação',
    //         },
    //       },
    //     },
    //   },


    // },
    
    sitemap: true, 

    blog: {
      type: [
        {
          key:"release",
          //path: "/release/",
          filter: (page) => page.frontmatter.description.startsWith("Release Notes"), 
          sorter: (pageA, pageB) => {
            const dateA = new Date(pageA.filePathRelative?.match(/(\d{4}-\d{2}-\d{2})/)?.[0] || 0);
            const dateB = new Date(pageB.filePathRelative?.match(/(\d{4}-\d{2}-\d{2})/)?.[0] || 0);
            return dateB.getTime() - dateA.getTime();
          },
          frontmatter: () => ({ 
            title: "Release Notes",
          }),
        },
        
      ],
    },

    components: {
      components: ["Badge", "VPCard","VPBanner",],
    },

    // icon: {
    //   prefix: "fa6-solid:",
    // },

    // Install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
