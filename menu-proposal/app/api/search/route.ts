import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET: GET_EN } = createFromSource(source, {
  // https://docs.orama.com/open-source/supported-languages
  language: 'english',
});

export const { GET: GET_PT } = createFromSource(source, {
  language: 'portuguese',
});