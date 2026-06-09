"use client";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageProvider";

const UserMediaCard = ({ userId }: { userId: string }) => {
  const [medias, setMedias] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMedia = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select("img")
        .eq("user_id", userId)
        .not("img", "is", null)
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error && data) {
        setMedias(data.map((p) => p.img).filter(Boolean) as string[]);
      }
    };
    fetchMedia();
  }, [userId]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-400">{t.profile.userMedia}</span>
        <Link href={`/profile/${userId}`} className="text-blue-500 text-xs">{t.profile.seeAll}</Link>
      </div>

      <div className="flex gap-3 justify-between flex-wrap">
        {medias.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-xs py-4">{t.profile.noMedia}</p>
        ) : (
          medias.map((img, i) => (
            <div key={i} className="relative w-[calc(25%-9px)] aspect-square rounded-lg overflow-hidden">
              <Image src={img} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-110 transition duration-300" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
