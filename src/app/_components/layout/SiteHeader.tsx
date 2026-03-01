'use client';

import { useRouter } from 'next/navigation';
import { Header } from 'tharaday';

export function SiteHeader() {
  const router = useRouter();

  return (
    <Header
      title="Tharaday Books"
      onLogin={() => router.push('/login')}
      onCreateAccount={() => router.push('/signup')}
      maxWidth={1100}
    />
  );
}
