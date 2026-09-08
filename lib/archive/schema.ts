export type UserRole = 'SUPER_ADMIN' | 'ARCHIVE_ADMIN' | 'ARCHIVIST' | 'CONTRIBUTOR' | 'VIEWER';
export type AssetStatus = 'SUBMITTED' | 'INGESTED' | 'METADATA_REVIEW' | 'APPROVED' | 'ARCHIVED' | 'PRESERVED' | 'QUARANTINED';
export type AccessClass = 'PUBLIC' | 'INTERNAL' | 'RESTRICTED' | 'CONFIDENTIAL' | 'EMBARGOED';
export type FilePurpose = 'ORIGINAL' | 'PRESERVATION_MASTER' | 'EDITED_MASTER' | 'PREVIEW' | 'THUMBNAIL' | 'WATERMARKED_PREVIEW';

export interface ArchiveUser { id: string; email: string; displayName: string; role: UserRole; active: boolean; }
export interface PhotoAsset { id: string; archiveId: string; myFotoId?: string; title: string; caption?: string; photographer?: string; dateTaken?: string; location?: string; event?: string; accessClass: AccessClass; status: AssetStatus; createdAt: string; }
export interface AssetFile { id: string; assetId: string; purpose: FilePurpose; filename: string; mimeType: string; sizeBytes: number; sha256: string; storageKey: string; }
export interface PreservationEvent { id: string; assetId: string; fileId?: string; eventType: 'INGEST'|'CHECKSUM_GENERATED'|'FIXITY_CHECK'|'METADATA_UPDATED'|'MIGRATION'|'RESTORE'|'QUARANTINE'; eventAt: string; outcome: 'SUCCESS'|'FAILURE'|'WARNING'; agentId: string; detail?: string; }
export interface RightsStatement { id: string; assetId: string; copyrightOwner?: string; creditLine?: string; usageRestriction?: string; embargoUntil?: string; }
export interface Collection { id: string; name: string; description?: string; virtual: boolean; }
export interface AuthorityRecord { id: string; type: 'PERSON'|'PHOTOGRAPHER'|'ORGANISATION'|'LOCATION'|'EVENT'|'SUBJECT'; preferredLabel: string; aliases: string[]; }
export interface AuditEntry { id: string; actorId: string; action: string; entityType: string; entityId: string; occurredAt: string; before?: unknown; after?: unknown; }
