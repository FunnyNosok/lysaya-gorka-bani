'use client';

import { useState } from 'react';

export function AccountEditor({ currentLogin }: { currentLogin: string }) {
  const [newLogin, setNewLogin] = useState(currentLogin);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function save() {
    setError('');
    setSaved(false);
    if (newPassword !== confirmPassword) {
      setError('Новый пароль и подтверждение не совпадают');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newLogin, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaved(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Ошибка сохранения');
      }
    } catch {
      setError('Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1.5px solid var(--line)',
    borderRadius: '8px', background: '#fff', fontSize: '.9rem',
  };

  return (
    <div style={{ maxWidth: '480px' }}>
      {error && <div style={{ background: 'rgba(210,96,42,.1)', border: '1px solid var(--ember)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '.9rem', color: 'var(--ember-deep)' }}>{error}</div>}
      {saved && <div style={{ background: 'rgba(75,90,60,.1)', border: '1px solid var(--moss)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '.9rem', color: '#33402a' }}>✓ Логин и пароль изменены. Используйте их при следующем входе.</div>}

      <div className="form-card" style={{ padding: '24px' }}>
        <div style={{ marginBottom: '14px' }}>
          <label>Логин</label>
          <input value={newLogin} onChange={(e) => setNewLogin(e.target.value)} style={inputStyle} autoComplete="username" />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Текущий пароль</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={inputStyle} autoComplete="current-password" />
        </div>
        <div style={{ marginBottom: '14px' }}>
          <label>Новый пароль</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} autoComplete="new-password" />
          <small style={{ color: 'var(--ink-soft)', fontSize: '.8rem' }}>Минимум 8 символов</small>
        </div>
        <div style={{ marginBottom: '18px' }}>
          <label>Новый пароль ещё раз</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} autoComplete="new-password" />
        </div>
        <button type="button" onClick={save} className="btn btn--ember btn--lg" disabled={saving || !currentPassword || !newPassword}>
          {saving ? 'Сохранение...' : 'Сменить логин и пароль'}
        </button>
      </div>
    </div>
  );
}
