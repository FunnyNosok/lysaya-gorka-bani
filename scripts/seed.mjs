import { seedPosts } from '../data/posts';
import { defaultSettings } from '../data/settings';

async function main() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error('Set KV_REST_API_URL and KV_REST_API_TOKEN in .env before running seed.');
    process.exit(1);
  }

  const { createClient } = await import('@vercel/kv');
  const kv = createClient({ url, token });

  console.log('Seeding posts...');
  for (const post of seedPosts) {
    await kv.set(`post:${post.id}`, post);
    await kv.sadd('posts:list', post.id);
    console.log(`  ✓ ${post.id} — ${post.title}`);
  }

  console.log('Seeding settings...');
  await kv.set('site:settings', defaultSettings);
  console.log('  ✓ site:settings');

  console.log('\nDone! Seeded', seedPosts.length, 'posts and site settings.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
