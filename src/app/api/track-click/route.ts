import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ============================================================
// POST /api/track-click
// Logs every affiliate click to Supabase for analytics
// Called BEFORE redirecting user to affiliate URL
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // sendBeacon sends text/plain, so we parse the raw text as JSON
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    const { card_id, card_name, card_slug, affiliate_url } = body;

    if (!card_name || !card_slug || !affiliate_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Extract tracking info from request
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    
    // Anonymize IP (remove last octet for privacy compliance)
    const rawIp = forwardedFor?.split(',')[0] || realIp || 'unknown';
    const anonymizedIp = rawIp.replace(/\.\d+$/, '.xxx'); // e.g., 192.168.1.xxx

    // Extract UTM parameters from request URL
    const { searchParams } = new URL(request.url);
    const sessionId = body.session_id || null;

    // Create a Supabase client (using service role to bypass RLS for inserts)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      // Use service role for writing, or anon if policy allows insert
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from('click_events').insert({
      card_id: card_id || null,
      card_name,
      card_slug,
      affiliate_url,
      user_ip: anonymizedIp,
      user_agent: userAgent,
      referrer,
      utm_source: searchParams.get('utm_source') || body.utm_source || null,
      utm_medium: searchParams.get('utm_medium') || body.utm_medium || null,
      utm_campaign: searchParams.get('utm_campaign') || body.utm_campaign || null,
      session_id: sessionId,
    });

    if (error) {
      // Log error but don't fail — tracking should never block user
      console.error('Click tracking error:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track click API error:', error);
    // Return success anyway — don't let tracking break the UX
    return NextResponse.json({ success: true });
  }
}

// GET /api/track-click?card=slug — Analytics summary (admin only in future)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardSlug = searchParams.get('card');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = supabase
    .from('click_events')
    .select('card_name, card_slug, clicked_at', { count: 'exact' })
    .order('clicked_at', { ascending: false })
    .limit(100);

  if (cardSlug) {
    query = query.eq('card_slug', cardSlug);
  }

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clicks: data, total: count });
}
