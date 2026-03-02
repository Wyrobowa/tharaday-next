'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Card, CardContent, Text } from 'tharaday';

export default function SignupPage() {
  const router = useRouter();

  return (
    <Box display="flex" justifyContent="center" paddingY="48px">
      <Card bordered shadow="sm" style={{ width: '100%', maxWidth: '32rem' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            <Text variant="h2" weight="bold">
              Sign up unavailable
            </Text>
            <Text variant="body-sm" color="subtle">
              Account creation is temporarily disabled. Please sign in with an
              existing account.
            </Text>
            <Button intent="info" onClick={() => router.push('/login')}>
              Go to sign in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
