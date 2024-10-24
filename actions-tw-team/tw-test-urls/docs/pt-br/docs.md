<!-- 
******************************************

- ESTE É APENAS UM EXEMPLO DE COMO PREENCHER A DOCUMENTAÇÃO DO SEU CONTEUDO. 

- PREENCHA O TEMPLATE COM AS INFORMAÇÕES DO SEU CONTEUDO PARA QUE OUTROS USUÁRIO CONSIGAM UTILIZÁ-LO. ESSA DOCUMENTAÇÃO SERÁ EXPOSTA NA PÁGINA DO CONTEUDO NO PORTAL DA STACKSPOT. 

******************************************
-->
## tw-test-urls

Esta Action é uma ferramenta automatizada para verificar links quebrados em um site. Ela percorre recursivamente todas as páginas de um site, extrai os links internos e verifica se estão acessíveis. O Action também permite definir uma profundidade máxima de recursão para limitar a quantidade de páginas verificadas.

### Funcionalidades principais:

1. **Verificação de Links:** O script acessa cada página do site, extrai os links e verifica se eles estão acessíveis (código de status HTTP 200). 

2. **Recursividade Controlada:** Ele segue os links internos de forma recursiva, respeitando um limite de profundidade configurável.  

3. **Armazenamento de Resultados:** Links quebrados são armazenados em três formatos diferentes:  
   - Arquivo de texto (`broken_links.txt`)  
   - Arquivo JSON (`broken_links.json`)  
   - Arquivo Markdown (`broken_links.md`)  

4. **Compatibilidade com Diferentes Sistemas Operacionais:** Os arquivos de saída são salvos na pasta "Documentos" do usuário, de forma compatível com Windows, MacOS e Linux.  

5. **Evita Repetição:** O script mantém um conjunto de links já visitados para evitar verificações duplicadas.

## Pré-requisitos

<!-- 
[Isto é uma orientação, apague essa o conteúdo e escreva suas informações fora desta marcação <!-- ]

- Descreva quais os requisitos que o usuário precisa saber antes de usar a Action.
-->
- Instalar o Python:  
  - [**MacOS**](https://python.org.br/instalacao-mac/);  
  - [**Linux**](https://python.org.br/instalacao-linux/);  
  - [**Windows**](https://python.org.br/instalacao-windows/).  
- Instalar as dependências:

```bash
pip install requests beautifulsoup4
```

ou 

```bash
pip3 install requests beatifulsoup4
```

## Uso

### Como funciona

- O script começa verificando a página principal do site fornecido.  
- Ele extrai todos os links dessa página e verifica se estão acessíveis.  
- Para cada link interno encontrado, o script segue o link e repete o processo de extração e verificação de links, até atingir a profundidade máxima configurada.
- Links quebrados são armazenados em arquivos de texto, JSON e Markdown na pasta "Documentos" do usuário.

#### Parâmetros:

**`inputs.server`**: URL do site a ser verificado.
**`inputs.max_depth`**: Profundidade máxima de recursão para a verificação de links.

#### Saída: 

Arquivos contendo os links quebrados encontrados, salvos na pasta "Documentos" do usuário:  

- `broken_links.txt`
- `broken_links.json`
- `broken_links.md`

### Passo 1. Executar a Action localmente:

> Dentro da pasta da Action, execute o comando a seguir.

```bash
stk run action .
```

### Passo 2. Preencha os inputs:

- **Selecione o tipo de servidor:** Os tipos de servidores são as URLS do site que a Action vai fazer a busca dos links.

- **Profundidade da busca:** 

  - Se o site que você está verificando for pequeno, você pode definir um valor maior para a profundidade da busca (por exemplo, 10).  
  - Se o site for muito grande, você pode definir um valor menor (por exemplo, 3) para evitar que o script demore muito tempo para ser executado.


## Release Notes

<!-- 
[Isto é uma orientação, apague essa o conteúdo e escreva suas informações fora desta marcação <!-- ]

Esta seção só é necessária se você publicar uma nova versão da Action. Apenas adicione o que foi modificado ou adicionado.

Exemplo:
###  action-doc-template v1.0.0

#### Features
Novos templates foram adicionados.
-->