import Link from 'next/link';
import { getAllCottages } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminCottagesPage() {
  const cottages = await getAllCottages().catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Коттеджи</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '24px' }}>
        Редактирование коттеджей: фото, описание, удобства.
      </p>
      <div style={{ display: 'grid', gap: '14px', maxWidth: '600px' }}>
        {cottages.map((c) => (
          <Link key={c.slug} href={`/admin/cottages/${c.slug}`} className="form-card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
            <img src={c.cardImage} alt="" style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: '1' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--wood)' }}>{c.title}</div>
              <div style={{ fontSize: '.84rem', color: 'var(--ink-soft)' }}>{c.capacityLabel} · {c.tag}</div>
            </div>
            <span className="btn btn--ghost" style={{ flexShrink: 0 }}>Изменить</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
