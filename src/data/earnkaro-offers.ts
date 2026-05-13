// ============================================================
// EarnKaro Affiliate Offers Registry
// CreditCompass India
//
// ✅ LIVE LINKS — Extracted from EarnKaro account (May 2025)
// All links are real bitli.in tracking URLs tied to your account.
// ============================================================

export interface EarnKaroOffer {
  /** Must match the `slug` column in the credit_cards Supabase table */
  card_slug: string;
  card_name: string;
  bank_name: string;
  /** Commission earned per approved card application (INR) */
  commission: number;
  /** Your personal EarnKaro affiliate link */
  earnkaro_url: string;
  /** Whether this offer is currently live and active */
  is_active: boolean;
}

// ------------------------------------------------------------
// 🔴 TIER 1 — ₹2,000+ per approval (TOP PRIORITY)
// ------------------------------------------------------------
const TIER1_OFFERS: EarnKaroOffer[] = [
  {
    card_slug: 'idfc-first-mayura',
    card_name: 'IDFC First Mayura Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 2800,
    earnkaro_url: 'https://bitli.in/7oqoQfQ',
    is_active: true,
  },
  {
    card_slug: 'sbi-cashback-credit-card',
    card_name: 'SBI Cashback Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/RGxLuah',
    is_active: true,
  },
  {
    card_slug: 'sbi-simplyclick-credit-card',
    card_name: 'SBI SimplyCLICK Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/9nslE7x',
    is_active: true,
  },
  {
    card_slug: 'sbi-simplysave-credit-card',
    card_name: 'SBI SimplySAVE Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/u3krqBx',
    is_active: true,
  },
  {
    card_slug: 'sbi-prime-credit-card',
    card_name: 'SBI Prime Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/782qfKX',
    is_active: true,
  },
  {
    card_slug: 'sbi-bpcl-credit-card',
    card_name: 'SBI BPCL Octane Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/P5OS8o4',
    is_active: true,
  },
  {
    card_slug: 'axis-myzone-rupay',
    card_name: 'Axis Bank MyZone RuPay Credit Card',
    bank_name: 'Axis Bank',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/LiyMx2R',
    is_active: true,
  },
  {
    card_slug: 'axis-indian-oil-rupay',
    card_name: 'Axis Bank Indian Oil RuPay Credit Card',
    bank_name: 'Axis Bank',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/dbFDOF6',
    is_active: true,
  },
  {
    card_slug: 'axis-airtel-rupay',
    card_name: 'Axis Bank Airtel RuPay Credit Card',
    bank_name: 'Axis Bank',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/tJndTf8',
    is_active: true,
  },
];

// ------------------------------------------------------------
// 🟡 TIER 2 — ₹1,000–₹1,999 per approval
// ------------------------------------------------------------
const TIER2_OFFERS: EarnKaroOffer[] = [
  {
    card_slug: 'hdfc-pixel-play-credit-card',
    card_name: 'HDFC Pixel Play Credit Card',
    bank_name: 'HDFC Bank',
    commission: 1500,
    earnkaro_url: 'https://bitli.in/4Wop58P',
    is_active: true,
  },
  {
    card_slug: 'hdfc-irctc-credit-card',
    card_name: 'HDFC IRCTC Credit Card',
    bank_name: 'HDFC Bank',
    commission: 1500,
    earnkaro_url: 'https://bitli.in/E3XxEsn',
    is_active: true,
  },
  {
    card_slug: 'au-lit-credit-card',
    card_name: 'AU LIT Credit Card',
    bank_name: 'AU Small Finance Bank',
    commission: 1540,
    earnkaro_url: 'https://bitli.in/V6O5cuy',
    is_active: true,
  },
  {
    card_slug: 'kiwi-upi-credit-card',
    card_name: 'Kiwi UPI Credit Card',
    bank_name: 'Kiwi',
    commission: 1500,
    earnkaro_url: 'https://bitli.in/GQQQLyw',
    is_active: true,
  },
  {
    card_slug: 'kotak-league-platinum',
    card_name: 'Kotak League Platinum Credit Card',
    bank_name: 'Kotak Mahindra Bank',
    commission: 1400,
    earnkaro_url: 'https://bitli.in/8ZkklTq',
    is_active: true,
  },
  {
    card_slug: 'idfc-first-swyp',
    card_name: 'IDFC First SWYP Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 1400,
    earnkaro_url: 'https://bitli.in/Pt8xNaK',
    is_active: true,
  },
  {
    card_slug: 'idfc-first-ashva',
    card_name: 'IDFC First Ashva Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 1050,
    earnkaro_url: 'https://bitli.in/w7YcQx7',
    is_active: true,
  },
  {
    card_slug: 'indusind-legend',
    card_name: 'IndusInd Legend Credit Card',
    bank_name: 'IndusInd Bank',
    commission: 900,
    earnkaro_url: 'https://bitli.in/kc2Uaig',
    is_active: true,
  },
  {
    card_slug: 'indusind-tiger',
    card_name: 'IndusInd Tiger Credit Card',
    bank_name: 'IndusInd Bank',
    commission: 900,
    earnkaro_url: 'https://bitli.in/h6q7yGb',
    is_active: true,
  },
];

// ------------------------------------------------------------
// 🟢 TIER 3 — Under ₹1,000 per approval
// ------------------------------------------------------------
const TIER3_OFFERS: EarnKaroOffer[] = [
  {
    card_slug: 'scapia-credit-card',
    card_name: 'Scapia Federal Credit Card',
    bank_name: 'Scapia / Federal Bank',
    commission: 770,
    earnkaro_url: 'https://bitli.in/vvBbuNF',
    is_active: true,
  },
  {
    card_slug: 'idfc-first-wow',
    card_name: 'IDFC First WOW Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 350,
    earnkaro_url: 'https://bitli.in/9jyVrk0',
    is_active: true,
  },
];

// ------------------------------------------------------------
// Combined & sorted export
// ------------------------------------------------------------
export const EARNKARO_OFFERS: EarnKaroOffer[] = [
  ...TIER1_OFFERS,
  ...TIER2_OFFERS,
  ...TIER3_OFFERS,
].sort((a, b) => b.commission - a.commission);

/** Lookup a single card's EarnKaro offer by its slug */
export function getEarnKaroOffer(slug: string): EarnKaroOffer | undefined {
  return EARNKARO_OFFERS.find((o) => o.card_slug === slug && o.is_active);
}

/** Get the affiliate URL for a card — returns EarnKaro link if available, falls back to provided URL */
export function getAffiliateUrl(slug: string, fallbackUrl: string): string {
  const offer = getEarnKaroOffer(slug);
  return offer?.earnkaro_url ?? fallbackUrl;
}
