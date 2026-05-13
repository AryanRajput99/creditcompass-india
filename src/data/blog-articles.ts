export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: 'guide' | 'review' | 'comparison' | 'hindi' | 'news';
  language: 'en' | 'hi';
  publishedAt: string;
  readTimeMinutes: number;
  heroEmoji: string;
  excerpt: string;
  featuredCardSlugs: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'credit-card-kaise-apply-kare',
    title: 'Credit Card Kaise Apply Kare? — Puri Jaankari Hindi Mein',
    metaTitle: 'Credit Card Kaise Apply Kare 2025 | Hindi Guide',
    metaDescription: 'Credit card ke liye apply karna bahut aasaan hai. Eligibility, documents aur best cards — bilkul Hindi mein.',
    category: 'hindi',
    language: 'hi',
    publishedAt: '2025-05-10',
    readTimeMinutes: 7,
    heroEmoji: '💳',
    excerpt: 'Pehli baar credit card le rahe ho? Yahan poori process Hindi mein samjhate hain — eligibility se lekar approval tak.',
    featuredCardSlugs: ['idfc-first-wow', 'sbi-simplysave-credit-card', 'au-lit-credit-card'],
  },
  {
    slug: 'best-rupay-credit-card-upi-2025',
    title: 'UPI Pe Use Karne Ke Liye Best Credit Cards 2025',
    metaTitle: 'Best RuPay Credit Card UPI 2025 | Hindi Guide',
    metaDescription: 'Google Pay, PhonePe pe credit card use karna chahte ho? Ye hain India ke best RuPay credit cards.',
    category: 'hindi',
    language: 'hi',
    publishedAt: '2025-05-11',
    readTimeMinutes: 6,
    heroEmoji: '📲',
    excerpt: 'RuPay credit card se ab Google Pay pe bhi credit card ka faida uthao — cashback bhi milega!',
    featuredCardSlugs: ['axis-airtel-rupay', 'axis-indian-oil-rupay', 'au-lit-credit-card', 'idfc-first-swyp'],
  },
  {
    slug: 'best-lifetime-free-credit-cards-india-2025',
    title: 'Best Lifetime Free Credit Cards in India 2025 — Zero Fee, Real Rewards',
    metaTitle: 'Best Lifetime Free Credit Cards India 2025 | No Annual Fee',
    metaDescription: "Never pay an annual fee again. India's best lifetime free credit cards with real cashback.",
    category: 'guide',
    language: 'en',
    publishedAt: '2025-05-09',
    readTimeMinutes: 8,
    heroEmoji: '🆓',
    excerpt: 'Why pay ₹500–₹5,000 per year when you can get equally good rewards with zero annual fee?',
    featuredCardSlugs: ['idfc-first-swyp', 'au-lit-credit-card', 'axis-airtel-rupay', 'scapia-credit-card', 'idfc-first-wow'],
  },
  {
    slug: 'sbi-cashback-credit-card-review-2025',
    title: "SBI Cashback Credit Card Review 2025 — India's Best Online Shopping Card?",
    metaTitle: 'SBI Cashback Credit Card Review 2025 | Worth It?',
    metaDescription: '5% unlimited cashback on online spends, no merchant restrictions. Full review — is it worth the ₹999 fee?',
    category: 'review',
    language: 'en',
    publishedAt: '2025-05-08',
    readTimeMinutes: 6,
    heroEmoji: '🛒',
    excerpt: '5% flat cashback on every online transaction — Amazon, Flipkart, Swiggy — with no merchant restrictions.',
    featuredCardSlugs: ['sbi-cashback-credit-card', 'sbi-simplyclick-credit-card'],
  },
  {
    slug: 'credit-card-ke-fayde-nuksan',
    title: 'Credit Card Ke Fayde Aur Nuksan — Puri Sachchi Baat',
    metaTitle: 'Credit Card Ke Fayde Aur Nuksan | Hindi 2025',
    metaDescription: 'Credit card lena chahiye ya nahi? Jaan lo credit card ke asli fayde aur nuksan — Hindi mein.',
    category: 'hindi',
    language: 'hi',
    publishedAt: '2025-05-07',
    readTimeMinutes: 5,
    heroEmoji: '⚖️',
    excerpt: 'Credit card ek powerful tool hai — sahi use karo toh faida, galat use karo toh nuksaan.',
    featuredCardSlugs: ['idfc-first-swyp', 'sbi-cashback-credit-card'],
  },
  {
    slug: 'axis-airtel-credit-card-review-2025',
    title: 'Axis Bank Airtel Credit Card Review 2025 — Best Free Card for Daily Use',
    metaTitle: 'Axis Airtel Credit Card Review 2025 | Lifetime Free',
    metaDescription: '25% cashback on Airtel recharges, 1% on all UPI spends, lifetime free. Full review of the Axis Airtel RuPay Credit Card.',
    category: 'review',
    language: 'en',
    publishedAt: '2025-05-06',
    readTimeMinutes: 5,
    heroEmoji: '📡',
    excerpt: 'The Axis Airtel Credit Card is lifetime free and gives 25% cashback on Airtel recharges plus 1% unlimited on all UPI.',
    featuredCardSlugs: ['axis-airtel-rupay', 'axis-indian-oil-rupay'],
  },
];
