# Phase 2C — MAMS-style application shell

## Delivered
- Dedicated role dashboard
- Photo ingest UI with archival processing stages
- Photo archive catalogue/grid view
- Users & roles administration screen
- Authentication session contract
- Explicit demo-only authentication boundary

## Security rule
The sign-in button remains disabled until a dedicated PSF Archive identity provider/session backend is configured. No placeholder password is accepted and no NAS credentials are involved.

## Production authentication target
1. Dedicated PSF Archive auth tenant/project
2. Admin-provisioned users only; no public self-registration
3. Server-validated sessions
4. Role persisted separately from client UI
5. Route authorization enforced server-side
6. Super Admin system/storage privileges isolated from Archive Admin
7. MFA-ready policy for privileged roles
8. Append-only audit for sign-in, role changes and privileged actions

## Next
Phase 2D should connect the database/auth backend, enforce server-side route guards, create persistent users/roles/assets, and replace demo catalogue data with database queries.
