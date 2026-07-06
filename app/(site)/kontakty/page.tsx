import Link from 'next/link';
import type { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';
import { getSettings } from '@/lib/content';
import { defaultSettings } from '@/data/settings';

export const metadata: Metadata = {
  title: 'Контакты — русские бани «Лысая горка», Екатеринбург',
  description: 'Контакты бани Лысая горка: Екатеринбург, Предельная, 41. Телефон +7 (343) 213-75-77, WhatsApp, почта, карта, соцсети.',
};

export default async function ContactsPage() {
  const settings = await getSettings().catch(() => defaultSettings);

  return (
    <>
      <section className="page-hero">
        <div className="hero-bg"><img src="/images/cottages/tsarskie-khoromy.jpg" alt="" /></div>
        <div className="steam" aria-hidden="true"><i></i><i></i><i></i></div>
        <div className="page-hero__inner">
          <nav className="breadcrumb"><Link href="/">Главная</Link><span>/</span>Контакты</nav>
          <span className="eyebrow">Контакты</span>
          <h1>Свяжитесь с нами</h1>
          <p>Оздоровительный комплекс русских бань «Лысая горка». Звоните, пишите в WhatsApp или приезжайте — всегда рады гостям.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contacts">
            <div className="reveal">
              <ul className="contact-list">
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
                  <span><b>Адрес</b><span>{settings.address}<br />{settings.addressArea}</span></span>
                </li>
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2Z" /></svg></span>
                  <span><b>Телефоны</b><a href={`tel:${settings.phoneHref}`}>{settings.phone}</a><br /><a href={`tel:${settings.phone2Href}`}>{settings.phone2}</a></span>
                </li>
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1-1.4-1-2.6 0-1.3.6-1.9.9-2.1.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.2Z" /></svg></span>
                  <span><b>WhatsApp</b><a href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Здравствуйте!')}`} target="_blank" rel="noopener noreferrer">{settings.phone2}</a></span>
                </li>
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg></span>
                  <span><b>Почта</b><a href={`mailto:${settings.email}`}>{settings.email}</a></span>
                </li>
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg></span>
                  <span><b>Панорамы комплекса</b><a href={settings.panorama} target="_blank" rel="noopener noreferrer">panorama66.ru/banya/nagorke</a></span>
                </li>
                <li>
                  <span className="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 8h6M9 12h4M5 4h14v16l-4-3-3 3-3-3-4 3V4Z" /></svg></span>
                  <span><b>Мы в соцсетях</b><a href={settings.vk} target="_blank" rel="noopener noreferrer">ВКонтакте</a> · <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></span>
                </li>
              </ul>

              <div className="form-card" style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Забронировать баню</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '16px' }}>Заполните форму — откроется WhatsApp с готовым сообщением.</p>
                <BookingForm banya="" settings={settings} submitLabel="Отправить в WhatsApp" />
                <p className="form-note">Или позвоните: <a href={`tel:${settings.phoneHref}`} style={{ color: 'var(--ember)', fontWeight: 700 }}>{settings.phone}</a></p>
              </div>
            </div>

            <div className="reveal">
              <div className="map-wrap">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${settings.mapLon}%2C${settings.mapLat}&z=${settings.mapZoom}&pt=${settings.mapLon},${settings.mapLat}`}
                  title="Карта — Екатеринбург, Предельная, 41"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a className="btn btn--ghost btn--block" style={{ marginTop: '14px' }} href={`yandexnavi://show_point_on_map?lat=${settings.mapLat}&lon=${settings.mapLon}&zoom=14`}>Построить маршрут в Яндекс.Навигаторе</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
