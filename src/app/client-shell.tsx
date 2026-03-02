'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AppLayout } from 'tharaday';

import {
  authChangedEventName,
  clearAuthSession,
  readAuthSession,
} from '@/lib/auth';

export default function ClientShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  const syncUserFromStorage = useCallback(() => {
    const session = readAuthSession();
    setUserName(session?.user?.name ?? null);
  }, []);

  useEffect(() => {
    syncUserFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === 'tharaday_auth_session') {
        syncUserFromStorage();
      }
    };
    const handleAuthChanged = () => {
      syncUserFromStorage();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(authChangedEventName, handleAuthChanged);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(authChangedEventName, handleAuthChanged);
    };
  }, [syncUserFromStorage]);

  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const activeNavId =
    normalizedPathname === '/books' || normalizedPathname === '/book'
      ? 'books'
      : 'home';

  return (
    <AppLayout
      headerTitle="Tharaday Books"
      maxWidth="90%"
      user={userName ? { name: userName } : undefined}
      navItems={[
        { id: 'home', label: 'Home' },
        { id: 'books', label: 'Books' },
      ]}
      activeNavId={activeNavId}
      onNavItemClick={(id) => router.push(id === 'home' ? '/' : `/${id}`)}
      onLogin={() => router.push('/login')}
      onCreateAccount={() => router.push('/signup')}
      onLogout={() => {
        clearAuthSession();
        setUserName(null);
        router.push('/');
      }}
    >
      {children}
    </AppLayout>
  );
}
