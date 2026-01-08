
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import MobileMenu from "./MobileMenu";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { FiUser } from "react-icons/fi";

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
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
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

      {/* Search Bar */}
      <div className="hidden xl:flex p-2 bg-slate-100 items-center gap-2 rounded-xl">
        <input
          type="text"
          placeholder="search..."
          className="bg-transparent outline-none flex-1"
        />
        <div className="w-4 h-4 flex items-center justify-center">
          <Image
            src="/search.png"
            alt="search"
            width={16}
            height={16}
            className="object-contain"
          />
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
          <SignedIn>
            <div className="cursor-pointer">
              <Image src='/people.png' alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src='/messages.png' alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src='/notifications.png' alt="" width={24} height={24} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm cursor-pointer">
              {/* <Image src='/login.png' alt="" width={20} height={20} /> */}
              <FiUser className="text-blue-400 w-5 h-5" />
              <Link href='/sign-in'>Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
