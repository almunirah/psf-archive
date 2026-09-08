import Link from 'next/link';

const photos = [
  { id:'PSF-2026-000001', title:'Hari Kebangsaan 2026', photographer:'Ahmad Ali', date:'2026-08-31', access:'INTERNAL', status:'PRESERVED' },
  { id:'PSF-2026-000002', title:'Lawatan Rasmi', photographer:'Siti Rahmah', date:'2026-08-28', access:'RESTRICTED', status:'ARCHIVED' },
  { id:'PSF-2026-000003', title:'MAHA 2026', photographer:'Faizal Omar', date:'2026-09-05', access:'INTERNAL', status:'METADATA_REVIEW' },
];

export default function PhotoArchivePage() {
  return (
    <main className="content wide-page">
      <header>
        <div><p className="eyebrow">PHOTO ARCHIVE</p><h1>Archive Catalogue</h1><p>Search and manage preserved photographic assets.</p></div>
        <Link className="button-link" href="/ingest">+ Ingest</Link>
      </header>

      <section className="panel column">
        <div className="searchbar">
          <input placeholder="Search title, caption, Archive ID, MyFoto ID, person, event..." />
          <select defaultValue="ALL"><option>ALL</option><option>PUBLIC</option><option>INTERNAL</option><option>RESTRICTED</option><option>CONFIDENTIAL</option><option>EMBARGOED</option></select>
          <button type="button">Search</button>
        </div>
        <div className="photo-grid">
          {photos.map(photo => (
            <article className="photo-card" key={photo.id}>
              <div className="photo-placeholder">PHOTO PREVIEW</div>
              <div className="photo-meta">
                <small>{photo.id}</small>
                <h2>{photo.title}</h2>
                <p>{photo.photographer} · {photo.date}</p>
                <div className="tag-row"><span>{photo.access}</span><span>{photo.status}</span></div>
                <Link href={`/archive-records?asset=${photo.id}`}>Open record →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
