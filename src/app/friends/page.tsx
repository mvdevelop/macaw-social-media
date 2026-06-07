"use client";

import Image from "next/image";
import { getAllUsers, getFriendRequests } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from "@/lib/actions";
import { FiUserPlus, FiCheck, FiX, FiUserMinus } from "react-icons/fi";

export default function FriendsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Fallback mock
        setRequests(getFriendRequests());
        setFriends(["u2", "u3"]);
        setPeople(getAllUsers().slice(1));
        setLoading(false);
        return;
      }

      setUserId(user.id);

      // Friend requests received
      const { data: reqData } = await supabase
        .from("follow_requests")
        .select("*, sender:sender_id(*)")
        .eq("receiver_id", user.id);

      if (reqData) {
        setRequests(reqData);
      } else {
        setRequests(getFriendRequests() as any);
      }

      // Following list (friends)
      const { data: folData } = await supabase
        .from("followers")
        .select("following_id")
        .eq("follower_id", user.id);

      if (folData) {
        setFriends(folData.map((f: any) => f.following_id));
      } else {
        setFriends(["u2", "u3"]);
      }

      // All users (except current)
      const { data: usersData } = await supabase
        .from("users")
        .select("*")
        .neq("id", user.id);

      if (usersData) {
        setPeople(usersData);
      } else {
        setPeople(getAllUsers().slice(1));
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAccept = async (senderId: string) => {
    try {
      await acceptFriendRequest(senderId);
      setRequests(requests.filter((r: any) => r.sender_id !== senderId));
      setFriends([...friends, senderId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (senderId: string) => {
    try {
      await rejectFriendRequest(senderId);
      setRequests(requests.filter((r: any) => r.sender_id !== senderId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFriend = async (targetId: string) => {
    if (!userId) return;
    try {
      // Se não tem follow_requests, vamos usar sendFriendRequest
      await sendFriendRequest(targetId);
      alert("Friend request sent!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFriend = async (targetId: string) => {
    setFriends(friends.filter((f) => f !== targetId));
    try {
      await import("@/lib/actions").then((m) => m.unfollowUser(targetId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Friend Requests */}
      {requests.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t.friends.friendRequests} ({requests.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req: any) => (
              <div key={req.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center gap-4 dark:border dark:border-gray-700">
                <Image src={req.sender?.avatar || ""} alt={req.sender?.name || "User"} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-white truncate">
                    {req.sender?.name} {req.sender?.surname}
                  </p>
                  <p className="text-xs text-gray-400">{req.sender?.city}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAccept(req.sender_id)} className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
                    <FiCheck size={16} />
                  </button>
                  <button onClick={() => handleReject(req.sender_id)} className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition">
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* People You May Know */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t.friends.peopleYouMayKnow}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((user: any) => (
            <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center gap-4 dark:border dark:border-gray-700">
              <Image src={user.avatar || ""} alt={user.name || "User"} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-white truncate">{user.name} {user.surname}</p>
                <p className="text-xs text-gray-400">{user.city}</p>
              </div>
              {friends.includes(user.id) ? (
                <button
                  onClick={() => handleRemoveFriend(user.id)}
                  className="flex items-center gap-1 text-sm bg-red-50 dark:bg-red-900/30 text-red-500 px-3 py-1.5 rounded-lg hover:opacity-80 transition"
                >
                  <FiUserMinus size={14} />
                  <span>{t.friends.friends}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleAddFriend(user.id)}
                  className="flex items-center gap-1 text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition"
                >
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
