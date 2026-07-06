import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
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

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const hash = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}_${hash}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const bytes = await file.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(bytes));

    const publicPath = `/images/uploads/${filename}`;
    return NextResponse.json({ ok: true, path: publicPath });
  } catch (e) {
    return NextResponse.json(
      { error: 'Ошибка загрузки: ' + (e instanceof Error ? e.message : 'unknown') },
      { status: 500 }
    );
  }
}
