/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/news.html', destination: '/news', permanent: true },
      { source: '/otzivy.html', destination: '/otzivy', permanent: true },
      { source: '/kontakty.html', destination: '/kontakty', permanent: true },
      { source: '/arenda-ban/index.html', destination: '/arenda-ban', permanent: true },
      { source: '/arenda-ban/banya-russkiy-domik.html', destination: '/arenda-ban/russkiy-domik', permanent: true },
      { source: '/arenda-ban/banya-lesnoy-domik.html', destination: '/arenda-ban/lesnoy-domik', permanent: true },
      { source: '/arenda-ban/banya-morskoy-domik.html', destination: '/arenda-ban/morskoy-domik', permanent: true },
      { source: '/arenda-ban/banya-tsarskie-khoromy.html', destination: '/arenda-ban/tsarskie-khoromy', permanent: true },
      { source: '/arenda-cottage/index.html', destination: '/arenda-cottage', permanent: true },
      { source: '/arenda-cottage/arenda-kottedzha-tsarskie-khoromy.html', destination: '/arenda-cottage/tsarskie-khoromy', permanent: true },
      { source: '/arenda-cottage/arenda-kottedzha-russkij-domik.html', destination: '/arenda-cottage/russkiy-domik', permanent: true },
      { source: '/uslugi/index.html', destination: '/uslugi', permanent: true },
      { source: '/uslugi/kafe.html', destination: '/uslugi/kafe', permanent: true },
      { source: '/uslugi/bassejn.html', destination: '/uslugi/bassejn', permanent: true },
      { source: '/uslugi/mini-gostinitsa.html', destination: '/uslugi/mini-gostinitsa', permanent: true },
      { source: '/uslugi/parilshchika.html', destination: '/uslugi/parilshchika', permanent: true },
      { source: '/uslugi/massazh.html', destination: '/uslugi/massazh', permanent: true },
      { source: '/uslugi/spa.html', destination: '/uslugi/spa', permanent: true },
    ];
  },
};

export default nextConfig;
