export const roles = ['SUPER_ADMIN','ARCHIVE_ADMIN','ARCHIVIST','CONTRIBUTOR','VIEWER'] as const;
export type Role = (typeof roles)[number];

export const permissions = [
  'system.manage','users.manage','roles.manage','storage.manage','metadata_schema.manage','retention.manage','integrations.manage','audit.read_all',
  'asset.submit','asset.ingest','asset.catalogue','asset.approve','asset.preserve','asset.read','asset.preview','asset.restrict',
  'collection.manage','authority.manage','rights.manage','integrity.run','duplicate.review','download.request','download.approve','restore.request','restore.approve','reports.read'
] as const;
export type Permission = (typeof permissions)[number];

const grants: Record<Role, readonly Permission[]> = {
  SUPER_ADMIN: permissions,
  ARCHIVE_ADMIN: permissions.filter(p => !['system.manage','roles.manage','integrations.manage'].includes(p)),
  ARCHIVIST: ['asset.submit','asset.ingest','asset.catalogue','asset.preserve','asset.read','asset.preview','collection.manage','authority.manage','integrity.run','duplicate.review','download.request','restore.request','reports.read'],
  CONTRIBUTOR: ['asset.submit','asset.read','asset.preview','download.request','restore.request'],
  VIEWER: ['asset.read','asset.preview','download.request'],
};

export function can(role: Role, permission: Permission) {
  return grants[role].includes(permission);
}

export function permissionsFor(role: Role) {
  return grants[role];
}
