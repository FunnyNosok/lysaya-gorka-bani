import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCottages } from '@/lib/content';
import { CottageEditor } from '@/components/CottageEditor';

export const dynamic = 'force-dynamic';

export default async function AdminCottageEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cottages = await getAllCottages().catch(() => []);
  const cottage = cottages.find((c) => c.slug === slug);
  if (!cottage) notFound();

  return (
    <div>
      <Link href="/admin/cottages" style={{ fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: '12px', display: 'inline-block' }}>← Назад к списку коттеджей</Link>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', marginBottom: '20px' }}>{cottage.title}</h1>
      <CottageEditor initial={cottage} />
    </div>
  );
}
