import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getPostById, savePost, deletePost } from '@/lib/content';
import { postSchema, formatDateLabel, slugify } from '@/lib/validators';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const post = await getPostById(id);
    if (!post) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const existing = await getPostById(id);
    if (!existing) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });

    const body = await req.json();
    const now = new Date().toISOString();

    const updated = {
      ...existing,
      type: body.type ?? existing.type,
      status: body.status ?? existing.status,
      slug: body.slug ? slugify(body.slug) : existing.slug,
      title: body.title ?? existing.title,
      excerpt: body.excerpt ?? existing.excerpt,
      content: body.content ?? existing.content,
      image: body.image ?? existing.image,
      date: body.date ?? existing.date,
      dateLabel: body.date ? formatDateLabel(body.date) : existing.dateLabel,
      typeLabel: (body.type ?? existing.type) === 'offer' ? 'Акция' : 'Статья',
      ctaText: body.ctaText ?? existing.ctaText,
      ctaWhatsappText: body.ctaWhatsappText ?? existing.ctaWhatsappText,
      note: body.note ?? existing.note,
      validTo: body.validTo ?? existing.validTo,
      seoTitle: body.seoTitle ?? existing.seoTitle,
      seoDescription: body.seoDescription ?? existing.seoDescription,
      updatedAt: now,
    };

    const parsed = postSchema.safeParse(updated);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Ошибка валидации', details: parsed.error.flatten() }, { status: 400 });
    }

    await savePost(parsed.data);
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true, post: parsed.data });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    await deletePost(id);
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
