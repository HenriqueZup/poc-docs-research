import { OramaClient } from "@oramacloud/client";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";

const oramaSearchPlugin = (options) => ({
  name: "vuepress-plugin-orama-search",
  clientConfigFile: (app) => {
    // Retorna o caminho para o arquivo de configuração do cliente
    return app.dir.source(".vuepress/plugins/vuepress-plugin-orama-search/client.js");
  },
  onPrepared: async (app) => {
    // Configuração do cliente Orama
    const client = new OramaClient({
      endpoint: options.endpoint,
      api_key: options.apiKey,
    });

    // Salva o cliente Orama em um arquivo para ser usado no lado do cliente
    const clientConfig = `
      import { OramaClient } from "@oramacloud/client";
      export const oramaClient = new OramaClient({
        endpoint: "${options.endpoint}",
        api_key: "${options.apiKey}",
      });
    `;
    await app.writeTemp("plugins/vuepress-plugin-orama-search/client.js", clientConfig);
  },
  extendsMarkdown: (md) => {
    // Adicione extensões de markdown, se necessário
    md.use(markdownItAnchor);
    md.use(markdownItTocDoneRight);
  },
});

export default oramaSearchPlugin;