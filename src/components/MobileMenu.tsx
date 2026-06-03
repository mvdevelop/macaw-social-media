"use client";

import Link from "next/link";
import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen((prev) => !prev)} className="text-white p-2">
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed left-0 top-16 w-full h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-50 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Home</Link>
          <Link href="/friends" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Friends</Link>
          <Link href="/marketplace" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Marketplace</Link>
          <Link href="/groups" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Groups</Link>
          <Link href="/events" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Events</Link>
          <Link href="/sign-in" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-500 transition">Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
