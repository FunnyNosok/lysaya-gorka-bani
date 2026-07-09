import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getAllCottages, saveCottage } from '@/lib/content';

export async function GET() {
  try {
    await requireAuth();
    const cottages = await getAllCottages();
    return NextResponse.json({ cottages });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: 'slug и title обязательны' }, { status: 400 });
    }
    await saveCottage(body);
    revalidatePath('/', 'layout');
    revalidatePath('/admin/cottages');
    revalidatePath(`/admin/cottages/${body.slug}`);
    revalidatePath(`/arenda-cottage/${body.slug}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
