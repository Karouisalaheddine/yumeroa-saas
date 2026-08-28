import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/app/actions/articles';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    // Extremely Important: We must verify the payload is genuinely from our WP server.
    // Easiest method for MVP: A secret token in the Headers
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.WP_WEBHOOK_SECRET;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized payload' }, { status: 401 });
    }

    // 2. Parse WP Payload
    const body = await req.json();
    
    // We expect a raw JSON post payload from WordPress REST API Webhooks
    const wpId = body.id;
    const title = body.title?.rendered || 'Untitled WP Post';
    const slug = body.slug || await generateSlug(title);
    const content = body.content?.rendered || '';
    const excerpt = body.excerpt?.rendered || '';
    
    // WP stores status as 'publish', we map it to our Prisma enum
    const wpStatus = body.status;
    let localStatus: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' = 'DRAFT';
    if (wpStatus === 'publish') localStatus = 'PUBLISHED';
    if (wpStatus === 'trash') localStatus = 'ARCHIVED';

    // Image logic: WP sends a featured image URL in the webhook if configured,
    // otherwise we might need a separate API call to fetch embed data.
    const coverImage = body.featured_image_url || null;

    // 3. Upsert into Supabase/Prisma
    const article = await prisma.article.upsert({
      where: { wpId: wpId },
      update: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: localStatus,
      },
      create: {
        wpId,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: localStatus,
      },
    });

    console.log(`Successfully synced WP Post ID ${wpId} -> Article ${article.id}`);

    // NOTE: This is where we would trigger Phase 5 AI (OpenAI Content Pack Generation)
    // using an edge worker or background queue.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article Synced',
      articleId: article.id 
    });

  } catch (error: any) {
    console.error('WP Webhook Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
