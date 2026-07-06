import { SettingsEditor } from '@/components/SettingsEditor';
import { getSettings } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings().catch(() => defaultSettings);
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Настройки сайта</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '24px' }}>
        Телефоны, адрес, WhatsApp, соцсети и карта. Изменения применяются на всех страницах.
      </p>
      <SettingsEditor initial={settings} />
    </div>
  );
}
