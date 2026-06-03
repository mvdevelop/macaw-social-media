"use client";

import Image from "next/image";
import Link from "next/link";
import { getFriendRequests } from "@/lib/mock-data";
import { useState } from "react";
import { useTranslation } from "@/context/LanguageProvider";

const FriendRequests = () => {
  const [requests, setRequests] = useState(() => getFriendRequests());
  const { t } = useTranslation();

  const handleAccept = (id: number) => setRequests(requests.filter((r) => r.id !== id));
  const handleReject = (id: number) => setRequests(requests.filter((r) => r.id !== id));

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-400">{t.common.friendRequests}</span>
        <Link href="/friends" className="text-blue-500 text-xs">{t.common.seeAll}</Link>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-xs text-center py-2">{t.friends.noRequests}</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={req.user.avatar} alt={req.user.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <span className="font-semibold text-sm text-gray-800 dark:text-white">{req.user.name} {req.user.surname}</span>
                <p className="text-xs text-gray-400">{req.user.city}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAccept(req.id)} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Image src="/accept.png" alt="Accept" width={16} height={16} />
              </button>
              <button onClick={() => handleReject(req.id)} className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                <Image src="/reject.png" alt="Reject" width={16} height={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequests;
