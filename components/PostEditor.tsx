'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { slugify, formatDateLabel } from '@/lib/validators';
import type { Post } from '@/data/posts';

type Props = {
  post?: Post;
  existingSlugs: string[];
};

const EMPTY: Partial<Post> = {
  type: 'offer',
  status: 'draft',
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  image: '',
  date: new Date().toISOString().slice(0, 10),
  ctaText: '',
  note: '',
  validTo: '',
  seoTitle: '',
  seoDescription: '',
};

export function PostEditor({ post, existingSlugs }: Props) {
  const router = useRouter();
  const [transition, startTransition] = useTransition();
  const [form, setForm] = useState<Partial<Post>>(post || EMPTY);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [slugDirty, setSlugDirty] = useState(!!post?.slug);
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof Post>(key: K, value: Post[K] | string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.path) {
        set('image', data.path);
      } else {
        setError(data.error || 'Ошибка загрузки изображения');
      }
    } catch {
      setError('Не удалось загрузить изображение');
    } finally {
      setUploading(false);
    }
  }

  function handleTitleChange(v: string) {
    set('title', v);
    if (!slugDirty) set('slug', slugify(v));
  }

  function handleSlugChange(v: string) {
    setSlugDirty(true);
    set('slug', slugify(v));
  }

  function handleDateChange(v: string) {
    set('date', v);
    set('dateLabel', formatDateLabel(v));
  }

  function buildPayload(): Record<string, unknown> {
    const now = new Date().toISOString();
    return {
      id: form.id || '',
      type: form.type || 'article',
      status: form.status || 'draft',
      slug: form.slug || slugify(form.title || ''),
      title: form.title || '',
      excerpt: form.excerpt || '',
      content: form.content || '',
      image: form.image || '',
      date: form.date || new Date().toISOString().slice(0, 10),
      dateLabel: form.dateLabel || formatDateLabel(form.date || ''),
      typeLabel: (form.type || 'article') === 'offer' ? 'Акция' : 'Статья',
      ctaText: form.ctaText || null,
      note: form.note || null,
      validTo: form.validTo || null,
      seoTitle: form.seoTitle || null,
      seoDescription: form.seoDescription || null,
      createdAt: form.createdAt || now,
      updatedAt: now,
    };
  }

  async function save(publish?: boolean) {
    setError('');
    const payload = buildPayload();
    if (publish) payload.status = 'published';
    if (!payload.title) { setError('Введите заголовок'); return; }
    if (!payload.slug) { setError('Slug не может быть пустым'); return; }
    if (!post && existingSlugs.includes(payload.slug as string)) {
      setError('Материал с таким slug уже существует. Измените slug.');
      return;
    }

    const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
    const method = post ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка сохранения');
        return;
      }
      setSaved(true);
      if (!post && data.post?.id) {
        startTransition(() => router.push(`/admin/posts/${data.post.id}`));
      } else {
        setForm((f) => ({ ...f, ...data.post }));
      }
    } catch {
      setError('Не удалось сохранить. Проверьте подключение KV.');
    }
  }

  async function del() {
    if (!post) return;
    if (!confirm('Удалить материал безвозвратно?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/posts');
        router.refresh();
      } else {
        setError('Не удалось удалить');
      }
    } catch {
      setError('Ошибка удаления');
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
    <div style={{ maxWidth: '760px' }}>
      {error && (
        <div style={{
          background: 'rgba(210,96,42,.1)',
          border: '1px solid var(--ember)',
          borderRadius: '10px',
          padding: '14px 16px',
          marginBottom: '20px',
          fontSize: '.9rem',
          color: 'var(--ember-deep)',
        }}>
          {error}
        </div>
      )}
      {saved && (
        <div style={{
          background: 'rgba(75,90,60,.1)',
          border: '1px solid var(--moss)',
          borderRadius: '10px',
          padding: '14px 16px',
          marginBottom: '20px',
          fontSize: '.9rem',
          color: '#33402a',
        }}>
          ✓ Сохранено. <a href="/news" target="_blank" style={{ color: 'var(--moss)', fontWeight: 700 }}>Посмотреть на сайте →</a>
        </div>
      )}

      <div className="form-card" style={{ padding: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Тип</label>
            <select
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
              style={inputStyle}
            >
              <option value="offer">Акция</option>
              <option value="article">Статья</option>
            </select>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Статус</label>
            <select
              value={form.status}
              onChange={(e) => set('status', e.target.value as Post['status'])}
              style={inputStyle}
            >
              <option value="draft">Черновик</option>
              <option value="published">Опубликовано</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>Заголовок</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Например: Кальян в подарок"
            style={inputStyle}
          />
        </div>

        <div className="field">
          <label>Slug (URL: /news/slug)</label>
          <input
            type="text"
            value={form.slug || ''}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="kalyan-v-podarok"
            style={inputStyle}
          />
          <p className="form-note">Только латинские буквы, цифры и дефис. URL: /news/{form.slug || '...'}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Дата</label>
            <input
              type="date"
              value={form.date || ''}
              onChange={(e) => handleDateChange(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Действует до (опционально)</label>
            <input
              type="date"
              value={form.validTo || ''}
              onChange={(e) => set('validTo', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="field">
          <label>Изображение</label>
          {form.image && (
            <div style={{ marginBottom: '12px', position: 'relative' }}>
              <img src={form.image} alt="" style={{ borderRadius: '10px', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
              <button
                type="button"
                onClick={() => set('image', '')}
                style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: 'rgba(26,18,12,.8)', color: '#fff', border: 'none',
                  borderRadius: '6px', padding: '6px 12px', fontSize: '.8rem',
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Удалить
              </button>
            </div>
          )}
          {!form.image && (
            <label
              htmlFor="img-upload"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '32px 20px', border: '2px dashed var(--line)',
                borderRadius: '12px', background: 'var(--cream-2)', cursor: 'pointer',
                textAlign: 'center', transition: 'border-color .2s, background .2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.background = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--cream-2)'; }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--ink)' }}>
                {uploading ? 'Загрузка...' : 'Нажмите чтобы загрузить изображение'}
              </span>
              <span style={{ fontSize: '.78rem', color: 'var(--ink-soft)' }}>
                JPG, PNG, WebP · до 5 МБ
              </span>
              <input
                id="img-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                style={{ display: 'none' }}
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                  e.target.value = '';
                }}
              />
            </label>
          )}
          {form.image && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label
                htmlFor="img-replace"
                className="btn btn--ghost"
                style={{ fontSize: '.84rem', padding: '8px 18px', cursor: 'pointer' }}
              >
                {uploading ? 'Загрузка...' : 'Заменить изображение'}
                <input
                  id="img-replace"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  style={{ display: 'none' }}
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                    e.target.value = '';
                  }}
                />
              </label>
              <span style={{ fontSize: '.78rem', color: 'var(--ink-soft)' }}>{form.image}</span>
            </div>
          )}
        </div>

        <div className="field">
          <label>Краткое описание (анонс)</label>
          <textarea
            value={form.excerpt || ''}
            onChange={(e) => set('excerpt', e.target.value)}
            placeholder="Короткое описание для карточки"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div className="field">
          <label>Полный текст</label>
          <textarea
            value={form.content || ''}
            onChange={(e) => set('content', e.target.value)}
            placeholder="Полный текст материала. Абзацы разделяйте пустой строкой."
            rows={8}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <p className="form-note">Параграфы разделяйте пустой строкой (Enter дважды).</p>
        </div>

        {form.type === 'offer' && (
          <>
            <div className="field">
              <label>Текст кнопки</label>
              <input
                type="text"
                value={form.ctaText || ''}
                onChange={(e) => set('ctaText', e.target.value)}
                placeholder="Воспользоваться"
                style={inputStyle}
              />
              <p className="form-note">Кнопка ведёт на звонок по телефону из настроек.</p>
            </div>
            <div className="field">
              <label>Примечание (мелкий шрифт)</label>
              <textarea
                value={form.note || ''}
                onChange={(e) => set('note', e.target.value)}
                placeholder="Условия акции, ограничения..."
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </>
        )}

        <details style={{ marginBottom: '20px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '.9rem', color: 'var(--plank)', padding: '8px 0' }}>
            SEO-настройки
          </summary>
          <div style={{ paddingTop: '12px' }}>
            <div className="field">
              <label>SEO Title</label>
              <input
                type="text"
                value={form.seoTitle || ''}
                onChange={(e) => set('seoTitle', e.target.value)}
                placeholder="Заголовок для поисковиков"
                style={inputStyle}
              />
            </div>
            <div className="field">
              <label>SEO Description</label>
              <textarea
                value={form.seoDescription || ''}
                onChange={(e) => set('seoDescription', e.target.value)}
                placeholder="Описание для поисковиков"
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </details>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => save(false)}
            disabled={transition}
            className="btn btn--ghost"
            style={{ opacity: transition ? '.6' : '1' }}
          >
            Сохранить черновик
          </button>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={transition}
            className="btn btn--ember"
            style={{ opacity: transition ? '.6' : '1' }}
          >
            Опубликовать
          </button>
          {post && (
            <button
              type="button"
              onClick={del}
              className="btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(210,96,42,.3)',
                color: 'var(--ember-deep)',
                marginLeft: 'auto',
              }}
            >
              Удалить
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link href="/admin/posts" style={{ color: 'var(--ink-soft)', fontSize: '.9rem', fontWeight: 600 }}>
          ← Назад к списку
        </Link>
      </div>
    </div>
  );
}
