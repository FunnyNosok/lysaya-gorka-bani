'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      style={{
        background: 'transparent',
        border: '1px solid rgba(245,235,214,.25)',
        color: 'var(--cream)',
        borderRadius: '999px',
        padding: '7px 16px',
        fontSize: '.82rem',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      Выйти
    </button>
  );
}
