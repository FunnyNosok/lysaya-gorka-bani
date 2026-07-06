import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import { getAllBanyas, saveBanya } from '@/lib/content';

export async function GET() {
  try {
    await requireAuth();
    const banyas = await getAllBanyas();
    return NextResponse.json({ banyas });
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
    await saveBanya(body);
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
