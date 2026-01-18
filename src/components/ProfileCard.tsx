
// ProfileCard.tsx

import Image from "next/image";

const ProfileCard = () => {
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
        <div className="h-20 relative">
          {/* imagem de fundo */}
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg"
              alt="" fill className="rounded-md object-cover"
            />
          </div>

          {/* avatar */}
          <div className="absolute left-0 right-0 m-auto -bottom-6 w-12 h-12 z-10 rounded-full ring-1 ring-white overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg"
              alt="" width={48} height={48}
              className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto"
            />
          </div>

        </div>
        <div className="h-20 flex flex-col gap-2 items-center">
          <span className="font-semibold">Drak Lians</span>
          <div className="flex items-center gap-4">
            <div className="flex">
              <Image
              src="/poll.png" alt="" width={12} height={12}
              className="rounded-full object-cover w-3 h-3"
              />
              <Image
              src="/poll.png" alt="" width={12} height={12}
              className="rounded-full object-cover w-3 h-3"
              />
              <Image
              src="/poll.png" alt="" width={12} height={12}
              className="rounded-full object-cover w-3 h-3"
              />
            </div>
            <span className="text-xs text-gray-500">365 Followers</span>
          </div>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">My Profile</button>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
