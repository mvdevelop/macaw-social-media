
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

      {/* User 01 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/35496265/pexels-photo-35496265.jpeg" alt="Horizonte de Nova York à noite" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Angelina Jolie</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image src="/accept.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
      {/* User 02 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/35525012/pexels-photo-35525012.jpeg?_gl=1*tl40ld*_ga*NDg3ODk1ODQxLjE3Njc5MTQ5NDY.*_ga_8JE65Q40S6*czE3NjgzMjQyMTckbzckZzAkdDE3NjgzMjQyMTckajYwJGwwJGgw" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Julia Roberts</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image src="/accept.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
      {/* User 03 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/35590309/pexels-photo-35590309.jpeg?_gl=1*1p4dky4*_ga*NDg3ODk1ODQxLjE3Njc5MTQ5NDY.*_ga_8JE65Q40S6*czE3NjgzMjQyMTckbzckZzAkdDE3NjgzMjQyMTckajYwJGwwJGgw" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">Michele Obama</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image src="/accept.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
          <Image src="/reject.png" alt="Horizonte de Nova York à noite" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
