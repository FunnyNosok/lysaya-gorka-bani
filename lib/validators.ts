import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['offer', 'article']),
  status: z.enum(['draft', 'published']),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, 'slug: только строчные латинские буквы, цифры и дефис'),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().max(10000),
  image: z.string().max(500),
  date: z.string().min(1),
  dateLabel: z.string().min(1),
  typeLabel: z.string().min(1),
  ctaText: z.string().optional().nullable(),
  ctaWhatsappText: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  validTo: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const bookingSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(3).max(30),
  object: z.string().max(200).optional().default(''),
  date: z.string().max(200).optional().default(''),
  hours: z.string().max(20).optional().default(''),
  people: z.string().max(20).optional().default(''),
  source: z.string().max(50).optional().default('site'),
});

// Sanitize: prevent key injection in KV (no colons, asterisks, etc.)
export function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 100);
}

export const settingsSchema = z.object({
  phone: z.string(),
  phoneHref: z.string(),
  phone2: z.string(),
  phone2Href: z.string(),
  telegram: z.string().optional().default(''),
  max: z.string().optional().default(''),
  address: z.string(),
  addressArea: z.string(),
  email: z.string(),
  vk: z.string(),
  instagram: z.string(),
  panorama: z.string(),
  mapLat: z.number(),
  mapLon: z.number(),
  mapZoom: z.number(),
  yearFrom: z.number(),
});

export type PostInput = z.infer<typeof postSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;

export function slugify(s: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
    х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };
  return s
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120);
}

export function formatDateLabel(dateStr: string): string {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
