'use client';

import { DashboardLayout, Breadcrumbs, BreadcrumbItem, Text } from 'ds-creator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<{ name: string } | undefined>();
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);

    return (
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isCurrent = index === paths.length - 1;

          return (
            <BreadcrumbItem key={path} href={href} isCurrent={isCurrent}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <DashboardLayout
      headerTitle="DS Creator Admin"
      user={user}
      onLogin={() => setUser({ name: 'Admin User' })}
      onLogout={() => setUser(undefined)}
      onCreateAccount={() => setUser({ name: 'New User' })}
      breadcrumbs={getBreadcrumbs()}
      actions={
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text variant="label" weight={pathname === '/' ? 'bold' : 'regular'}>Home</Text>
          </Link>
          <Link href="/users" style={{ textDecoration: 'none' }}>
            <Text variant="label" weight={pathname === '/users' ? 'bold' : 'regular'}>Users</Text>
          </Link>
          <Link href="/items" style={{ textDecoration: 'none' }}>
            <Text variant="label" weight={pathname === '/items' ? 'bold' : 'regular'}>Items</Text>
          </Link>
        </nav>
      }
    >
      {children}
    </DashboardLayout>
  );
}
