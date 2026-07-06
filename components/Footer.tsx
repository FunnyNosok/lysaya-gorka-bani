import Link from 'next/link';
import type { SiteSettings } from '@/data/settings';
import { banyas } from '@/data/banyas';
import { services } from '@/data/services';
import { TG_SVG, MAX_SVG } from '@/components/Contact';

const VENIK_SVG = (
  <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M22 13h20M24 18h16" strokeWidth="3.4" />
    <path d="M32 18v12" />
    <path d="M32 30c-9 9-13 24-15 45M32 30c-7 10-10 25-11 46M32 30c-3 12-4 27-4 46M32 30v46M32 30c3 12 4 27 4 46M32 30c7 10 10 25 11 46M32 30c9 9 13 24 15 45" />
  </svg>
);

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="venik" aria-hidden="true">{VENIK_SVG}</span>
              <span className="brand-text"><span className="brand-name">Лысая <b>горка</b></span><span className="brand-sub">русские бани</span></span>
            </Link>
            <p>Оздоровительный комплекс русских бань в Екатеринбурге. Пар на дровах, веники, парильщики, кафе и бассейн — отдых для тела и души.</p>
            <div className="socials">
              <a href={settings.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 16.8c-5 0-8.3-3.6-8.4-9.4h2.6c.1 4.3 2 6.1 3.4 6.5V7.4h2.5v3.7c1.4-.2 2.9-1.8 3.4-3.7h2.5c-.4 2.2-1.9 3.8-3 4.5 1.1.6 2.8 2 3.5 4.9h-2.7c-.5-1.8-1.9-3.2-3.7-3.4v3.4h-.4Z" /></svg>
              </a>
              {settings.telegram && (
                <a href={settings.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">{TG_SVG}</a>
              )}
              {settings.max && (
                <a href={settings.max} target="_blank" rel="noopener noreferrer" aria-label="MAX">{MAX_SVG}</a>
              )}
            </div>
          </div>
          <div className="footer-col">
            <h4>Бани</h4>
            {banyas.map((b) => (
              <Link key={b.slug} href={`/arenda-ban/${b.slug}`}>{b.shortTitle}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Услуги</h4>
            {services.map((s) => (
              <Link key={s.slug} href={`/uslugi/${s.slug}`}>{s.shortTitle}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span>{settings.address}<br />{settings.addressArea}</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2Z" /></svg>
                <span><a href={`tel:${settings.phoneHref}`}>{settings.phone}</a><br /><a href={`tel:${settings.phone2Href}`}>{settings.phone2}</a></span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {settings.yearFrom}–{year} Русские бани «Лысая горка». Екатеринбург.</span>
          <span>Бани · Коттеджи · Кафе · СПА</span>
        </div>
      </div>
    </footer>
  );
}
