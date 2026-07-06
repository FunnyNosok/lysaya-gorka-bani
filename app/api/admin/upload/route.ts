import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

// Magic bytes signatures for real file validation
const MAGIC_BYTES: Record<string, number[]> = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF
};

function checkMagicBytes(buf: Buffer, contentType: string): boolean {
  const expected = MAGIC_BYTES[contentType];
  if (!expected) return true; // AVIF has no simple signature, skip
  if (buf.length < expected.length) return false;
  return expected.every((byte, i) => buf[i] === byte);
}

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

    const bytes = await file.arrayBuffer();
    const buf = Buffer.from(bytes);

    // Validate magic bytes — prevent disguised file uploads
    if (!checkMagicBytes(buf, file.type)) {
      return NextResponse.json(
        { error: 'Содержимое файла не соответствует типу' },
        { status: 400 }
      );
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const ext = file.type.split('/')[1] || 'jpg';
    const hash = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}_${hash}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filepath, buf);

    const publicPath = `/images/uploads/${filename}`;
    return NextResponse.json({ ok: true, path: publicPath });
  } catch (e) {
    return NextResponse.json(
      { error: 'Ошибка загрузки: ' + (e instanceof Error ? e.message : 'unknown') },
      { status: 500 }
    );
  }
}
