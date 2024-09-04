# Jinja2 vs Nunjucks: Quais são as diferenças?

## Introdução

Fonte: 

https://arc.net/l/quote/izwsowly

Jinja2 e Nunjucks são ambos motores de template para JavaScript e Python, mas possuem algumas diferenças chave.

### 1. Herança de Template

Jinja2 suporta herança de template, permitindo a criação de um template base com o layout comum e, em seguida, estendê-lo para adicionar conteúdo específico em templates filhos. Essa funcionalidade ajuda a reduzir a duplicação de código e promove a reutilização. Por outro lado, Nunjucks não possui suporte embutido para herança de template, tornando-o menos flexível para criar templates estruturados.

### 2. Variações de Sintaxe

Embora ambos os motores sejam inspirados pela linguagem de template do Django, eles possuem variações de sintaxe. Jinja2 usa chaves duplas para interpolação de variáveis e tags de bloco, enquanto Nunjucks usa uma combinação de chaves e sinais de porcentagem. Essa diferença de sintaxe pode ser desafiadora ao alternar entre os dois motores.

### 3. Comportamento de Autoescape

Uma diferença significativa entre Jinja2 e Nunjucks é como eles lidam com `autoescape`. No Jinja2, o `autoescape` é desativado por padrão, o que significa que as variáveis não são automaticamente escapadas quando renderizadas. Em contraste, Nunjucks escapa automaticamente todas as variáveis por padrão, proporcionando um nível mais alto de segurança contra ataques de **Cross-Site Scripting (XSS)**. No entanto, essa funcionalidade pode, às vezes, levar a comportamentos inesperados e à necessidade de `escape` manual em certos cenários.

### 4. Filtros e Funções Personalizadas

Jinja2 permite que os desenvolvedores criem e registrem filtros e funções personalizados, estendendo as capacidades do motor de template e tornando-o mais versátil. Nunjucks, por outro lado, não oferece suporte

## Nunjucks: installJinjaCompat

`nunjucks.installJinjaCompat()`

Fontes:

- [Nunjucks FAQ](https://mozilla.github.io/nunjucks/faq.html#can-i-use-the-same-templates-between-nunjucks-and-jinja2-what-are-the-differences)
- [Instalação Jinja Compat](https://mozilla.github.io/nunjucks/api.html#installjinjacompat)
- [Código fonte da API](https://github.com/mozilla/nunjucks/blob/master/nunjucks/src/jinja-compat.js)

Suporte experimental para trazer uma compatibilidade mais consistente com o Jinja, ao adicionar a API Pythonic ao ambiente. Enquanto o Nunjucks não alcança a compatibilidade completa do Jinja/Python, a API ajuda a suprir alguns problemas de compatibilidade.

A API por exemplo, adiciona o mapeamento de valores `True` e `False` do Jinja para o `true` e `false` do JavaScript. Permite usar partes da sintaxe do Python, além de manipulação de arrays e objetos no estilos dos métodos Python.

### 1. Valores Literais Especiais

- **Jinja2**: usa `True`, `False` e `None` como valores literais e especiais.
- **Nunjucks**: não possui esses valores por padrão.
- **Código**: adiciona suporte para `True`, `False` e `None` no Nunjucks.

```js
runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
  var val = orig_contextOrFrameLookup.apply(this, arguments);
  if (val !== undefined) {
    return val;
  }
  switch (key) {
    case 'True':
      return true;
    case 'False':
      return false;
    case 'None':
      return null;
    default:
      return undefined;
  }
};
```

### 2. Slices

- **Jinja2**: suporta slices nativamente.
- **Nunjucks**: são suporta slices nativamente.
- **Código**: adiciona suporte para slices no Nunjucks.

```js
const Slice = nodes.Node.extend('Slice', {
  fields: ['start', 'stop', 'step'],
  init(lineno, colno, start, stop, step) {
    start = start || new nodes.Literal(lineno, colno, null);
    stop = stop || new nodes.Literal(lineno, colno, null);
    step = step || new nodes.Literal(lineno, colno, 1);
    this.parent(lineno, colno, start, stop, step);
  }
});
```

### 3. Métodos de Arrays e Objetos

- **Jinja2**: oferece métodos adicionais para manipulação de arrays e objetos, como `pop`, `append`, `remove`, `count`, `index`, `items`, `values`, `keys`, etc.
- **Nunjucks**: não possui esses métodos por padrão.
- **Código**: adiciona esses métodos ao Nunjucks.

```js
const ARRAY_MEMBERS = {
  pop(index) {
    if (index === undefined) {
      return this.pop();
    }
    if (index >= this.length || index < 0) {
      throw new Error('KeyError');
    }
    return this.splice(index, 1);
  },
  append(element) {
    return this.push(element);
  },
  remove(element) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === element) {
        return this.splice(i, 1);
      }
    }
    throw new Error('ValueError');
  },
  count(element) {
    var count = 0;
    for (let i = 0; i < this.length; i++) {
      if (this[i] === element) {
        count++;
      }
    }
    return count;
  },
  index(element) {
    var i;
    if ((i = this.indexOf(element)) === -1) {
      throw new Error('ValueError');
    }
    return i;
  },
  find(element) {
    return this.indexOf(element);
  },
  insert(index, elem) {
    return this.splice(index, 0, elem);
  }
};
const OBJECT_MEMBERS = {
  items() {
    return lib._entries(this);
  },
  values() {
    return lib._values(this);
  },
  keys() {
    return lib.keys(this);
  },
  get(key, def) {
    var output = this[key];
    if (output === undefined) {
      output = def;
    }
    return output;
  },
  has_key(key) {
    return hasOwnProp(this, key);
  },
  pop(key, def) {
    var output = this[key];
    if (output === undefined && def !== undefined) {
      output = def;
    } else if (output === undefined) {
      throw new Error('KeyError');
    } else {
      delete this[key];
    }
    return output;
  },
  popitem() {
    const keys = lib.keys(this);
    if (!keys.length) {
      throw new Error('KeyError');
    }
    const k = keys[0];
    const val = this[k];
    delete this[k];
    return [k, val];
  },
  setdefault(key, def = null) {
    if (!(key in this)) {
      this[key] = def;
    }
    return this[key];
  },
  update(kwargs) {
    lib._assign(this, kwargs);
    return null; // Always returns None
  }
};
```

### 4. Lookup de Membros

- **Jinja2**: permite a busca de membros em arrays e objetos com métodos adicionais.
- **Nunjucks**: não possui essa funcionalidade por padrão.
- **Código**: adiciona essa funcionalidade ao Nunjucks.

```js
runtime.memberLookup = function memberLookup(obj, val, autoescape) {
  if (arguments.length === 4) {
    return sliceLookup.apply(this, arguments);
  }
  obj = obj || {};

  // If the object is an object, return any of the methods that Python would
  // otherwise provide.
  if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
    return ARRAY_MEMBERS[val].bind(obj);
  }
  if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
    return OBJECT_MEMBERS[val].bind(obj);
  }

  return orig_memberLookup.apply(this, arguments);
};
```

## Comparação Geral de Filtros

Fonte: 

- [Dado não oficial, publicado por usuário do GitHub](https://gist.github.com/ogonkov/fcbff2b84615b0207c8bdc2c2addff95)

| | Jinja2 | Nunjucks | Suporte |
| --- | --- | --- | --- |
| Filtros | 50 | 40 | 80% |
| Totalmente compatível | 50 | 27 | 54% |

**Explicação:**

- **Filtros**: Jinja2 possui 50 filtros, enquanto Nunjucks possui 40. Isso significa que Nunjucks suporta 80% dos filtros que Jinja2 oferece.
- **Totalmente compatível**: Dos 50 filtros de Jinja2, apenas 27 são totalmente compatíveis com Nunjucks, resultando em uma compatibilidade de 54%.

## Comparação Detalhada de Filtros

| Jinja2 | Nunjucks | Compatível | Comentário |
| --- | --- | --- | --- |
| abs | abs | ✔️ | `abs`/`Math.abs` são equivalentes |
| attr | | ❌ | Não suportado em Nunjucks |
| batch | batch | ✔️ | Implementação igual |
| capitalize | capitalize | ✔️ | |
| center | center | ✔️ | |
| default/d | default/d | ✔️ | |
| dictsort | dictsort | ➖ | Falta o argumento `reverse` |
| escape/e | escape/e | ✔️ | `markup.escape`/implementação própria |
| filesizeformat | | ❌ | Não suportado em Nunjucks |
| first | first | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| float | float | ✔️ | |
| forceescape | forceescape | ✔️ | |
| format | | ❌ | Não suportado em Nunjucks |
| groupby | groupby | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| indent | indent | ➖ | Falta o argumento `blank` |
| int | int | ➖ | Falta o argumento `base` |
| join | join | ➖ | Não suporta atributos aninhados. Autoescape parece faltar. Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| last | last | ✔️ | |
| length/count | length | ➖ | Falta o alias `count` |
| list | list | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| lower | lower | ✔️ | |
| map | | ❌ | Não suportado em Nunjucks |
| max | | ❌ | Não suportado em Nunjucks |
| min | | ❌ | Não suportado em Nunjucks |
| pprint | | ❌ | `pprint.pformat` com opções padrão |
| random | random | ✔️ | |
| reject | reject | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| rejectattr | rejectattr | ➖ | Jinja2 permite argumento pontilhado e nome de teste com argumentos adicionais. Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| replace | replace | ✔️ | `autoescape` parece não ser respeitado ⚠️ |
| reverse | reverse | ✔️ | |
| round | round | ✔️ | Jinja2 lança exceção quando `method` não é um dos conhecidos |
| safe | safe | ✔️ | |
| select | select | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| selectattr | selectattr | ➖ | Jinja2 permite argumento pontilhado e nome de teste com argumentos adicionais. Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| slice | slice | ✔️ | Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| sort | sort | ➖ | Falta suporte para atributos aninhados |
| string | string | ✔️ | `markupsafe.soft_str` |
| striptags | striptags | ✔️ | Nunjucks tem argumento adicional para preservar quebras de linha |
| sum | sum | ➖ | Falta suporte para atributos aninhados. Jinja2 tem filtro assíncrono com o mesmo nome ⚠️ |
| title | title | ➖ | Jinja2 divide a string por mais símbolos do que apenas um espaço |
| tojson | dump | ✔️ | |
| trim | trim | ➖ | Falta o argumento `chars` |
| truncate | truncate | ➖ | Falta o argumento `leeway` |
| unique | | ❌ | Não suportado em Nunjucks |
| upper | upper | ✔️ | |
| urlencode | urlencode | ✔️ | |
| urlize | urlize | ➖ | Faltam os argumentos `target` e `rel` |
| wordcount | wordcount | ✔️ | Jinja2 parece sempre retornar números ⚠️ |
| wordwrap | | ❌ | Não suportado em Nunjucks |
| xmlattr | | ❌ | Não suportado em Nunjucks |

**Explicação:**

- **Compatível**: Um filtro é considerado compatível se Nunjucks oferece uma funcionalidade equivalente ao filtro de Jinja2.
- **Comentário**: Fornece detalhes adicionais sobre a implementação ou diferenças específicas entre os filtros de Jinja2 e Nunjucks.

