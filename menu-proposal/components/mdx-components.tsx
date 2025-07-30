import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import * as icons from '@citric/icons';

const Icons = new Proxy(icons, {
  get(target, prop) {
    // @ts-ignore
    return target[prop];
  },
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Icons, // Agora é um componente proxy
    ...components,
  };
}