"use client";

import Image from "next/image";
import { getAllUsers, getFriendRequests } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { useState } from "react";
import { FiUserPlus, FiCheck, FiX } from "react-icons/fi";

export default function FriendsPage() {
  const allUsers = getAllUsers();
  const [requests, setRequests] = useState(() => getFriendRequests());
  const [friends, setFriends] = useState<string[]>(["u2", "u3"]);
  const { t } = useTranslation();

  const acceptRequest = (id: number) => setRequests(requests.filter((r) => r.id !== id));
  const rejectRequest = (id: number) => setRequests(requests.filter((r) => r.id !== id));
  const addFriend = (id: string) => setFriends([...friends, id]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      {requests.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t.friends.friendRequests} ({requests.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center gap-4 dark:border dark:border-gray-700">
                <Image src={req.user.avatar} alt={req.user.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-white truncate">{req.user.name} {req.user.surname}</p>
                  <p className="text-xs text-gray-400">{req.user.city}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => acceptRequest(req.id)} className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
                    <FiCheck size={16} />
                  </button>
                  <button onClick={() => rejectRequest(req.id)} className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t.friends.peopleYouMayKnow}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allUsers.slice(1).map((user) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center gap-4 dark:border dark:border-gray-700">
              <Image src={user.avatar} alt={user.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-white truncate">{user.name} {user.surname}</p>
                <p className="text-xs text-gray-400">{user.city}</p>
              </div>
              {friends.includes(user.id) ? (
                <span className="text-xs text-green-500 font-medium bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-lg">{t.friends.friends}</span>
              ) : (
                <button onClick={() => addFriend(user.id)} className="flex items-center gap-1 text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition">
                  <FiUserPlus size={14} />
                  <span>{t.friends.add}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
