import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllServices } from '@/lib/content';
import { ServiceEditor } from '@/components/ServiceEditor';

export const dynamic = 'force-dynamic';

export default async function AdminServiceEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getAllServices().catch(() => []);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div>
      <Link href="/admin/services" style={{ fontSize: '.88rem', color: 'var(--ink-soft)', marginBottom: '12px', display: 'inline-block' }}>← Назад к списку услуг</Link>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', marginBottom: '20px' }}>{service.cardTitle}</h1>
      <ServiceEditor initial={service} />
    </div>
  );
}
