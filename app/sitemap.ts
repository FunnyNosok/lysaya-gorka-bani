import type { MetadataRoute } from 'next';
import { banyas } from '@/data/banyas';
import { cottages } from '@/data/cottages';
import { services } from '@/data/services';
import { getPublishedPosts } from '@/lib/content';
import { seedPosts } from '@/data/posts';

const BASE_URL = 'https://nagorke.ru';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts().catch(() => seedPosts.filter((p) => p.status === 'published'));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/arenda-ban`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/arenda-cottage`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/uslugi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/otzivy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kontakty`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const banyaUrls: MetadataRoute.Sitemap = banyas.map((b) => ({
    url: `${BASE_URL}/arenda-ban/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const cottageUrls: MetadataRoute.Sitemap = cottages.map((c) => ({
    url: `${BASE_URL}/arenda-cottage/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/uslugi/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/news/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticUrls, ...banyaUrls, ...cottageUrls, ...serviceUrls, ...postUrls];
}
