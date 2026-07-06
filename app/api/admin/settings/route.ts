import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSettings, saveSettings } from '@/lib/content';
import { settingsSchema } from '@/lib/validators';

export async function GET() {
  try {
    await requireAuth();
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Ошибка валидации', details: parsed.error.flatten() }, { status: 400 });
    }
    await saveSettings(parsed.data);
    return NextResponse.json({ ok: true, settings: parsed.data });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
