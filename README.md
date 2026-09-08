# PSF Archive

PSF Archive is a dedicated photographic archive management system for Pusat Sumber & Fotografi. MyFoto remains the operational/cataloguing source; PSF Archive provides controlled ingest, preservation metadata, integrity verification, archive search, access governance, restore workflow and NAS readiness.

## Architecture
- GitHub: source control and review
- Vercel: preview/staging only
- NAS_PSF: future internal production archive storage
- Storage abstraction prevents Vercel from mounting or receiving office NAS credentials

## Phase 2 — Photo Archive Core
- Super Admin / Archive Admin / Archivist / Contributor / Viewer RBAC
- Photographic asset and file representation model
- Preservation lifecycle and SHA-256 fixity rules
- Rights/access classes and controlled download/restore direction
- PREMIS-inspired Object / Event / Agent / Rights separation
- Phase 2C MAMS-style dashboard, ingest screen, photo catalogue and user administration UI
- Production authentication remains intentionally disabled until a dedicated PSF Archive identity/session backend is configured

## Isolation
This repository is independent. It must not modify or depend on Naskhah Studio.
