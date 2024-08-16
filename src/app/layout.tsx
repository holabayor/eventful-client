import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import ProgressBarProvider from '@/components/ProgressBarProvider';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
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
        {/* <div className="mx-auto h-full w-full max-w-[1440px]"> */}
        <ProgressBarProvider />
        <AuthProvider>
          <Suspense>
            <Navbar />
            {children}
            <Footer />
          </Suspense>
        </AuthProvider>
        <Toaster />
        {/* </div> */}
      </body>
    </html>
  );
}
