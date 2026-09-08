export default function SignInPage() {
  return (
    <main className="auth-shell">
      <section className="auth-brand">
        <div className="brand"><span>PSF</span> Archive</div>
        <p className="eyebrow">PUSAT SUMBER & FOTOGRAFI</p>
        <h1>Photographic Archive Management</h1>
        <p>Controlled access to preserved MyFoto photographic assets, metadata, collections and archive services.</p>
      </section>
      <section className="auth-card">
        <p className="eyebrow">SECURE ACCESS</p>
        <h2>Sign in to PSF Archive</h2>
        <p className="muted">Use your authorized PSF account.</p>
        <form>
          <label>Email / User ID<input type="text" name="identity" autoComplete="username" placeholder="name@agency.gov.my" /></label>
          <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="••••••••" /></label>
          <button type="button">Sign In</button>
        </form>
        <small>Role access: Super Admin · Archive Admin · Archivist · Contributor · Viewer</small>
      </section>
    </main>
  );
}
