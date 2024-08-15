'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Logo from '@/components/common/logo';
import UserCard from '@/components/common/user-card';
import MobileNav from '@/components/navbar/MobileNav';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { NAV_LINKS } from './links';
// import MobileNav from './mobile-navbar';

const Navbar = () => {
  const [scrolling, setIsScrolling] = useState<boolean>(false);
  const { status } = useSession();
  const pathname = usePathname();

  const handleScrollEvent = () => {
    if (window.scrollY > 1) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  });
  return (
    <nav
      className={`${
        scrolling ? 'shadow-md' : 'shadow-none'
      } sticky left-0 right-0 top-0 z-40 bg-muted border-b px-2 lg:px-4`}
    >
      <div
        className={cn(
          `relative mx-auto flex w-full max-w-[1440px] items-center gap-x-4 transition-all duration-500 md:justify-between`,
          scrolling ? 'py-2' : 'py-4 md:py-6',
          status === 'authenticated' && 'justify-between md:justify-between'
        )}
      >
        <MobileNav />

        <Logo />
        <div className="hidden w-full items-center justify-center gap-x-4 md:flex lg:gap-x-6">
          {NAV_LINKS.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`py-3 px-4 text-[16px] font-medium transition-all duration-300 rounded-lg border border-transparent hover:text-primary hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${
                  pathname === item.link ? 'text-primary' : ''
                }`}
              >
                {item.route}
              </Link>
            );
          })}
        </div>
        {status !== 'authenticated' && (
          <div className="w-full hidden items-center justify-end gap-x-4 justify-self-end md:flex lg:gap-x-8">
            <Link
              href="/login"
              className="grid h-[44px] place-items-center whitespace-nowrap rounded-md border border-primary px-4 text-primary hover:bg-subtle lg:px-8"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="grid h-[44px] place-items-center whitespace-nowrap rounded-md border border-primary bg-primary px-4 text-white hover:bg-destructive lg:px-8"
            >
              Get Started
            </Link>
          </div>
        )}
        {status === 'authenticated' && <UserCard />}
      </div>
    </nav>
  );
};

export default Navbar;
