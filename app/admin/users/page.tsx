import Link from 'next/link';

const users = [
  ['PSF Super Admin','superadmin@agency.gov.my','SUPER_ADMIN','ACTIVE'],
  ['Archive Admin','archive.admin@agency.gov.my','ARCHIVE_ADMIN','ACTIVE'],
  ['Archivist 01','archivist01@agency.gov.my','ARCHIVIST','ACTIVE'],
  ['Contributor 01','photo01@agency.gov.my','CONTRIBUTOR','ACTIVE'],
  ['Viewer 01','viewer01@agency.gov.my','VIEWER','ACTIVE'],
];

export default function UsersPage() {
  return (
    <main className="content wide-page">
      <header>
        <div><p className="eyebrow">ADMINISTRATION</p><h1>Users & Roles</h1><p>Account provisioning and archive role assignment.</p></div>
        <Link className="button-link" href="/dashboard">Dashboard</Link>
      </header>

      <section className="panel column">
        <div className="table-actions"><div><h2>Authorized Users</h2><p>Self-registration is disabled. Accounts are provisioned by authorized administrators.</p></div><button type="button">+ Add User</button></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email / User ID</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{users.map(([name,email,role,status])=><tr key={email}><td><strong>{name}</strong></td><td>{email}</td><td><span className="tag">{role}</span></td><td>{status}</td><td><button className="secondary-button" type="button">Manage</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="panel column">
        <h2>Role Boundary</h2>
        <p>Super Admin manages platform, security policy and storage configuration. Archive Admin manages archive operations and authorized users. Archivist manages ingest, cataloguing and preservation workflows. Contributor submits photographs. Viewer searches and requests permitted access.</p>
      </section>
    </main>
  );
}
