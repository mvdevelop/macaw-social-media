
// src/components/UserMediaCard.tsx

import Image from "next/image";
import Link from "next/link";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/*  */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Media</span>
          <Link href='/' className="text-blue-500 text-xs">See all</Link>
        </div>
        {/* Bottom */}
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/35655771/pexels-photo-35655771.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/35443625/pexels-photo-35443625.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* vídeo → thumbnail */}
          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/videos/35637317/pictures/preview-0.jpg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/34374535/pexels-photo-34374535.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/18465582/pexels-photo-18465582.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/18289431/pexels-photo-18289431.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/35634366/pexels-photo-35634366.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="relative w-1/5 h-24">
            <Image
              src="https://images.pexels.com/photos/27585749/pexels-photo-27585749.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserMediaCard;
