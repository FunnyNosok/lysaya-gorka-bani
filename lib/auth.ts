import { cookies } from 'next/headers';
import crypto from 'crypto';
import { kv, isKvAvailable } from './kv';

const SESSION_COOKIE = 'lg_admin_session';
const CREDENTIALS_KEY = 'admin:credentials';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

// In-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const LOGIN_DELAY_MS = 500; // delay each attempt to slow brute-force

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

// HMAC-based session token: token = randomHex + "." + hmac(randomHex)
// This proves the token was issued by this server, not forged
function createSessionToken(): string {
  const random = crypto.randomBytes(32).toString('hex');
  const hmac = crypto.createHmac('sha256', getAuthSecret()).update(random).digest('hex');
  return `${random}.${hmac}`;
}

function verifySessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [random, hmac] = parts;
  if (!random || !hmac || random.length !== 64 || hmac.length !== 64) return false;
  const expectedHmac = crypto.createHmac('sha256', getAuthSecret()).update(random).digest('hex');
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expectedHmac, 'hex'));
}

// Constant-time string comparison to prevent timing attacks on credentials
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Учётные данные, изменённые через админку, хранятся в KV (пароль — scrypt-хеш).
// Если в KV их нет — используются ADMIN_LOGIN/ADMIN_PASSWORD из окружения.
type StoredCredentials = { login: string; passwordHash: string; salt: string };

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

async function getStoredCredentials(): Promise<StoredCredentials | null> {
  if (!isKvAvailable()) return null;
  try {
    const c = await kv().get<StoredCredentials>(CREDENTIALS_KEY);
    if (c && c.login && c.passwordHash && c.salt) return c;
    return null;
  } catch {
    return null;
  }
}

async function verifyCredentials(loginValue: string, password: string): Promise<boolean> {
  const stored = await getStoredCredentials();
  if (stored) {
    const loginOk = safeCompare(loginValue, stored.login);
    const passOk = safeCompare(hashPassword(password, stored.salt), stored.passwordHash);
    return loginOk && passOk;
  }
  const loginOk = safeCompare(loginValue, getAdminLogin());
  const passOk = safeCompare(password, getAdminPassword());
  return loginOk && passOk;
}

export async function getActiveLogin(): Promise<string> {
  const stored = await getStoredCredentials();
  return stored ? stored.login : getAdminLogin();
}

export async function changeCredentials(currentPassword: string, newLogin: string, newPassword: string): Promise<void> {
  if (!isKvAvailable()) {
    throw new Error('Хранилище данных (KV) не настроено — изменить логин и пароль можно только через переменные окружения ADMIN_LOGIN и ADMIN_PASSWORD.');
  }
  const stored = await getStoredCredentials();
  const currentOk = stored
    ? safeCompare(hashPassword(currentPassword, stored.salt), stored.passwordHash)
    : safeCompare(currentPassword, getAdminPassword());
  if (!currentOk) throw new Error('Текущий пароль указан неверно');

  const salt = crypto.randomBytes(16).toString('hex');
  const credentials: StoredCredentials = {
    login: newLogin,
    passwordHash: hashPassword(newPassword, salt),
    salt,
  };
  await kv().set(CREDENTIALS_KEY, credentials);
}

export async function login(loginValue: string, password: string): Promise<boolean> {
  // Rate limit: check by IP-like key (we use the login value as key)
  const now = Date.now();
  const key = loginValue.toLowerCase().slice(0, 50);
  const attempts = loginAttempts.get(key);

  if (attempts) {
    const elapsed = now - attempts.lastAttempt;
    if (elapsed < LOGIN_WINDOW_MS && attempts.count >= MAX_LOGIN_ATTEMPTS) {
      const waitSec = Math.ceil((LOGIN_WINDOW_MS - elapsed) / 1000);
      throw new Error(`Слишком много попыток. Повторите через ${waitSec} сек.`);
    }
    if (elapsed >= LOGIN_WINDOW_MS) {
      loginAttempts.delete(key);
    }
  }

  // Delay to slow down brute-force
  await new Promise((r) => setTimeout(r, LOGIN_DELAY_MS));

  const ok = await verifyCredentials(loginValue, password);

  if (!ok) {
    const current = loginAttempts.get(key);
    loginAttempts.set(key, { count: (current?.count || 0) + 1, lastAttempt: now });
    return false;
  }

  loginAttempts.delete(key);
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
  if (!token?.value) return false;
  return verifySessionToken(token.value);
}

export async function requireAuth(): Promise<void> {
  const ok = await isAuthenticated();
  if (!ok) throw new Error('Unauthorized');
}
