export type StorageObject = {
  path: string;
  size: number;
  modifiedAt: string;
};

export interface StorageAdapter {
  readonly driver: 'mock' | 'nas';
  health(): Promise<{ ok: boolean; message: string }>;
  list(prefix?: string): Promise<StorageObject[]>;
  exists(path: string): Promise<boolean>;
}

class MockStorageAdapter implements StorageAdapter {
  readonly driver = 'mock' as const;
  async health() { return { ok: true, message: 'Mock storage ready' }; }
  async list(prefix = ''): Promise<StorageObject[]> {
    return [
      { path: `${prefix}2026/DSC_8271.JPG`, size: 15518925, modifiedAt: '2026-09-08T02:00:00Z' },
      { path: `${prefix}2026/DSC_8272.JPG`, size: 13841203, modifiedAt: '2026-09-08T02:00:00Z' },
    ];
  }
  async exists(path: string) { return (await this.list()).some((item) => item.path === path); }
}

export function getStorageAdapter(): StorageAdapter {
  const driver = process.env.STORAGE_DRIVER ?? 'mock';
  if (driver !== 'mock') {
    throw new Error('NAS storage adapter is intentionally disabled until NAS_PSF connection details and runtime are approved.');
  }
  return new MockStorageAdapter();
}
