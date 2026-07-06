import { createClient } from '@vercel/kv';

let client: ReturnType<typeof createClient> | null = null;

function getKvClient() {
  if (client) return client;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  client = createClient({ url, token });
  return client;
}

export function isKvAvailable(): boolean {
  return getKvClient() !== null;
}

export function kv() {
  const c = getKvClient();
  if (!c) throw new Error('Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.');
  return c;
}
