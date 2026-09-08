import Link from 'next/link';
import { getMockSession } from '../../lib/auth/session';

const modules = [
  ['Ingest', '/ingest', 'Submit single or bulk photographic assets'],
  ['Photo Archive', '/photo-archive', 'Browse, search and review archived photographs'],
  ['Collections', '/collections', 'Curated and virtual photographic collections'],
  ['Metadata', '/metadata', 'Descriptive, technical and administrative metadata'],
  ['Integrity', '/integrity', 'Fixity and preservation verification'],
  ['Users', '/admin/users', 'Role and account administration'],
];

export default function DashboardPage() {
  const session = getMockSession('ARCHIVIST');
  return (
    <main className="content wide-page">
      <header>
        <div>
          <p className="eyebrow">PSF PHOTO ARCHIVE</p>
          <h1>Role Dashboard</h1>
          <p>Signed in as {session.user.name} · {session.user.role}</p>
        </div>
        <Link className="button-link" href="/sign-in">Sign out</Link>
      </header>

      <div className="cards">
        <article><p>Photo Assets</p><strong>3</strong><small>Demo archive records</small></article>
        <article><p>Metadata Review</p><strong>1</strong><small>Awaiting cataloguing review</small></article>
        <article><p>Fixity Verified</p><strong>2</strong><small>SHA-256 verified</small></article>
        <article><p>Restricted</p><strong>1</strong><small>Controlled access asset</small></article>
      </div>

      <section className="grid module-grid">
        {modules.map(([name, href, note]) => (
          <Link href={href} className="panel module-card" key={name}>
            <div><p className="eyebrow">MODULE</p><h2>{name}</h2><p>{note}</p></div>
            <span>Open →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
