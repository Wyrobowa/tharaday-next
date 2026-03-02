'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Box, Button, Card, CardContent, Input, Text } from 'tharaday';

import { signupWithPassword } from '@/lib/auth-api';
import { writeAuthSession } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const session = await signupWithPassword(
        normalizedName,
        normalizedEmail,
        password,
      );
      writeAuthSession(session);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create account.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box display="flex" justifyContent="center" paddingY="48px">
      <Card bordered shadow="sm" style={{ width: '100%', maxWidth: '32rem' }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={4}>
            <Text variant="h2" weight="bold">
              Create account
            </Text>
            <Text variant="body-sm" color="subtle">
              Create your Tharaday Books account.
            </Text>

            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Input
                  label="Name"
                  autoComplete="name"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  fullWidth
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Input
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />

                {error ? (
                  <Text variant="body-sm" color="danger">
                    {error}
                  </Text>
                ) : null}

                <Button type="submit" intent="info" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>
              </Box>
            </form>

            <Box display="flex" alignItems="center" gap={2}>
              <Text variant="body-sm" color="subtle">
                Already have an account?
              </Text>
              <Button
                size="sm"
                variant="subtle"
                onClick={() => router.push('/login')}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
