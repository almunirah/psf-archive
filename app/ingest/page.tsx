import Link from 'next/link';

export default function IngestPage() {
  return (
    <main className="content wide-page">
      <header>
        <div><p className="eyebrow">PHOTO INGEST</p><h1>Ingest Photographs</h1><p>Register new photographs before archival storage and preservation processing.</p></div>
        <Link className="button-link" href="/dashboard">Dashboard</Link>
      </header>

      <section className="panel column">
        <h2>Ingest Package</h2>
        <div className="form-grid">
          <label>MyFoto ID<input placeholder="MF-2026-001245" /></label>
          <label>Title<input placeholder="Photograph title" /></label>
          <label>Photographer<input placeholder="Photographer name" /></label>
          <label>Date Taken<input type="date" /></label>
          <label>Event<input placeholder="Event / programme" /></label>
          <label>Location<input placeholder="Location" /></label>
          <label>Access Class<select defaultValue="INTERNAL"><option>PUBLIC</option><option>INTERNAL</option><option>RESTRICTED</option><option>CONFIDENTIAL</option><option>EMBARGOED</option></select></label>
          <label>Collection<input placeholder="Optional collection" /></label>
        </div>
        <label className="full-field">Caption<textarea rows={4} placeholder="Archival caption / description" /></label>
        <div className="dropzone">
          <strong>Original / Master File</strong>
          <p>Phase 2C UI shell. Production upload will validate format, size, checksum and duplicate status before storage.</p>
          <input type="file" accept="image/*,.tif,.tiff,.nef,.cr2,.arw" />
        </div>
        <div className="pipeline-row">
          {['Validate','Extract EXIF/IPTC','SHA-256','Duplicate Check','Metadata Review','Archive'].map((x,i)=><span key={x}>{i+1}. {x}</span>)}
        </div>
        <button type="button">Create Ingest Record</button>
      </section>
    </main>
  );
}
