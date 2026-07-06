'use client';

import { useState } from 'react';

const STATUS_LABELS: Record<string, string> = {
  new: 'Новая',
  contacted: 'Связались',
  done: 'Готово',
  cancelled: 'Отменено',
};

export function BookingStatusSelect({ id, current }: { id: string; current: string }) {
  const [status, setStatus] = useState(current);
  const [saving, setSaving] = useState(false);

  async function change(v: string) {
    setStatus(v);
    setSaving(true);
    try {
      await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: v }),
      });
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => change(e.target.value)}
      disabled={saving}
      style={{
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1.5px solid var(--line)',
        background: '#fff',
        fontSize: '.84rem',
        fontWeight: 600,
        cursor: 'pointer',
        opacity: saving ? '.5' : '1',
      }}
    >
      {Object.entries(STATUS_LABELS).map(([val, label]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  );
}
