# Phase 2 — Photo Archive Core

PSF Archive is a purpose-built photographic archive/MAM platform for MyFoto preservation and controlled access.

## Non-negotiable boundaries
- This repository is standalone.
- Do not modify or depend on Naskhah Studio.
- MyFoto remains the operational/cataloguing source system.
- NAS_PSF stores preservation masters; Vercel must never mount or expose office SMB storage.

## Roles
1. SUPER_ADMIN — platform governance, security, roles, metadata schema, storage/NAS, retention, integrations, full audit.
2. ARCHIVE_ADMIN — archive operations, user approval, ingest approval, metadata approval, rights, restore/download approval.
3. ARCHIVIST — ingest, cataloguing, metadata, collections, authority records, preservation operations within assigned scope.
4. CONTRIBUTOR — submit photographs and basic metadata; cannot approve/preserve own submission.
5. VIEWER — search/preview permitted assets and submit download/use requests.

## Core domains
- Authentication & RBAC
- Photo Asset Registry
- Ingest & Quarantine
- Metadata (descriptive, creator, technical, administrative, rights, preservation)
- EXIF/IPTC/XMP extraction
- Collections
- Authority Files / Controlled Vocabulary
- Search & Advanced Search
- Preservation Masters & Derivatives
- Fixity / SHA-256 Integrity
- Exact & Visual Duplicate Detection
- Rights / Embargo / Access Classification
- Download & Usage Requests
- Restore Workflow
- Audit Trail
- Storage/NAS Health
- Reports

## Asset lifecycle
SUBMITTED -> INGESTED -> METADATA_REVIEW -> APPROVED -> ARCHIVED -> PRESERVED

Exception states: QUARANTINED, RESTRICTED, SUPERSEDED, DISPOSED.

## Access classes
PUBLIC, INTERNAL, RESTRICTED, CONFIDENTIAL, EMBARGOED.

## Preservation object model
PREMIS-inspired separation:
- Object: asset/master/derivative/file
- Event: ingest, checksum, validation, migration, restore, download
- Agent: user/system/integration
- Rights: copyright, license, restriction, embargo, usage approval

## Initial data model
- users
- roles
- permissions
- user_roles
- photo_assets
- asset_files
- asset_metadata
- collections
- collection_assets
- authority_records
- authority_aliases
- asset_authorities
- preservation_events
- fixity_checks
- duplicate_matches
- rights_statements
- download_requests
- restore_requests
- audit_events
- storage_locations
- ingest_jobs

## Preservation rules
- Preserve original/master separately from access derivatives.
- Generate SHA-256 on ingest and after controlled copy/move operations.
- Never overwrite a preservation master in place.
- Record preservation events and actor/system identity.
- Derivatives may include thumbnail, preview, web JPEG and watermarked preview.
- Originals are never publicly addressable.
- Failed validation/fixity enters quarantine and requires authorized resolution.

## Phase 2 implementation sequence
2A Auth/RBAC + sign-in shell
2B Photo Asset + metadata schema
2C Ingest + EXIF/IPTC extraction + quarantine
2D Collections + authority files + controlled vocabulary
2E Search + filters + preview/derivatives
2F Fixity + duplicate engine + preservation events
2G Rights + download requests + embargo
2H Restore + audit + reports
2I NAS production adapter + hardening
