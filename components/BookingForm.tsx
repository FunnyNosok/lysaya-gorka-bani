'use client';

import { useState } from 'react';
import type { SiteSettings } from '@/data/settings';

type Props = {
  banya?: string;
  settings: SiteSettings;
  dateLabel?: string;
  datePlaceholder?: string;
  submitLabel?: string;
  showHours?: boolean;
  defaultPeople?: string;
};

export function BookingForm({
  banya = '',
  settings,
  dateLabel = 'Дата и время',
  datePlaceholder = 'Например: суббота, 19:00',
  submitLabel = 'Забронировать в WhatsApp',
  showHours = true,
  defaultPeople = '10',
}: Props) {
  const [ok, setOk] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '');
    const phone = String(fd.get('phone') || '');
    const date = String(fd.get('date') || '');
    const hours = String(fd.get('hours') || '');
    const people = String(fd.get('people') || '');

    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, object: banya, date, hours, people, source: 'site' }),
      });
    } catch {
      // ignore — WhatsApp fallback still works
    }

    let msg = 'Здравствуйте! Хочу забронировать баню';
    if (banya) msg += ' — ' + banya;
    msg += '.';
    if (name) msg += '\nИмя: ' + name;
    if (phone) msg += '\nТелефон: ' + phone;
    if (date) msg += '\n' + dateLabel + ': ' + date;
    if (hours) msg += '\nЧасов: ' + hours;
    if (people) msg += '\nЧеловек: ' + people;

    setOk(true);
    setSent(true);
    window.open('https://wa.me/' + settings.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
  }

  return (
    <form id="book-form" data-banya={banya} onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="n">Ваше имя</label>
        <input id="n" name="name" placeholder="Как к вам обращаться" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="p">Телефон</label>
        <input id="p" name="phone" type="tel" placeholder="+7 ___ ___-__-__" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="d">{dateLabel}</label>
        <input id="d" name="date" placeholder={datePlaceholder} />
      </div>
      {showHours ? (
        <div className="field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label htmlFor="h">Часов</label>
            <input id="h" name="hours" placeholder="3" />
          </div>
          <div>
            <label htmlFor="g">Гостей</label>
            <input id="g" name="people" placeholder={defaultPeople} />
          </div>
        </div>
      ) : (
        <div className="field">
          <label htmlFor="g">Гостей</label>
          <input id="g" name="people" placeholder={defaultPeople} />
        </div>
      )}
      <button className="btn btn--ember btn--block btn--lg" type="submit">{submitLabel}</button>
      <p className="form-note">Нажимая кнопку, вы откроете WhatsApp с готовым сообщением для администратора.</p>
      {ok && (
        <div className="form-ok show">
          {sent ? 'Спасибо! Заявка отправлена — откройте WhatsApp и отправьте сообщение, мы свяжемся с вами.' : ''}
        </div>
      )}
    </form>
  );
}
