# Phase 2D — Supabase Auth + Persistent Archive Core

## Implemented in code
- Supabase SSR server/browser client foundation
- Server-side email/password sign-in and sign-out actions
- Dedicated environment contract using public Supabase URL + publishable key
- PostgreSQL migration for profiles, photo assets, archival files, collections, authority terms, rights, fixity, restore requests and append-only audit
- Row Level Security enabled across archive tables
- Role-aware RLS for SUPER_ADMIN, ARCHIVE_ADMIN, ARCHIVIST, CONTRIBUTOR and VIEWER
- Exact duplicate protection using unique SHA-256 for ORIGINAL files
- Preservation guard: PRESERVED requires VERIFIED fixity on ORIGINAL/PRESERVATION_MASTER
- Immutable archival file update/delete guard

## Security boundaries
- Use a dedicated Supabase project for PSF Archive; do not reuse unrelated application databases.
- Public self-registration remains outside the product design. Users are admin provisioned.
- Never expose service-role credentials to the browser.
- Never place office NAS SMB credentials in Vercel.
- NAS write/restore operations remain an internal worker responsibility.

## Activation steps
1. Create a dedicated `psf-archive` Supabase project.
2. Apply `supabase/migrations/20260908_phase2d_archive_core.sql`.
3. Run Supabase security/performance advisors and remediate findings.
4. Add project URL and publishable key to Vercel environment variables.
5. Provision the first Super Admin through a controlled administrative process.
6. Enforce server-side route/permission guards and remove the demo dashboard bypass.
7. Connect persistent archive screens to database queries.
