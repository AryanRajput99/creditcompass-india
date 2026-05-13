-- ============================================================
-- CreditCompass India — Production Seed Data (EarnKaro Only)
-- ✅ ONLY cards with active EarnKaro affiliate links
-- ✅ 20 High-Commission Indian Credit Cards
-- ============================================================

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

-- 1. IDFC First Mayura (₹2,800)
(
  'idfc-first-mayura', 'IDFC First Mayura Credit Card', 'IDFC First Bank', NULL,
  2999, 2999, 'Waived on ₹5L spend', false, 100000, 750,
  NULL, '10X points on International, 5X on Travel/Dining', '4 domestic + 2 international per quarter', '1% waiver', '5000 bonus points',
  ARRAY['premium', 'travel', 'rewards'], ARRAY['Best lounge access', 'High international rewards', 'Golf privileges'], ARRAY['High fee', 'High income requirement'],
  'Premium travelers', 'https://bitli.in/7oqoQfQ', true, 1,
  'IDFC First Mayura Credit Card Review | Apply & Earn ₹2,800', 'Apply for IDFC First Mayura. Premium benefits and high rewards.'
),

-- 2. SBI Cashback (₹2,240)
(
  'sbi-cashback-credit-card', 'SBI Cashback Credit Card', 'SBI Card', NULL,
  999, 999, 'Waived on ₹2L spend', false, 20000, 650,
  5.0, '5% unlimited cashback online', NULL, '1% waiver', NULL,
  ARRAY['cashback', 'shopping'], ARRAY['5% flat online cashback', 'No merchant restrictions', 'Auto-credit'], ARRAY['No lounge', '1% offline rate'],
  'Online shoppers', 'https://bitli.in/RGxLuah', true, 2,
  'SBI Cashback Credit Card Review | Apply & Earn ₹2,240', '5% unlimited cashback on all online spends.'
),

-- 3. SBI SimplyCLICK (₹2,240)
(
  'sbi-simplyclick-credit-card', 'SBI SimplyCLICK Credit Card', 'SBI Card', NULL,
  499, 499, 'Waived on ₹1L spend', false, 20000, 650,
  1.25, '10X rewards on Amazon, Apollo, Cleartrip', NULL, '1% waiver', '₹500 Amazon voucher',
  ARRAY['shopping', 'rewards'], ARRAY['Great for Amazon shoppers', 'Low fee', 'Easy waiver'], ARRAY['No lounge', 'Basic offline rewards'],
  'Beginners & shoppers', 'https://bitli.in/9nslE7x', true, 3,
  'SBI SimplyCLICK Credit Card Review | Apply & Earn ₹2,240', '10X rewards on partner online brands.'
),

-- 4. Axis Airtel RuPay (₹2,240)
(
  'axis-airtel-rupay', 'Axis Bank Airtel RuPay Credit Card', 'Axis Bank', NULL,
  0, 0, NULL, true, 15000, 650,
  1.0, '25% on Airtel bills, 10% on Swiggy/Zomato', NULL, NULL, '₹500 cashback',
  ARRAY['cashback', 'lifetime-free', 'rewards'], ARRAY['Lifetime Free', '25% mobile bill cashback', 'UPI enabled'], ARRAY['Airtel specific', 'No lounge'],
  'Airtel users & UPI', 'https://bitli.in/tJndTf8', true, 4,
  'Axis Airtel RuPay Credit Card Review | Apply & Earn ₹2,240', 'Lifetime free card with 25% bill cashback.'
),

-- 5. Axis Indian Oil RuPay (₹2,240)
(
  'axis-indian-oil-rupay', 'Axis Bank Indian Oil RuPay Credit Card', 'Axis Bank', NULL,
  0, 0, NULL, true, 15000, 650,
  NULL, '4% fuel rewards, 1% UPI', NULL, '1% waiver', '250 fuel points',
  ARRAY['fuel', 'lifetime-free'], ARRAY['4% fuel rewards', 'Lifetime Free', 'UPI enabled'], ARRAY['Only Indian Oil'],
  'Commuters', 'https://bitli.in/dbFDOF6', true, 5,
  'Axis Indian Oil RuPay Review | Apply & Earn ₹2,240', 'Best fuel card with RuPay UPI.'
),

-- 6. HDFC Pixel Play (₹1,500)
(
  'hdfc-pixel-play-credit-card', 'HDFC Pixel Play Credit Card', 'HDFC Bank', NULL,
  0, 0, NULL, true, 25000, 700,
  5.0, '5% on 2 merchants of your choice', NULL, NULL, NULL,
  ARRAY['shopping', 'cashback', 'lifetime-free'], ARRAY['Customizable 5% merchants', 'Digital first', 'Lifetime Free'], ARRAY['App only management'],
  'Gen-Z & App users', 'https://bitli.in/4Wop58P', false, 6,
  'HDFC Pixel Play Review | Apply & Earn ₹1,500', 'Digital card with customizable 5% cashback.'
),

-- 7. AU LIT (₹1,540)
(
  'au-lit-credit-card', 'AU LIT Credit Card', 'AU Bank', NULL,
  0, 0, NULL, true, 15000, 650,
  2.0, 'Choose your rewards quarterly', NULL, NULL, 'Choice of benefit',
  ARRAY['cashback', 'lifetime-free', 'shopping'], ARRAY['Lifetime Free', 'Flexible rewards', 'Customizable'], ARRAY['Must track benefits'],
  'Flexible users', 'https://bitli.in/V6O5cuy', true, 7,
  'AU LIT Credit Card Review | Apply & Earn ₹1,540', 'India\'s first customizable lifetime free card.'
),

-- 8. Kotak League Platinum (₹1,400)
(
  'kotak-league-platinum', 'Kotak League Platinum Credit Card', 'Kotak Bank', NULL,
  0, 499, 'Waived on ₹75k spend', false, 25000, 700,
  NULL, '8X rewards on movies & dining', NULL, '1% waiver', '2 PVR tickets',
  ARRAY['rewards', 'shopping'], ARRAY['Free joining', 'Movie tickets bonus', '8X rewards'], ARRAY['Small waiver cap'],
  'Movie lovers', 'https://bitli.in/8ZkklTq', false, 8,
  'Kotak League Platinum Review | Apply & Earn ₹1,400', '8X rewards on PVR and dining.'
),

-- 9. IDFC First SWYP (₹1,400)
(
  'idfc-first-swyp', 'IDFC First SWYP Credit Card', 'IDFC First Bank', NULL,
  0, 0, NULL, true, 0, 600,
  NULL, '3X rewards online', NULL, NULL, '₹500 voucher',
  ARRAY['student', 'lifetime-free', 'shopping'], ARRAY['Student friendly', 'Lifetime Free', '3X online rewards'], ARRAY['Basic benefits'],
  'Students & Beginners', 'https://bitli.in/Pt8xNaK', true, 9,
  'IDFC First SWYP Review | Apply & Earn ₹1,400', 'Best lifetime free card for students.'
),

-- 10. Scapia Federal (₹770)
(
  'scapia-credit-card', 'Scapia Federal Credit Card', 'Scapia', NULL,
  0, 0, NULL, true, 25000, 700,
  NULL, '10% on travel via Scapia app', 'Unlimited domestic lounge', '0% Forex', NULL,
  ARRAY['travel', 'lifetime-free'], ARRAY['Unlimited lounge', 'Zero Forex', 'Lifetime Free'], ARRAY['Federal bank account needed sometimes'],
  'Travelers', 'https://bitli.in/vvBbuNF', true, 10,
  'Scapia Federal Review | Apply & Earn ₹770', 'Unlimited lounge access and zero forex.'
),

-- 11. IDFC First WOW (₹350)
(
  'idfc-first-wow', 'IDFC First WOW Credit Card', 'IDFC First Bank', NULL,
  0, 0, NULL, true, 0, 0,
  NULL, '1X rewards on all spends', NULL, NULL, NULL,
  ARRAY['student', 'lifetime-free'], ARRAY['No income proof', 'Against FD', 'Build CIBIL score'], ARRAY['Lacks rewards'],
  'First timers', 'https://bitli.in/9jyVrk0', false, 11,
  'IDFC First WOW Review | Apply & Earn ₹350', 'Zero CIBIL required credit card.'
),

-- 12. SBI SimplySAVE (₹2,240)
(
  'sbi-simplysave-credit-card', 'SBI SimplySAVE Credit Card', 'SBI Card', NULL,
  499, 499, 'Waived on ₹1L spend', false, 20000, 650,
  NULL, '10 rewards on Dining, Grocery, Movies', NULL, '1% waiver', '2000 bonus points',
  ARRAY['shopping', 'rewards'], ARRAY['Grocery & Dining rewards', 'Low fee', 'Wide acceptance'], ARRAY['Basic rewards'],
  'Daily spenders', 'https://bitli.in/u3krqBx', false, 12,
  'SBI SimplySAVE Review | Apply & Earn ₹2,240', '10X rewards on daily groceries and dining.'
),

-- 13. SBI Prime (₹2,240)
(
  'sbi-prime-credit-card', 'SBI Prime Credit Card', 'SBI Card', NULL,
  2999, 2999, 'Waived on ₹3L spend', false, 50000, 720,
  NULL, '20 points on Birthday, 10 on Dining', '8 domestic + 4 international visits', '1% waiver', '₹3000 vouchers',
  ARRAY['rewards', 'travel', 'premium'], ARRAY['High birthday rewards', 'Lounge access', 'Milestone bonuses'], ARRAY['High annual fee'],
  'High spenders', 'https://bitli.in/782qfKX', false, 13,
  'SBI Prime Credit Card Review | Apply & Earn ₹2,240', 'Premium rewards and lounge access.'
),

-- 14. Axis MyZone RuPay (₹2,240)
(
  'axis-myzone-rupay', 'Axis Bank MyZone RuPay Credit Card', 'Axis Bank', NULL,
  0, 500, 'Waived on ₹1.5L spend', false, 15000, 650,
  NULL, 'BOGO on Movies, Swiggy off', '1 domestic per quarter', NULL, 'SonyLiv sub',
  ARRAY['shopping', 'rewards'], ARRAY['Movie BOGO', 'Swiggy discounts', 'RuPay UPI'], ARRAY['Annual fee'],
  'Movie buffs', 'https://bitli.in/LiyMx2R', false, 14,
  'Axis MyZone RuPay Review | Apply & Earn ₹2,240', 'Movie and Swiggy benefits with RuPay UPI.'
),

-- 15. HDFC IRCTC (₹1,500)
(
  'hdfc-irctc-credit-card', 'HDFC IRCTC Credit Card', 'HDFC Bank', NULL,
  500, 500, 'Waived on ₹1.5L spend', false, 25000, 700,
  NULL, '5 rewards on IRCTC, 1% on others', '8 executive lounge visits', 'Transaction fee waiver', NULL,
  ARRAY['travel', 'rewards'], ARRAY['IRCTC cashback', 'Train lounge access', 'Fuel waiver'], ARRAY['Specific to trains'],
  'Frequent train travelers', 'https://bitli.in/E3XxEsn', false, 15,
  'HDFC IRCTC Credit Card Review | Apply & Earn ₹1,500', 'Best rewards for train bookings.'
),

-- 16. Kiwi UPI (₹1,500)
(
  'kiwi-upi-credit-card', 'Kiwi UPI Credit Card', 'Kiwi', NULL,
  0, 0, NULL, true, 20000, 680,
  1.0, '2% rewards on scan & pay', NULL, NULL, '₹250 cashback',
  ARRAY['cashback', 'lifetime-free'], ARRAY['Best UPI cashback', 'Lifetime Free', 'Instant virtual card'], ARRAY['No physical card'],
  'UPI power users', 'https://bitli.in/GQQQLyw', false, 16,
  'Kiwi UPI Credit Card Review | Apply & Earn ₹1,500', 'Highest cashback on UPI scans.'
),

-- 17. IDFC First Ashva (₹1,050)
(
  'idfc-first-ashva', 'IDFC First Ashva Credit Card', 'IDFC First Bank', NULL,
  0, 0, NULL, true, 50000, 720,
  NULL, '10X points online, 6X offline', 'Lounge access', '1% waiver', NULL,
  ARRAY['rewards', 'lifestyle', 'lifetime-free'], ARRAY['Lifetime Free', 'High online rewards', 'Premium look'], ARRAY['Higher income requirement'],
  'Professionals', 'https://bitli.in/w7YcQx7', false, 17,
  'IDFC First Ashva Review | Apply & Earn ₹1,050', 'Premium rewards, lifetime free.'
),

-- 18. IndusInd Legend (₹900)
(
  'indusind-legend', 'IndusInd Legend Credit Card', 'IndusInd Bank', NULL,
  0, 0, NULL, true, 50000, 720,
  NULL, '1 reward per ₹100 weekdays, 2 on weekends', 'Domestic lounge access', '1% fuel waiver', NULL,
  ARRAY['lifestyle', 'lifetime-free'], ARRAY['Lifetime Free', 'Weekend reward boost', 'Priority Pass'], ARRAY['Basic rewards rate'],
  'Weekend spenders', 'https://bitli.in/kc2Uaig', false, 18,
  'IndusInd Legend Review | Apply & Earn ₹900', 'Lifetime free premium lifestyle card.'
),

-- 19. IndusInd Tiger (₹900)
(
  'indusind-tiger', 'IndusInd Tiger Credit Card', 'IndusInd Bank', NULL,
  0, 0, NULL, true, 20000, 680,
  1.0, '1.5% on fuel, 1% others', NULL, '1% waiver', NULL,
  ARRAY['fuel', 'cashback', 'lifetime-free'], ARRAY['Best fuel rewards', 'Lifetime Free', 'Wide surcharge waiver'], ARRAY['Basic lifestyle benefits'],
  'Commuters', 'https://bitli.in/h6q7yGb', false, 19,
  'IndusInd Tiger Review | Apply & Earn ₹900', 'Unlimited fuel surcharge waiver and cashback.'
),

-- 20. SBI BPCL Octane (₹2,240)
(
  'sbi-bpcl-credit-card', 'SBI BPCL Octane Credit Card', 'SBI Card', NULL,
  1499, 1499, 'Waived on ₹2L spend', false, 30000, 700,
  7.25, '25 points per ₹100 on fuel', '4 domestic lounges', '1% waiver', '6000 points',
  ARRAY['fuel', 'travel'], ARRAY['Highest fuel rewards', 'Lounge access', 'Milestone rewards'], ARRAY['High annual fee'],
  'Petrol spenders', 'https://bitli.in/P5OS8o4', false, 20,
  'SBI BPCL Octane Review | Apply & Earn ₹2,240', 'Best premium fuel credit card in India.'
);
