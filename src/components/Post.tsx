
// src/components/Post.tsx

import Image from "next/image";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg" alt="Gato deitado" width={40} height={40} className="w-10 h-10 rounded-full" />
          <span className="font-medium">Vinicius Dilly</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* Desc */}
      <div className="flex flex-col gap-4">
        <div className="w-full h-96 relative">
          <Image
            src="https://images.pexels.com/photos/35360579/pexels-photo-35360579.jpeg"
            alt="Arquitetura histórica de mosteiros em cenário montanhoso"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>Historic architecture of monasteries in a mountainous landscape. This is a beautiful example of medieval architecture from the 12th century located in the Italian Alps.</p>
      </div>

      {/* Interaction */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <Image src="/like.png" alt="Like" width={16} height={16} className="cursor-pointer" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-300">123</span>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Post;
