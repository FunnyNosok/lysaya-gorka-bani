import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const loginValue = String(body?.login || '');
    const password = String(body?.password || '');

    if (!loginValue || !password) {
      return NextResponse.json({ error: 'Введите логин и пароль' }, { status: 400 });
    }

    const ok = await login(loginValue, password);
    if (!ok) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Авторизация недоступна — задайте ADMIN_LOGIN, ADMIN_PASSWORD и AUTH_SECRET в переменных окружения' },
      { status: 500 }
    );
  }
}
