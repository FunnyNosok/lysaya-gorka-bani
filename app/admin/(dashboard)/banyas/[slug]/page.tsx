import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBanyas } from '@/lib/content';
import { BanyaEditor } from '@/components/BanyaEditor';

export const dynamic = 'force-dynamic';

export default async function AdminBanyaEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const banyas = await getAllBanyas().catch(() => []);
  const banya = banyas.find((b) => b.slug === slug);
  if (!banya) notFound();

  return (
    <div>
      <Link href="/admin/banyas" style={{ fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: '12px', display: 'inline-block' }}>← Назад к списку бань</Link>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', marginBottom: '20px' }}>{banya.title}</h1>
      <BanyaEditor initial={banya} />
    </div>
  );
}
