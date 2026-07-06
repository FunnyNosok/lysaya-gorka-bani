import { kv, isKvAvailable } from './kv';
import { seedPosts } from '@/data/posts';
import { defaultSettings, type SiteSettings } from '@/data/settings';
import type { Post } from '@/data/posts';

const KEYS = {
  post: (id: string) => `post:${id}`,
  postsAll: 'posts:all',
  postsPublished: 'posts:published',
  postSlug: (slug: string) => `posts:slug:${slug}`,
  settings: 'site:settings',
  booking: (id: string) => `booking:${id}`,
  bookingsAll: 'bookings:all',
} as const;

const POST_LIST_KEY = 'posts:list';

export async function getSettings(): Promise<SiteSettings> {
  if (!isKvAvailable()) return defaultSettings;
  const raw = await kv().get<SiteSettings>(KEYS.settings);
  return { ...defaultSettings, ...(raw || {}) };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  await kv().set(KEYS.settings, settings);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!isKvAvailable()) return seedPosts;
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
  if (!isKvAvailable()) return seedPosts.find((p) => p.id === id) || null;
  const p = await kv().get<Post>(KEYS.post(id));
  return p || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) || null;
}

export async function savePost(post: Post): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  await kv().set(KEYS.post(post.id), post);
  await kv().sadd(POST_LIST_KEY, post.id);
}

export async function deletePost(id: string): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const post = await getPostById(id);
  await kv().del(KEYS.post(id));
  await kv().srem(POST_LIST_KEY, id);
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
  return (await kv().get<Booking>(KEYS.booking(id))) || null;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  if (!isKvAvailable()) throw new Error('KV not available');
  const b = await getBookingById(id);
  if (!b) throw new Error('Booking not found');
  b.status = status;
  await kv().set(KEYS.booking(id), b);
}
