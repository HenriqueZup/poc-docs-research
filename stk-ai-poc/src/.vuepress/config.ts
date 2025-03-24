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
      `
          var initOpts = {
            projectKey: "PIaRRuIghVZcnCFjjBlc",
            defaultInputMode: 2,
            obscureTextNumbers: false,
            obscureTextEmails: true,
          };
          var startOpts = { userID: "" };
          (function(A,s,a,y,e,r){
            r=window.OpenReplay=[e,r,y,[s-1, e]];
            s=document.createElement('script');s.src=A;s.async=!a;
            document.getElementsByTagName('head')[0].appendChild(s);
            r.start=function(v){r.push([0])};
            r.stop=function(v){r.push([1])};
            r.setUserID=function(id){r.push([2,id])};
            r.setUserAnonymousID=function(id){r.push([3,id])};
            r.setMetadata=function(k,v){r.push([4,k,v])};
            r.event=function(k,p,i){r.push([5,k,p,i])};
            r.issue=function(k,p){r.push([6,k,p])};
            r.isActive=function(){return false};
            r.getSessionToken=function(){};
          })("//static.openreplay.com/latest/openreplay.js",1,0,initOpts,startOpts);
      `,
    ],
    [
      "script",
      {},
      `
      document.addEventListener("DOMContentLoaded", function () {
  var observer = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Verifica se o elemento com ID "search-pro" foi adicionado
        var searchInput = document.getElementById("search-pro");
        if (searchInput) {
          // Adiciona o listener para capturar o evento de pressionar "Enter"
          searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
              var inputValue = event.target.value;
              // Envia o valor capturado como um evento para o OpenReplay
              if (window.OpenReplay && window.OpenReplay.event) {
                window.OpenReplay.event("search_input", { value: inputValue });
              }
              console.log("Texto enviado ao pressionar Enter:", inputValue); // Apenas para depuração
            }
          });

          // Adiciona o listener para capturar o evento de clicar fora do input
          searchInput.addEventListener("blur", function (event) {
            var inputValue = event.target.value;
            // Envia o valor capturado como um evento para o OpenReplay
            if (window.OpenReplay && window.OpenReplay.event) {
              window.OpenReplay.event("search_input", { value: inputValue });
            }
            console.log("Texto enviado ao perder o foco:", inputValue); // Apenas para depuração
          });

          // Após encontrar o elemento e adicionar os listeners, podemos desconectar o observer
          observer.disconnect();
        }
      }
    }
  });

  // Configura o observer para monitorar alterações no body
  observer.observe(document.body, { childList: true, subtree: true });
});
      `,
    ],

    
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});

