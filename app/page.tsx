import { AppShell } from '@/components/AppShell';
import { archiveRecords, backupJobs } from '@/lib/archive/mock-data';

export default function Home() {
  const verified = archiveRecords.filter((r) => r.backupStatus === 'VERIFIED').length;
  const pending = archiveRecords.filter((r) => r.backupStatus === 'PENDING').length;
  const latest = backupJobs[0];

  return (
    <AppShell>
      <header><div><p className="eyebrow">PUSAT SUMBER & FOTOGRAFI</p><h1>Archive Dashboard</h1><p>Monitor MyFoto backup, archive integrity and NAS readiness.</p></div><span className="status">● System Ready</span></header>
      <div className="cards">
        <article><p>Archive Records</p><strong>{archiveRecords.length}</strong><small>Mock records indexed</small></article>
        <article><p>Verified</p><strong>{verified}</strong><small>SHA-256 integrity verified</small></article>
        <article><p>Backup Pending</p><strong>{pending}</strong><small>Waiting for NAS sync</small></article>
        <article><p>Latest Job</p><strong>{latest.status}</strong><small>{latest.id}</small></article>
      </div>
      <div className="panel"><div><p className="eyebrow">NAS CONNECTION</p><h2>NAS_PSF</h2><p>Application logic is separated from storage. Development remains on mock storage until the internal NAS runtime is approved and configured.</p></div><span className="badge">AWAITING CONNECTION</span></div>
      <div className="grid">
        <div className="panel column"><h2>Archive Pipeline</h2>{['MyFoto Source','Backup Queue','SHA-256 Verification','NAS Archive','Manifest & Audit'].map((x,i)=><div className="step" key={x}><span>{i+1}</span><b>{x}</b><em>{i<3?'Foundation ready':'NAS integration pending'}</em></div>)}</div>
        <div className="panel column"><h2>Phase 1 Status</h2>{[['Archive Records','READY'],['Backup Monitor','READY'],['Integrity Check','READY'],['Duplicate Detection','FOUNDATION'],['Metadata & Search','FOUNDATION'],['Restore Queue','FOUNDATION']].map(([x,status])=><div className="module" key={x}><b>{x}</b><span>{status}</span></div>)}</div>
      </div>
      <div className="notice">PSF Archive remains an independent application. MyFoto stays operational as the cataloguing/access system; NAS_PSF will be used as the controlled archive repository.</div>
    </AppShell>
  );
}
