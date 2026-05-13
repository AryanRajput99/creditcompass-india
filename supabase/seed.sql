-- ============================================================
-- CreditCompass India — Production Seed Data (v2)
-- ✅ CORRECTED: joining_fee ≠ annual_fee where appropriate
-- ✅ REAL affiliate URLs from EarnKaro/bitli.in
-- ✅ 10 cards with accurate, real-world data
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Clear old data first
TRUNCATE TABLE credit_cards RESTART IDENTITY CASCADE;

INSERT INTO credit_cards (
  slug, name, bank_name, card_image_url,
  joining_fee, annual_fee, annual_fee_waiver, is_lifetime_free,
  min_income_monthly, min_credit_score,
  cashback_rate, reward_rate, lounge_access, fuel_surcharge, welcome_bonus,
  categories, pros, cons, best_for,
  affiliate_url, is_featured, sort_order,
  seo_title, seo_description
) VALUES

-- ─── 1. SBI Cashback Credit Card ────────────────────────────
-- joining_fee=999, annual_fee=999 (correctly same — both waived on ₹2L spend)
(
  'sbi-cashback-credit-card',
  'SBI Cashback Credit Card',
  'SBI Card',
  NULL,
  999, 999, 'Waived on annual spend of ₹2 Lakh', false,
  20000, 650,
  5.0,
  '5% cashback on all online spends (all merchants) + 1% on offline spends',
  NULL, '1% fuel surcharge waiver',
  'Extra ₹2,000 cashback in first 2 months on ₹2,000+ spend',
  ARRAY['cashback','shopping'],
  ARRAY['5% unlimited cashback on all online spends','No merchant restrictions','Auto-credited monthly — no redemption hassle','Works on every website — Amazon, Flipkart, Zomato, IRCTC etc.','Fee waived easily at ₹2L annual spend'],
  ARRAY['No lounge access','1% offline rate is average','Monthly cashback cap of ₹5,000'],
  'Online shoppers who spend ₹10,000+ per month digitally',
  'https://bitli.in/RGxLuah', true, 1,
  'SBI Cashback Credit Card — 5% Cashback on All Online Spends | Apply 2025',
  'Apply for SBI Cashback Credit Card. Get 5% unlimited cashback on all online transactions with no merchant restrictions. Auto-credited monthly. ₹999 annual fee waived on ₹2L spend.'
),

-- ─── 2. Axis Bank Airtel RuPay Credit Card ──────────────────
-- Lifetime free — joining_fee=0, annual_fee=0
(
  'axis-airtel-rupay',
  'Axis Bank Airtel RuPay Credit Card',
  'Axis Bank',
  NULL,
  0, 0, NULL, true,
  15000, 650,
  1.0,
  '25% cashback on Airtel recharges & bills | 10% on Swiggy, Zomato, BigBasket | 1% unlimited on all UPI spends',
  NULL, NULL,
  '500 cashback on first Airtel recharge within 30 days',
  ARRAY['cashback','lifetime-free','fuel'],
  ARRAY['Lifetime free — zero annual fee ever','25% cashback on Airtel recharges','1% cashback on all UPI payments','Works on Google Pay, PhonePe via RuPay UPI','10% cashback on Swiggy & Zomato'],
  ARRAY['Best value only for Airtel users','No lounge access','No travel rewards'],
  'Airtel subscribers and daily UPI payment users',
  'https://bitli.in/tJndTf8', true, 2,
  'Axis Bank Airtel RuPay Credit Card — Lifetime Free, 25% Cashback | Apply 2025',
  'Apply for Axis Airtel RuPay Credit Card. Lifetime free card with 25% cashback on Airtel recharges and 1% on all UPI spends. Works on Google Pay & PhonePe.'
),

-- ─── 3. AU LIT Credit Card ──────────────────────────────────
-- Lifetime free
(
  'au-lit-credit-card',
  'AU LIT Credit Card',
  'AU Small Finance Bank',
  NULL,
  0, 0, NULL, true,
  15000, 650,
  2.0,
  'Choose your own benefits quarterly: up to 2% cashback on your top category',
  NULL, NULL,
  'Choose 1 free benefit from travel, cashback, or OTT on joining',
  ARRAY['cashback','lifetime-free','shopping'],
  ARRAY['Lifetime free card — zero fee ever','Unique feature: choose your own benefits quarterly','Up to 2% cashback on chosen category','OTT subscription worth ₹300/month as option','Works on UPI via RuPay'],
  ARRAY['Benefits must be actively changed every quarter','Lower base rate on non-chosen categories','Smaller bank — acceptance rare at premium venues'],
  'Users who want maximum flexibility in rewards',
  'https://bitli.in/V6O5cuy', true, 3,
  'AU LIT Credit Card — Customize Your Rewards | Lifetime Free | Apply 2025',
  'Apply for AU LIT Credit Card. Choose your own benefits every quarter. Lifetime free with up to 2% cashback. Unique flexible rewards card in India.'
),

-- ─── 4. IDFC First SWYP Credit Card ─────────────────────────
-- Lifetime free, students eligible
(
  'idfc-first-swyp',
  'IDFC First SWYP Credit Card',
  'IDFC First Bank',
  NULL,
  0, 0, NULL, true,
  0, 600,
  NULL,
  '3X reward points on online spends | 1X on all offline spends',
  NULL, NULL,
  'Welcome voucher worth ₹500 on first spend',
  ARRAY['cashback','lifetime-free','student'],
  ARRAY['Lifetime free — no annual fee','Students eligible (zero income, against FD)','3X rewards on all online shopping','Instant digital card on app','UPI enabled via RuPay'],
  ARRAY['No lounge access','Rewards can only be redeemed on IDFC First app','Points expire after 3 years'],
  'Students and first-time credit card users',
  'https://bitli.in/Pt8xNaK', true, 4,
  'IDFC First SWYP Credit Card — Lifetime Free for Students | Apply 2025',
  'Apply for IDFC First SWYP Credit Card. Lifetime free card for students and beginners. 3X rewards on online shopping. Zero income required. Apply online instantly.'
),

-- ─── 5. IDFC First WOW Credit Card ──────────────────────────
-- Secured card — no credit score needed
(
  'idfc-first-wow',
  'IDFC First WOW Credit Card',
  'IDFC First Bank',
  NULL,
  0, 0, NULL, true,
  0, 0,
  NULL,
  '1X reward points on all spends',
  NULL, NULL,
  NULL,
  ARRAY['lifetime-free','student'],
  ARRAY['No credit score required — secured against FD','Lifetime free card','Best card to build CIBIL score from zero','Works on UPI via RuPay','Instant card issuance on IDFC First app'],
  ARRAY['Credit limit = FD amount (capital locked)','No cashback or high rewards','Basic card with minimal benefits'],
  'People with no credit history who want to build CIBIL score',
  'https://bitli.in/9jyVrk0', false, 5,
  'IDFC First WOW Credit Card — No CIBIL Required, Lifetime Free | Apply 2025',
  'Apply for IDFC First WOW Credit Card. No CIBIL score required. Secured against FD. Lifetime free. Best card to build credit history from zero. Apply online.'
),

-- ─── 6. Scapia Federal Credit Card ──────────────────────────
-- Lifetime free travel card
(
  'scapia-credit-card',
  'Scapia Federal Credit Card',
  'Scapia (Federal Bank)',
  NULL,
  0, 0, NULL, true,
  25000, 700,
  NULL,
  '10% Scapia coins on travel via Scapia app | 2% on other spends',
  'Unlimited complimentary domestic airport lounge access',
  NULL,
  '2000 Scapia coins on first spend of ₹5,000',
  ARRAY['travel','lifetime-free'],
  ARRAY['Lifetime free travel card','Unlimited domestic lounge access','10% on travel bookings via Scapia app','No forex markup on international transactions','Virtual card instant on approval'],
  ARRAY['Best value only via Scapia app bookings','Scapia coins = lower liquidity than direct cashback','No international lounge access'],
  'Budget travelers who want lounge access without premium fees',
  'https://bitli.in/vvBbuNF', true, 6,
  'Scapia Federal Credit Card — Unlimited Lounge Access, Lifetime Free | Apply 2025',
  'Apply for Scapia Federal Credit Card. Unlimited domestic airport lounge access, lifetime free, no forex markup. Best free travel card in India 2025.'
),

-- ─── 7. Axis Bank Indian Oil RuPay Credit Card ──────────────
-- Lifetime free, fuel focus
(
  'axis-indian-oil-rupay',
  'Axis Bank Indian Oil RuPay Credit Card',
  'Axis Bank',
  NULL,
  0, 0, NULL, true,
  15000, 650,
  NULL,
  '4% fuel rewards at Indian Oil stations | 1% unlimited on all UPI spends | 1% on other spends',
  NULL, '1% fuel surcharge waiver at Indian Oil pumps',
  '250 fuel points on first fuel transaction',
  ARRAY['fuel','lifetime-free'],
  ARRAY['Lifetime free — zero annual fee','4% rewards on Indian Oil fuel','1% cashback on all UPI payments','RuPay — works on Google Pay, PhonePe','Surcharge waiver at Indian Oil pumps'],
  ARRAY['Best only at Indian Oil stations','No lounge access','Fuel points have limited redemption options'],
  'Daily commuters and vehicle owners who refuel at Indian Oil',
  'https://bitli.in/dbFDOF6', false, 7,
  'Axis Indian Oil RuPay Credit Card — 4% Fuel Cashback, Lifetime Free | Apply 2025',
  'Apply for Axis Indian Oil RuPay Credit Card. Get 4% rewards on Indian Oil fuel and 1% on all UPI spends. Lifetime free. Works on Google Pay & PhonePe.'
),

-- ─── 8. Kotak League Platinum Credit Card ───────────────────
-- Joining fee ≠ Annual fee (joining is free, annual ₹499)
(
  'kotak-league-platinum',
  'Kotak League Platinum Credit Card',
  'Kotak Mahindra Bank',
  NULL,
  0, 499, 'Waived on annual spend of ₹75,000', false,
  25000, 700,
  NULL,
  '8 Reward Points per ₹150 on PVR, Inox, dining | 4 Points on other spends',
  NULL, NULL,
  '2 free PVR movie tickets on joining',
  ARRAY['rewards','shopping'],
  ARRAY['Zero joining fee','8X rewards on PVR & dining','2 free movie tickets on joining','Low annual fee waived easily','Good lifestyle rewards'],
  ARRAY['₹499 annual fee if spend < ₹75,000','No lounge access','Reward point redemption only via Kotak portal'],
  'Movie buffs and dining enthusiasts',
  'https://bitli.in/8ZkklTq', false, 8,
  'Kotak League Platinum Credit Card — Free Joining, Movie Benefits | Apply 2025',
  'Apply for Kotak League Platinum Credit Card. Zero joining fee, 8X rewards on PVR & dining, 2 free movie tickets. Annual fee waived on ₹75,000 spend.'
),

-- ─── 9. IDFC First Mayura Credit Card ───────────────────────
-- Premium card, highest EarnKaro commission
(
  'idfc-first-mayura',
  'IDFC First Mayura Credit Card',
  'IDFC First Bank',
  NULL,
  2999, 2999, 'Waived on annual spend of ₹5 Lakh', false,
  100000, 750,
  NULL,
  '10X reward points on international spends | 5X on travel & dining | 2X on other spends',
  '4 domestic + 2 international lounge visits per quarter',
  '1% surcharge waiver',
  '5000 bonus points on first spend of ₹5,000',
  ARRAY['travel','premium','rewards'],
  ARRAY['Best lounge access in mid-premium segment','10X rewards on international spends','Complimentary golf sessions','Premium concierge service','Travel insurance coverage'],
  ARRAY['₹2,999 fee not easy to waive','High income requirement','Complex reward tiers'],
  'Frequent travelers and premium lifestyle seekers',
  'https://bitli.in/7oqoQfQ', true, 9,
  'IDFC First Mayura Credit Card — Premium Travel Benefits | Apply 2025',
  'Apply for IDFC First Mayura Credit Card. 10X international rewards, 4+2 lounge visits per quarter, concierge service. Best mid-premium travel card in India.'
),

-- ─── 10. IndusInd Tiger Credit Card ─────────────────────────
-- Lifetime free, fuel
(
  'indusind-tiger',
  'IndusInd Tiger Credit Card',
  'IndusInd Bank',
  NULL,
  0, 0, NULL, true,
  20000, 680,
  1.0,
  '1.5% cashback at fuel stations (all brands) | 1% on all other spends',
  NULL, '1% fuel surcharge waiver at all fuel stations in India',
  NULL,
  ARRAY['fuel','cashback','lifetime-free'],
  ARRAY['Lifetime free — zero annual fee','1.5% cashback at ALL fuel brands (not just one)','1% surcharge waiver at every pump in India','No minimum spend for cashback','Simple flat cashback — no complex points'],
  ARRAY['No lounge access','No welcome bonus','Average rewards on non-fuel spend'],
  'Daily commuters with high fuel spend across any brand',
  'https://bitli.in/h6q7yGb', false, 10,
  'IndusInd Tiger Credit Card — Best Fuel Cashback, Lifetime Free | Apply 2025',
  'Apply for IndusInd Tiger Credit Card. Lifetime free with 1.5% cashback at all fuel stations in India. No minimum spend. 1% surcharge waiver. Apply online.'
);
