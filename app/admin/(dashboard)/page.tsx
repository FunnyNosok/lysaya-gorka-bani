import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { getAllBookings } from '@/lib/content';
import { isKvAvailable } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const posts = await getAllPosts().catch(() => []);
  const bookings = await getAllBookings().catch(() => []);
  const kvOk = isKvAvailable();

  const published = posts.filter((p) => p.status === 'published');
  const drafts = posts.filter((p) => p.status === 'draft');
  const offers = posts.filter((p) => p.type === 'offer');
  const articles = posts.filter((p) => p.type === 'article');
  const newBookings = bookings.filter((b) => b.status === 'new');

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Дашборд</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: '28px' }}>Обзор контента и заявок сайта.</p>

      {!kvOk && (
        <div style={{
          background: 'rgba(210,96,42,.1)',
          border: '1px solid var(--ember)',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '28px',
          fontSize: '.92rem',
          color: 'var(--ember-deep)',
        }}>
          <b>Vercel KV не подключён.</b> Сайт работает на seed-данных. Заявки сохраняются только локально.
          Для полноценной работы админки задайте <code>KV_REST_API_URL</code> и <code>KV_REST_API_TOKEN</code> в переменных окружения Vercel.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        <StatCard label="Всего материалов" value={posts.length} />
        <StatCard label="Опубликовано" value={published.length} />
        <StatCard label="Черновики" value={drafts.length} />
        <StatCard label="Акции" value={offers.length} />
        <StatCard label="Статьи" value={articles.length} />
        <StatCard label="Новые заявки" value={newBookings.length} highlight={newBookings.length > 0} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-card">
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.3rem', marginBottom: '16px' }}>Быстрые действия</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/admin/banyas" className="btn btn--ember btn--block">Редактировать бани</Link>
            <Link href="/admin/cottages" className="btn btn--ghost btn--block">Редактировать коттеджи</Link>
            <Link href="/admin/services" className="btn btn--ghost btn--block">Редактировать услуги</Link>
            <Link href="/admin/posts/new" className="btn btn--ghost btn--block">Создать акцию / статью</Link>
            <Link href="/admin/bookings" className="btn btn--ghost btn--block">Заявки на бронирование</Link>
            <Link href="/admin/settings" className="btn btn--ghost btn--block">Настройки сайта</Link>
          </div>
        </div>

        <div className="form-card">
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.3rem', marginBottom: '16px' }}>Последние материалы</h3>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem' }}>Пока нет материалов.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {posts.slice(0, 5).map((p) => (
                <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                  <Link href={`/admin/posts/${p.id}`} style={{ fontWeight: 600, fontSize: '.92rem' }}>
                    {p.title}
                  </Link>
                  <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)' }}>
                    {p.dateLabel} · {p.typeLabel} · {p.status === 'published' ? '✓ Опубликовано' : 'Черновик'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="form-card" style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--ff-display)',
        fontSize: '2.2rem',
        fontWeight: 700,
        color: highlight ? 'var(--ember)' : 'var(--wood)',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '4px' }}>{label}</div>
    </div>
  );
}
