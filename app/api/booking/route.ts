import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validators';
import { saveBooking, type Booking } from '@/lib/content';
import { isKvAvailable } from '@/lib/kv';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Неверные данные', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const booking: Booking = {
      id: 'booking_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      name: data.name,
      phone: data.phone,
      object: data.object || '',
      date: data.date || '',
      hours: data.hours || '',
      people: data.people || '',
      source: data.source || 'site',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (isKvAvailable()) {
      await saveBooking(booking);
      await notifyTelegram(booking).catch(() => {});
    }

    return NextResponse.json({ ok: true, id: booking.id });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

async function notifyTelegram(b: Booking) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    '🔔 Новая заявка с сайта',
    `Имя: ${b.name}`,
    `Телефон: ${b.phone}`,
    b.object ? `Объект: ${b.object}` : '',
    b.date ? `Дата: ${b.date}` : '',
    b.hours ? `Часов: ${b.hours}` : '',
    b.people ? `Гостей: ${b.people}` : '',
  ].filter(Boolean).join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
