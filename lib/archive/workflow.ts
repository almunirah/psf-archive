import type { AssetStatus, UserRole } from './schema';

const transitions: Record<AssetStatus, AssetStatus[]> = {
  SUBMITTED: ['INGESTED','QUARANTINED'],
  INGESTED: ['METADATA_REVIEW','QUARANTINED'],
  METADATA_REVIEW: ['APPROVED','QUARANTINED'],
  APPROVED: ['ARCHIVED','QUARANTINED'],
  ARCHIVED: ['PRESERVED','QUARANTINED'],
  PRESERVED: ['QUARANTINED'],
  QUARANTINED: ['INGESTED','METADATA_REVIEW'],
};

export function canTransition(from: AssetStatus, to: AssetStatus) {
  return transitions[from].includes(to);
}

export function canApprove(role: UserRole) {
  return role === 'SUPER_ADMIN' || role === 'ARCHIVE_ADMIN';
}

export function canMarkPreserved(input: { status: AssetStatus; hasVerifiedFixity: boolean }) {
  return input.status === 'ARCHIVED' && input.hasVerifiedFixity;
}
