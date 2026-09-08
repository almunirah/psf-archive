# PSF Archive — Phase 2B Database Schema

This schema is deliberately photo-archive specific. It separates the intellectual photo asset from its physical/digital file representations and records preservation events.

## Identity & Access
- `users`: id, email, display_name, active, last_sign_in_at, created_at
- `roles`: SUPER_ADMIN, ARCHIVE_ADMIN, ARCHIVIST, CONTRIBUTOR, VIEWER
- `user_roles`: user_id, role
- `sessions`: server-managed session records when applicable

Super Admin is the only role allowed to manage system/storage configuration. Archive Admin manages archive operations but cannot silently elevate itself to Super Admin.

## Photo Archive
- `photo_assets`: id, archive_id, myfoto_id, title, caption, description, photographer_authority_id, date_taken, location_authority_id, event_authority_id, status, access_class, created_by, approved_by, approved_at, created_at, updated_at
- `asset_files`: id, asset_id, purpose, filename, mime_type, extension, size_bytes, width, height, sha256, storage_key, created_at
- `technical_metadata`: file_id, camera_make, camera_model, lens, iso, aperture, shutter_speed, focal_length, dpi, gps_latitude, gps_longitude, exif_json, iptc_json
- `keywords`: id, preferred_label
- `asset_keywords`: asset_id, keyword_id

`archive_id` is immutable and unique. `sha256` is indexed and used for exact duplicate detection. Original/master files are never replaced in-place.

## Collections
- `collections`: id, name, description, collection_type, parent_id, access_class, created_by
- `collection_assets`: collection_id, asset_id

Collections are virtual relationships; adding an asset to multiple collections never duplicates the original file.

## Authority Control
- `authority_records`: id, type, preferred_label, description, active
- `authority_aliases`: authority_id, alias

Types: PERSON, PHOTOGRAPHER, ORGANISATION, LOCATION, EVENT, SUBJECT.

## Rights & Access
- `rights_statements`: id, asset_id, copyright_owner, copyright_status, credit_line, usage_restriction, license_terms, embargo_until, notes
- `download_requests`: id, asset_id, requester_id, purpose, requested_variant, status, decided_by, decided_at, expires_at

Original/master download requires explicit permission or approved request. Preview access does not imply original-file access.

## Preservation
- `preservation_events`: id, asset_id, file_id, event_type, event_at, outcome, detail, agent_id
- `fixity_checks`: id, file_id, algorithm, expected_digest, observed_digest, status, checked_at, agent_id
- `restore_requests`: id, asset_id, requester_id, reason, status, approved_by, staging_key, integrity_status, created_at, completed_at
- `quarantine_items`: id, file_id, reason, detected_at, resolved_at, resolved_by

Events include INGEST, CHECKSUM_GENERATED, FIXITY_CHECK, METADATA_UPDATED, MIGRATION, RESTORE and QUARANTINE. This follows a PREMIS-inspired Object/Event/Agent/Rights separation while remaining pragmatic for PSF.

## Audit
- `audit_log`: id, actor_id, action, entity_type, entity_id, occurred_at, ip_address, request_id, before_json, after_json

Audit entries are append-only at application level and should be protected against update/delete at database level in production.

## Core invariants
1. Original archive files are immutable after successful ingest.
2. Every stored original/master must have SHA-256.
3. No asset reaches PRESERVED without a successful fixity event.
4. Restore writes to staging first, never directly into MyFoto production.
5. Deletion/disposal requires an approved archival workflow and audit trail; it is never a normal UI delete.
6. Vercel never receives office NAS SMB credentials.
7. MyFoto remains the operational source; PSF Archive is the archival/preservation layer.
