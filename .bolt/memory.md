# Project memory

## Product intent & audience

- **Project name:** "Color the Future"
- Community-facing website offering free workshops, volunteer opportunities, and newsletter subscriptions
- No user authentication/login system; all interactions are anonymous form submissions
- Audience: community members interested in workshops, volunteering, and email updates
- Originally painting-focused; has since broadened its scope away from painting as the primary focus

## Brand personality & voice

- Creative, community-oriented, forward-looking identity implied by the name
- Workshop categories beyond painting now relevant

## Visual design & UX direction

- Stack: Vite + React, Tailwind CSS, Lucide React icons, `@/` path alias → `src/`
- Current workshop section is static copy, not database-driven
- Forms in use: newsletter (footer), volunteer form, workshop text-alert signup
- Global design instructions exist in `.bolt/prompt` (beautiful, production-grade, non-cookie-cutter)

## Decisions, constraints & rationale

- **Database:** Supabase with 5 tables (`workshops`, `registrations`, `volunteers`, `newsletter`, `workshop_signups`)
- **RLS enabled on all tables:** `workshops` is publicly readable; the other 4 are insert-only (write-only from the client)
- **Only FK relationship:** `registrations.workshop_id → workshops.id` (no ON DELETE cascade)
- **No admin role** in schema; submissions readable only via Supabase dashboard or service key
- `newsletter.email` has a unique constraint; other submission tables do not
- Read-only audit completed; no changes implemented without user approval

## Open questions & assumptions

- User has not yet approved any of the audit's 9 recommendations (privilege narrowing, spam protection, phone validation, capacity enforcement, constraint validation, stale defaults, admin view, unused tables, indexes)
- Whether `workshops`/`registrations` tables will be wired into the frontend or left dormant is undecided
- No decision yet on adding an admin area or automated digest for submission visibility