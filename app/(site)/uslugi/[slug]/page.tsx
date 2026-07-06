import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services as seedServices, serviceSlugs } from '@/data/services';
import { getSettings, getAllServices } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const all = await getAllServices().catch(() => seedServices);
  const s = all.find((x) => x.slug === slug);
  if (!s) return { title: 'Не найдено' };
  return { title: s.seoTitle, description: s.seoDescription };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getAllServices().catch(() => seedServices);
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const settings = await getSettings().catch(() => defaultSettings);
  const paragraphs = s.bodyIntro ? [s.bodyIntro] : [];

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src={s.heroImage} alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb">
            <Link href="/">Главная</Link><span>/</span>
            <Link href="/uslugi">Услуги</Link><span>/</span>
            {s.shortTitle}
          </nav>
          <span className="eyebrow">{s.heroEyebrow}</span>
          <h1>{s.heroTitle}</h1>
          <p>{s.heroDescription}</p>
        </div>
      </section>

      {s.programs && (
        <section className="section">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow">Наши программы</span><h2>Выберите своё парение</h2></div>
            <div className="prog-list">
              {s.programs.map((p) => (
                <div className="prog reveal" key={p.title}>
                  <div>
                    <h4>{p.title}</h4>
                    <p className="pd">{p.description}</p>
                  </div>
                  <div className="pp">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`section ${s.programs ? 'section--cream2' : ''}`}>
        <div className="container">
          <div className="svc-detail">
            <div className="svc-detail__media reveal"><img src={s.detailImage} alt={s.detailImageAlt} /></div>
            <div className="detail-text reveal">
              <h3>{s.bodyTitle}</h3>
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              {s.sections.map((sec, i) => (
                <div key={i}>
                  {sec.heading && <h4>{sec.heading}</h4>}
                  {sec.items && <ul>{sec.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                  {sec.text && <p>{sec.text}</p>}
                </div>
              ))}
              {s.plaque && (
                <div className="plaque" style={{ marginTop: '24px', maxWidth: '420px' }}>
                  {s.plaque.map((r) => (
                    <div className="plank-row" key={r.label}><span>{r.label}</span><b>{r.value}</b></div>
                  ))}
                  {s.plaqueNote && <p className="note" style={{ margin: '14px 0 0' }}>{s.plaqueNote}</p>}
                </div>
              )}
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a className="btn btn--ember btn--lg" href={`tel:${settings.phone2Href}`}>{s.ctaText}</a>
                {settings.telegram && (
                  <a className="btn btn--tg btn--lg" href={settings.telegram} target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {s.gallery && (
        <section className="section section--cream2">
          <div className="container">
            <div className="atmo reveal">
              {s.gallery.map((g) => (
                <figure key={g.src} className={g.cls || undefined}>
                  <img src={g.src} alt={g.alt} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
