import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 1. Attribution Engine Intercept
  if (url.pathname.startsWith('/go/')) {
    const parts = url.pathname.split('/'); // ['', 'go', 'shortCode']
    
    // For MVP, we route via shortcode: /go/SARAH_PASTA123
    // We will redirect to a resolver API that handles the DB lookup and cookie setting,
    // or we can set the cookie here if we restructure our short links to contain the partner ID explicitly: /go/:partnerId/:slug
    
    if (parts.length >= 4) {
      const partnerId = parts[2];
      const articleSlug = parts[3];

      // Redirect to the actual article
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `/articles/${articleSlug}`;

      const response = NextResponse.redirect(redirectUrl);

      // Drop the attribution cookie (30 days)
      response.cookies.set('ym_pid', partnerId, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // Read securely on the server when generating outbound affiliate links
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
      });

      // Silently log impression (fire and forget to not block redirect)
      try {
        fetch(`${request.nextUrl.origin}/api/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partnerId,
            articleSlug,
            ipHash: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown'
          })
        }).catch(() => {}); // Ignore fails natively to keep redirect fast
      } catch (e) {}

      return response;
    }
  }

  // 2. Auth Session Check
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
