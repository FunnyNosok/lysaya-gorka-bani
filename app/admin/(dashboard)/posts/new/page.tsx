import { PostEditor } from '@/components/PostEditor';
import { getAllPosts } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const posts = await getAllPosts().catch(() => []);
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '24px' }}>Новый материал</h1>
      <PostEditor existingSlugs={posts.map((p) => p.slug)} />
    </div>
  );
}
