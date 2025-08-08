'use client';

import { useTheme } from 'next-themes';

export default function StkLogo() {
  const { theme } = useTheme();
  const src = theme === 'dark'
    ? '/img/logo-dark.svg'
    : '/img/logo-white.svg'; // Garanta contraste adequado para cada fundo

  return <img src={src} alt="StackSpot Docs Logo" height={22} />;
};