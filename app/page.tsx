const stats = [
  ['Archive Records', '0', 'MyFoto records indexed'],
  ['Verified', '0', 'SHA-256 integrity verified'],
  ['Backup Pending', '0', 'Waiting for NAS sync'],
  ['Storage', 'Not connected', 'NAS_PSF adapter'],
];

const modules = [
  'Archive Records', 'Backup Monitor', 'Integrity Check', 'Duplicate Detection',
  'Metadata & Search', 'Restore Queue', 'Audit Log', 'Users & Roles', 'NAS Settings'
];

export default function Home() {
  return (
    <main>
      <aside>
        <div className="brand"><span>PSF</span> Archive</div>
        <p className="caption">MyFoto Digital Archive</p>
        <nav>
          <a className="active">Dashboard</a>
          {modules.map((module) => <a key={module}>{module}</a>)}
        </nav>
        <div className="environment"><b>Environment</b><span>Development / Mock Storage</span></div>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">PUSAT SUMBER & FOTOGRAFI</p><h1>Archive Dashboard</h1><p>Monitor MyFoto backup, archive integrity and NAS readiness.</p></div><span className="status">● System Ready</span></header>
        <div className="cards">{stats.map(([title,value,note]) => <article key={title}><p>{title}</p><strong>{value}</strong><small>{note}</small></article>)}</div>
        <div className="panel"><div><p className="eyebrow">NAS CONNECTION</p><h2>NAS_PSF</h2><p>The application is running with the storage abstraction layer. No production NAS credentials are stored in this repository or Vercel.</p></div><span className="badge">AWAITING CONNECTION</span></div>
        <div className="grid"><div className="panel column"><h2>Archive Pipeline</h2>{['MyFoto Source','Backup Queue','Checksum Verification','NAS Archive','Manifest & Audit'].map((x,i)=><div className="step" key={x}><span>{i+1}</span><b>{x}</b><em>{i===0?'Integration pending':'Ready for configuration'}</em></div>)}</div><div className="panel column"><h2>Phase 1</h2>{modules.slice(0,6).map(x=><div className="module" key={x}><b>{x}</b><span>Planned</span></div>)}</div></div>
      </section>
    </main>
  );
}
