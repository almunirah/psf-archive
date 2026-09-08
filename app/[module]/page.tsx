import { AppShell } from '@/components/AppShell';
import { notFound } from 'next/navigation';

const modules: Record<string, { title: string; eyebrow: string; description: string }> = {
  duplicates: { title: 'Duplicate Detection', eyebrow: 'ARCHIVE QUALITY', description: 'Detect exact duplicate files before they are written into the long-term archive.' },
  metadata: { title: 'Metadata & Search', eyebrow: 'DISCOVERY', description: 'Search archive records using MyFoto identifiers, EXIF/IPTC metadata and archive manifest fields.' },
  restore: { title: 'Restore Queue', eyebrow: 'CONTROLLED RESTORE', description: 'Request, approve and track controlled restore of archived photographs.' },
  audit: { title: 'Audit Log', eyebrow: 'GOVERNANCE', description: 'Track archive actions, integrity results, restore activity and configuration changes.' },
  users: { title: 'Users & Roles', eyebrow: 'ACCESS CONTROL', description: 'Manage Admin, Archivist and Viewer access without exposing NAS credentials.' },
  settings: { title: 'NAS Settings', eyebrow: 'INTERNAL STORAGE', description: 'Configure the NAS storage adapter only inside the approved PSF internal environment.' },
};

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const item = modules[module];
  if (!item) notFound();

  return (
    <AppShell>
      <header><div><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p>{item.description}</p></div><span className="badge">PHASE 1 FOUNDATION</span></header>
      <div className="panel column">
        <h2>Module Foundation Ready</h2>
        <p>This route is now isolated inside PSF Archive and ready for its next implementation stage.</p>
        <div className="step"><span>1</span><b>UI route</b><em>Ready</em></div>
        <div className="step"><span>2</span><b>Data contract</b><em>Next</em></div>
        <div className="step"><span>3</span><b>Authorization</b><em>Next</em></div>
        <div className="step"><span>4</span><b>Production integration</b><em>After NAS approval</em></div>
      </div>
    </AppShell>
  );
}
