import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

// Veja https://fumadocs.vercel.app/docs/headless/source-api para mais detalhes
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
