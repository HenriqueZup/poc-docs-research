<script setup>
import { onMounted } from "vue";
import { oramaClient } from "@temp/plugins/vuepress-plugin-orama-search/client";

onMounted(() => {
  // Inicialize a busca com o cliente Orama
  oramaClient.init();
});
</script>

<template>
  <div class="orama-search">
    <input
      type="text"
      placeholder="Search..."
      @input="oramaClient.search($event.target.value)"
    />
    <div class="search-results">
      <!-- Renderize os resultados da busca -->
      <ul>
        <li v-for="result in oramaClient.results" :key="result.id">
          <a :href="result.url">{{ result.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.orama-search {
  position: relative;
  margin: 1rem 0;
}

.search-results {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}
</style>