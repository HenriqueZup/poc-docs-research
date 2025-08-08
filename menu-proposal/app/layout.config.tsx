import { BookIcon, ListOrdered } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import StkLogo from "../components/StkLogo";


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
      <StkLogo/>
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
    {
      icon: <ListOrdered />,
      text: 'Onboarding',
      url: '/docs/onboarding',
      // secondary items will be displayed differently on navbar
      secondary: false,
    },
  ],
};
