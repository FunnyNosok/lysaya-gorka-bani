import Link from 'next/link';
import type { Metadata } from 'next';
import { banyas as seedBanyas } from '@/data/banyas';
import { getSettings, getAllBanyas } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export const metadata: Metadata = {
  title: 'Аренда русской бани в Екатеринбурге — бани «Лысой горки»',
  description: 'Аренда бани в Екатеринбурге: Русский домик, Лесной домик, Морской домик, Царские хоромы. Цены от 1100 до 4500 руб/час, вместимость 5–20 человек.',
};

export default async function BanyasPage() {
  const settings = await getSettings().catch(() => defaultSettings);
  const banyas = await getAllBanyas().catch(() => seedBanyas);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/ban/main-2.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Бани</nav>
          <span className="eyebrow">Наши бани</span>
          <h1>Аренда русской бани в Екатеринбурге</h1>
          <p>Четыре банных домика по старинным обычаям — настоящая баня на дровах, веники, парильщики и уютная территория. Цены от 1 100 до 4 500 ₽/час, вместимость от 5 до 20 человек.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal" style={{ marginBottom: '34px' }}>
            <p className="lead" style={{ margin: 0 }}>Аренда бани в Екатеринбурге не одна, и можно выбрать из нескольких вариантов, но все они придерживаются старинных обычаев, возрождая настоящую баню. Стоимость аренды зависит от вместимости (от 5 до 20 человек) и времени суток. К каждой бане — обязательная парилка, комната отдыха и дополнительные услуги: парильщик, массажист, кафе, бассейн и беседки с мангалом.</p>
          </div>
          <div className="banya-grid">
            {banyas.map((b) => (
              <article className="banya-card reveal" key={b.slug}>
                <div className="banya-card__media">
                  <span className="banya-tag">{b.tag}</span>
                  <span className="banya-price">от <b>{b.priceFromLabel}</b></span>
                  <img src={b.cardImage} alt={b.title} />
                </div>
                <div className="banya-card__body">
                  <h3>{b.title}</h3>
                  <span className="cap">{b.shortDescription}</span>
                  <ul className="banya-feats">{b.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="banya-card__cta">
                    <a className="btn btn--ember" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу забронировать баню ' + b.shortTitle + '.')}`} target="_blank" rel="noopener noreferrer">Заказать</a>
                    <Link className="btn btn--ghost" href={`/arenda-ban/${b.slug}`}>Подробнее</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow eyebrow--center">К бане</span>
            <h2>Дополнительные услуги</h2>
          </div>
          <div className="svc-grid">
            <Link className="svc-card reveal" href="/uslugi/parilshchika"><img src="/images/services/parilshchik.jpg" alt="" /><div className="svc-card__body"><h3>Парильщик</h3><p>10+ видов парения</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
            <Link className="svc-card reveal" href="/uslugi/kafe"><img src="/images/services/kafe.jpg" alt="" /><div className="svc-card__body"><h3>Кафе</h3><p>Русская и кавказская кухня</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
            <Link className="svc-card reveal" href="/uslugi/bassejn"><img src="/images/ban/morskoy-domik.jpg" alt="" /><div className="svc-card__body"><h3>Бассейн</h3><p>Открытый, на улице</p><span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></div></Link>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Не знаете, какую баню выбрать?</h2>
          <p>Позвоните — подберём домик под вашу компанию и повод.</p>
          <div className="cta-band__actions">
            <a className="btn btn--ember btn--lg" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте! Помогите выбрать баню.')}`} target="_blank" rel="noopener noreferrer">Написать в WhatsApp</a>
            <a className="btn btn--cream btn--lg" href={`tel:${settings.phoneHref}`}>Позвонить</a>
          </div>
          <a className="cta-band__phone" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
        </div>
      </section>
    </>
  );
}
