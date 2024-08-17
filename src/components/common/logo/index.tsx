import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative h-[36px] w-full max-w-[150px] md:h-[48px] lg:max-w-[158px]"
    >
      <Image
        src="/logo-text.png"
        alt="Eventful Logo"
        layout="fill"
        objectFit="contain"
        priority
        className="h-full w-full object-contain"
      />
    </Link>
  );
};

export default Logo;
