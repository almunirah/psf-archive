import { AppShell } from '@/components/AppShell';
import { backupJobs } from '@/lib/archive/mock-data';

export default function BackupMonitorPage() {
  return (
    <AppShell>
      <header><div><p className="eyebrow">BACKUP OPERATIONS</p><h1>Backup Monitor</h1><p>Track MyFoto archive jobs, verification counts and exceptions.</p></div><span className="badge">NAS NOT CONNECTED</span></header>
      <div className="cards">
        <article><p>Latest Job</p><strong>{backupJobs[0].status}</strong><small>{backupJobs[0].id}</small></article>
        <article><p>Records</p><strong>{backupJobs[0].records}</strong><small>Current job total</small></article>
        <article><p>Verified</p><strong>{backupJobs[0].verified}</strong><small>Checksum passed</small></article>
        <article><p>Failed</p><strong>{backupJobs[0].failed}</strong><small>Requires attention</small></article>
      </div>
      <div className="panel column">
        <h2>Recent Backup Jobs</h2>
        <div className="tableWrap"><table><thead><tr><th>Job ID</th><th>Source</th><th>Target</th><th>Records</th><th>Verified</th><th>Failed</th><th>Status</th></tr></thead><tbody>{backupJobs.map((job) => <tr key={job.id}><td><b>{job.id}</b></td><td>{job.source}</td><td>{job.target}</td><td>{job.records}</td><td>{job.verified}</td><td>{job.failed}</td><td><span className="pill">{job.status}</span></td></tr>)}</tbody></table></div>
      </div>
    </AppShell>
  );
}
