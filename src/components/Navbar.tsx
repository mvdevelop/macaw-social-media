"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/context/AuthProvider";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, loading, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Link href="/" className="flex items-center gap-2">
            <Image src="/home.png" alt="Homepage" width={16} height={16} className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/friends.png" alt="Friends" width={16} height={16} className="w-4 h-4" />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/stories.png" alt="Stories" width={16} height={16} className="w-4 h-4" />
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
        {loading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : user ? (
          <>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="" width={24} height={24} />
            </div>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400"
              >
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    {user.email}
                  </div>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm cursor-pointer">
            <FiUser className="text-blue-400 w-5 h-5" />
            <Link href="/sign-in">Login/Register</Link>
          </div>
        )}
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
