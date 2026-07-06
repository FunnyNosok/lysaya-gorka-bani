import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { banyas as seedBanyas, banyaSlugs } from '@/data/banyas';
import { BookingForm } from '@/components/BookingForm';
import { getSettings, getAllBanyas } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export async function generateStaticParams() {
  return banyaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const all = await getAllBanyas().catch(() => seedBanyas);
  const b = all.find((x) => x.slug === slug);
  if (!b) return { title: 'Не найдено' };
  return { title: b.seoTitle, description: b.seoDescription };
}

export default async function BanyaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const banyas = await getAllBanyas().catch(() => seedBanyas);
  const b = banyas.find((x) => x.slug === slug);
  if (!b) notFound();

  const settings = await getSettings().catch(() => defaultSettings);
  const others = banyas.filter((x) => x.slug !== b.slug).slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src={b.heroImage} alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb">
            <Link href="/">Главная</Link><span>/</span>
            <Link href="/arenda-ban">Бани</Link><span>/</span>
            {b.shortTitle}
          </nav>
          <span className="eyebrow">Баня · {b.capacityLabel}</span>
          <h1>{b.title}</h1>
          <p>{b.heroDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="banya-detail">
            <div className="banya-gallery reveal" data-gallery>
              <div className="main-shot"><img src={b.gallery[0]} alt={b.galleryAlt} /></div>
              <div className="thumbs">
                {b.gallery.map((src, i) => (
                  <button key={src} className={i === 0 ? 'active' : ''} data-full={src}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <aside className="banya-info reveal">
              <div className="plaque">
                <h2>{b.shortTitle}</h2>
                {b.plankRows.map((r) => (
                  <div className="plank-row" key={r.label}>
                    <span>{r.label}</span><b>{r.value}</b>
                  </div>
                ))}
                <div className="price-table">
                  {b.priceTable.map((r) => (
                    <div className="pr" key={r.label}><span>{r.label}</span><b>{r.value}</b></div>
                  ))}
                </div>
                <p className="note">{b.priceNote}</p>
                <BookingForm banya={b.shortTitle} settings={settings} defaultPeople={String(b.capacity)} />
              </div>
            </aside>
          </div>

          <div className="detail-text reveal" style={{ maxWidth: '760px', marginTop: '46px' }}>
            <h3>Кратко о банном домике</h3>
            <p>{b.intro}</p>
            <h4>{b.actualTitle}</h4>
            <ul>{b.actualItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <ul className="detail-feats">{b.detailFeats.map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>Дополнительные услуги</h4>
            <p>Рады предложить наши <Link href="/uslugi" style={{ color: 'var(--ember)', fontWeight: 700 }}>дополнительные услуги</Link>: {b.extraServicesText}</p>
          </div>
        </div>
      </section>

      <section className="section section--cream2">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">Другие бани</span><h2>Смотрите также</h2></div>
          <div className="other-banyas">
            {others.map((o) => (
              <Link className="mini-card reveal" href={`/arenda-ban/${o.slug}`} key={o.slug}>
                <h4>{o.shortTitle}</h4>
                <p className="mp">от <b>{o.priceFromLabel}</b> · {o.capacityLabel}</p>
                <span className="btn btn--ghost">Посмотреть</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
