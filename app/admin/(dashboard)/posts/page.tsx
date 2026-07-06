import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { isKvAvailable } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await getAllPosts().catch(() => []);
  const kvOk = isKvAvailable();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '4px' }}>Акции и статьи</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem' }}>Создавайте и редактируйте материалы для страницы «Акции и статьи».</p>
        </div>
        <Link href="/admin/posts/new" className="btn btn--ember">+ Создать</Link>
      </div>

      {!kvOk && (
        <div style={{
          background: 'rgba(210,96,42,.1)',
          border: '1px solid var(--ember)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '20px',
          fontSize: '.88rem',
          color: 'var(--ember-deep)',
        }}>
          Показаны seed-данные. Подключите Vercel KV, чтобы сохранять изменения.
        </div>
      )}

      <div className="form-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--cream-2)', borderBottom: '2px solid var(--line)' }}>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 700, fontSize: '.82rem', letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--plank)' }}>Заголовок</th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 700, fontSize: '.82rem', color: 'var(--plank)' }}>Тип</th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 700, fontSize: '.82rem', color: 'var(--plank)' }}>Дата</th>
              <th style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 700, fontSize: '.82rem', color: 'var(--plank)' }}>Статус</th>
              <th style={{ textAlign: 'right', padding: '14px 16px', fontWeight: 700, fontSize: '.82rem', color: 'var(--plank)' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--ink-soft)' }}>
                  Пока нет материалов. <Link href="/admin/posts/new">Создайте первый</Link>.
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <Link href={`/admin/posts/${p.id}`} style={{ fontWeight: 600 }}>{p.title}</Link>
                    <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)' }}>/{p.slug}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '.78rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: p.type === 'offer' ? 'rgba(210,96,42,.12)' : 'rgba(75,90,60,.12)',
                      color: p.type === 'offer' ? 'var(--ember-deep)' : 'var(--moss)',
                    }}>
                      {p.typeLabel}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink-soft)', fontSize: '.84rem' }}>{p.dateLabel}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: p.status === 'published' ? 'rgba(75,90,60,.12)' : 'rgba(58,40,24,.08)',
                      color: p.status === 'published' ? 'var(--moss)' : 'var(--ink-soft)',
                    }}>
                      {p.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link href={`/admin/posts/${p.id}`} className="btn btn--ghost" style={{ fontSize: '.8rem', padding: '8px 16px' }}>Редактировать</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
