/*
# Add phone column to registrations

1. Modified Tables
- `registrations`: add `phone` (text, nullable) so visitors can leave a phone
  number to be notified about a workshop and future events, instead of requiring
  an email. The org can then reach out next time they host a workshop.

2. Security
- No policy changes. The existing public INSERT policy already covers the new
  column (insertable_columns is "all").
*/

ALTER TABLE registrations ADD COLUMN IF NOT EXISTS phone text;
