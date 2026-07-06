import { NextRequest, NextResponse } from 'next/server';
import { kv, isKvAvailable } from '@/lib/kv';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  if (!isKvAvailable()) {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 500 });
  }

  const { filename } = await params;
  const dataUrl = await kv().get<string>(`upload:${filename}`);

  if (!dataUrl || typeof dataUrl !== 'string') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
  if (!match) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 500 });
  }

  const contentType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
