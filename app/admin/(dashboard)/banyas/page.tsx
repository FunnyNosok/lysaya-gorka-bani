import Link from 'next/link';
import { getAllBanyas } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminBanyasPage() {
  const banyas = await getAllBanyas().catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Бани</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '24px' }}>
        Редактирование цен, фотографий и описаний бань.
      </p>
      <div style={{ display: 'grid', gap: '14px', maxWidth: '600px' }}>
        {banyas.map((b) => (
          <Link key={b.slug} href={`/admin/banyas/${b.slug}`} className="form-card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
            <img src={b.cardImage} alt="" style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: '1' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--wood)' }}>{b.title}</div>
              <div style={{ fontSize: '.84rem', color: 'var(--ink-soft)' }}>{b.capacityLabel} · от {b.priceFromLabel}</div>
            </div>
            <span className="btn btn--ghost" style={{ flexShrink: 0 }}>Изменить</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
