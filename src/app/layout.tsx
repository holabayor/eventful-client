import ProgressBarProvider from '@/components/ProgressBarProvider';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eventful',
  description: 'Event management made easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto h-full w-full max-w-[1920px]">
          <ProgressBarProvider />
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
