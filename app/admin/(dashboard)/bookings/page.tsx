import { getAllBookings } from '@/lib/content';
import { isKvAvailable } from '@/lib/kv';
import { BookingStatusSelect } from '@/components/BookingStatusSelect';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, string> = {
  new: 'Новая',
  contacted: 'Связались',
  done: 'Готово',
  cancelled: 'Отменено',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'var(--ember)',
  contacted: 'var(--amber)',
  done: 'var(--moss)',
  cancelled: 'var(--ink-soft)',
};

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings().catch(() => []);
  const kvOk = isKvAvailable();

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '8px' }}>Заявки</h1>
      <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginBottom: '24px' }}>
        Заявки с формы бронирования. Каждая также дублируется в WhatsApp.
      </p>

      {!kvOk && (
        <div style={{
          background: 'rgba(210,96,42,.1)',
          border: '1px solid var(--ember)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '20px',
          fontSize: '.88rem',
          color: 'var(--ember-deep)',
        }}>
          Vercel KV не подключён — заявки не сохраняются. Подключите KV, чтобы видеть их здесь.
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="form-card" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--ink-soft)' }}>Заявок пока нет.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {bookings.map((b) => (
            <div className="form-card" key={b.id} style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <strong style={{ fontFamily: 'var(--ff-display)', fontSize: '1.1rem' }}>{b.name}</strong>
                    <span style={{
                      fontSize: '.78rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: `${STATUS_COLORS[b.status]}20`,
                      color: STATUS_COLORS[b.status],
                    }}>
                      {STATUS_LABELS[b.status]}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '.88rem', color: 'var(--ink-soft)' }}>
                    <div>📞 <a href={`tel:${b.phone}`} style={{ color: 'var(--ember)', fontWeight: 600 }}>{b.phone}</a></div>
                    {b.object && <div>🏠 {b.object}</div>}
                    {b.date && <div>📅 {b.date}</div>}
                    {b.hours && <div>⏱ {b.hours} ч.</div>}
                    {b.people && <div>👥 {b.people} гостей</div>}
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginTop: '10px' }}>
                    {new Date(b.createdAt).toLocaleString('ru-RU')}
                  </div>
                </div>
                <BookingStatusSelect id={b.id} current={b.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


