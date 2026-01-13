
// src/components/FriendRequests.tsx

import Image from "next/image";
import Link from "next/link";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href='/' className="text-blue-500 text-xs">See all</Link>
      </div>

      {/* User */}
      <div className="flex items-center justify-center">
        <div className="">
          <Image src="" alt="" width={10} height={10} className="" />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default FriendRequests;
