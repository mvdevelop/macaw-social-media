"use client";

import Image from "next/image";
import Link from "next/link";
import { getPostsByUserId, getCurrentUser } from "@/lib/mock-data";

const UserMediaCard = ({ userId }: { userId: string }) => {
  const posts = getPostsByUserId(userId);
  const medias = posts.filter((p) => p.img).slice(0, 8);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>

      <div className="flex gap-3 justify-between flex-wrap">
        {medias.length === 0 ? (
          <p className="text-gray-400 text-xs py-4">No media yet</p>
        ) : (
          medias.map((post) => (
            <div key={post.id} className="relative w-[calc(25%-9px)] aspect-square rounded-lg overflow-hidden">
              <Image src={post.img!} alt="" fill className="object-cover hover:scale-110 transition duration-300" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
