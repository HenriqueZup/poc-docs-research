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

    },
  },

  blogLocales: {
    release: "Release Notes",
  },

  blog: {
    sidebarDisplay: "mobile",
  },

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

    slimsearch: {
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
    },

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
  },
});
