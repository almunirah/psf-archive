import { AppShell } from '@/components/AppShell';
import { archiveRecords } from '@/lib/archive/mock-data';

export default function ArchiveRecordsPage() {
  return (
    <AppShell>
      <header><div><p className="eyebrow">MYFOTO ARCHIVE</p><h1>Archive Records</h1><p>Registry of files prepared for long-term archive on NAS_PSF.</p></div><span className="status">● Mock Dataset</span></header>
      <div className="panel column">
        <div className="tableWrap">
          <table>
            <thead><tr><th>MyFoto ID</th><th>Filename</th><th>Collection</th><th>Date</th><th>Size</th><th>Checksum</th><th>Status</th></tr></thead>
            <tbody>{archiveRecords.map((r) => <tr key={r.myfotoId}><td><b>{r.myfotoId}</b></td><td>{r.filename}</td><td>{r.collection}</td><td>{r.capturedAt}</td><td>{r.sizeMb.toFixed(1)} MB</td><td><code>{r.checksum}</code></td><td><span className={`pill ${r.backupStatus.toLowerCase()}`}>{r.backupStatus}</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
