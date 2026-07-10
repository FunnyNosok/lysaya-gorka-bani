import Link from 'next/link';
import { getAllServices } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const services = await getAllServices().catch(() => []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Услуги</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '24px' }}>
        Редактирование услуг: кафе, парильщик, массаж, бассейн и др. Меню, цены, программы.
      </p>
      <div style={{ display: 'grid', gap: '14px', maxWidth: '600px' }}>
        {services.map((s) => (
          <Link key={s.slug} href={`/admin/services/${s.slug}`} className="form-card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
            <img src={s.cardImage} alt="" style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: '1' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--wood)' }}>{s.cardTitle}</div>
              <div style={{ fontSize: '.84rem', color: 'var(--ink-soft)' }}>{s.cardDescription}</div>
            </div>
            <span className="btn btn--ghost" style={{ flexShrink: 0 }}>Изменить</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
