'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';
import {
  AppLayout,
  Box,
  Breadcrumbs,
  BreadcrumbItem,
  SelectOption,
  Text,
} from 'tharaday';

import {
  LoginModal,
  LoginFormState,
  Role,
} from '@/app/_components/auth/LoginModal';
import {
  SignupModal,
  SignupFormState,
} from '@/app/_components/auth/SignupModal';

type AppUser = { name: string; role: Role };

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | undefined>();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    name: '',
    role: 'customer',
  });
  const [signupForm, setSignupForm] = useState<SignupFormState>({
    name: '',
    email: '',
    role: 'customer',
  });

  const roleOptions: SelectOption[] = [
    { value: 'customer', label: 'Customer' },
    { value: 'seller', label: 'Seller' },
    { value: 'admin', label: 'Admin' },
  ];

  const navConfig = useMemo(
    () => [
      { id: 'home', label: 'Home', href: '/', isActive: pathname === '/' },
      {
        id: 'browse',
        label: 'Browse',
        href: '/browse',
        isActive: pathname === '/browse',
      },
      {
        id: 'sell',
        label: 'Sell',
        href: '/sell',
        isActive: pathname === '/sell',
      },
      ...(user?.role === 'admin'
        ? [
            {
              id: 'admin',
              label: 'Admin',
              href: '/admin',
              isActive: pathname.startsWith('/admin'),
            },
          ]
        : []),
    ],
    [pathname, user?.role],
  );

  const navItems = navConfig.map((book) => ({
    id: book.id,
    label: (
      <Text variant="label" weight={book.isActive ? 'bold' : 'regular'}>
        {book.label}
      </Text>
    ),
  }));

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
    <AppLayout
      headerTitle="Tharaday Books"
      user={user}
      navItems={navItems}
      activeNavId={navConfig.find((book) => book.isActive)?.id}
      onLogin={() => {
        setLoginForm({ name: '', role: 'customer' });
        setIsLoginOpen(true);
      }}
      onLogout={() => setUser(undefined)}
      onCreateAccount={() => {
        setSignupForm({ name: '', email: '', role: 'customer' });
        setIsSignupOpen(true);
      }}
      onNavItemClick={(id) => {
        const target = navConfig.find((book) => book.id === id);
        if (target?.href) {
          router.push(target.href);
        }
      }}
    >
      <>
        <Box display="flex" flexDirection="column" gap={4}>
          {getBreadcrumbs()}
          {children}
        </Box>
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          form={loginForm}
          setForm={setLoginForm}
          roleOptions={roleOptions}
          onSubmit={() => {
            const name = loginForm.name.trim();
            setUser({
              name: name || 'Reader',
              role: loginForm.role,
            });
            setIsLoginOpen(false);
          }}
        />
        <SignupModal
          isOpen={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
          form={signupForm}
          setForm={setSignupForm}
          roleOptions={roleOptions}
          onSubmit={() => {
            const name = signupForm.name.trim();
            setUser({
              name: name || 'New Reader',
              role: signupForm.role,
            });
            setIsSignupOpen(false);
          }}
        />
      </>
    </AppLayout>
  );
}
