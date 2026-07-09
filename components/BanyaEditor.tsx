'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Banya } from '@/data/banyas';

export function BanyaEditor({ initial }: { initial: Banya }) {
  const router = useRouter();
  const [form, setForm] = useState<Banya>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof Banya>(key: K, value: Banya[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleUpload(file: File, field: 'cardImage' | 'heroImage') {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.path) set(field, data.path);
      else setError(data.error || 'Ошибка загрузки');
    } catch {
      setError('Не удалось загрузить изображение');
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setError('');
    try {
      const res = await fetch('/api/admin/banyas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
      else {
        const data = await res.json();
        setError(data.error || 'Ошибка сохранения');
      }
    } catch {
      setError('Не удалось сохранить');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1.5px solid var(--line)',
    borderRadius: '8px', background: '#fff', fontSize: '.9rem',
  };

  return (
    <div style={{ maxWidth: '760px' }}>
      {error && <div style={{ background: 'rgba(210,96,42,.1)', border: '1px solid var(--ember)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '.9rem', color: 'var(--ember-deep)' }}>{error}</div>}
      {saved && <div style={{ background: 'rgba(75,90,60,.1)', border: '1px solid var(--moss)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '.9rem', color: '#33402a' }}>✓ Сохранено</div>}

      <div className="form-card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', marginBottom: '14px' }}>Основное</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div><label>Название</label><input value={form.title} onChange={(e) => set('title', e.target.value)} style={inputStyle} /></div>
          <div><label>Краткое название</label><input value={form.shortTitle} onChange={(e) => set('shortTitle', e.target.value)} style={inputStyle} /></div>
          <div><label>Тег (на карточке)</label><input value={form.tag} onChange={(e) => set('tag', e.target.value)} style={inputStyle} /></div>
          <div><label>Вместимость (метка)</label><input value={form.capacityLabel} onChange={(e) => set('capacityLabel', e.target.value)} style={inputStyle} /></div>
          <div><label>Цена от (число)</label><input type="number" value={form.priceFrom} onChange={(e) => set('priceFrom', parseInt(e.target.value) || 0)} style={inputStyle} /></div>
          <div><label>Цена от (текст)</label><input value={form.priceFromLabel} onChange={(e) => set('priceFromLabel', e.target.value)} style={inputStyle} /></div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Краткое описание (на карточке)</label>
          <input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Описание в шапке</label>
          <textarea value={form.heroDescription} onChange={(e) => set('heroDescription', e.target.value)} style={{ ...inputStyle, minHeight: '70px' }} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Фотографии</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label>Фото на карточке</label>
            {form.cardImage && <img src={form.cardImage} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '140px', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'cardImage'); }} disabled={uploading} />
          </div>
          <div>
            <label>Главное фото (шапка)</label>
            {form.heroImage && <img src={form.heroImage} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '140px', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'heroImage'); }} disabled={uploading} />
          </div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Галерея (по одной ссылке на строку)</label>
          <textarea value={form.gallery.join('\n')} onChange={(e) => set('gallery', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} style={{ ...inputStyle, minHeight: '100px', fontFamily: 'monospace', fontSize: '.82rem' }} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Цены</h3>
        <div style={{ marginBottom: '14px' }}>
          <label>Таблица цен (label | value, по одной на строку)</label>
          <textarea
            value={form.priceTable.map((r) => `${r.label}|${r.value}`).join('\n')}
            onChange={(e) => set('priceTable', e.target.value.split('\n').filter(Boolean).map((line) => { const [l, ...v] = line.split('|'); return { label: l?.trim() || '', value: v.join('|').trim() }; }))}
            style={{ ...inputStyle, minHeight: '90px', fontFamily: 'monospace', fontSize: '.82rem' }}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Примечание к ценам</label>
          <input value={form.priceNote} onChange={(e) => set('priceNote', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label>Планки (label | value)</label>
            <textarea
              value={form.plankRows.map((r) => `${r.label}|${r.value}`).join('\n')}
              onChange={(e) => set('plankRows', e.target.value.split('\n').filter(Boolean).map((line) => { const [l, ...v] = line.split('|'); return { label: l?.trim() || '', value: v.join('|').trim() }; }))}
              style={{ ...inputStyle, minHeight: '70px', fontFamily: 'monospace', fontSize: '.82rem' }}
            />
          </div>
          <div>
            <label>Удобства (по одной на строку)</label>
            <textarea value={form.features.join('\n')} onChange={(e) => set('features', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} style={{ ...inputStyle, minHeight: '70px' }} />
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Описание</h3>
        <div style={{ marginBottom: '14px' }}>
          <label>Описание (вступление)</label>
          <textarea value={form.intro} onChange={(e) => set('intro', e.target.value)} style={{ ...inputStyle, minHeight: '90px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label>Заголовок блока «Актуально»</label>
            <input value={form.actualTitle} onChange={(e) => set('actualTitle', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label>Детальные удобства (по одной на строку)</label>
            <textarea value={form.detailFeats.join('\n')} onChange={(e) => set('detailFeats', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} style={{ ...inputStyle, minHeight: '70px' }} />
          </div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Пункты «Актуально» (по одной на строку)</label>
          <textarea value={form.actualItems.join('\n')} onChange={(e) => set('actualItems', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} style={{ ...inputStyle, minHeight: '90px' }} />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Текст «Дополнительные услуги»</label>
          <textarea value={form.extraServicesText} onChange={(e) => set('extraServicesText', e.target.value)} style={{ ...inputStyle, minHeight: '60px' }} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>SEO</h3>
        <div style={{ marginBottom: '14px' }}>
          <label>SEO Title</label>
          <input value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>SEO Description</label>
          <textarea value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)} style={{ ...inputStyle, minHeight: '50px' }} />
        </div>

        <button type="button" onClick={save} className="btn btn--ember btn--lg" style={{ marginTop: '8px' }} disabled={uploading}>
          {uploading ? 'Загрузка...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}
