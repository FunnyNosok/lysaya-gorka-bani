'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!loginValue || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginValue, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const from = params.get('from') || '/admin';
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch {
      setError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{
        background: 'var(--cream)',
        borderRadius: '16px',
        padding: '40px 36px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--wood)' }}>
            Лысая Горка
          </div>
          <div style={{ fontFamily: 'var(--ff-script)', color: 'var(--ember)', fontSize: '1rem' }}>
            панель администратора
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="lg">Логин</label>
            <input
              id="lg"
              type="text"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder="Введите логин"
              autoComplete="username"
              autoFocus
              style={{ width: '100%' }}
            />
          </div>
          <div className="field">
            <label htmlFor="pw">Пароль</label>
            <input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              autoComplete="current-password"
              style={{ width: '100%' }}
            />
          </div>
          {error && (
            <div style={{
              background: 'rgba(210,96,42,.12)',
              border: '1px solid var(--ember)',
              color: 'var(--ember-deep)',
              borderRadius: '10px',
              padding: '12px 14px',
              fontSize: '.9rem',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn btn--ember btn--block btn--lg"
            style={{ opacity: loading ? '.6' : '1', cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bark)' }} />}>
      <LoginForm />
    </Suspense>
  );
}
