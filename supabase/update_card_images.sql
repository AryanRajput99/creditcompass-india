-- ============================================================
-- CreditCompass India — Card Image URL Update Script
-- ============================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com
-- 2. Go to the SQL Editor in your project.
-- 3. Copy-paste this entire script.
-- 4. Run the script to instantly update all cards with high-trust bank images.
-- ============================================================

-- 1. IDFC First Mayura
UPDATE credit_cards 
SET card_image_url = 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/cards/credit-card/mayura/Mayura-Credit-Card.png'
WHERE slug = 'idfc-first-mayura';

-- 2. SBI Cashback
UPDATE credit_cards 
SET card_image_url = 'https://www.sbicard.com/sbi-card-depot/images/shopping/cashback-sbi-card/cashback-card-face.png'
WHERE slug = 'sbi-cashback-credit-card';

-- 3. Axis MyZone RuPay
UPDATE credit_cards 
SET card_image_url = 'https://www.axisbank.com/images/default-source/default-album/my-zone-credit-card.png'
WHERE slug = 'axis-myzone-rupay';

-- 4. Axis Flipkart
UPDATE credit_cards 
SET card_image_url = 'https://www.axisbank.com/images/default-source/default-album/flipkart-axis-bank-credit-card.png'
WHERE slug = 'axis-flipkart';

-- 5. SBI SimplyCLICK
UPDATE credit_cards 
SET card_image_url = 'https://www.sbicard.com/sbi-card-depot/images/shopping/simplyclick/simply-click-card-face.png'
WHERE slug = 'sbi-simplyclick-credit-card';

-- 6. Axis Rewards Visa
UPDATE credit_cards 
SET card_image_url = 'https://www.axisbank.com/images/default-source/default-album/axis-rewards-card.png'
WHERE slug = 'axis-rewards-visa';

-- 7. Axis Neo RuPay
UPDATE credit_cards 
SET card_image_url = 'https://www.axisbank.com/images/default-source/default-album/neo-credit-card.png'
WHERE slug = 'axis-neo-rupay';

-- 8. AU LIT
UPDATE credit_cards 
SET card_image_url = 'https://www.aubank.in/assets/images/lit-credit-card-new.png'
WHERE slug = 'au-lit-credit-card';

-- 9. YES Bank Pop-Club
UPDATE credit_cards 
SET card_image_url = 'https://www.yesbank.in/content/dam/yesbank-india/images/personal-banking/cards/credit-card/pop-club-credit-card.png'
WHERE slug = 'yes-bank-pop-club';

-- 10. Kiwi UPI
UPDATE credit_cards 
SET card_image_url = 'https://www.gokiwi.in/static/media/kiwi-card.png'
WHERE slug = 'kiwi-upi-credit-card';

-- 11. Kotak Cashback Plus
UPDATE credit_cards 
SET card_image_url = 'https://www.kotak.com/content/dam/Kotak/product_card_images/kotak-cashback-card.png'
WHERE slug = 'kotak-cashback-plus';

-- 12. Kotak League Platinum
UPDATE credit_cards 
SET card_image_url = 'https://www.kotak.com/content/dam/Kotak/product_card_images/league-platinum-card.png'
WHERE slug = 'kotak-league-platinum';

-- 13. IDFC First SWYP
UPDATE credit_cards 
SET card_image_url = 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/cards/credit-card/swyp/Swyp-Credit-Card.png'
WHERE slug = 'idfc-first-swyp';

-- 14. BOB Eterna
UPDATE credit_cards 
SET card_image_url = 'https://www.bobcard.in/images/eterna.png'
WHERE slug = 'bob-eterna';

-- 15. BOB Cashback
UPDATE credit_cards 
SET card_image_url = 'https://www.bobcard.in/images/cashback-card.png'
WHERE slug = 'bob-cashback';

-- 16. IDFC First WOW
UPDATE credit_cards 
SET card_image_url = 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/cards/credit-card/wow/wow-credit-card.png'
WHERE slug = 'idfc-first-wow';

-- 17. HDFC Millennia
UPDATE credit_cards 
SET card_image_url = 'https://images.hdfcbank.com/Pay/Cards/Credit-Card/Millennia-Credit-Card.png'
WHERE slug = 'hdfc-millennia';

-- 18. HDFC Pixel Play
UPDATE credit_cards 
SET card_image_url = 'https://images.hdfcbank.com/Pay/Cards/Credit-Card/Pixel-Play-Credit-Card.png'
WHERE slug = 'hdfc-pixel-play-credit-card';

-- 19. HDFC IRCTC
UPDATE credit_cards 
SET card_image_url = 'https://images.hdfcbank.com/Pay/Cards/Credit-Card/IRCTC-HDFC-Bank-Credit-Card.png'
WHERE slug = 'hdfc-irctc-credit-card';

-- ============================================================
-- Verify the updates
-- ============================================================
SELECT slug, name, card_image_url 
FROM credit_cards 
WHERE card_image_url IS NOT NULL
ORDER BY name;
