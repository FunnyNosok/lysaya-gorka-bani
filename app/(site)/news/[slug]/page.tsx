import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublishedPosts, getPostBySlug } from '@/lib/content';
import { seedPosts } from '@/data/posts';
import { getSettings } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => seedPosts);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => seedPosts.find((p) => p.slug === slug) || null);
  if (!post) return { title: 'Не найдено' };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => seedPosts.find((p) => p.slug === slug) || null);
  if (!post || post.status !== 'published') notFound();

  const settings = await getSettings().catch(() => defaultSettings);
  const paragraphs = post.content.split('\n').filter((l) => l.trim());

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src={post.image} alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb">
            <Link href="/">Главная</Link><span>/</span>
            <Link href="/news">Акции и статьи</Link><span>/</span>
            {post.title}
          </nav>
          <span className="eyebrow">{post.typeLabel}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-card" style={{ display: 'block', maxWidth: '820px', margin: '0 auto' }}>
            <div className="news-card__media" style={{ aspectRatio: '16/9' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="news-card__body" style={{ padding: '28px 30px 32px' }}>
              <span className="date">{post.dateLabel} · {post.typeLabel}</span>
              {paragraphs.map((p, i) => (
                <p key={i} style={i === 0 ? { fontSize: '1.1rem', color: 'var(--ink)' } : {}}>{p}</p>
              ))}
              {post.note && (
                <p style={{ fontSize: '.84rem', color: 'var(--ink-soft)' }}>{post.note}</p>
              )}
              {post.ctaText && post.type === 'offer' && (
                <div style={{ marginTop: '16px' }}>
                  <a className="btn btn--ember" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(post.ctaWhatsappText || settings.whatsappText)}`} target="_blank" rel="noopener noreferrer">{post.ctaText}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Лёгкого пара!</h2>
          <p>Бронируйте баню заранее — подберём идеальный домик под вашу компанию.</p>
          <div className="cta-band__actions">
            <a className="btn btn--ember btn--lg" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappText)}`} target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
            <a className="btn btn--cream btn--lg" href={`tel:${settings.phoneHref}`}>Позвонить</a>
          </div>
        </div>
      </section>
    </>
  );
}
