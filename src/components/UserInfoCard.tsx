
// src/components/UserInfoCard.tsx

import Image from "next/image";
import Link from "next/link";

const UserInfoCard = ({ userId } : { userId: string }) => {
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/*  */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Information</span>
          <Link href='/' className="text-blue-500 text-xs">
            See All
          </Link>
        </div>
        {/* Bottom */}
        <div className="flex flex-col gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl text-black">Lloyd Fleming</span>
            <span className="text-sm">@Jessica</span>
          </div>
          <p>
            Lloyd Fleming is a software developer who enjoys working with React and TypeScript. Lloyd is passionate about creating efficient and scalable web applications.
          </p>
          <div className="flex items-center gap-2">
            <Image src='/map.png' alt="" width={16} height={16} />
            <span>Living in <b>Denver</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Image src='/map.png' alt="" width={16} height={16} />
            <span>Went to <b>Edgar High School</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Image src='/map.png' alt="" width={16} height={16} />
            <span>Works at <b>Apple Inc.</b></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfoCard;
