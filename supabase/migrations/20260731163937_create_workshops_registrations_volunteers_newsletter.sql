/*
# Create core tables for Color the Future

This migration sets up the data layer for the Color the Future nonprofit website.
The site is a public, no-sign-in marketing + engagement site, so all policies
allow the anon role (the browser uses the anon key with no login).

1. New Tables
- `workshops`: upcoming and past community art workshops/events shown on the
  public site. Org staff manage rows; the public only reads them.
  - id (uuid, pk)
  - title (text, not null)
  - description (text, not null)
  - event_date (timestamptz, not null) — when the workshop happens
  - location (text, not null)
  - image_url (text) — optional hero image for the card
  - capacity (int, default 20) — max attendees
  - price_note (text) — e.g. "Free" or "$5 suggested donation"
  - category (text) — e.g. "Painting", "Drawing", "Seasonal Crafts", "Public Art"
  - created_at (timestamptz, default now())
- `registrations`: a visitor signs up to attend a specific workshop.
  - id (uuid, pk)
  - workshop_id (uuid, fk -> workshops.id, on delete cascade)
  - name (text, not null)
  - email (text, not null)
  - attendees (int, default 1) — how many seats to reserve
  - created_at (timestamptz, default now())
- `volunteers`: a visitor signs up to volunteer with the organization.
  - id (uuid, pk)
  - name (text, not null)
  - email (text, not null)
  - phone (text)
  - interests (text) — which kinds of opportunities they're interested in
  - message (text) — optional free-text note
  - created_at (timestamptz, default now())
- `newsletter`: a visitor subscribes to the email newsletter.
  - id (uuid, pk)
  - email (text, not null, unique)
  - created_at (timestamptz, default now())

2. Security (RLS)
- Enable RLS on every table.
- `workshops`: public read (anon + authenticated). No public write — only org
  staff (service role) create/edit workshops.
- `registrations`: public INSERT (anyone can register). No public SELECT/UPDATE/
  DELETE — registration data is private to the org.
- `volunteers`: public INSERT (anyone can sign up). No public SELECT/UPDATE/
  DELETE — volunteer data is private to the org.
- `newsletter`: public INSERT (anyone can subscribe). No public SELECT/UPDATE/
  DELETE — subscriber data is private to the org.

3. Indexes
- registrations.workshop_id (foreign key lookups)
- newsletter.email (unique constraint already indexes this)
- workshops.event_date (chronological listing)
*/

CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  capacity int NOT NULL DEFAULT 20,
  price_note text NOT NULL DEFAULT 'Free',
  category text NOT NULL DEFAULT 'Painting',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id uuid NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  attendees int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  interests text,
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_registrations_workshop_id ON registrations(workshop_id);
CREATE INDEX IF NOT EXISTS idx_workshops_event_date ON workshops(event_date);

-- Enable RLS on all tables
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- workshops: public read only
DROP POLICY IF EXISTS "public_read_workshops" ON workshops;
CREATE POLICY "public_read_workshops" ON workshops FOR SELECT
  TO anon, authenticated USING (true);

-- registrations: public insert only (private data otherwise)
DROP POLICY IF EXISTS "public_insert_registrations" ON registrations;
CREATE POLICY "public_insert_registrations" ON registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- volunteers: public insert only (private data otherwise)
DROP POLICY IF EXISTS "public_insert_volunteers" ON volunteers;
CREATE POLICY "public_insert_volunteers" ON volunteers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- newsletter: public insert only (private data otherwise)
DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter;
CREATE POLICY "public_insert_newsletter" ON newsletter FOR INSERT
  TO anon, authenticated WITH CHECK (true);
