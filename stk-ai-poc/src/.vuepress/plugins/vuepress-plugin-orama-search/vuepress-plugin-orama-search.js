import { OramaClient } from "@oramacloud/client";

const oramaSearchPlugin = (options) => ({
  name: "vuepress-plugin-orama-search",
  clientConfigFile: (app) => {
    // Retorna o caminho para o arquivo de configuração do cliente
    return app.dir.source(".vuepress/plugins/vuepress-plugin-orama-search/client.js");
  },
  onPrepared: async (app) => {
    // Configuração do cliente Orama
    const clientConfig = `
      import { OramaClient } from "@oramacloud/client";
      export const oramaClient = new OramaClient({
        endpoint: "${options.endpoint}",
        api_key: "${options.apiKey}",
      });
    `;
    // Salva o cliente Orama em um arquivo para ser usado no lado do cliente
    await app.writeTemp("plugins/vuepress-plugin-orama-search/client.js", clientConfig);
  },
});

export default oramaSearchPlugin;