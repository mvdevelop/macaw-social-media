
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import MobileMenu from "./MobileMenu";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-400 flex items-center gap-2">
          <Image
            src={icon}
            alt="Macaw logo"
            width={35}
            height={35}
            priority
          />
          <span>Macaw</span>
        </Link>
      </div>

      {/* Center */}
      <div className="hidden md:flex w-[50%] text-sm">
        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <Link href='/' className="flex items-center gap-2">
            <Image src='/home.png' alt="Homepage" width={16} height={16} className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
          <Link href='/' className="flex items-center gap-2">
            <Image src='/friends.png' alt="Friends" width={16} height={16} className="w-4 h-4" />
            <span>Friends</span>
          </Link>
          <Link href='/' className="flex items-center gap-2">
            <Image src='/stories.png' alt="Stories" width={16} height={16} className="w-4 h-4" />
            <span>Stories</span>
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
