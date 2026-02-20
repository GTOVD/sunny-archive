import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

/**
 * Middleware to handle basic dynamic redirects for The Sunny Archive.
 * Primary focus: legacy path mapping and vanity URL support.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Legacy Artifact Redirects
  // Redirects /artifacts/[id] -> /treasury/[id]
  if (pathname.startsWith('/artifacts')) {
    const id = pathname.split('/').pop();
    const url = request.nextUrl.clone();
    url.pathname = id && id !== 'artifacts' ? `/treasury/${id}` : '/treasury';
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. Collection Vanity Redirects (Example)
  // Mapping short names to full collection queries if necessary
  const vanityMaps: Record<string, string> = {
    '/vault': '/treasury',
    '/collection': '/archive',
  };

  if (vanityMaps[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = vanityMaps[pathname];
    return NextResponse.redirect(url, { status: 302 });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
