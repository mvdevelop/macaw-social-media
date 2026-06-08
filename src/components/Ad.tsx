
// src/components/Ad.tsx

import Image from "next/image";
import { useTranslation } from "@/context/LanguageProvider";

const Ad = ({ size } : { size: "sm" | "md" | "lg" }) => {
  const { t } = useTranslation();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* Top */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>{t.common.sponsored}</span>
        <Image src='/more.png' alt="" width={16} height={16} className="cursor-pointer" />
      </div>

      {/* Bottom */}
      <div className={`flex flex-col mt-4 ${size === 'sm' ? 'gap-2' : 'gap-4'}`}>
        <div className={`relative w-full ${size === 'sm' ? 'h-24' : size === 'md' ? 'h-36' : 'h-48'}`}>
          <Image src='https://images.pexels.com/photos/35538741/pexels-photo-35538741.jpeg?_gl=1*f8z8re*_ga*NDg3ODk1ODQxLjE3Njc5MTQ5NDY.*_ga_8JE65Q40S6*czE3NjgzMjg3MjMkbzgkZzAkdDE3NjgzMjg3MjckajU2JGwwJGgw' alt="" fill className="rounded-lg object-cover" />
        </div>
        <div className="flex items-center gap-4">
          <Image src='/lists.png' alt="" width={24} height={24} className="rounded-full w-6 h-6 object-cover" />
          <span className="text-blue-500 font-medium">BigChef Rio de Janeiro</span>
        </div>
        <p className={size === 'sm' ? 'text-xs' : 'text-sm'}>
          {size === 'sm' ? 'BigChef Rio de Janeiro is a popular restaurant in the city. Come to see their delicious dishes and the amazing atmosphere.' : size === 'md' ? 'BigChef Rio de Janeiro is a popular restaurant in the city. Come to see their delicious dishes and the amazing atmosphere.' : 'BigChef Rio de Janeiro is a popular restaurant in the city. Come to see their delicious dishes and the amazing atmosphere.'}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">{t.common.learnMore}</button>
      </div>
    </div>
  );
};

export default Ad;
