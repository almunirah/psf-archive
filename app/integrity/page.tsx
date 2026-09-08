import { AppShell } from '@/components/AppShell';
import { archiveRecords } from '@/lib/archive/mock-data';

export default function IntegrityPage() {
  const verified = archiveRecords.filter((r) => r.backupStatus === 'VERIFIED').length;
  const pending = archiveRecords.filter((r) => r.backupStatus === 'PENDING').length;
  return (
    <AppShell>
      <header><div><p className="eyebrow">SHA-256 VERIFICATION</p><h1>Integrity Check</h1><p>Verify that archived files remain byte-for-byte consistent with their recorded manifest.</p></div><span className="status">● Engine Ready</span></header>
      <div className="cards">
        <article><p>Verified</p><strong>{verified}</strong><small>Checksum matches manifest</small></article>
        <article><p>Pending</p><strong>{pending}</strong><small>Awaiting hash generation</small></article>
        <article><p>Mismatch</p><strong>0</strong><small>No integrity incident detected</small></article>
        <article><p>Algorithm</p><strong>SHA-256</strong><small>Archive manifest standard</small></article>
      </div>
      <div className="panel column">
        <h2>Verification Policy</h2>
        <div className="step"><span>1</span><b>Read source file</b><em>MyFoto export or staging</em></div>
        <div className="step"><span>2</span><b>Generate SHA-256</b><em>Before archive write</em></div>
        <div className="step"><span>3</span><b>Verify archived copy</b><em>Compare NAS hash with manifest</em></div>
        <div className="step"><span>4</span><b>Record immutable result</b><em>Audit + exception queue</em></div>
      </div>
      <div className="notice">Production hashing is intentionally not pointed at NAS_PSF yet. The NAS adapter remains disabled until the office runtime and access account are configured.</div>
    </AppShell>
  );
}
