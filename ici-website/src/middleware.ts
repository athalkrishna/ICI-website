import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'internationalcoachinginstitute.org';

function httpsRedirect(req: NextRequest, host: string): NextResponse | null {
  const proto = req.headers.get('x-forwarded-proto');
  if (proto !== 'http') return null;

  const url = req.nextUrl.clone();
  url.protocol = 'https:';
  url.host = host;
  return NextResponse.redirect(url, 301);
}

/** 301 non-canonical hosts (www, any .vercel.app) and HTTP → HTTPS on apex .org. */
function canonicalHostRedirect(req: NextRequest): NextResponse | null {
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase();
  if (!host) return null;

  if (host === CANONICAL_HOST) {
    return httpsRedirect(req, host);
  }

  const shouldRedirect =
    host === `www.${CANONICAL_HOST}` || host.endsWith('.vercel.app');

  if (!shouldRedirect) return null;

  const url = req.nextUrl.clone();
  url.protocol = 'https:';
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 301);
}

export async function middleware(req: NextRequest) {
  const hostRedirect = canonicalHostRedirect(req);
  if (hostRedirect) return hostRedirect;

  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (path.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (path.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    const role = token.role as string | undefined;
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  if (path.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (token.role !== 'STUDENT') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
