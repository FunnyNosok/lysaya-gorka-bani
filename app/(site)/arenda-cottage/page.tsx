import Link from 'next/link';
import type { Metadata } from 'next';
import { cottages as seedCottages } from '@/data/cottages';
import { getSettings, getAllCottages } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export const metadata: Metadata = {
  title: 'Аренда коттеджа в Екатеринбурге — коттеджи «Лысой горки»',
  description: 'Аренда коттеджей в Екатеринбурге на территории комплекса Лысая горка: Царские хоромы и Русский домик для корпоративов, свадеб, юбилеев.',
};

export default async function CottagesPage() {
  const settings = await getSettings().catch(() => defaultSettings);
  const cottages = await getAllCottages().catch(() => seedCottages);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/cottages/tsarskie-khoromy.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Коттеджи</nav>
          <span className="eyebrow">Коттеджи</span>
          <h1>Аренда коттеджа в Екатеринбурге</h1>
          <p>Два коттеджа на территории комплекса «Лысая горка» — для корпоративов, свадеб, юбилеев и вечеринок. Большая компания или отдельные гости — подберём вариант под ваш повод.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="banya-grid">
            {cottages.map((c) => (
              <article className="banya-card reveal" key={c.slug}>
                <div className="banya-card__media">
                  <span className="banya-tag">{c.tag}</span>
                  <span className="banya-price">до <b>{c.capacityLabel.replace('до ', '')}</b></span>
                  <img src={c.cardImage} alt={c.title} />
                </div>
                <div className="banya-card__body">
                  <h3>{c.title}</h3>
                  <span className="cap">{c.card}</span>
                  <ul className="banya-feats">{c.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="banya-card__cta">
                    <a className="btn btn--ember" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу арендовать коттедж ' + c.shortTitle + '.')}`} target="_blank" rel="noopener noreferrer">Заказать</a>
                    <Link className="btn btn--ghost" href={`/arenda-cottage/${c.slug}`}>Подробнее</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head section-head--center reveal"><span className="eyebrow eyebrow--center">К коттеджу</span><h2>Дополнительные услуги</h2></div>
          <div className="svc-grid">
            <Link className="svc-card reveal" href="/uslugi/kafe"><img src="/images/services/kafe.jpg" alt="" /><div className="svc-card__body"><h3>Кафе</h3><p>Русская и кавказская кухня</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
            <Link className="svc-card reveal" href="/uslugi/mini-gostinitsa"><img src="/images/services/mini-gostinitsa.jpg" alt="" /><div className="svc-card__body"><h3>Мини-гостиница</h3><p>Уютные номера</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
            <Link className="svc-card reveal" href="/uslugi/parilshchika"><img src="/images/services/parilshchik.jpg" alt="" /><div className="svc-card__body"><h3>Парильщик</h3><p>10+ видов парения</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Хотите отметить праздник?</h2>
          <p>Расскажите о мероприятии — поможем выбрать коттедж и услуги.</p>
          <div className="cta-band__actions">
            <a className="btn btn--ember btn--lg" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу арендовать коттедж.')}`} target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
            <a className="btn btn--cream btn--lg" href={`tel:${settings.phoneHref}`}>Позвонить</a>
          </div>
          <a className="cta-band__phone" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
        </div>
      </section>
    </>
  );
}
