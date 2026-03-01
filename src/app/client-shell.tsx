'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { AppLayout } from 'tharaday';

export default function ClientShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();

  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const activeNavId =
    normalizedPathname === '/books' || normalizedPathname === '/book'
      ? 'books'
      : 'home';

  return (
    <AppLayout
      headerTitle="Tharaday Books"
      maxWidth="90%"
      navItems={[
        { id: 'home', label: 'Home' },
        { id: 'books', label: 'Books' },
      ]}
      activeNavId={activeNavId}
      onNavItemClick={(id) => router.push(id === 'home' ? '/' : `/${id}`)}
      onLogin={() => router.push('/login')}
      onCreateAccount={() => router.push('/signup')}
    >
      {children}
    </AppLayout>
  );
}
