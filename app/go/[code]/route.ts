import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, [object Promise]> }) {
  const shortCode = params.code;

  if (!shortCode) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const link = await prisma.trackingLink.findUnique({
      where: { shortCode },
      include: { article: true }
    });

    if (!link) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Attempt to log the click (async, don't block the redirect)
    // In production we'd want to queue this or handle error ignoring
    const userAgent = request.headers.get('user-agent')?.substring(0, 255) || 'Unknown';
    // Hashing IP for privacy, normally we'd pull from x-forwarded-for
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Fire and forget click storage
    prisma.click.create({
      data: {
        linkId: link.id,
        userAgent,
        ipHash: ip // Note: should ideally hash this in production
      }
    }).catch(err => console.error('Failed to log click', err));

    // Redirect to actual article with ref appended (optional, just for client analytics if needed)
    const targetUrl = new URL(`/articles/${link.article.slug}?ref=${link.partnerId}`, request.url);
    return NextResponse.redirect(targetUrl);

  } catch (err) {
    console.error('Redirect Engine Error:', err);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
