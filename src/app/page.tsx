'use client';

import { useRouter } from 'next/navigation';
import { AppLayout, Box, Text } from 'tharaday';

export default function HomePage() {
  const router = useRouter();

  return (
    <AppLayout
      headerTitle="Tharaday Books"
      navItems={[
        { id: 'home', label: 'Home' },
        { id: 'books', label: 'Books' },
        { id: 'cart', label: 'Cart' },
      ]}
      activeNavId="home"
      onNavItemClick={(id) => router.push(id === 'home' ? '/' : `/${id}`)}
      onLogin={() => router.push('/login')}
      onCreateAccount={() => router.push('/signup')}
    >
      <Box paddingY="48px">
        <Text variant="h1" weight="bold">
          Welcome to Tharaday Books bookstore!
        </Text>
      </Box>
    </AppLayout>
  );
}
