export const assetStatuses = ['SUBMITTED','INGESTED','METADATA_REVIEW','APPROVED','ARCHIVED','PRESERVED','QUARANTINED','RESTRICTED','SUPERSEDED','DISPOSED'] as const;
export const accessClasses = ['PUBLIC','INTERNAL','RESTRICTED','CONFIDENTIAL','EMBARGOED'] as const;
export type AssetStatus = (typeof assetStatuses)[number];
export type AccessClass = (typeof accessClasses)[number];

export interface PhotoAsset {
  id: string;
  archiveId: string;
  myFotoId?: string;
  title: string;
  caption?: string;
  description?: string;
  photographer?: string;
  dateTaken?: string;
  location?: string;
  event?: string;
  agency?: string;
  category?: string;
  keywords: string[];
  copyrightOwner?: string;
  creditLine?: string;
  status: AssetStatus;
  accessClass: AccessClass;
  embargoUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssetFile {
  id: string;
  assetId: string;
  kind: 'ORIGINAL' | 'PRESERVATION_MASTER' | 'EDITED_MASTER' | 'PREVIEW' | 'THUMBNAIL' | 'WATERMARKED_PREVIEW';
  filename: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  checksumSha256: string;
  storageLocation: string;
  immutable: boolean;
}
