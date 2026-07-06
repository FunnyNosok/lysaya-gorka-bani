import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE = 'lg_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return secret;
}

function getAdminLogin(): string {
  const login = process.env.ADMIN_LOGIN;
  if (!login) throw new Error('ADMIN_LOGIN is not set');
  return login;
}

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('ADMIN_PASSWORD is not set');
  return pw;
}

function createSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function login(loginValue: string, password: string): Promise<boolean> {
  if (loginValue !== getAdminLogin() || password !== getAdminPassword()) return false;
  const token = createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return true;
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE);
  return !!token?.value;
}

export async function requireAuth(): Promise<void> {
  const ok = await isAuthenticated();
  if (!ok) throw new Error('Unauthorized');
}
