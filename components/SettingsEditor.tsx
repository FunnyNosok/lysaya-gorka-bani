'use client';

import { useState } from 'react';
import type { SiteSettings } from '@/data/settings';

export function SettingsEditor({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState<SiteSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Ошибка сохранения');
      }
    } catch {
      setError('Не удалось сохранить. Проверьте подключение KV.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1.5px solid var(--line)',
    borderRadius: '10px',
    background: '#fff',
    fontSize: '.94rem',
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      {error && (
        <div style={{ background: 'rgba(210,96,42,.1)', border: '1px solid var(--ember)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', fontSize: '.9rem', color: 'var(--ember-deep)' }}>
          {error}
        </div>
      )}
      {saved && (
        <div style={{ background: 'rgba(75,90,60,.1)', border: '1px solid var(--moss)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', fontSize: '.9rem', color: '#33402a' }}>
          ✓ Настройки сохранены
        </div>
      )}

      <div className="form-card" style={{ padding: '28px' }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', marginBottom: '16px' }}>Телефоны</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Телефон 1 (отображение)</label>
            <input value={form.phone} onChange={(e) => set('phone', e.target.value)} style={inputStyle} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Телефон 1 (tel:)</label>
            <input value={form.phoneHref} onChange={(e) => set('phoneHref', e.target.value)} style={inputStyle} placeholder="+73432137577" />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Телефон 2 (отображение)</label>
            <input value={form.phone2} onChange={(e) => set('phone2', e.target.value)} style={inputStyle} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Телефон 2 (tel:)</label>
            <input value={form.phone2Href} onChange={(e) => set('phone2Href', e.target.value)} style={inputStyle} placeholder="+79530477757" />
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', margin: '24px 0 16px' }}>Мессенджеры</h3>
        <div className="field">
          <label>Telegram — ссылка или @username (необязательно)</label>
          <input value={form.telegram} onChange={(e) => set('telegram', e.target.value)} style={inputStyle} placeholder="@username или https://t.me/username" />
          <p className="form-note">Если оставить пустым — кнопка Telegram работает по номеру телефона 2 (t.me/+номер). Заполните, если нужен конкретный юзернейм.</p>
        </div>
        <div className="field">
          <label>MAX — ссылка</label>
          <input value={form.max} onChange={(e) => set('max', e.target.value)} style={inputStyle} placeholder="https://max.ru/u/…" />
          <p className="form-note">В MAX нет ссылок по номеру. Скопируйте ссылку на профиль в приложении: аватар → QR-код → «Поделиться». Кнопка появится только если поле заполнено.</p>
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', margin: '24px 0 16px' }}>Адрес</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Адрес</label>
            <input value={form.address} onChange={(e) => set('address', e.target.value)} style={inputStyle} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Район</label>
            <input value={form.addressArea} onChange={(e) => set('addressArea', e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div className="field">
          <label>Email</label>
          <input value={form.email} onChange={(e) => set('email', e.target.value)} style={inputStyle} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', margin: '24px 0 16px' }}>Соцсети и ссылки</h3>
        <div className="field">
          <label>ВКонтакте</label>
          <input value={form.vk} onChange={(e) => set('vk', e.target.value)} style={inputStyle} />
        </div>
        <div className="field">
          <label>Instagram</label>
          <input value={form.instagram} onChange={(e) => set('instagram', e.target.value)} style={inputStyle} />
        </div>
        <div className="field">
          <label>Панорамы</label>
          <input value={form.panorama} onChange={(e) => set('panorama', e.target.value)} style={inputStyle} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', margin: '24px 0 16px' }}>Карта</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Широта</label>
            <input type="number" step="0.000001" value={form.mapLat} onChange={(e) => set('mapLat', parseFloat(e.target.value))} style={inputStyle} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Долгота</label>
            <input type="number" step="0.000001" value={form.mapLon} onChange={(e) => set('mapLon', parseFloat(e.target.value))} style={inputStyle} />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Масштаб</label>
            <input type="number" value={form.mapZoom} onChange={(e) => set('mapZoom', parseInt(e.target.value))} style={inputStyle} />
          </div>
        </div>

        <button type="button" onClick={save} className="btn btn--ember btn--lg" style={{ marginTop: '8px' }}>
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}
