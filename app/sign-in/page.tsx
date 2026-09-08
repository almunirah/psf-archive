import Link from 'next/link';
import { signIn } from './actions';

type Props = { searchParams: Promise<{ error?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

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
        <form action={configured ? signIn : undefined}>
          <label>Email<input type="email" name="email" autoComplete="username" placeholder="name@agency.gov.my" required /></label>
          <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="••••••••" required /></label>
          <button type="submit" disabled={!configured}>{configured ? 'Sign In' : 'Auth Backend Not Configured'}</button>
        </form>
        {error === 'invalid' && <div className="notice">Sign in failed. Check your authorized PSF account credentials.</div>}
        {error === 'missing' && <div className="notice">Email and password are required.</div>}
        {!configured && <div className="notice">Supabase foundation is ready in code, but a dedicated PSF Archive Supabase project has not yet been connected.</div>}
        {!configured && <Link className="button-link" href="/dashboard">Open Phase 2 Demo Dashboard</Link>}
        <small>Role access: Super Admin · Archive Admin · Archivist · Contributor · Viewer</small>
      </section>
    </main>
  );
}
