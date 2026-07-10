import { kv, isKvAvailable } from './kv';
import { seedPosts } from '@/data/posts';
import { defaultSettings, type SiteSettings } from '@/data/settings';
import type { Post } from '@/data/posts';
import { banyas as seedBanyas, type Banya } from '@/data/banyas';
import { cottages as seedCottages, type Cottage } from '@/data/cottages';
import { services as seedServices, type Service } from '@/data/services';

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 100);
}

const KEYS = {
  post: (id: string) => `post:${id}`,
  postsAll: 'posts:all',
  postsPublished: 'posts:published',
  postSlug: (slug: string) => `posts:slug:${slug}`,
  postsSeeded: 'posts:seeded',
  settings: 'site:settings',
  booking: (id: string) => `booking:${id}`,
  bookingsAll: 'bookings:all',
  banyas: 'banyas:all',
  cottages: 'cottages:all',
  services: 'services:all',
} as const;

const POST_LIST_KEY = 'posts:list';

const CORRECT_PHONE2 = {
  phone2: '+7 (953) 047-75-77',
  phone2Href: '+79530477577',
};

function normalizeSettings(settings: SiteSettings): SiteSettings {
  return { ...settings, ...CORRECT_PHONE2 };
}

function normalizeServices(services: Service[]): Service[] {
  return services
    .filter((s) => s.slug !== 'spa' && s.slug !== 'mini-gostinitsa')
    .map((s) => {
      if (s.slug !== 'kafe') return s;
      return {
        ...s,
        cardDescription: 'Русская кухня, аренда кафе на день.',
        heroTitle: 'Русская кухня',
        heroDescription: '',
        bodyIntro: 'Территория оздоровительного комплекса «Русские бани Лысая Горка» — это не только русские бани. Здесь есть уютное кафе с русской кухней.',
        sections: [
          {
            heading: 'Меню включает',
            items: [
              'Шашлык из свинины и курицы.',
              'Терпуг и скумбрия горячего копчения.',
              'Стейк сёмги на гриле.',
              'Холодные закуски и салаты.',
              'Супы.',
              'Горячие блюда.',
              'Десерты и напитки.',
            ],
          },
          ...(s.sections || []).filter((sec) => sec.heading !== 'Меню включает' && sec.heading !== 'Выгодная аренда кафе для любого случая'),
        ],
        ctaText: 'Смотреть меню',
        seoTitle: 'Кафе с русской кухней в бане | Лысая Горка, Екатеринбург',
        seoDescription: 'Уютное кафе в комплексе Русские бани Лысая Горка: русская кухня, шашлык из свинины и курицы, рыба горячего копчения, стейк сёмги на гриле. Аренда кафе на день.',
      };
    });
}

function normalizeBanyas(banyas: Banya[]): Banya[] {
  return banyas.map((b) => {
    if (b.slug !== 'russkiy-domik') return b;
    return {
      ...b,
      shortDescription: b.shortDescription.replace(/,?\s*караоке/gi, ''),
      features: ['Парилка', 'Купель', 'Камин', 'Комната отдыха', 'Услуги кафе'],
      detailFeats: ['Парилка', 'Купель', 'ТВ · НТВ+', 'Камин', 'Комната отдыха', 'Услуги кафе', 'Веранда', 'Мангал', 'Сейф', '2 этажа'],
      intro: b.intro.replace('спеть с друзьями караоке, ', '').replace('караоке, ', ''),
      extraServicesText: b.extraServicesText.replace(/аренда банкетного зала\.?/gi, '').replace(/\s+,/g, ',').replace(/\s+\./, '.'),
      seoDescription: 'Баня Русский домик в Екатеринбурге: вместимость 10 человек, парилка, купель, камин, комната отдыха, веранда. Аренда от 1850 руб/час.',
    };
  });
}

function normalizeCottages(cottages: Cottage[]): Cottage[] {
  return cottages.map((c) => {
    if (c.slug === 'tsarskie-khoromy') {
      return {
        ...c,
        features: c.features.map((f) => f === '4 комнаты' ? '12 спальных мест' : f),
        heroDescription: c.heroDescription.replace('4 комнаты отдыха', '12 спальных мест с возможностью размещения дополнительных гостей'),
        hasItems: c.hasItems.map((item) => item === '4 комнаты отдыха на втором этаже.' ? '12 спальных мест с возможностью размещения дополнительных гостей.' : item),
        detailFeats: c.detailFeats.map((f) => f === '4 комнаты' ? '12 спальных мест' : f),
        priceTable: [
          { label: 'Будни', value: '18 900 ₽/сутки' },
          { label: 'Выходные и праздники', value: '28 900 ₽/сутки' },
          { label: 'Дополнительные гости', value: '1 000 ₽/сутки' },
        ],
        priceNote: '',
        extraServicesText: c.extraServicesText.replace(/^кафе с\s*/i, '').replace(/кавказской\s*/gi, ''),
      };
    }
    if (c.slug === 'russkiy-domik') {
      return {
        ...c,
        priceTable: [
          { label: 'Будни', value: '13 900 ₽/сут' },
          { label: 'Выходные и праздники', value: '16 900 ₽/сут' },
        ],
        priceNote: 'Аренда коттеджа на сутки.',
        extraServicesText: c.extraServicesText.replace(/^кафе с\s*/i, ''),
      };
    }
    return c;
  });
}

// Один раз переносит стартовые (seed) посты в KV. Без этого при добавлении
// первого поста через админку список переставал быть пустым и стартовые
// акции/статьи пропадали с сайта. Добавляем только те id, которых ещё нет,
// поэтому уже созданные посты не затираются, а флаг posts:seeded не даёт
// повторно возвращать удалённые администратором записи.
async function ensurePostsSeeded(): Promise<void> {
  if (!isKvAvailable()) return;
  const seeded = await kv().get(KEYS.postsSeeded);
  if (seeded) return;
  for (const p of seedPosts) {
    const exists = await kv().get<Post>(KEYS.post(p.id));
    if (!exists) {
      await kv().set(KEYS.post(p.id), p);
      await kv().sadd(POST_LIST_KEY, p.id);
    }
  }
  await kv().set(KEYS.postsSeeded, '1');
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isKvAvailable()) return normalizeSettings(defaultSettings);
  const raw = await kv().get<SiteSettings>(KEYS.settings);
  return normalizeSettings({ ...defaultSettings, ...(raw || {}) });
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  await kv().set(KEYS.settings, settings);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isKvAvailable()) return seedPosts;
  await ensurePostsSeeded();
  const ids = await kv().smembers(POST_LIST_KEY);
  if (!ids.length) return seedPosts;
  const posts: Post[] = [];
  for (const id of ids) {
    const p = await kv().get<Post>(KEYS.post(id));
    if (p) posts.push(p);
  }
  posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  return posts;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.status === 'published');
}

export async function getPublishedOffers(): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all.filter((p) => p.type === 'offer');
}

export async function getPostById(id: string): Promise<Post | null> {
  const safeId = sanitizeId(id);
  if (!isKvAvailable()) return seedPosts.find((p) => p.id === safeId) || null;
  await ensurePostsSeeded();
  const p = await kv().get<Post>(KEYS.post(safeId));
  return p || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function savePost(post: Post): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  await ensurePostsSeeded();
  await kv().set(KEYS.post(post.id), post);
  await kv().sadd(POST_LIST_KEY, post.id);
}

export async function deletePost(id: string): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const safeId = sanitizeId(id);
  const post = await getPostById(safeId);
  await kv().del(KEYS.post(safeId));
  await kv().srem(POST_LIST_KEY, safeId);
  if (post) {
    await kv().del(KEYS.postSlug(post.slug));
  }
}

export type Booking = {
  id: string;
  name: string;
  phone: string;
  object: string;
  date: string;
  hours?: string;
  people?: string;
  source: string;
  status: 'new' | 'contacted' | 'done' | 'cancelled';
  createdAt: string;
};

export async function saveBooking(booking: Booking): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  await kv().set(KEYS.booking(booking.id), booking);
  await kv().sadd(KEYS.bookingsAll, booking.id);
}

export async function getAllBookings(): Promise<Booking[]> {
  if (!isKvAvailable()) return [];
  const ids = await kv().smembers(KEYS.bookingsAll);
  const bookings: Booking[] = [];
  for (const id of ids) {
    const b = await kv().get<Booking>(KEYS.booking(id));
    if (b) bookings.push(b);
  }
  bookings.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  return bookings;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (!isKvAvailable()) return null;
  const safeId = sanitizeId(id);
  return (await kv().get<Booking>(KEYS.booking(safeId))) || null;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const safeId = sanitizeId(id);
  const b = await getBookingById(safeId);
  if (!b) throw new Error('Booking not found');
  b.status = status;
  await kv().set(KEYS.booking(safeId), b);
}

// ─── Banyas ───
export async function getAllBanyas(): Promise<Banya[]> {
  if (!isKvAvailable()) return normalizeBanyas(seedBanyas);
  const raw = await kv().get<Banya[]>(KEYS.banyas);
  return normalizeBanyas(raw && raw.length ? raw : seedBanyas);
}

export async function getBanyaBySlug(slug: string): Promise<Banya | null> {
  const all = await getAllBanyas();
  return all.find((b) => b.slug === slug) || null;
}

export async function saveBanya(banya: Banya): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const all = await getAllBanyas();
  const idx = all.findIndex((b) => b.slug === banya.slug);
  if (idx >= 0) all[idx] = banya;
  else all.push(banya);
  await kv().set(KEYS.banyas, all);
}

// ─── Cottages ───
export async function getAllCottages(): Promise<Cottage[]> {
  if (!isKvAvailable()) return normalizeCottages(seedCottages);
  const raw = await kv().get<Cottage[]>(KEYS.cottages);
  return normalizeCottages(raw && raw.length ? raw : seedCottages);
}

export async function getCottageBySlug(slug: string): Promise<Cottage | null> {
  const all = await getAllCottages();
  return all.find((c) => c.slug === slug) || null;
}

export async function saveCottage(cottage: Cottage): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const all = await getAllCottages();
  const idx = all.findIndex((c) => c.slug === cottage.slug);
  if (idx >= 0) all[idx] = cottage;
  else all.push(cottage);
  await kv().set(KEYS.cottages, all);
}

// ─── Services ───
export async function getAllServices(): Promise<Service[]> {
  if (!isKvAvailable()) return normalizeServices(seedServices);
  const raw = await kv().get<Service[]>(KEYS.services);
  return normalizeServices(raw && raw.length ? raw : seedServices);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getAllServices();
  return all.find((s) => s.slug === slug) || null;
}

export async function saveService(service: Service): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const all = await getAllServices();
  const idx = all.findIndex((s) => s.slug === service.slug);
  if (idx >= 0) all[idx] = service;
  else all.push(service);
  await kv().set(KEYS.services, all);
}
