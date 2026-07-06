import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getAllBookings, updateBookingStatus } from '@/lib/content';

export async function GET() {
  try {
    await requireAuth();
    const bookings = await getAllBookings();
    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: 'Требуется id и status' }, { status: 400 });
    await updateBookingStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
