import Link from 'next/link';
import type { Metadata } from 'next';
import { services as seedServices } from '@/data/services';
import { getSettings, getAllServices } from '@/lib/content';
import { defaultSettings } from '@/data/settings';
import { ContactButtons } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Дополнительные услуги — кафе, бассейн, парильщик, массаж, СПА | Лысая горка',
  description: 'Услуги бани Лысая горка: кафе русской и кавказской кухни, открытый бассейн, услуги парильщика (10+ видов парения), массаж, СПА для девушек.',
};

export default async function ServicesPage() {
  const settings = await getSettings().catch(() => defaultSettings);
  const services = await getAllServices().catch(() => seedServices);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/services/parilshchik.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Услуги</nav>
          <span className="eyebrow">Дополнительные услуги</span>
          <h1>Всё для отдыха в одном месте</h1>
          <p>Услуги, предоставляемые в оздоровительном комплексе русских бань «Лысая горка»: кафе, бассейн, парильщики, массаж и СПА-программа для девушек.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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

      <section className="section section--dark">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow eyebrow--center">Банкеты и праздники</span>
            <h2>Аренда банкетного зала</h2>
            <p className="lead">Банный комплекс приглашает гостей для проведения праздничных мероприятий. Банкетный зал, оформленный в исконно русских традициях, вмещает 20 гостей.</p>
          </div>
          <div style={{ textAlign: 'center' }} className="reveal">
            <img src="/images/services/banket.jpg" alt="Банкетный зал" style={{ borderRadius: '16px', maxWidth: '880px', boxShadow: '0 24px 50px -20px rgba(0,0,0,.6)', margin: '0 auto' }} />
            <div style={{ marginTop: '26px' }}>
              <a className="btn btn--ember btn--lg" href={`tel:${settings.phone2Href}`}>Арендовать банкетный зал</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="container cta-band__inner reveal">
          <h2>Закажите услуги к бане</h2>
          <p>Парильщик, массаж, кафе и бассейн — добавьте к отдыху всё, что хочется.</p>
          <ContactButtons settings={settings} />
          <a className="cta-band__phone" href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
        </div>
      </section>
    </>
  );
}
