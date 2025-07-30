import { baseOptions } from '@/app/layout.config';
import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[ ]}
    >
      {children}
    </HomeLayout>
  );
}
