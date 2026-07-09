import { getActiveLogin } from '@/lib/auth';
import { AccountEditor } from '@/components/AccountEditor';

export const dynamic = 'force-dynamic';

export default async function AdminAccountPage() {
  const currentLogin = await getActiveLogin().catch(() => '');

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', marginBottom: '8px' }}>Доступ в админку</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.92rem', marginBottom: '20px' }}>
        Смена логина и пароля для входа в панель управления. Текущая сессия останется активной.
      </p>
      <AccountEditor currentLogin={currentLogin} />
    </div>
  );
}
