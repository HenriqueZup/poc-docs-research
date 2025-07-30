import { createElement } from 'react';
import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import * as icons from '@citric/icons';

// Veja https://fumadocs.vercel.app/docs/headless/source-api para mais detalhes
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon || typeof icon !== 'string') return undefined;
    if (icon in icons) {
      // O Fumadocs espera um ReactNode, então use createElement
      return createElement(icons[icon as keyof typeof icons]);
    }
    return undefined; // Fallback opcional
  },
});
