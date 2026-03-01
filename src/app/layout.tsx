import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import 'tharaday/styles.css';
import './globals.css';

import ClientShell from './client-shell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tharaday Books',
  description: 'Frontend application for Tharaday Books',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="sanzo-152-light">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
