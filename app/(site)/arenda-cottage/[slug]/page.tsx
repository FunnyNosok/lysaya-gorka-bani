import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cottages as seedCottages, cottageSlugs } from '@/data/cottages';
import { banyas as seedBanyas } from '@/data/banyas';
import { BookingContact } from '@/components/Contact';
import { getSettings, getAllCottages, getAllBanyas } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export async function generateStaticParams() {
  return cottageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const all = await getAllCottages().catch(() => seedCottages);
  const c = all.find((x) => x.slug === slug);
  if (!c) return { title: 'Не найдено' };
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function CottageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cottages = await getAllCottages().catch(() => seedCottages);
  const banyas = await getAllBanyas().catch(() => seedBanyas);
  const c = cottages.find((x) => x.slug === slug);
  if (!c) notFound();

  const settings = await getSettings().catch(() => defaultSettings);
  const otherCottage = cottages.find((x) => x.slug !== c.slug);
  const tsarsBanya = banyas.find((b) => b.slug === 'tsarskie-khoromy');
  const links = [
    otherCottage && { href: `/arenda-cottage/${otherCottage.slug}`, title: otherCottage.title, mp: `${otherCottage.capacityLabel} · ${otherCottage.tag}` },
    c.slug === 'russkiy-domik' && banyas.find((b) => b.slug === 'russkiy-domik') && { href: `/arenda-ban/russkiy-domik`, title: 'Баня «Русский домик»', mp: `от ${banyas.find((b) => b.slug === 'russkiy-domik')!.priceFromLabel} · 10 человек` },
    c.slug === 'tsarskie-khoromy' && tsarsBanya && { href: `/arenda-ban/tsarskie-khoromy`, title: 'Баня «Царские хоромы»', mp: `от ${tsarsBanya.priceFromLabel} · 20 человек` },
    { href: '/uslugi/kafe', title: 'Кафе', mp: 'Русская и кавказская кухня' },
  ].filter(Boolean) as { href: string; title: string; mp: string }[];

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src={c.heroImage} alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb">
            <Link href="/">Главная</Link><span>/</span>
            <Link href="/arenda-cottage">Коттеджи</Link><span>/</span>
            {c.shortTitle}
          </nav>
          <span className="eyebrow">{c.heroEyebrow}</span>
          <h1>{c.title}</h1>
          <p>{c.heroDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="banya-detail">
            <div className="banya-gallery reveal">
              <div className="main-shot"><img src={c.heroImage} alt={c.galleryAlt} /></div>
            </div>
            <aside className="banya-info reveal">
              <div className="plaque">
                <h2>{c.shortTitle}</h2>
                {c.plankRows.map((r) => (
                  <div className="plank-row" key={r.label}><span>{r.label}</span><b>{r.value}</b></div>
                ))}
                <p className="note">{c.priceNote}</p>
                <BookingContact settings={settings} object={c.shortTitle} />
              </div>
            </aside>
          </div>

          <div className="detail-text reveal" style={{ maxWidth: '760px', marginTop: '46px' }}>
            <h3>{c.slug === 'tsarskie-khoromy' ? 'Коттедж всегда открыт для гостей' : 'Для небольших праздников и отдельных гостей'}</h3>
            <p>{c.intro}</p>
            <h4>{c.hasTitle}</h4>
            <ul>{c.hasItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <ul className="detail-feats">{c.detailFeats.map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>Дополнительные услуги</h4>
            <p>К коттеджу — <Link href="/uslugi/kafe" style={{ color: 'var(--ember)', fontWeight: 700 }}>кафе</Link> с {c.extraServicesText}</p>
          </div>
        </div>
      </section>

      <section className="section section--cream2">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">Смотрите также</span><h2>{c.slug === 'tsarskie-khoromy' ? 'Ещё коттедж' : 'Ещё варианты'}</h2></div>
          <div className="other-banyas">
            {links.map((l) => (
              <Link className="mini-card reveal" href={l.href} key={l.href + l.title}>
                <h4>{l.title}</h4>
                <p className="mp">{l.mp}</p>
                <span className="btn btn--ghost">Посмотреть</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
