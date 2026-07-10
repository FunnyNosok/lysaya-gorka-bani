import Link from 'next/link';
import type { SiteSettings } from '@/data/settings';
import type { Banya } from '@/data/banyas';
import type { Cottage } from '@/data/cottages';
import type { Service } from '@/data/services';
import { TG_SVG, MAX_SVG, tgHref, maxHref } from '@/components/Contact';

const VENIK_SVG = (
  <svg viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M22 13h20M24 18h16" strokeWidth="3.4" />
    <path d="M32 18v12" />
    <path d="M32 30c-9 9-13 24-15 45M32 30c-7 10-10 25-11 46M32 30c-3 12-4 27-4 46M32 30v46M32 30c3 12 4 27 4 46M32 30c7 10 10 25 11 46M32 30c9 9 13 24 15 45" />
  </svg>
);

type HeaderProps = {
  settings: SiteSettings;
  banyas?: Banya[];
  cottages?: Cottage[];
  services?: Service[];
};

export function Header({ settings, banyas = [], cottages = [], services = [] }: HeaderProps) {
  const tg = tgHref(settings);
  const max = maxHref(settings);
  return (
    <>
    <div className="header-wrap">
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Русские бани Лысая Горка — на главную">
          <span className="venik" aria-hidden="true">{VENIK_SVG}</span>
          <span className="brand-text">
            <span className="brand-name">Лысая <b>Горка</b></span>
            <span className="brand-sub">русские бани</span>
          </span>
        </Link>

        <div className="nav-desktop">
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
        </div>

        <div className="header-cta">
          <div className="header-phone">
            <b><a href={`tel:${settings.phoneHref}`}>{settings.phone}</a></b>
            <small>{settings.address}</small>
          </div>
          {tg && (
            <a className="msg-btn msg-btn--tg" href={tg} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              {TG_SVG}<span>Telegram</span>
            </a>
          )}
          {max && (
            <a className="msg-btn msg-btn--max" href={max} target="_blank" rel="noopener noreferrer" aria-label="MAX">
              {MAX_SVG}<span>MAX</span>
            </a>
          )}
          <a className="msg-btn msg-btn--call" href={`tel:${settings.phone2Href}`} aria-label="Позвонить">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2Z" /></svg><span>Позвонить</span>
          </a>
        </div>

        <button className="nav-toggle" aria-label="Меню" aria-expanded="false"><span></span></button>
      </div>
    </header>
    </div>

    <nav className="nav" aria-label="Основная навигация">
      <button className="nav-close" aria-label="Закрыть меню"><span></span></button>
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

      <div className="nav-contacts">
        <a href={`tel:${settings.phoneHref}`} className="nav-contacts__phone">{settings.phone}</a>
        {tg && (
          <a className="nav-contacts__link" href={tg} target="_blank" rel="noopener noreferrer">{TG_SVG} Telegram</a>
        )}
        {max && (
          <a className="nav-contacts__link" href={max} target="_blank" rel="noopener noreferrer">{MAX_SVG} MAX</a>
        )}
        <a className="nav-contacts__link" href={`tel:${settings.phone2Href}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2Z" /></svg>
          Позвонить
        </a>
      </div>
    </nav>
    </>
  );
}
