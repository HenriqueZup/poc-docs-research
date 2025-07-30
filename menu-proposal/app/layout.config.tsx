import { BookIcon } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
      <link href='/img/logo-white.svg' />
        StackSpot Docs
      </>
              
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      icon: <BookIcon />,
      text: 'Beta version',
      url: '/blog',
      // secondary items will be displayed differently on navbar
      secondary: true,
    },
    {
      icon: <BookIcon />,
      text: 'Release Notes',
      url: '/blog',
      // secondary items will be displayed differently on navbar
      secondary: true,
    },
  ],
};
