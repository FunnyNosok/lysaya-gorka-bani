import Link from 'next/link';
import type { SiteSettings } from '@/data/settings';
import type { Banya } from '@/data/banyas';
import type { Cottage } from '@/data/cottages';
import type { Service } from '@/data/services';

const VENIK_SVG = (
  <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M22 13h20M24 18h16" strokeWidth="3.4" />
    <path d="M32 18v12" />
    <path d="M32 30c-9 9-13 24-15 45M32 30c-7 10-10 25-11 46M32 30c-3 12-4 27-4 46M32 30v46M32 30c3 12 4 27 4 46M32 30c7 10 10 25 11 46M32 30c9 9 13 24 15 45" />
  </svg>
);

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.7-1.2-4.4-3.9-4.6-4.1-.1-.2-1-1.4-1-2.6 0-1.3.6-1.9.9-2.1.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.1 1.2Z" />
  </svg>
);

type HeaderProps = {
  settings: SiteSettings;
  banyas?: Banya[];
  cottages?: Cottage[];
  services?: Service[];
};

export function Header({ settings, banyas = [], cottages = [], services = [] }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Лысая горка — на главную">
          <span className="venik" aria-hidden="true">{VENIK_SVG}</span>
          <span className="brand-text">
            <span className="brand-name">Лысая <b>горка</b></span>
            <span className="brand-sub">русские бани</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          <Link href="/">Главная</Link>
          <span className="has-sub">
            <Link href="/arenda-ban">Бани</Link>
            <span className="submenu">
              {banyas.map((b) => (
                <Link key={b.slug} href={`/arenda-ban/${b.slug}`}>{b.title}</Link>
              ))}
            </span>
          </span>
          <span className="has-sub">
            <Link href="/arenda-cottage">Коттеджи</Link>
            <span className="submenu">
              {cottages.map((c) => (
                <Link key={c.slug} href={`/arenda-cottage/${c.slug}`}>{c.title}</Link>
              ))}
            </span>
          </span>
          <span className="has-sub">
            <Link href="/uslugi">Услуги</Link>
            <span className="submenu">
              {services.map((s) => (
                <Link key={s.slug} href={`/uslugi/${s.slug}`}>{s.title}</Link>
              ))}
            </span>
          </span>
          <Link href="/news">Акции и статьи</Link>
          <Link href="/otzivy">Отзывы</Link>
          <Link href="/kontakty">Контакты</Link>
        </nav>

        <div className="header-cta">
          <div className="header-phone">
            <b><a href={`tel:${settings.phoneHref}`}>{settings.phone}</a></b>
            <small>{settings.address}</small>
          </div>
          <a
            className="wa-btn"
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {WA_SVG}WhatsApp
          </a>
        </div>

        <button className="nav-toggle" aria-label="Меню" aria-expanded="false"><span></span></button>
      </div>
    </header>
  );
}
