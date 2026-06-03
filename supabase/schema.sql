-- ============================================================
-- CreditCompass India — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT UNIQUE NOT NULL,       -- "cashback", "travel", etc.
  label         TEXT NOT NULL,              -- "Best Cashback Cards"
  icon          TEXT,                       -- Emoji or icon name
  description   TEXT,
  seo_title     TEXT,
  seo_description TEXT,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CREDIT CARDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS credit_cards (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT UNIQUE NOT NULL,       -- hdfc-regalia-gold
  name                TEXT NOT NULL,              -- HDFC Regalia Gold
  bank_name           TEXT NOT NULL,              -- HDFC Bank
  bank_logo_url       TEXT,
  card_image_url      TEXT,
  
  -- Fees
  joining_fee         INTEGER DEFAULT 0,          -- in ₹, 0 = free
  annual_fee          INTEGER DEFAULT 0,          -- in ₹
  annual_fee_waiver   TEXT,                       -- "Spend ₹3L/year"
  is_lifetime_free    BOOLEAN DEFAULT false,
  
  -- Eligibility
  min_income_monthly  INTEGER,                    -- in ₹ per month
  min_age             INTEGER DEFAULT 18,
  max_age             INTEGER DEFAULT 65,
  min_credit_score    INTEGER DEFAULT 700,
  employment_type     TEXT DEFAULT 'both',        -- 'salaried', 'self-employed', 'both'
  
  -- Benefits
  cashback_rate       DECIMAL(5,2),               -- 2.5 (%)
  reward_rate         TEXT,                       -- "5X on dining & entertainment"
  lounge_access       TEXT,                       -- "8 domestic + 2 international per year"
  fuel_surcharge      TEXT,                       -- "1% waiver up to ₹500/month"
  welcome_bonus       TEXT,                       -- "5000 reward points on first spend"
  
  -- Card Details
  categories          TEXT[] DEFAULT '{}',        -- ["cashback", "travel"]
  pros                TEXT[] DEFAULT '{}',
  cons                TEXT[] DEFAULT '{}',
  best_for            TEXT,                       -- "Frequent flyers & luxury travelers"
  
  -- Affiliate
  affiliate_url       TEXT NOT NULL,              -- Your EarnKaro link
  
  -- Admin
  is_featured         BOOLEAN DEFAULT false,
  is_active           BOOLEAN DEFAULT true,
  sort_order          INTEGER DEFAULT 0,
  
  -- SEO
  seo_title           TEXT,
  seo_description     TEXT,
  
  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLICK TRACKING TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS click_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id         UUID REFERENCES credit_cards(id) ON DELETE SET NULL,
  card_name       TEXT NOT NULL,
  card_slug       TEXT NOT NULL,
  affiliate_url   TEXT NOT NULL,
  
  -- User context (anonymized)
  user_ip         TEXT,
  user_agent      TEXT,
  referrer        TEXT,
  
  -- UTM parameters (for campaign tracking)
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  
  -- Session
  session_id      TEXT,
  
  clicked_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COMPARISON SESSIONS (Optional - for analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS comparison_sessions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_ids    UUID[] NOT NULL,
  card_names  TEXT[],
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  excerpt         TEXT,
  content         TEXT,                     -- Markdown content
  cover_image_url TEXT,
  tags            TEXT[] DEFAULT '{}',
  is_published    BOOLEAN DEFAULT false,
  published_at    TIMESTAMPTZ,
  seo_title       TEXT,
  seo_description TEXT,
  author_name     TEXT DEFAULT 'CreditCompass Team',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_credit_cards_updated_at
  BEFORE UPDATE ON credit_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX idx_credit_cards_slug ON credit_cards(slug);
CREATE INDEX idx_credit_cards_is_active ON credit_cards(is_active);
CREATE INDEX idx_credit_cards_is_featured ON credit_cards(is_featured);
CREATE INDEX idx_credit_cards_categories ON credit_cards USING GIN(categories);
CREATE INDEX idx_click_events_card_id ON click_events(card_id);
CREATE INDEX idx_click_events_clicked_at ON click_events(clicked_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Allow public read of active cards. Only admins can write.
-- ============================================================
ALTER TABLE credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read active cards
CREATE POLICY "Public can view active cards"
  ON credit_cards FOR SELECT
  USING (is_active = true);

-- Public can read categories
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

-- Public can read published blog posts
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- Anyone can INSERT click events (tracking)
CREATE POLICY "Anyone can log clicks"
  ON click_events FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- SEED DATA — Default Categories
-- ============================================================
INSERT INTO categories (name, label, icon, description, seo_title, seo_description, sort_order) VALUES
  ('cashback', 'Cashback Cards', '💰', 'Earn cash back on every purchase', 'Best Cashback Credit Cards in India 2026', 'Compare the best cashback credit cards in India. Earn up to 5% cashback on every purchase.', 1),
  ('travel', 'Travel Cards', '✈️', 'Miles, lounge access & travel perks', 'Best Travel Credit Cards in India 2026', 'Find the best travel credit cards in India with air miles, lounge access, and exclusive travel benefits.', 2),
  ('fuel', 'Fuel Cards', '⛽', 'Savings on petrol & diesel', 'Best Fuel Credit Cards in India 2026', 'Save on every fuel purchase with India''s best fuel credit cards. Get surcharge waiver and cashback.', 3),
  ('shopping', 'Shopping Cards', '🛍️', 'Rewards on online & offline shopping', 'Best Shopping Credit Cards in India 2026', 'Maximize savings on Amazon, Flipkart, and more with the best shopping credit cards.', 4),
  ('business', 'Business Cards', '💼', 'Designed for entrepreneurs & SMEs', 'Best Business Credit Cards in India 2026', 'Top business credit cards in India for entrepreneurs and SMEs with high limits and business benefits.', 5),
  ('student', 'Student Cards', '🎓', 'First credit card for beginners', 'Best Student Credit Cards in India 2026', 'Get your first credit card as a student. Low income requirement, no annual fee options.', 6),
  ('lifetime-free', 'Lifetime Free', '🎁', 'Zero annual fee cards forever', 'Best Lifetime Free Credit Cards in India 2026', 'Never pay annual fees again. Discover the best lifetime free credit cards available in India.', 7),
  ('premium', 'Premium Cards', '👑', 'Luxury benefits & concierge service', 'Best Premium Credit Cards in India 2026', 'Experience luxury with India''s premium credit cards. Concierge service, golf, fine dining and more.', 8),
  ('rewards', 'Rewards Cards', '⭐', 'Maximum reward points on spending', 'Best Rewards Credit Cards in India 2026', 'Earn maximum reward points on every purchase. Redeem for flights, hotels, and merchandise.', 9)
ON CONFLICT (name) DO NOTHING;
