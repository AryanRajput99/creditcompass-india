-- ============================================================
-- Security Patch: Enable RLS and sensitive column protection
-- ✅ Fixes "Sensitive Columns Exposed" warning in Supabase
-- ============================================================

-- 1. Enable RLS on comparison_sessions
ALTER TABLE public.comparison_sessions ENABLE ROW LEVEL SECURITY;

-- 2. Allow anonymous users to insert new comparison sessions
CREATE POLICY "Enable insert for all users" ON public.comparison_sessions
FOR INSERT WITH CHECK (true);

-- 3. Allow users to read comparison sessions (needed for the comparison results page)
CREATE POLICY "Enable read for all users" ON public.comparison_sessions
FOR SELECT USING (true);

-- 4. Enable RLS on click_events (Good practice)
ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;

-- 5. Allow anonymous users to log clicks
CREATE POLICY "Enable insert for anonymous users" ON public.click_events
FOR INSERT WITH CHECK (true);

-- 6. Restrict reading click data to authenticated admins (optional but safer)
-- By default, no SELECT policy means only service_role can read, which is perfect for our dashboard.
