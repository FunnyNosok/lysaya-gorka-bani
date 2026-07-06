import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { kv, isKvAvailable } from '@/lib/kv';
import crypto from 'crypto';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!isKvAvailable()) {
      return NextResponse.json(
        { error: 'Хранилище недоступно — настройте KV_REST_API_URL и KV_REST_API_TOKEN' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Файл не загружен' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Файл слишком большой (макс. 5 МБ)' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Допустимы только JPG, PNG, WebP, GIF, AVIF' },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const hash = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}_${hash}.${ext}`;

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    await kv().set(`upload:${filename}`, dataUrl);

    const publicPath = `/api/uploads/${filename}`;
    return NextResponse.json({ ok: true, path: publicPath });
  } catch (e) {
    return NextResponse.json(
      { error: 'Ошибка загрузки: ' + (e instanceof Error ? e.message : 'unknown') },
      { status: 500 }
    );
  }
}
