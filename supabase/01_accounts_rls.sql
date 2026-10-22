-- P-Kingdom — per-account XP security
--
-- Run this ONCE in the Supabase SQL editor (Dashboard → SQL Editor → New query)
-- AFTER you have enabled Email auth (Dashboard → Authentication → Providers → Email).
--
-- Context: the app now stores each signed-in user's XP in their own row of
-- `pkingdom_xp`, keyed by `uid = auth.uid()` (the user's UUID, stored as text).
-- Row Level Security below guarantees a user can only read and write their OWN
-- row — without it, the anon key could read or overwrite everyone's progress.

-- 1. Make sure the neuro-oph column exists (needed by the Neuro-Ophthalmology kingdom).
alter table public.pkingdom_xp
  add column if not exists neuro_oph_xp integer not null default 0;

-- 2. Turn on Row Level Security for the table.
alter table public.pkingdom_xp enable row level security;

-- 3. Policies: a signed-in user may touch only the row whose uid is their own id.
--    (uid is a text column; auth.uid() is a uuid, so cast it to text.)
drop policy if exists "pkingdom_xp_select_own" on public.pkingdom_xp;
create policy "pkingdom_xp_select_own"
  on public.pkingdom_xp for select
  to authenticated
  using (uid = auth.uid()::text);

drop policy if exists "pkingdom_xp_insert_own" on public.pkingdom_xp;
create policy "pkingdom_xp_insert_own"
  on public.pkingdom_xp for insert
  to authenticated
  with check (uid = auth.uid()::text);

drop policy if exists "pkingdom_xp_update_own" on public.pkingdom_xp;
create policy "pkingdom_xp_update_own"
  on public.pkingdom_xp for update
  to authenticated
  using (uid = auth.uid()::text)
  with check (uid = auth.uid()::text);

-- Note: the legacy shared "A1" row (from the pre-accounts version) is now
-- orphaned and unreachable under RLS. It is harmless; delete it if you like:
--   delete from public.pkingdom_xp where uid = 'A1';
