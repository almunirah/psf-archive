import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PSF Archive',
  description: 'MyFoto Digital Archive & NAS Backup Management',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}
