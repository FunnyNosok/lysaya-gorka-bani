import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getAllBookings, updateBookingStatus } from '@/lib/content';

const VALID_STATUSES = ['new', 'contacted', 'done', 'cancelled'] as const;

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
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Требуется id' }, { status: 400 });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Недопустимый статус' }, { status: 400 });
    }
    await updateBookingStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
