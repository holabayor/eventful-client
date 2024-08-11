import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="h-[36px] w-full max-w-[200px] md:h-[48px] lg:max-w-[158px]"
    >
      <Image
        src="/logo-text.png"
        alt="Eventful Logo"
        height={48}
        width={158}
        className="h-full w-full object-contain"
      />
    </Link>
  );
};

export default Logo;
