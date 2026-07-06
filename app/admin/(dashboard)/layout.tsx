import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { LogoutButton } from '@/components/LogoutButton';

const ADMIN_NAV = [
  { href: '/admin', label: 'Дашборд' },
  { href: '/admin/posts', label: 'Акции и статьи' },
  { href: '/admin/bookings', label: 'Заявки' },
  { href: '/admin/settings', label: 'Настройки' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated().catch(() => false);

  if (!authed) {
    redirect('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'var(--bark)',
        color: 'var(--cream)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(200,137,58,.22)',
      }}>
        <Link href="/admin" style={{ color: 'var(--cream)', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.1rem' }}>
          Лысая горка · Админка
        </Link>
        <AdminNav items={ADMIN_NAV} />
        <a
          href="/"
          style={{ color: 'rgba(245,235,214,.6)', fontSize: '.84rem', fontWeight: 600 }}
        >
          ← На сайт
        </a>
        <LogoutButton />
      </header>
      <main style={{ flex: '1', padding: '32px 24px', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
