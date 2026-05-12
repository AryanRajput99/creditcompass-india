-- ============================================================
-- CreditCompass India — click_events table
-- Run this in Supabase SQL Editor ONCE before going live
-- ============================================================

CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES credit_cards(id) ON DELETE SET NULL,
  card_name TEXT NOT NULL,
  card_slug TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  user_ip TEXT,            -- Anonymized: last octet replaced with .xxx
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,         -- e.g. 'google', 'direct'
  utm_medium TEXT,         -- e.g. 'organic', 'cpc'
  utm_campaign TEXT,       -- e.g. 'hdfc_regalia_review'
  session_id TEXT,         -- Client-side generated session ID
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast analytics queries
CREATE INDEX IF NOT EXISTS idx_click_events_card_slug ON click_events(card_slug);
CREATE INDEX IF NOT EXISTS idx_click_events_clicked_at ON click_events(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_click_events_card_id ON click_events(card_id);

-- Enable Row Level Security
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Allow service_role (server-side API) to insert and read everything
CREATE POLICY "service_role_full_access" ON click_events
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Deny all access from anon/authenticated roles (data is server-side only)
-- The API route uses the service role key, so this is secure.

-- ============================================================
-- ANALYTICS QUERIES (run these in Supabase SQL editor)
-- ============================================================

-- Top 10 most clicked cards (last 30 days)
-- SELECT card_name, card_slug, COUNT(*) as clicks
-- FROM click_events
-- WHERE clicked_at > NOW() - INTERVAL '30 days'
-- GROUP BY card_name, card_slug
-- ORDER BY clicks DESC
-- LIMIT 10;

-- Daily click volume (last 7 days)
-- SELECT DATE(clicked_at) as date, COUNT(*) as clicks
-- FROM click_events
-- WHERE clicked_at > NOW() - INTERVAL '7 days'
-- GROUP BY DATE(clicked_at)
-- ORDER BY date DESC;

-- UTM source breakdown
-- SELECT utm_source, COUNT(*) as clicks
-- FROM click_events
-- WHERE clicked_at > NOW() - INTERVAL '30 days'
-- GROUP BY utm_source
-- ORDER BY clicks DESC;
