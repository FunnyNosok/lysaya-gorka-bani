'use client';

import { useState } from 'react';
import type { Service, ServiceProgram } from '@/data/services';

export function ServiceEditor({ initial }: { initial: Service }) {
  const [form, setForm] = useState<Service>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof Service>(key: K, value: Service[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleUpload(file: File, field: 'cardImage' | 'heroImage' | 'detailImage') {
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
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSaved(true);
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
          <div><label>Заголовок на карточке</label><input value={form.cardTitle} onChange={(e) => set('cardTitle', e.target.value)} style={inputStyle} /></div>
          <div><label>Описание на карточке</label><input value={form.cardDescription} onChange={(e) => set('cardDescription', e.target.value)} style={inputStyle} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div><label>Шапка: eyebrow</label><input value={form.heroEyebrow} onChange={(e) => set('heroEyebrow', e.target.value)} style={inputStyle} /></div>
          <div><label>Шапка: заголовок</label><input value={form.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} style={inputStyle} /></div>
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Шапка: описание</label>
          <textarea value={form.heroDescription} onChange={(e) => set('heroDescription', e.target.value)} style={{ ...inputStyle, minHeight: '70px' }} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Фотографии</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label>Карточка</label>
            {form.cardImage && <img src={form.cardImage} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '100px', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'cardImage'); }} disabled={uploading} />
          </div>
          <div>
            <label>Шапка</label>
            {form.heroImage && <img src={form.heroImage} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '100px', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'heroImage'); }} disabled={uploading} />
          </div>
          <div>
            <label>Детальное фото</label>
            {form.detailImage && <img src={form.detailImage} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', maxHeight: '100px', objectFit: 'cover' }} />}
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, 'detailImage'); }} disabled={uploading} />
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Текст</h3>
        <div style={{ marginBottom: '14px' }}>
          <label>Заголовок блока</label>
          <input value={form.bodyTitle} onChange={(e) => set('bodyTitle', e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Вступление</label>
          <textarea value={form.bodyIntro} onChange={(e) => set('bodyIntro', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Секции (heading: ... | item | item | ... или text: ...)</label>
          <textarea
            value={form.sections.map((s) => { if (s.heading) return `heading: ${s.heading}\n${(s.items || []).map((i) => `item: ${i}`).join('\n')}`; return `text: ${s.text || ''}`; }).join('\n---\n')}
            onChange={(e) => {
              const blocks = e.target.value.split('\n---\n');
              set('sections', blocks.map((block) => {
                const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
                if (lines[0]?.startsWith('heading:')) {
                  return { heading: lines[0].replace('heading:', '').trim(), items: lines.filter((l) => l.startsWith('item:')).map((l) => l.replace('item:', '').trim()) };
                }
                return { text: lines.filter((l) => l.startsWith('text:')).map((l) => l.replace('text:', '').trim()).join(' ') };
              }));
            }}
            style={{ ...inputStyle, minHeight: '140px', fontFamily: 'monospace', fontSize: '.82rem' }}
          />
          <small style={{ color: 'var(--ink-soft)', fontSize: '.8rem' }}>Формат: heading: Заголовок → item: пункт → item: пункт. Разделитель секций — строка ---</small>
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Программы / Цены</h3>
        <div style={{ marginBottom: '14px' }}>
          <label>Программы (title | description | price, по одной на строке)</label>
          <textarea
            value={(form.programs || []).map((p) => `${p.title}|${p.description}|${p.price}`).join('\n')}
            onChange={(e) => set('programs', e.target.value.split('\n').filter(Boolean).map((line) => { const [t, ...rest] = line.split('|'); const d = rest.slice(0, -1).join('|'); const p = rest[rest.length - 1] || ''; return { title: t?.trim() || '', description: d?.trim() || '', price: p?.trim() || '' }; }))}
            style={{ ...inputStyle, minHeight: '120px', fontFamily: 'monospace', fontSize: '.82rem' }}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Прайс-планка (label | value, по одной на строке)</label>
          <textarea
            value={(form.plaque || []).map((r) => `${r.label}|${r.value}`).join('\n')}
            onChange={(e) => set('plaque', e.target.value.split('\n').filter(Boolean).map((line) => { const [l, ...v] = line.split('|'); return { label: l?.trim() || '', value: v.join('|').trim() }; }))}
            style={{ ...inputStyle, minHeight: '60px', fontFamily: 'monospace', fontSize: '.82rem' }}
          />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Примечание к прайсу</label>
          <input value={form.plaqueNote || ''} onChange={(e) => set('plaqueNote', e.target.value)} style={inputStyle} />
        </div>

        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.15rem', margin: '20px 0 14px' }}>Кнопка действия</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div><label>Текст кнопки</label><input value={form.ctaText} onChange={(e) => set('ctaText', e.target.value)} style={inputStyle} /></div>
          <div><label>Текст для WhatsApp</label><input value={form.ctaWhatsappText} onChange={(e) => set('ctaWhatsappText', e.target.value)} style={inputStyle} /></div>
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
