import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/content';
import { seedPosts } from '@/data/posts';
import { getSettings } from '@/lib/content';
import { defaultSettings } from '@/data/settings';
import { ContactButtons } from '@/components/Contact';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Акции и статьи — русские бани «Лысая горка», Екатеринбург',
  description: 'Акции и статьи бани Лысая горка: кальян в подарок, скидка на день рождения, 1 час бани в подарок, про чай, парильщик, детские парения.',
};

export default async function NewsPage() {
  const settings = await getSettings().catch(() => defaultSettings);
  const posts = await getPublishedPosts().catch(() => seedPosts.filter((p) => p.status === 'published'));

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/news/derevyannye-bani.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Акции и статьи</nav>
          <span className="eyebrow">Акции и статьи</span>
          <h1>Специальные предложения и статьи о бане</h1>
          <p>Действующие акции комплекса «Лысая горка» и полезные статьи о банных традициях, чае и парении.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-list">
            {posts.map((p) => (
              <article className="news-card reveal" key={p.id}>
                <Link href={`/news/${p.slug}`} className="news-card__media">
                  <img src={p.image} alt={p.title} />
                </Link>
                <div className="news-card__body">
                  <span className="date">{p.dateLabel} · {p.typeLabel}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  {p.ctaText && p.type === 'offer' ? (
                    <a className="btn btn--ember" href={`tel:${settings.phone2Href}`}>{p.ctaText}</a>
                  ) : (
                    <Link className="more" href={`/news/${p.slug}`}>Читать полностью <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Воспользуйтесь акцией</h2>
          <p>Бронируйте баню заранее и получайте бонусы — лёгкого пара!</p>
          <ContactButtons settings={settings} />
          <a className="cta-band__phone" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
        </div>
      </section>
    </>
  );
}
