import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, color: 'var(--amber)', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.6rem', marginTop: '12px', color: 'var(--wood)' }}>
        Страница не найдена
      </h1>
      <p style={{ color: 'var(--ink-soft)', marginTop: '8px', maxWidth: '420px' }}>
        Возможно, страница была перемещена или удалена. Вернитесь на главную.
      </p>
      <Link href="/" className="btn btn--ember btn--lg" style={{ marginTop: '24px' }}>
        На главную
      </Link>
    </div>
  );
}
