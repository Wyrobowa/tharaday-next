import { getApiUrl } from '@/consts/api';

import { AuthSession, AuthUser } from './auth';

type AuthErrorPayload = {
  error?: unknown;
  message?: unknown;
};

function parseAuthErrorMessage(status: number, payload: AuthErrorPayload) {
  const errorCode =
    typeof payload.error === 'string' ? payload.error : 'unknown_error';
  const errorMessage =
    typeof payload.message === 'string' ? payload.message : null;

  if (errorCode === 'invalid_credentials') {
    return 'Invalid email or password.';
  }

  if (errorCode === 'duplicate') {
    return 'An account with this email already exists.';
  }

  if (
    errorCode === 'email_and_password_required' ||
    errorCode === 'name_email_password_required'
  ) {
    return 'Please fill in all required fields.';
  }

  if (errorCode === 'missing_auth_jwt_secret') {
    return 'Authentication is not configured on the server yet.';
  }

  if (errorCode === 'missing_signup_defaults') {
    return (
      errorMessage ||
      'Signup is not configured on the server. Please try again later.'
    );
  }

  if (errorMessage) {
    return errorMessage;
  }

  return `Authentication request failed (${status}).`;
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.email === 'string'
  );
}

async function parseResponsePayload(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

async function requestAuthSession(
  endpoint: '/login' | '/signup',
  body: Record<string, string>,
) {
  const response = await fetch(getApiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    const errorPayload =
      payload && typeof payload === 'object'
        ? (payload as AuthErrorPayload)
        : {};
    throw new Error(parseAuthErrorMessage(response.status, errorPayload));
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('Unexpected response from authentication endpoint.');
  }

  const authPayload = payload as {
    token?: unknown;
    user?: unknown;
  };

  if (typeof authPayload.token !== 'string' || !isAuthUser(authPayload.user)) {
    throw new Error('Authentication succeeded but returned invalid data.');
  }

  const session: AuthSession = {
    token: authPayload.token,
    user: authPayload.user,
  };

  return session;
}

export async function loginWithPassword(email: string, password: string) {
  return requestAuthSession('/login', { email, password });
}

export async function signupWithPassword(
  name: string,
  email: string,
  password: string,
) {
  return requestAuthSession('/signup', { name, email, password });
}
