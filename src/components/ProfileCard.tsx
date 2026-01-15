
// ProfileCard.tsx

import Image from "next/image";



const ProfileCard = () => {
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
        {/* <div className="h-20 relative">
          <Image src='https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg' alt='' fill className="rounded-md object-cover" />
          <Image src='https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg' alt='' fill className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10" />
        </div> */}
        <div className="h-20 relative">
          {/* imagem de fundo */}
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/17584747/pexels-photo-17584747.jpeg"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

          {/* avatar */}
          <div className="absolute left-0 right-0 m-auto -bottom-6 w-12 h-12 z-10 rounded-full ring-1 ring-white overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/35554037/pexels-photo-35554037.jpeg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
