
// src/components/Post.tsx

import Image from "next/image";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"
          alt="Gato deitado"
          width={48}
          height={48}
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Desc */}
      <div className="">

      </div>

      {/* Interaction */}
      <div className="">

      </div>
    </div>
  );
};

export default Post;
