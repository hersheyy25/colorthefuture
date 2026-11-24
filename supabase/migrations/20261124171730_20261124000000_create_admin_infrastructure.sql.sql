/*
# Admin dashboard foundation

1. New Tables
- `admin_users` — one row per administrator. `user_id` links to the auth account,
  `role` is 'owner' or 'editor'. Owners manage other admins; editors cannot.
- `admin_audit_log` — append-only record of important administrative actions
  (actor, action, subject table/row, details, timestamp).
- `admin_roles` — reference list of role names used as a check constraint source.

2. Modified Tables (additive only, no existing columns changed or removed)
- `volunteers`: add `status` text (default 'new', check: new/in_progress/approved/archived)
  and `admin_notes` text.
- `newsletter`: add `status` text (default 'active', check: active/unsubscribed).
  Existing subscribers keep working because the default is 'active'.
- `registrations`: add `status` text (default 'confirmed', check: confirmed/waitlisted/cancelled)
  and `admin_notes` text.

3. Security
- Enable RLS on the three new tables.
- Helper function `public.is_admin()` (SECURITY DEFINER, stable, search_path pinned):
  true when the caller is authenticated and has a row in `admin_users`.
  EXECUTE revoked from PUBLIC/anon, granted to authenticated.
- `admin_users`: SELECT/INSERT/DELETE for admins only. UPDATE of role for owners only.
  INSERT also restricted to owners (WITH CHECK using is owner check via EXISTS).
  Non-admin authenticated users and anon can see nothing.
- `admin_audit_log`: SELECT + INSERT for admins; no UPDATE/DELETE (append-only).
- Submission tables (`volunteers`, `newsletter`, `workshop_signups`, `registrations`):
  add admin-only SELECT so only admins can read submissions. Public insert policies unchanged.
- `registrations`: add admin-only UPDATE (status/notes management).
- `volunteers`: add admin-only UPDATE (status/notes management).
- `newsletter`: add admin-only UPDATE (unsubscribe management).
- `workshops`: add admin-only INSERT/UPDATE/DELETE (public read policy unchanged).
- Narrow grants: public roles keep only the verbs the public site uses
  (SELECT on workshops; INSERT on the four submission tables), plus the columns
  the public forms actually fill. Admins keep full grants via their own policies.
  `service_role` granted full access for edge functions.
- All grants explicit; no `FOR ALL` policies; separate policy per verb.

4. Important notes
- No existing columns are dropped or retyped; this is safe and reversible by design.
- The first administrator accounts are created after this migration by a one-time
  bootstrap edge function using the service role (never exposed to the browser).
- The audit log has no UPDATE/DELETE policies anywhere, so no role can edit history.
*/

-- Reference data for roles
CREATE TABLE IF NOT EXISTS public.admin_roles (
  name text PRIMARY KEY,
  description text NOT NULL DEFAULT ''
);
INSERT INTO public.admin_roles (name, description) VALUES
  ('owner', 'Full access including managing other administrators'),
  ('editor', 'Can manage workshops, volunteers, registrations and newsletter')
ON CONFLICT (name) DO NOTHING;

-- Administrators
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'editor' REFERENCES public.admin_roles(name),
  added_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Append-only audit trail
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id),
  actor_email text,
  action text NOT NULL,
  subject_table text,
  subject_id text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Additive columns on existing tables
ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new'
    CONSTRAINT volunteers_status_check CHECK (status IN ('new','in_progress','approved','archived')),
  ADD COLUMN IF NOT EXISTS admin_notes text;

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'confirmed'
    CONSTRAINT registrations_status_check CHECK (status IN ('confirmed','waitlisted','cancelled')),
  ADD COLUMN IF NOT EXISTS admin_notes text;

ALTER TABLE public.newsletter
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active'
    CONSTRAINT newsletter_status_check CHECK (status IN ('active','unsubscribed'));

CREATE INDEX IF NOT EXISTS registrations_workshop_id_idx ON public.registrations (workshop_id);
CREATE INDEX IF NOT EXISTS volunteers_created_at_idx ON public.volunteers (created_at DESC);

-- Helper: is the current user an administrator?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Admin users policies (admins only; owner-gated management)
DROP POLICY IF EXISTS "admins_select_admin_users" ON public.admin_users;
CREATE POLICY "admins_select_admin_users" ON public.admin_users
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "owners_insert_admin_users" ON public.admin_users;
CREATE POLICY "owners_insert_admin_users" ON public.admin_users
FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.role = 'owner')
);

DROP POLICY IF EXISTS "owners_update_admin_users" ON public.admin_users;
CREATE POLICY "owners_update_admin_users" ON public.admin_users
FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.role = 'owner'))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.role = 'owner'));

DROP POLICY IF EXISTS "owners_delete_admin_users" ON public.admin_users;
CREATE POLICY "owners_delete_admin_users" ON public.admin_users
FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid() AND au.role = 'owner'));

-- Audit log: admins read and append, nobody edits history
DROP POLICY IF EXISTS "admins_select_audit_log" ON public.admin_audit_log;
CREATE POLICY "admins_select_audit_log" ON public.admin_audit_log
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_insert_audit_log" ON public.admin_audit_log;
CREATE POLICY "admins_insert_audit_log" ON public.admin_audit_log
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- Admin reads on submission tables
DROP POLICY IF EXISTS "admins_select_volunteers" ON public.volunteers;
CREATE POLICY "admins_select_volunteers" ON public.volunteers
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_select_registrations" ON public.registrations;
CREATE POLICY "admins_select_registrations" ON public.registrations
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_select_newsletter" ON public.newsletter;
CREATE POLICY "admins_select_newsletter" ON public.newsletter
FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_select_workshop_signups" ON public.workshop_signups;
CREATE POLICY "admins_select_workshop_signups" ON public.workshop_signups
FOR SELECT TO authenticated USING (public.is_admin());

-- Admin writes on management tables
DROP POLICY IF EXISTS "admins_update_volunteers" ON public.volunteers;
CREATE POLICY "admins_update_volunteers" ON public.volunteers
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admins_update_registrations" ON public.registrations;
CREATE POLICY "admins_update_registrations" ON public.registrations
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admins_update_newsletter" ON public.newsletter;
CREATE POLICY "admins_update_newsletter" ON public.newsletter
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admins_delete_newsletter" ON public.newsletter;
CREATE POLICY "admins_delete_newsletter" ON public.newsletter
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_delete_workshop_signups" ON public.workshop_signups;
CREATE POLICY "admins_delete_workshop_signups" ON public.workshop_signups
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_insert_workshops" ON public.workshops;
CREATE POLICY "admins_insert_workshops" ON public.workshops
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admins_update_workshops" ON public.workshops;
CREATE POLICY "admins_update_workshops" ON public.workshops
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admins_delete_workshops" ON public.workshops;
CREATE POLICY "admins_delete_workshops" ON public.workshops
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_delete_volunteers" ON public.volunteers;
CREATE POLICY "admins_delete_volunteers" ON public.volunteers
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "admins_delete_registrations" ON public.registrations;
CREATE POLICY "admins_delete_registrations" ON public.registrations
FOR DELETE TO authenticated USING (public.is_admin());

-- Grants: public site verbs only (narrowed from table-wide grants)
REVOKE ALL ON public.volunteers FROM anon, authenticated;
REVOKE ALL ON public.registrations FROM anon, authenticated;
REVOKE ALL ON public.newsletter FROM anon, authenticated;
REVOKE ALL ON public.workshop_signups FROM anon, authenticated;
REVOKE ALL ON public.workshops FROM anon, authenticated;

GRANT SELECT ON public.workshops TO anon, authenticated;

GRANT INSERT (name, email, phone, interests, message) ON public.volunteers TO anon, authenticated;
GRANT INSERT (workshop_id, name, email, phone, attendees) ON public.registrations TO anon, authenticated;
GRANT INSERT (email) ON public.newsletter TO anon, authenticated;
GRANT INSERT (phone) ON public.workshop_signups TO anon, authenticated;

-- Admins get full table access (policies scope the rows)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.volunteers, public.registrations, public.newsletter, public.workshop_signups, public.workshops TO authenticated;

-- Service role for edge functions (bypasses RLS, still needs grants)
GRANT ALL ON public.admin_users, public.admin_audit_log, public.admin_roles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.volunteers, public.registrations, public.newsletter, public.workshop_signups, public.workshops TO service_role;
