-- ============================================================
-- CreditCompass India — EarnKaro Affiliate URL Update Script
-- ============================================================
-- INSTRUCTIONS:
-- 1. For each card, go to earnkaro.com/create-earn-link
-- 2. Paste the official bank application URL
-- 3. Copy the generated ekaro.in/... link
-- 4. Replace PLACEHOLDER values below with real links
-- 5. Run this entire script in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- TIER 1: ₹2,000+ Commission (DO THESE FIRST)
-- ============================================================

-- Axis Bank Magnus (₹2,800)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_MAGNUS'
WHERE slug = 'axis-bank-magnus';

-- SBI Cashback Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SBI_CASHBACK'
WHERE slug = 'sbi-cashback-credit-card';

-- SBI SimplyCLICK Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SBI_SIMPLYCLICK'
WHERE slug = 'sbi-simplyclick-credit-card';

-- SBI SimplySAVE Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SBI_SIMPLYSAVE'
WHERE slug = 'sbi-simplysave-credit-card';

-- SBI Prime Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SBI_PRIME'
WHERE slug = 'sbi-prime-credit-card';

-- SBI BPCL Octane Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SBI_BPCL'
WHERE slug = 'sbi-bpcl-credit-card';

-- Axis Bank Indian Oil RuPay (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_INDIANOIL'
WHERE slug = 'axis-indian-oil-rupay';

-- Axis Bank Airtel RuPay (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_AIRTEL'
WHERE slug = 'axis-airtel-rupay';

-- Axis Bank MyZone RuPay (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_MYZONE'
WHERE slug = 'axis-myzone-rupay';

-- Axis Bank Flipkart Credit Card (₹2,240)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_FLIPKART'
WHERE slug = 'axis-flipkart-credit-card';

-- HDFC Marriott Bonvoy Credit Card (₹2,180)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_HDFC_MARRIOTT'
WHERE slug = 'hdfc-marriott-bonvoy-credit-card';


-- ============================================================
-- TIER 2: ₹1,000–₹1,999 Commission
-- ============================================================

-- Kotak Cashback Plus (₹1,540)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_KOTAK_CASHBACK'
WHERE slug = 'kotak-cashback-plus';

-- AU LIT Credit Card (₹1,540)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AU_LIT'
WHERE slug = 'au-lit-credit-card';

-- HDFC Bank RuPay Credit Card (₹1,500)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_HDFC_RUPAY'
WHERE slug = 'hdfc-rupay-credit-card';

-- Kiwi UPI Credit Card (₹1,500)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_KIWI'
WHERE slug = 'kiwi-upi-credit-card';

-- HDFC IRCTC Credit Card (₹1,500)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_HDFC_IRCTC'
WHERE slug = 'hdfc-irctc-credit-card';

-- HDFC Pixel Play Credit Card (₹1,500)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_HDFC_PIXEL'
WHERE slug = 'hdfc-pixel-play-credit-card';

-- Kotak League Platinum (₹1,400)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_KOTAK_LEAGUE'
WHERE slug = 'kotak-league-platinum';

-- IDFC First Power Plus (₹1,400)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_IDFC_POWERPLUS'
WHERE slug = 'idfc-first-power-plus';

-- IDFC First Power (₹1,050)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_IDFC_POWER'
WHERE slug = 'idfc-first-power';

-- Axis Bank LIC Signature (₹1,040)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_LIC_SIG'
WHERE slug = 'axis-lic-signature';


-- ============================================================
-- TIER 3: Under ₹1,000 Commission
-- ============================================================

-- Scapia Federal Credit Card (₹770)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_SCAPIA'
WHERE slug = 'scapia-credit-card';

-- Axis Bank LIC Platinum (₹680)
UPDATE credit_cards 
SET affiliate_url = 'https://ekaro.in/PLACEHOLDER_AXIS_LIC_PLAT'
WHERE slug = 'axis-lic-platinum';


-- ============================================================
-- Verify all updates
-- ============================================================
SELECT slug, name, affiliate_url 
FROM credit_cards 
WHERE affiliate_url LIKE '%ekaro.in%'
ORDER BY slug;
