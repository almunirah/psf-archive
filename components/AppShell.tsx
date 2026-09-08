'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const nav = [
  ['Dashboard', '/'],
  ['Archive Records', '/archive-records'],
  ['Backup Monitor', '/backup-monitor'],
  ['Integrity Check', '/integrity'],
  ['Duplicate Detection', '/duplicates'],
  ['Metadata & Search', '/metadata'],
  ['Restore Queue', '/restore'],
  ['Audit Log', '/audit'],
  ['Users & Roles', '/users'],
  ['NAS Settings', '/settings'],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main>
      <aside>
        <div className="brand"><span>PSF</span> Archive</div>
        <p className="caption">MyFoto Digital Archive</p>
        <nav>
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? 'active' : ''}>{label}</Link>
          ))}
        </nav>
        <div className="environment"><b>Environment</b><span>Development / Mock Storage</span></div>
      </aside>
      <section className="content">{children}</section>
    </main>
  );
}
