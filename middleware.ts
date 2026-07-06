import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'lg_admin_session';
const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_API_PATHS = ['/api/admin/login', '/api/admin/logout'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Security headers for all responses
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (pathname.startsWith('/api/admin/')) {
    if (PUBLIC_API_PATHS.some((p) => pathname === p)) return res;

    // CSRF: check Origin header for state-changing requests
    const method = req.method.toUpperCase();
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      const origin = req.headers.get('origin');
      const host = req.headers.get('host');
      if (origin && host) {
        const originHost = origin.replace(/^https?:\/\//, '').split('/')[0];
        if (originHost !== host) {
          return NextResponse.json({ error: 'Cross-origin request blocked' }, { status: 403 });
        }
      }
    }

    const cookie = req.cookies.get(SESSION_COOKIE);
    if (!cookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return res;
  }

  if (pathname.startsWith('/admin')) {
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
      return res;
    }
    const cookie = req.cookies.get(SESSION_COOKIE);
    if (!cookie?.value) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/((?!api/admin|admin|_next/static|_next/image|favicon.ico).*)'],
};
