'use client';

import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  XIcon,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// import { getApiUrl } from "~/actions/getApiUrl";
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const [values, setValues] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);

    if (values === '') {
      toast({
        title: 'Error',
        description: 'Please provide your email',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const payload = {
      email: values,
    };
  };

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { route: 'Home', link: '/' },
        { route: 'About us', link: '/about-us' },
        { route: 'Career', link: '/career' },
        { route: 'Features', link: '/' },
        { route: 'Blog', link: '/blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { route: 'Help center', link: '/help-center' },
        { route: 'FAQ', link: '/faqs' },
        { route: 'Waiting List', link: '/waitlist' },
        { route: 'Pricing Experience', link: '/pricing' },
        { route: 'Contact Us', link: '/contact-us' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { route: 'Privacy Policy', link: '/privacy-policy' },
        { route: 'Terms and condition', link: '/terms-and-conditions' },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: XIcon,
      link: '/',
    },
    {
      icon: Youtube,
      link: '/',
    },
    {
      icon: Instagram,
      link: '/',
    },
    {
      icon: Linkedin,
      link: '/',
    },
    {
      icon: Facebook,
      link: '/',
    },
  ];

  const footerBottom = [
    { route: 'Privacy Policy', link: '/' },
    { route: 'Terms of Use', link: '/' },
  ];

  //

  return (
    <footer className="bg-background dark:bg-default">
      <div className="px-4">
        <div className="mx-auto w-full max-w-[1200px] items-start justify-between gap-[60px] pb-[130px] pt-[28px] sm:grid-cols-2 md:gap-4 md:pb-[46px] md:pt-[72px] lg:flex">
          <div className="mb-[100px] lg:mb-0">
            <div className="mb-[47px] flex w-full flex-col items-center justify-center sm:mb-[60px] md:block md:max-w-[254px] lg:mb-0">
              <h5 className="text-nuetral-dark-2 text-md mb-[34px] text-center font-bold sm:text-left">
                eventful
              </h5>
              <p className="text-nuetral-dark-2 text-center text-[12px] font-medium sm:text-left">
                Logo subject details and address
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-1 gap-y-[60px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {footerLinks.map((item, index) => {
              return (
                <div key={index}>
                  <h5 className="text-neurtal-dark-2 mb-[37px] text-[16px] font-semibold">
                    {item.title}
                  </h5>
                  <ul className="flex flex-col gap-4">
                    {item.links.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={item.link}
                            className="text-md cursor-pointer text-neutral-dark-2 transition-colors duration-300 hover:text-primary hover:underline dark:text-white"
                          >
                            {item.route}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            <div className="lg:hidden">
              <h5 className="text-neurtal-dark-2 mb-[10px] text-[20px] font-semibold">
                Follow Us
              </h5>
              <div className="flex w-full max-w-[116px] items-center justify-between gap-1 md:max-w-[212px]">
                {socialLinks.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary p-1 hover:bg-default md:h-10 md:w-10"
                    >
                      <item.icon className="h-[10px] w-[10px] text-white md:h-4 md:w-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-default"></div>
      <div className="px-4">
        <div className="mx-auto block w-full max-w-[1200px] items-center justify-between pb-[30px] pt-4 md:pt-[27px] lg:flex">
          <div className="hidden lg:block">
            <div className="flex w-full max-w-[116px] items-center justify-between gap-1 md:max-w-[212px]">
              {socialLinks.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-primary p-1 hover:bg-destructive md:h-10 md:w-10"
                  >
                    <item.icon className="h-[10px] w-[10px] text-white md:h-4 md:w-4" />
                  </div>
                );
              })}
            </div>
          </div>
          <span className="flex items-center justify-center text-center text-xs font-semibold text-stroke-colors-stroke">
            <Copyright className="h-5 w-5 text-stroke-colors-stroke" />
            2024 All Rights Reserved
          </span>
          <div className="hidden lg:block">
            <ul className="flex items-center justify-between gap-[13px]">
              {footerBottom.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="cursor-pointer text-sm text-neutral-dark-2 transition-colors duration-300 hover:text-primary hover:underline"
                    >
                      {item.route}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <Toaster />
    </footer>
  );
};

export default Footer;
