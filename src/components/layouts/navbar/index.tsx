'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Logo from '@/components/common/logo';
import UserCard from '@/components/common/user-card';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
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
          `relative mx-auto flex w-full max-w-[1440px] items-center gap-x-4 transition-all duration-500 justify-between`,
          scrolling ? 'py-2' : 'py-4 md:py-6'
          // status === 'authenticated' && 'justify-between md:justify-between'
        )}
      >
        {/* <MobileNav /> */}

        <Logo />

        {/* {status !== 'authenticated' && (
          <div className="hidden items-center gap-x-4 justify-end sm:flex lg:gap-x-8">
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
        )} */}
        <UserCard />
      </div>
    </nav>
  );
};

export default Navbar;
