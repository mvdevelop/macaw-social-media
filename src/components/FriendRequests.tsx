"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { acceptFriendRequest, rejectFriendRequest } from "@/lib/actions";
import { getFriendRequests } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";

const FriendRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("follow_requests")
          .select("id, sender_id, created_at, sender:sender_id(*)")
          .eq("receiver_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setRequests(data);
        } else {
          // Fallback mock
          setRequests(getFriendRequests().map((r) => ({
            id: r.id,
            sender_id: r.user.id,
            sender: r.user,
            created_at: r.createdAt,
          })));
        }
      } catch {
        setRequests(getFriendRequests().map((r) => ({
          id: r.id, sender_id: r.user.id, sender: r.user, created_at: r.createdAt,
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (senderId: string) => {
    try {
      await acceptFriendRequest(senderId);
      setRequests(requests.filter((r) => r.sender_id !== senderId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (senderId: string) => {
    try {
      await rejectFriendRequest(senderId);
      setRequests(requests.filter((r) => r.sender_id !== senderId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4 transition-colors">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-400">{t.common.friendRequests}</span>
        <Link href="/friends" className="text-blue-500 text-xs">{t.common.seeAll}</Link>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-xs text-center py-2">{t.friends.noRequests}</p>
      ) : (
        requests.slice(0, 3).map((req) => (
          <div key={req.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={req.sender?.avatar || ""} alt={req.sender?.name || "User"} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <span className="font-semibold text-sm text-gray-800 dark:text-white">
                  {req.sender?.name} {req.sender?.surname}
                </span>
                <p className="text-xs text-gray-400">{req.sender?.city}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAccept(req.sender_id)} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Image src="/accept.png" alt="Accept" width={16} height={16} />
              </button>
              <button onClick={() => handleReject(req.sender_id)} className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
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
