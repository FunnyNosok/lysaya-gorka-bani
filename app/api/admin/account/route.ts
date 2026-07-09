import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, changeCredentials } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const currentPassword = String(body?.currentPassword || '');
    const newLogin = String(body?.newLogin || '').trim();
    const newPassword = String(body?.newPassword || '');

    if (!currentPassword) {
      return NextResponse.json({ error: 'Укажите текущий пароль' }, { status: 400 });
    }
    if (newLogin.length < 3 || newLogin.length > 50) {
      return NextResponse.json({ error: 'Логин должен быть от 3 до 50 символов' }, { status: 400 });
    }
    if (/\s/.test(newLogin)) {
      return NextResponse.json({ error: 'Логин не должен содержать пробелов' }, { status: 400 });
    }
    if (newPassword.length < 8 || newPassword.length > 100) {
      return NextResponse.json({ error: 'Пароль должен быть от 8 до 100 символов' }, { status: 400 });
    }

    await changeCredentials(currentPassword, newLogin, newPassword);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Ошибка сервера';
    const status = msg.includes('неверно') ? 400 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
