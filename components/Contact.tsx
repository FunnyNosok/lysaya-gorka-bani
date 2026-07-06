import type { SiteSettings } from '@/data/settings';

export const TG_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.7 4.3 2.9 11.6c-1.1.4-1.1 2 .1 2.3l4.7 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.5 4.7 3.5c.7.5 1.8.1 2-.8L23.4 5.5c.2-1-.8-1.9-1.7-1.2ZM9.5 15.1l-.4 3.9-1.2-4 9-6.9-7.4 7Z" />
  </svg>
);

export const MAX_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.6c-5.4 0-9.8 3.6-9.8 8.1 0 2.5 1.4 4.8 3.6 6.3-.1 1-.6 2.5-1.4 3.5-.3.4.1.9.5.8 2-.4 3.7-1.1 4.8-1.8.7.1 1.5.2 2.3.2 5.4 0 9.8-3.6 9.8-8.1S17.4 2.6 12 2.6Z" />
  </svg>
);

export const PHONE_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4c0 1-1 2-2 2A16 16 0 0 1 3 6c0-1 1-2 2-2Z" />
  </svg>
);

/**
 * Ссылка на Telegram. Если в настройках задан telegram — используем его
 * (username, @username или полный URL). Иначе строим ссылку по номеру
 * телефона: https://t.me/+<цифры> — Telegram открывает чат по номеру.
 */
export function tgHref(settings: SiteSettings): string {
  const raw = (settings.telegram || '').trim();
  if (raw) {
    if (raw.startsWith('http') || raw.startsWith('tg:')) return raw;
    return `https://t.me/${raw.replace(/^@/, '')}`;
  }
  const digits = (settings.phone2Href || settings.phoneHref || '').replace(/\D/g, '');
  return digits ? `https://t.me/+${digits}` : '';
}

/**
 * Ссылка на MAX. Прямых ссылок по номеру телефона у MAX нет —
 * нужна персональная ссылка профиля (https://max.ru/u/…) из приложения.
 * Возвращаем то, что задано в настройках, иначе пусто (кнопка скрывается).
 */
export function maxHref(settings: SiteSettings): string {
  return (settings.max || '').trim();
}

/**
 * Ряд кнопок связи: Telegram, MAX (если заданы в настройках) и звонок.
 * Используется в hero и CTA-блоках. Кнопки мессенджеров показываются,
 * только если в админке заполнены соответствующие ссылки.
 */
export function ContactButtons({
  settings,
  size = 'lg',
  callLabel = 'Позвонить',
  callHref,
}: {
  settings: SiteSettings;
  size?: 'lg' | 'md';
  callLabel?: string;
  callHref?: string;
}) {
  const lg = size === 'lg' ? ' btn--lg' : '';
  const tel = callHref || settings.phoneHref;
  const tg = tgHref(settings);
  const max = maxHref(settings);
  return (
    <div className="cta-band__actions">
      {tg && (
        <a className={`btn btn--tg${lg}`} href={tg} target="_blank" rel="noopener noreferrer">{TG_SVG}Telegram</a>
      )}
      {max && (
        <a className={`btn btn--max${lg}`} href={max} target="_blank" rel="noopener noreferrer">{MAX_SVG}MAX</a>
      )}
      <a className={`btn btn--cream${lg}`} href={`tel:${tel}`}>{callLabel}</a>
    </div>
  );
}

/**
 * Компактный блок бронирования вместо формы: звонок + мессенджеры.
 * Ставится в «плашку» на страницах бань/коттеджей и на странице контактов.
 */
export function BookingContact({
  settings,
  object,
  heading = 'Забронировать',
}: {
  settings: SiteSettings;
  object?: string;
  heading?: string;
}) {
  const tg = tgHref(settings);
  const max = maxHref(settings);
  return (
    <div className="booking-contact">
      <h3 className="booking-contact__title">{heading}</h3>
      <p className="booking-contact__lead">
        {object ? <>«{object}» — п</> : 'П'}озвоните или напишите в мессенджере, забронируем удобное время.
      </p>
      <a className="btn btn--ember btn--block btn--lg" href={`tel:${settings.phone2Href}`}>{PHONE_SVG}Позвонить {settings.phone2}</a>
      {tg && (
        <a className="btn btn--tg btn--block" href={tg} target="_blank" rel="noopener noreferrer">{TG_SVG}Написать в Telegram</a>
      )}
      {max && (
        <a className="btn btn--max btn--block" href={max} target="_blank" rel="noopener noreferrer">{MAX_SVG}Написать в MAX</a>
      )}
      <p className="form-note">Или основной телефон: <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a></p>
    </div>
  );
}
