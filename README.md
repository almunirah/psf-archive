# PSF Archive

Internal archive management and integrity monitoring system for MyFoto backup on NAS_PSF.

## Architecture

- Next.js App Router + TypeScript
- Vercel for development/preview
- Internal/NAS deployment for production
- Storage adapter abstraction: mock/local during development, NAS adapter for office deployment
- MyFoto remains the operational/cataloguing system; PSF Archive manages archive verification, monitoring, search, restore and audit.

## Phase 1 Modules

- Dashboard
- Archive Records
- Backup Monitor
- Integrity Check (SHA-256)
- Duplicate Detection
- Metadata
- Search
- Restore Queue
- Audit Log
- Users & Roles
- NAS Settings

## Storage Principle

Archive image binaries are not stored in GitHub or Vercel. Production image files remain on NAS_PSF. Credentials and NAS connection details must only be supplied through environment variables/secrets.

## Project Isolation

This repository is an independent PSF Archive project and must not modify or depend on Naskhah Studio.
