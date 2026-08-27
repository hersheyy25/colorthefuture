/*
# Create workshop_signups table

1. New Tables
- `workshop_signups`: stores phone numbers from visitors who want to be
  notified about future workshops. Simple, not tied to a specific event.
  - id (uuid, pk)
  - phone (text, not null)
  - created_at (timestamptz, default now())

2. Security
- Enable RLS.
- Public INSERT only (anyone can sign up). No public read/update/delete —
  phone numbers are private to the org.
*/

CREATE TABLE IF NOT EXISTS workshop_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workshop_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_workshop_signups" ON workshop_signups;
CREATE POLICY "public_insert_workshop_signups" ON workshop_signups FOR INSERT
  TO anon, authenticated WITH CHECK (true);
