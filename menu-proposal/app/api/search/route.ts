import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET: GET_EN } = createFromSource(source, {
  // https://docs.orama.com/open-source/supported-languages
  language: 'english',
});

export const { GET: GET_PT } = createFromSource(source, {
  language: 'portuguese',
});

export const { GET } = createFromSource(source, {
  localeMap: {
    // [locale]: Orama options
    pt_br: { language: 'portuguese' },
    en: { language: 'english' },
  },
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      // use your desired value, like page.slugs[0]
      tag: '<value>',
    };
  },
});

