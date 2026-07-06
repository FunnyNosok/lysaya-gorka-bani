export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Русские бани «Лысая горка»',
    description: 'Русские бани на дровах в Екатеринбурге. Аренда бани на час и сутки. Парильщики, массаж, кафе, бассейн.',
    image: 'https://nagorke.ru/images/ban/main-12.jpg',
    url: 'https://nagorke.ru',
    telephone: '+7-343-213-75-77',
    email: 'nagorke@list.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Предельная, 41',
      addressLocality: 'Екатеринбург',
      addressRegion: 'Свердловская область',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 56.765752,
      longitude: 60.561101,
    },
    openingHours: 'Mo-Su 00:00-24:00',
    priceRange: '1100-4500 RUB',
    sameAs: [
      'https://vk.com/bani_nagorke',
      'https://www.instagram.com/lysayagorka',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
