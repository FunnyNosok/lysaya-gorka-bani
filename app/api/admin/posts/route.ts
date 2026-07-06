import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getAllPosts, savePost } from '@/lib/content';
import { postSchema, slugify, formatDateLabel } from '@/lib/validators';
import type { Post } from '@/data/posts';

export async function GET() {
  try {
    await requireAuth();
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();

    const now = new Date().toISOString();
    const id = body.id || ('post_' + Date.now());
    const slug = body.slug ? slugify(body.slug) : slugify(body.title || '');

    const post: Post = {
      id,
      type: body.type || 'article',
      status: body.status || 'draft',
      slug,
      title: body.title || '',
      excerpt: body.excerpt || '',
      content: body.content || '',
      image: body.image || '',
      date: body.date || new Date().toISOString().slice(0, 10),
      dateLabel: body.dateLabel || formatDateLabel(body.date || new Date().toISOString().slice(0, 10)),
      typeLabel: (body.type || 'article') === 'offer' ? 'Акция' : 'Статья',
      ctaText: body.ctaText || null,
      ctaWhatsappText: body.ctaWhatsappText || null,
      note: body.note || null,
      validTo: body.validTo || null,
      seoTitle: body.seoTitle || null,
      seoDescription: body.seoDescription || null,
      createdAt: body.createdAt || now,
      updatedAt: now,
    };

    const parsed = postSchema.safeParse(post);
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
