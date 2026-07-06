import Link from 'next/link';
import { banyas as seedBanyas } from '@/data/banyas';
import { services as seedServices } from '@/data/services';
import { getPublishedOffers, getSettings, getAllBanyas, getAllServices } from '@/lib/content';
import { defaultSettings } from '@/data/settings';
import { ContactButtons } from '@/components/Contact';

export const revalidate = 3600;

export default async function HomePage() {
  const settings = await getSettings().catch(() => defaultSettings);
  const offers = (await getPublishedOffers().catch(() => [])).slice(0, 2);
  const banyas = await getAllBanyas().catch(() => seedBanyas);
  const services = await getAllServices().catch(() => seedServices);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"><img src="/images/ban/main-12.jpg" alt="Русская баня на Лысой горе" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
        <div className="hero-inner container">
          <span className="eyebrow">Оздоровительный комплекс · Екатеринбург</span>
          <h1>Русские бани <em>на Лысой горе</em></h1>
          <p className="hero-sub">Настоящая баня на дровах, ароматные веники, профессиональные парильщики и уютная территория с бассейном и кафе. Отдохните с удовольствием — лёгкого вам пара!</p>
          <div className="hero-actions">
            <a className="btn btn--ember btn--lg" href="#bani">Выбрать баню</a>
            {settings.telegram && (
              <a className="btn btn--ghost-light btn--lg" href={settings.telegram} target="_blank" rel="noopener noreferrer">Написать в Telegram</a>
            )}
            <a className="btn btn--ghost-light btn--lg" href={`tel:${settings.phone2Href}`}>Позвонить</a>
          </div>
          <div className="hero-meta">
            <span className="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg><span><b>{settings.address}</b>{settings.addressArea}</span></span>
            <span className="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><span><b>Круглосуточно</b>будни и выходные</span></span>
            <span className="mi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg><span><b>От 1 100 ₽/час</b>4 бани · 5–20 человек</span></span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="features reveal">
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3c-2 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3-6-5-9Z" /></svg><h3>Парилка на дровах</h3><p>Настоящий живой жар</p></div>
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 14c2-2 4-2 5 0 1-2 3-2 5 0 2-3 0-7-5-7S5 11 7 14Z" /><path d="M12 7v10" /></svg><h3>Веники</h3><p>Берёза и дуб</p></div>
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="8" r="3.5" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></svg><h3>Парильщики</h3><p>10+ видов парения</p></div>
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 9h16l-1 11H5L4 9Z" /><path d="M8 9V7a4 4 0 0 1 8 0v2" /></svg><h3>Кафе</h3><p>Русская кухня</p></div>
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 13c4 0 6-2 9-2s5 2 9 2" /><path d="M3 18c4 0 6-2 9-2s5 2 9 2" /><path d="M7 9V5M17 9V5" /></svg><h3>Бассейн</h3><p>Открытый, на улице</p></div>
            <div className="feature"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 20h16M6 20V8l6-4 6 4v12" /><path d="M10 20v-5h4v5" /></svg><h3>Беседки</h3><p>С мангальной зоной</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="bani">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Наши бани</span>
            <h2>Выберите свой домик пара</h2>
            <p className="lead">Четыре бани на любой компанию — от камерной на 5 человек до царских хором на 20 гостей. В каждой своя атмосфера, парилка, комната отдыха и всё для комфортного отдыха.</p>
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
                  <span className="cap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6" /></svg>{b.card}</span>
                  <ul className="banya-feats">{b.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="banya-card__cta">
                    <a className="btn btn--ember" href={`tel:${settings.phone2Href}`}>Заказать</a>
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
            <span className="eyebrow eyebrow--center">Дополнительные услуги</span>
            <h2>Всё для отдыха в одном месте</h2>
            <p className="lead">К бане — кафе русской и кавказской кухни, открытый бассейн, мини-гостиница, парильщики, массажист и СПА-программа для девушек.</p>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <Link className="svc-card reveal" href={`/uslugi/${s.slug}`} key={s.slug}>
                <img src={s.cardImage} alt={s.cardTitle} />
                <div className="svc-card__body">
                  <h3>{s.cardTitle}</h3>
                  <p>{s.cardDescription}</p>
                  <span className="svc-card__link">Подробнее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {offers.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Акции</span>
              <h2>Специальные предложения</h2>
            </div>
            <div className="promo">
              {offers.map((o, i) => (
                <article className="promo-card reveal" key={o.id}>
                  <img src={o.image} alt={o.title} />
                  <div className="promo-card__body">
                    <span className="badge">{o.typeLabel}</span>
                    <h3>{o.title}</h3>
                    <p>{o.excerpt}</p>
                    <Link className={i === 0 ? 'btn btn--ember' : 'btn btn--ghost-light'} href="/news">Подробнее</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--cream2">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow eyebrow--center">Атмосфера</span>
            <h2>Загляните внутрь</h2>
          </div>
          <div className="atmo reveal">
            <figure className="h2"><img data-lightbox data-full="/images/ban/main-12.jpg" src="/images/ban/main-12.jpg" alt="Интерьер бани" /></figure>
            <figure><img data-lightbox data-full="/images/ban/russkiy/IMG_7096.jpg" src="/images/ban/russkiy/IMG_7096.jpg" alt="Парилка" /></figure>
            <figure><img data-lightbox data-full="/images/services/kafe.jpg" src="/images/services/kafe.jpg" alt="Кафе" /></figure>
            <figure className="w2"><img data-lightbox data-full="/images/cottages/tsarskie-khoromy.jpg" src="/images/cottages/tsarskie-khoromy.jpg" alt="Царские хоромы" /></figure>
            <figure><img data-lightbox data-full="/images/services/spa.jpg" src="/images/services/spa.jpg" alt="СПА" /></figure>
            <figure><img data-lightbox data-full="/images/ban/morskoy-domik.jpg" src="/images/ban/morskoy-domik.jpg" alt="Морской домик" /></figure>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <span className="eyebrow eyebrow--center">Лёгкого пара</span>
          <h2>Забронируйте баню заранее</h2>
          <p>Чтобы быть уверенным в наличии мест и времени, оставьте заявку — и мы подберём идеальный домик под вашу компанию.</p>
          <ContactButtons settings={settings} />
          <a className="cta-band__phone" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
        </div>
      </section>
    </>
  );
}
