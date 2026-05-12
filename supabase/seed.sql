-- ============================================================
-- CreditCompass India — Sample Card Data (30 Top Indian Cards)
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

INSERT INTO credit_cards (
  slug, name, bank_name, card_image_url,
  joining_fee, annual_fee, annual_fee_waiver, is_lifetime_free,
  min_income_monthly, min_credit_score,
  cashback_rate, reward_rate, lounge_access, fuel_surcharge, welcome_bonus,
  categories, pros, cons, best_for,
  affiliate_url, is_featured, sort_order,
  seo_title, seo_description
) VALUES

-- 1. HDFC Regalia Gold
(
  'hdfc-regalia-gold', 'HDFC Regalia Gold Credit Card', 'HDFC Bank', NULL,
  2500, 2500, 'Waived on annual spend of ₹3 Lakh', false,
  100000, 750,
  NULL, '4 Reward Points per ₹150 spent', '6 domestic + 6 international lounge visits per year', '1% surcharge waiver', '2500 bonus points on first transaction',
  ARRAY['travel', 'premium', 'rewards'], 
  ARRAY['Complimentary lounge access', 'Priority Pass membership', 'Golf privileges', 'Concierge services', 'Travel insurance coverage'],
  ARRAY['High annual fee', 'High income requirement', 'Complex reward redemption'],
  'Frequent travelers and premium lifestyle seekers',
  'https://earnkaro.com/your-hdfc-regalia-link', true, 1,
  'HDFC Regalia Gold Credit Card — Benefits, Fees & Apply Online',
  'Apply for HDFC Regalia Gold Credit Card. Get 4X reward points, lounge access, golf privileges, and premium travel benefits. Check eligibility & apply now.'
),

-- 2. SBI SimplyCLICK
(
  'sbi-simplyclick', 'SBI SimplyCLICK Credit Card', 'SBI Card', NULL,
  499, 499, 'Waived on annual spend of ₹1 Lakh', false,
  20000, 650,
  1.25, '10X rewards on Amazon, Cleartrip, Lenskart, Netmeds', NULL, NULL, 'Amazon gift card worth ₹500 on joining',
  ARRAY['cashback', 'shopping'],
  ARRAY['10X rewards on popular platforms', 'Low annual fee', 'Amazon voucher on joining', 'Contactless payment'],
  ARRAY['No lounge access', 'Limited offline benefits', 'Average reward rate on other spends'],
  'Online shoppers and beginners',
  'https://earnkaro.com/your-sbi-simplyclick-link', true, 2,
  'SBI SimplyCLICK Credit Card — Benefits, Fees & Apply Online',
  'Apply for SBI SimplyCLICK Credit Card. Get 10X rewards on Amazon, Cleartrip and more. Low ₹499 annual fee. Check eligibility & apply now.'
),

-- 3. Axis Bank Magnus
(
  'axis-bank-magnus', 'Axis Bank Magnus Credit Card', 'Axis Bank', NULL,
  12500, 12500, 'Waived on annual spend of ₹25 Lakh', false,
  250000, 750,
  NULL, '35 Edge Miles per ₹200 on travel, 12 Miles on others', 'Unlimited domestic + 8 international lounge visits', '1% surcharge waiver up to ₹400/month', '25000 Edge Miles on joining',
  ARRAY['travel', 'premium'],
  ARRAY['Best-in-class travel benefits', 'Unlimited domestic lounges', 'Priority Pass', 'Complimentary golf', '24x7 concierge', 'Trip cancellation insurance'],
  ARRAY['Very high annual fee', 'Very high income requirement', 'Complex reward structure'],
  'Ultra-premium frequent flyers',
  'https://earnkaro.com/your-axis-magnus-link', true, 3,
  'Axis Bank Magnus Credit Card — Benefits, Fees & Apply Online',
  'Apply for Axis Bank Magnus — India''s best premium travel credit card. Unlimited lounge access, 35X travel rewards, concierge. Check eligibility & apply now.'
),

-- 4. ICICI Amazon Pay
(
  'icici-amazon-pay', 'Amazon Pay ICICI Credit Card', 'ICICI Bank', NULL,
  0, 0, NULL, true,
  25000, 700,
  5.0, '5% cashback on Amazon Prime, 2% on other Amazon spends', NULL, NULL, '1500 Amazon Pay cashback on joining',
  ARRAY['cashback', 'shopping', 'lifetime-free'],
  ARRAY['Lifetime free card', '5% cashback for Prime members', 'No minimum redemption', 'Accepted everywhere Visa is'],
  ARRAY['No lounge access', 'Best value only for Amazon shoppers', 'No fuel benefits'],
  'Amazon Prime members and heavy online shoppers',
  'https://earnkaro.com/your-icici-amazon-link', true, 4,
  'Amazon Pay ICICI Credit Card — 5% Cashback & Apply Online',
  'Apply for Amazon Pay ICICI Credit Card. Lifetime free card with 5% cashback for Prime members. No annual fee, instant approval. Apply online now.'
),

-- 5. HDFC Millennia
(
  'hdfc-millennia', 'HDFC Millennia Credit Card', 'HDFC Bank', NULL,
  1000, 1000, 'Waived on annual spend of ₹1 Lakh', false,
  35000, 700,
  5.0, '5% cashback on Amazon, Flipkart, BookMyShow, Cult.fit', NULL, '1% surcharge waiver', '1000 cashback on first transaction',
  ARRAY['cashback', 'shopping'],
  ARRAY['5% cashback on top platforms', 'Low annual fee', 'Contactless payments', 'EMI on purchases'],
  ARRAY['Cashback capped monthly', 'No lounge access', 'Limited travel benefits'],
  'Millennials and digital-first spenders',
  'https://earnkaro.com/your-hdfc-millennia-link', true, 5,
  'HDFC Millennia Credit Card — 5% Cashback & Apply Online',
  'Apply for HDFC Millennia Credit Card. Earn 5% cashback on Amazon, Flipkart & more. ₹1000 annual fee. Perfect for young professionals. Apply online.'
),

-- 6. IndusInd Tiger
(
  'indusind-tiger', 'IndusInd Tiger Credit Card', 'IndusInd Bank', NULL,
  0, 0, NULL, true,
  25000, 680,
  1.0, '1.5% cashback on fuel, 1% on all other spends', NULL, '1% fuel surcharge waiver at all fuel stations', NULL,
  ARRAY['fuel', 'cashback', 'lifetime-free'],
  ARRAY['Lifetime free card', 'Best fuel cashback in India', 'Surcharge waiver at all pumps', 'No minimum spend'],
  ARRAY['No lounge access', 'Average rewards on non-fuel spend', 'No welcome bonus'],
  'Daily commuters and people with high fuel spend',
  'https://earnkaro.com/your-indusind-tiger-link', false, 6,
  'IndusInd Tiger Credit Card — Best Fuel Card, Apply Online',
  'Apply for IndusInd Tiger Credit Card. Best fuel cashback card in India. Lifetime free, 1% surcharge waiver at all fuel stations. Apply online now.'
),

-- 7. HDFC Diners Club Black
(
  'hdfc-diners-club-black', 'HDFC Diners Club Black Credit Card', 'HDFC Bank', NULL,
  10000, 10000, 'Waived on annual spend of ₹5 Lakh', false,
  200000, 780,
  NULL, '5 Reward Points per ₹150 on all spends', 'Unlimited domestic + 6 international lounge visits', NULL, '10000 reward points on joining',
  ARRAY['travel', 'premium', 'rewards'],
  ARRAY['Unlimited domestic lounge access', 'Golf privileges at 1000+ clubs', 'Best-in-class concierge', '24x7 golf bookings', 'Premium dining benefits'],
  ARRAY['High annual fee', 'Diners acceptance limited in India', 'High income requirement'],
  'Premium lifestyle and golf enthusiasts',
  'https://earnkaro.com/your-hdfc-diners-black-link', false, 7,
  'HDFC Diners Club Black Credit Card — Benefits & Apply Online',
  'Apply for HDFC Diners Club Black. Unlimited lounge access, golf privileges, 5X rewards. Best premium card for lifestyle spenders. Check eligibility & apply.'
),

-- 8. SBI Card PRIME
(
  'sbi-card-prime', 'SBI Card PRIME', 'SBI Card', NULL,
  2999, 2999, 'Waived on annual spend of ₹3 Lakh', false,
  50000, 720,
  NULL, '10 Reward Points per ₹100 on dining, groceries & departmental stores', '8 domestic lounge visits per year', '1% waiver up to ₹500/month', 'Gift vouchers worth ₹3000 on joining',
  ARRAY['rewards', 'travel', 'shopping'],
  ARRAY['High reward rate on groceries & dining', 'Lounge access', 'Pizza Hut voucher monthly', 'Milestone bonuses'],
  ARRAY['Annual fee not easy to waive', 'No international lounge in base', 'Average travel benefits'],
  'Families with high grocery and dining spend',
  'https://earnkaro.com/your-sbi-prime-link', false, 8,
  'SBI Card PRIME — Benefits, Fees & Apply Online 2025',
  'Apply for SBI Card PRIME. Earn 10X rewards on groceries, dining & departmental stores. 8 lounge visits. ₹3000 welcome vouchers. Apply online now.'
),

-- 9. HDFC MoneyBack+
(
  'hdfc-moneyback-plus', 'HDFC MoneyBack+ Credit Card', 'HDFC Bank', NULL,
  500, 500, 'Waived on annual spend of ₹50,000', false,
  20000, 650,
  NULL, '2 CashPoints per ₹150 on offline spends, 10 CashPoints on online', NULL, NULL, '500 CashPoints on card activation',
  ARRAY['cashback', 'shopping'],
  ARRAY['Low annual fee', 'Easy fee waiver', 'Good for beginners', 'CashPoints can be redeemed as cashback'],
  ARRAY['No lounge access', 'Limited premium benefits', 'Low base earn rate offline'],
  'First-time credit card users and budget spenders',
  'https://earnkaro.com/your-hdfc-moneyback-link', false, 9,
  'HDFC MoneyBack+ Credit Card — Cashback & Apply Online',
  'Apply for HDFC MoneyBack+ Credit Card. 10X CashPoints on online shopping, easy ₹50,000 annual fee waiver. Best starter card. Apply online.'
),

-- 10. Axis Flipkart Credit Card
(
  'axis-flipkart', 'Flipkart Axis Bank Credit Card', 'Axis Bank', NULL,
  500, 500, 'Waived on annual spend of ₹2 Lakh', false,
  15000, 650,
  5.0, '5% cashback on Flipkart, Myntra, 4% on partner brands, 1.5% others', NULL, '1% fuel surcharge waiver', '500 Flipkart voucher on joining',
  ARRAY['cashback', 'shopping'],
  ARRAY['5% cashback on Flipkart & Myntra', '4% on Swiggy, PVR, Uber', 'Unlimited cashback', 'Contactless payments'],
  ARRAY['No lounge access', 'Best value only on Flipkart ecosystem', 'Limited offline benefits'],
  'Flipkart and Myntra frequent shoppers',
  'https://earnkaro.com/your-axis-flipkart-link', true, 10,
  'Flipkart Axis Bank Credit Card — 5% Cashback & Apply Online',
  'Apply for Flipkart Axis Bank Credit Card. Get 5% unlimited cashback on Flipkart & Myntra. Low ₹500 fee. Best shopping card. Apply online now.'
);

-- ============================================================
-- Update RLS to allow service role full access (for admin)
-- Run this separately after adding SUPABASE_SERVICE_ROLE_KEY
-- ============================================================
-- CREATE POLICY "Service role has full access to cards"
--   ON credit_cards FOR ALL
--   USING (auth.role() = 'service_role');
