
// src/app/profile/[id]/page.tsx

import LeftMenu from "@/components/LeftMenu";
import Feed from "@/components/Feed";
import RightMenu from "@/components/RightMenu";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type={"profile"} />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src="https://images.pexels.com/photos/35684097/pexels-photo-35684097.jpeg"
                alt="Descrição da imagem"
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="test" />
      </div>
    </div>
  );
}

export default ProfilePage;
