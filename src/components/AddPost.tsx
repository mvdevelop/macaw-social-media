
import Image from "next/image";

const AddPost = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <Image src="https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg?_gl=1*1lkg175*_ga*NDg3ODk1ODQxLjE3Njc5MTQ5NDY.*_ga_8JE65Q40S6*czE3NjgwMDIyNDAkbzIkZzEkdDE3NjgwMDIyODckajEzJGwwJGgw" alt="" width={48} height={48} className="w-12 h-12 object-cover rounded-full" />

      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <div className="flex gap-4">
          <textarea placeholder="What's on your mind?" className="flex-1 bg-slate-100 rounded-lg p-2"></textarea>
          <Image src="/emoji.png" alt="" width={20} height={20} className="w-5 h-5 cursor-pointer self-end" />
        </div>
        
        {/* Post Options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" alt="" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
