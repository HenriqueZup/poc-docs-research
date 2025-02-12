<template>
  <div>
    <!-- Botão de busca -->
    <orama-search-button
      label="Search something..."
      size="large"
      @click="openSearchBox"
    ></orama-search-button>

    <!-- Caixa de busca -->
    <orama-search-box
      v-if="isSearchBoxOpen"
      :index="indexConfig"
      :result-map="resultMap"
      :sources-map="sourcesMap"
      :suggestions="chatSuggestions"
      @close="closeSearchBox"
    ></orama-search-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSearchBoxOpen: false,
      indexConfig: {
        endpoint: 'https://cloud.orama.run/v1/indexes/henrique-stk-poc-vuepress-netlify-app-i1ru8k',
        api_key: '1HMcb8uJAebYgoI6doXYx7UcbxtY4KRX',
      },
      resultMap: {
        title: 'name',
        description: 'content',
        section: 'category',
      },
      sourcesMap: {
        title: 'name',
        description: 'content',
        path: 'url',
      },
      chatSuggestions: [
        'How to use the Chat Box?',
        'What is the Chat Box component?',
        'How to integrate the Chat Box in my website?',
      ],
    };
  },
  methods: {
    openSearchBox() {
      this.isSearchBoxOpen = true;
    },
    closeSearchBox() {
      this.isSearchBoxOpen = false;
    },
  },
};
</script>