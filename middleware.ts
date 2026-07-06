import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'lg_admin_session';
const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_API_PATHS = ['/api/admin/login', '/api/admin/logout'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/admin/')) {
    if (PUBLIC_API_PATHS.some((p) => pathname === p)) return NextResponse.next();
    const cookie = req.cookies.get(SESSION_COOKIE);
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    const cookie = req.cookies.get(SESSION_COOKIE);
    if (!cookie?.value) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
