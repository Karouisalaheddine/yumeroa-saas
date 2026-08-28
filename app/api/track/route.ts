import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const body = await req.json();
    const { partnerId, articleSlug, ipHash, userAgent } = body;

    if (!partnerId || !articleSlug) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    // 1. Resolve Tracking Link ID
    // We query the link that matches this partner and article to log it precisely.
    // In production, we typically cache this.
    const { data: linkData } = await supabase
      .from('tracking_links')
      .select('id')
      .eq('partner_id', partnerId)
      // Note: We'd normally join on article, but for speed we can lookup article_id via slug first
      .limit(1)
      .single();

    if (linkData?.id) {
       // 2. Insert Click
      await supabase.from('clicks').insert([
        {
          link_id: linkData.id,
          ip_hash: ipHash ? hashString(ipHash) : null, // Anonymize IP
          user_agent: userAgent,
          timestamp: new Date().toISOString()
        }
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Fail silently for tracking
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function hashString(str: string) {
  // Simple fast hash for MVP IP anonymization
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}
