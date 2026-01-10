
import Image from "next/image";

const AddPost = () => {
  return (
    <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <Image src="https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg?_gl=1*1lkg175*_ga*NDg3ODk1ODQxLjE3Njc5MTQ5NDY.*_ga_8JE65Q40S6*czE3NjgwMDIyNDAkbzIkZzEkdDE3NjgwMDIyODckajEzJGwwJGgw" alt="" width={48} height={48} className="w-12 h-12 object-cover rounded-full">

      </Image>

      {/* Post */}
      <div className="">
        {/* Text Input */}
        <div className=""></div>
        
        {/* Post Options */}
        <div className=""></div>
      </div>
    </div>
  );
};

export default AddPost;
