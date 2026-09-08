import type { UserRole } from '../archive/schema';

export type Permission =
  | 'system.manage' | 'users.manage' | 'storage.manage' | 'audit.read'
  | 'asset.ingest' | 'asset.catalogue' | 'asset.approve' | 'asset.read'
  | 'asset.download_original' | 'rights.manage' | 'restore.request' | 'restore.approve'
  | 'integrity.run' | 'collection.manage' | 'authority.manage';

const policy: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: ['system.manage','users.manage','storage.manage','audit.read','asset.ingest','asset.catalogue','asset.approve','asset.read','asset.download_original','rights.manage','restore.request','restore.approve','integrity.run','collection.manage','authority.manage'],
  ARCHIVE_ADMIN: ['users.manage','audit.read','asset.ingest','asset.catalogue','asset.approve','asset.read','asset.download_original','rights.manage','restore.request','restore.approve','integrity.run','collection.manage','authority.manage'],
  ARCHIVIST: ['asset.ingest','asset.catalogue','asset.read','restore.request','integrity.run','collection.manage','authority.manage'],
  CONTRIBUTOR: ['asset.ingest','asset.read','restore.request'],
  VIEWER: ['asset.read','restore.request'],
};

export const hasPermission = (role: UserRole, permission: Permission) => policy[role].includes(permission);
export const permissionsFor = (role: UserRole) => [...policy[role]];
