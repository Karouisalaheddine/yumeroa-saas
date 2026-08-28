import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { articleId } = body;

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID required' }, { status: 400 });
    }

    // 1. Fetch Article Context
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { title: true, excerpt: true, content: true }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // 2. Fetch Partner Info (for personalization)
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { partnerProfile: true }
    });

    if (!dbUser || !dbUser.partnerProfile) {
      return NextResponse.json({ error: 'Partner profile missing' }, { status: 403 });
    }

    // 3. AI Generation (OpenAI Fetch for MVP to avoid missing dependency)
    const prompt = `
      You are an elite food marketer. Analyze this article:
      Title: ${article.title}
      Excerpt: ${article.excerpt}
      Content Snippet: ${article.content?.substring(0, 500)}

      Generate a highly-converting promotional "Content Pack" JSON containing:
      {
        "tiktok_hook": "Catchy 3-second hook script",
        "tiktok_caption": "Caption for the post",
        "pinterest_title": "SEO optimized pin title",
        "pinterest_description": "2-3 sentence pin desc ending with a CTA",
        "hashtags": ["#food", "#recipe"]
      }
      Do NOT wrap the output in markdown code blocks. Output pure JSON only.
    `;

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', 
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    if (!openAiRes.ok) {
        throw new Error('AI Provider failed');
    }

    const aiData = await openAiRes.json();
    const contentPack = JSON.parse(aiData.choices[0].message.content);

    // Provide the tracking link structure assuming standard shortcode 
    // In production we would look up or generate a `TrackingLink` record here
    const shortCode = `${dbUser.partnerProfile.id.substring(0, 5)}_${articleId.substring(0, 5)}`.toUpperCase();

    return NextResponse.json({
      success: true,
      partnerLink: `https://yumeroa.com/go/${shortCode}`,
      contentPack
    });

  } catch (error: any) {
    console.error('AI Dispatch Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
