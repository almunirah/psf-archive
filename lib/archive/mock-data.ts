export type ArchiveRecord = {
  myfotoId: string;
  filename: string;
  collection: string;
  capturedAt: string;
  sizeMb: number;
  checksum: string;
  backupStatus: 'VERIFIED' | 'PENDING' | 'FAILED';
};

export const archiveRecords: ArchiveRecord[] = [
  { myfotoId: 'MF-2026-001245', filename: 'DSC_8271.JPG', collection: 'Program Rasmi', capturedAt: '2026-09-01', sizeMb: 14.8, checksum: '8a4d...21ef', backupStatus: 'VERIFIED' },
  { myfotoId: 'MF-2026-001246', filename: 'DSC_8272.JPG', collection: 'Program Rasmi', capturedAt: '2026-09-01', sizeMb: 13.2, checksum: 'a12c...9b04', backupStatus: 'VERIFIED' },
  { myfotoId: 'MF-2026-001247', filename: 'IMG_3401.JPG', collection: 'Aktiviti Jabatan', capturedAt: '2026-09-03', sizeMb: 10.6, checksum: 'pending', backupStatus: 'PENDING' },
  { myfotoId: 'MF-2026-001248', filename: 'IMG_3402.JPG', collection: 'Aktiviti Jabatan', capturedAt: '2026-09-03', sizeMb: 11.1, checksum: 'pending', backupStatus: 'PENDING' },
];

export const backupJobs = [
  { id: 'JOB-20260908-001', source: 'MyFoto', target: 'NAS_PSF', records: 1248, verified: 1246, failed: 0, status: 'RUNNING' },
  { id: 'JOB-20260907-001', source: 'MyFoto', target: 'NAS_PSF', records: 1187, verified: 1187, failed: 0, status: 'COMPLETED' },
  { id: 'JOB-20260906-001', source: 'MyFoto', target: 'NAS_PSF', records: 1154, verified: 1153, failed: 1, status: 'COMPLETED_WITH_WARNING' },
];
