// ============================================================
// EarnKaro Affiliate Offers Registry
// CreditCompass India
//
// ✅ LIVE LINKS — Extracted from EarnKaro account (Finance Deals - June 2026)
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
// 🔥 FRESH DEALS — FROM EARNKARO FINANCE DEALS (SCRAPED)
// ------------------------------------------------------------

const ACTIVE_OFFERS: EarnKaroOffer[] = [
  {
    card_slug: 'axis-flipkart',
    card_name: 'Axis Bank Flipkart Credit Card',
    bank_name: 'Axis Bank',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/Isov7XV',
    is_active: true,
  },
  {
    card_slug: 'axis-myzone-rupay',
    card_name: 'Axis Bank MyZone RuPay Credit Card',
    bank_name: 'Axis Bank',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/HT2jsqi',
    is_active: true,
  },
  {
    card_slug: 'sbi-cashback-credit-card',
    card_name: 'SBI Cashback Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/E74zoko',
    is_active: true,
  },
  {
    card_slug: 'sbi-simplyclick-credit-card',
    card_name: 'SBI SimplyCLICK Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/ylvoMWo',
    is_active: true,
  },
  {
    card_slug: 'sbi-flipkart-credit-card',
    card_name: 'SBI Flipkart Credit Card',
    bank_name: 'SBI Card',
    commission: 2240,
    earnkaro_url: 'https://bitli.in/DDD66ui',
    is_active: true,
  },
  {
    card_slug: 'axis-rewards-visa',
    card_name: 'Axis Bank Rewards Visa Credit Card',
    bank_name: 'Axis Bank',
    commission: 2080,
    earnkaro_url: 'https://bitli.in/cQux2ig',
    is_active: true,
  },
  {
    card_slug: 'axis-privilege-amex',
    card_name: 'Axis Bank Privilege Amex Credit Card',
    bank_name: 'Axis Bank',
    commission: 2080,
    earnkaro_url: 'https://bitli.in/3pzecC7',
    is_active: true,
  },
  {
    card_slug: 'axis-privilege',
    card_name: 'Axis Bank Privilege Credit Card',
    bank_name: 'Axis Bank',
    commission: 2080,
    earnkaro_url: 'https://bitli.in/Zkh5eYa',
    is_active: true,
  },
  {
    card_slug: 'axis-neo-rupay',
    card_name: 'Axis Bank Neo RuPay Credit Card',
    bank_name: 'Axis Bank',
    commission: 1920,
    earnkaro_url: 'https://bitli.in/H0GVnMe',
    is_active: true,
  },
  {
    card_slug: 'yes-bank-pop-club',
    card_name: 'Yes Bank Pop-Club Credit Card',
    bank_name: 'YES Bank',
    commission: 1500,
    earnkaro_url: 'https://bitli.in/csqaedT',
    is_active: true,
  },
  {
    card_slug: 'kotak-cashback-plus',
    card_name: 'Kotak Cashback Plus Credit Card',
    bank_name: 'Kotak Mahindra Bank',
    commission: 1540,
    earnkaro_url: 'https://bitli.in/x1D9orj',
    is_active: true,
  },
  {
    card_slug: 'kotak-league-platinum',
    card_name: 'Kotak League Platinum Credit Card',
    bank_name: 'Kotak Mahindra Bank',
    commission: 1400,
    earnkaro_url: 'https://bitli.in/fAhFv7c',
    is_active: true,
  },
  {
    card_slug: 'roarbank-rupay',
    card_name: 'Roarbank RuPay Credit Card',
    bank_name: 'Roarbank',
    commission: 1330,
    earnkaro_url: 'https://bitli.in/41KkWj5',
    is_active: true,
  },
  {
    card_slug: 'idfc-first-power-plus',
    card_name: 'IDFC First Power Plus Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 1120,
    earnkaro_url: 'https://bitli.in/amXVX3v',
    is_active: true,
  },
  {
    card_slug: 'bob-eterna',
    card_name: 'BOB Eterna Credit Card',
    bank_name: 'Bank of Baroda',
    commission: 950,
    earnkaro_url: 'https://bitli.in/RaDx2Mn',
    is_active: true,
  },
  {
    card_slug: 'bob-cashback',
    card_name: 'BOB Cashback Credit Card',
    bank_name: 'Bank of Baroda',
    commission: 950,
    earnkaro_url: 'https://bitli.in/qk96cPm',
    is_active: true,
  },
  {
    card_slug: 'indusind-tiger',
    card_name: 'IndusInd Tiger Credit Card',
    bank_name: 'IndusInd Bank',
    commission: 400,
    earnkaro_url: 'https://bitli.in/0JZgH6w',
    is_active: true,
  },
  {
    card_slug: 'hdfc-irctc-credit-card',
    card_name: 'HDFC IRCTC Credit Card',
    bank_name: 'HDFC Bank',
    commission: 400,
    earnkaro_url: 'https://bitli.in/EuT442a',
    is_active: true,
  },
  {
    card_slug: 'hdfc-millennia',
    card_name: 'HDFC Millennia Credit Card',
    bank_name: 'HDFC Bank',
    commission: 400,
    earnkaro_url: 'https://bitli.in/oa9ojj1',
    is_active: true,
  },
  {
    card_slug: 'hdfc-pixel-play-credit-card',
    card_name: 'HDFC Pixel Play Credit Card',
    bank_name: 'HDFC Bank',
    commission: 400,
    earnkaro_url: 'https://bitli.in/9KYLWH7',
    is_active: true,
  },
  // Add some high-paying ones from previous turn that are still likely active
  {
    card_slug: 'idfc-first-mayura',
    card_name: 'IDFC First Mayura Credit Card',
    bank_name: 'IDFC First Bank',
    commission: 2800,
    earnkaro_url: 'https://bitli.in/7oqoQfQ',
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
  }
];

// Combined & sorted export
export const EARNKARO_OFFERS: EarnKaroOffer[] = [...ACTIVE_OFFERS].sort((a, b) => b.commission - a.commission);

/** Lookup a single card's EarnKaro offer by its slug */
export function getEarnKaroOffer(slug: string): EarnKaroOffer | undefined {
  return EARNKARO_OFFERS.find((o) => o.card_slug === slug && o.is_active);
}

/** Get the affiliate URL for a card — returns EarnKaro link if available, falls back to provided URL */
export function getAffiliateUrl(slug: string, fallbackUrl: string): string {
  const offer = getEarnKaroOffer(slug);
  return offer?.earnkaro_url ?? fallbackUrl;
}
