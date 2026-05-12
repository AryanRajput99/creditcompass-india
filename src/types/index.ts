// ============================================================
// CreditCompass India — TypeScript Types
// ============================================================

export type EmploymentType = 'salaried' | 'self-employed' | 'both';

export type CardCategory =
  | 'cashback'
  | 'travel'
  | 'fuel'
  | 'shopping'
  | 'business'
  | 'student'
  | 'lifetime-free'
  | 'premium'
  | 'rewards';

export interface CreditCard {
  id: string;
  slug: string;
  name: string;
  bank_name: string;
  bank_logo_url: string | null;
  card_image_url: string | null;

  // Fees
  joining_fee: number;
  annual_fee: number;
  annual_fee_waiver: string | null;
  is_lifetime_free: boolean;

  // Eligibility
  min_income_monthly: number | null;
  min_age: number;
  max_age: number;
  min_credit_score: number;
  employment_type: EmploymentType;

  // Benefits
  cashback_rate: number | null;
  reward_rate: string | null;
  lounge_access: string | null;
  fuel_surcharge: string | null;
  welcome_bonus: string | null;

  // Details
  categories: CardCategory[];
  pros: string[];
  cons: string[];
  best_for: string | null;

  // Affiliate
  affiliate_url: string;

  // Admin
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;

  // SEO
  seo_title: string | null;
  seo_description: string | null;

  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  icon: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  created_at: string;
}

export interface ClickEvent {
  id: string;
  card_id: string | null;
  card_name: string;
  card_slug: string;
  affiliate_url: string;
  user_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  session_id: string | null;
  clicked_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Filter & UI Types
// ============================================================

export interface CardFilters {
  categories: CardCategory[];
  isLifetimeFree: boolean;
  maxAnnualFee: number | null;
  minCashbackRate: number | null;
  bankName: string | null;
  hasLoungeAccess: boolean;
  hasFuelBenefit: boolean;
  sortBy: CardSortOption;
}

export type CardSortOption =
  | 'featured'
  | 'annual_fee_asc'
  | 'annual_fee_desc'
  | 'cashback_rate_desc'
  | 'newest';

export interface CompareCard {
  id: string;
  slug: string;
  name: string;
  bank_name: string;
  card_image_url: string | null;
}

// ============================================================
// Analytics Types
// ============================================================

export interface ClickAnalytics {
  total_clicks: number;
  clicks_today: number;
  top_cards: { card_name: string; clicks: number }[];
  clicks_by_day: { date: string; clicks: number }[];
}
