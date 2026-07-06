import Link from 'next/link';
import type { Metadata } from 'next';
import { reviews } from '@/data/reviews';
import { getSettings } from '@/lib/content';
import { defaultSettings } from '@/data/settings';
import { tgHref } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Отзывы — русские бани «Лысая горка», Екатеринбург',
  description: 'Отзывы гостей бани Лысая горка в Екатеринбурге о банях, парильщиках, кафе и отдыхе.',
};

export default async function ReviewsPage() {
  const settings = await getSettings().catch(() => defaultSettings);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/ban/main-2.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Отзывы</nav>
          <span className="eyebrow">Отзывы</span>
          <h1>Что говорят наши гости</h1>
          <p>Мы рады каждому гостю и стараемся делать отдых в «Лысой горке» по-настоящему тёплым. Будем благодарны и за ваш отзыв.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reviews">
            {reviews.map((r) => (
              <div className="review reveal" key={r.id}>
                <div className="stars">{'★'.repeat(r.stars)}</div>
                <blockquote>{r.text}</blockquote>
                <div className="who">
                  <span className="avatar">{r.authorInitials}</span>
                  <span><b>{r.author}</b><small>{r.meta}</small></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Оставьте свой отзыв</h2>
          <p>Понравилось у нас? Напишите нам в Telegram или ВКонтакте — будем рады вашим впечатлениям.</p>
          <div className="cta-band__actions">
            {tgHref(settings) && (
              <a className="btn btn--tg btn--lg" href={tgHref(settings)} target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
            )}
            <a className="btn btn--ember btn--lg" href={settings.vk} target="_blank" rel="noopener noreferrer">Мы ВКонтакте</a>
            <a className="btn btn--cream btn--lg" href={`tel:${settings.phoneHref}`}>Позвонить</a>
          </div>
        </div>
      </section>
    </>
  );
}
