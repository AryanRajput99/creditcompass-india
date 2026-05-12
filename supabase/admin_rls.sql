-- Admin Row Level Security (RLS) Configuration
-- Run this in the Supabase SQL Editor to grant admin access to your specific user.

-- Admin User UID: 7ee5580b-b62d-467e-9941-78640013da0e

-- 1. CREDIT CARDS TABLE
-- Allow admin to insert, update, and delete credit cards
CREATE POLICY "Admin can insert credit cards"
  ON public.credit_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');

CREATE POLICY "Admin can update credit cards"
  ON public.credit_cards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e')
  WITH CHECK (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');

CREATE POLICY "Admin can delete credit cards"
  ON public.credit_cards
  FOR DELETE
  TO authenticated
  USING (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');


-- 2. CATEGORIES TABLE
-- Allow admin to insert, update, and delete categories
CREATE POLICY "Admin can insert categories"
  ON public.categories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');

CREATE POLICY "Admin can update categories"
  ON public.categories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e')
  WITH CHECK (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');

CREATE POLICY "Admin can delete categories"
  ON public.categories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');


-- 3. CLICK EVENTS TABLE
-- Allow admin to read all click events (analytics)
CREATE POLICY "Admin can view click events"
  ON public.click_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = '7ee5580b-b62d-467e-9941-78640013da0e');

-- 4. BUCKET STORAGE (If we add image uploading later)
-- We will add policies here if we decide to host card images directly on Supabase.
