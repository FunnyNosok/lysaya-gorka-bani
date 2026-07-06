import { notFound } from 'next/navigation';
import { PostEditor } from '@/components/PostEditor';
import { getPostById, getAllPosts } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id).catch(() => null);
  if (!post) notFound();
  const posts = await getAllPosts().catch(() => []);
  const existingSlugs = posts.filter((p) => p.id !== id).map((p) => p.slug);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', marginBottom: '24px' }}>Редактирование</h1>
      <PostEditor post={post} existingSlugs={existingSlugs} />
    </div>
  );
}
