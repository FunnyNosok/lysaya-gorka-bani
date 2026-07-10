import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nagorke.ru'),
  title: {
    default: 'Оздоровительный комплекс «Русские бани Лысая Горка» в Екатеринбурге — аренда бани на час и сутки',
    template: '%s | Русские бани Лысая Горка',
  },
  description: 'Русские бани на дровах в Екатеринбурге. Аренда бани на час и сутки: Русский домик, Лесной домик, Морской домик, Царские хоромы. Парильщики, массаж, кафе, бассейн. Лёгкого пара!',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Оздоровительный комплекс «Русские бани Лысая Горка» в Екатеринбурге',
    description: 'Аренда бани на час и сутки. Пар на дровах, веники, парильщики, кафе и бассейн.',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Русские бани Лысая Горка',
    images: [{ url: '/images/ban/main-12.jpg', width: 1200, height: 630, alt: 'Русские бани Лысая Горка' }],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 80'><g fill='none' stroke='%23c8893a' stroke-width='3' stroke-linecap='round'><path d='M22 13h20M24 18h16' stroke-width='3.5'/><path d='M32 18v12'/><path d='M32 30c-9 9-13 24-15 45M32 30c-7 10-10 25-11 46M32 30c-3 12-4 27-4 46M32 30v46M32 30c3 12 4 27 4 46M32 30c7 10 10 25 11 46M32 30c9 9 13 24 15 45'/></g></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@400;700;900&family=Marck+Script&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
