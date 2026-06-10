"use client";

import Image from "next/image";
import { getAllUsers, getFriendRequests, getCurrentUser } from "@/lib/mock-data";
import { useTranslation } from "@/context/LanguageProvider";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "@/lib/actions";
import {
  FiUserPlus,
  FiCheck,
  FiX,
  FiUserMinus,
  FiSearch,
  FiGrid,
  FiList,
  FiUsers,
  FiUserCheck,
  FiClock,
  FiUser,
} from "react-icons/fi";

type TabKey = "requests" | "all" | "suggestions";

export default function FriendsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useTranslation();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Fallback mock
        const reqs = getFriendRequests();
        const mockReqs = reqs.map((r: any) => ({
          id: r.id,
          sender_id: r.user.id,
          sender: r.user,
          created_at: r.createdAt,
        }));
        setRequests(mockReqs);
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
        const reqs = getFriendRequests();
        const mockReqs = reqs.map((r: any) => ({
          id: r.id,
          sender_id: r.user.id,
          sender: r.user,
          created_at: r.createdAt,
        }));
        setRequests(mockReqs);
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

  // Build enriched people list with mock extra fields
  const enrichedPeople = people.map((p: any) => ({
    ...p,
    mutualFriends: Math.floor(Math.random() * 20) + 1,
    friendSince: (() => {
      const d = new Date();
      d.setMonth(d.getMonth() - Math.floor(Math.random() * 24) - 1);
      return d;
    })(),
  }));

  const filteredPeople = enrichedPeople.filter((p: any) => {
    const fullName = `${p.name} ${p.surname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const allFriends = filteredPeople.filter((p: any) =>
    friends.includes(p.id)
  );
  const suggestions = filteredPeople.filter(
    (p: any) => !friends.includes(p.id)
  );

  const formatFriendSince = (date: Date) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "requests",
      label: t.friends.friendRequests,
      icon: <FiUserPlus size={15} />,
    },
    { key: "all", label: "All Friends", icon: <FiUsers size={15} /> },
    {
      key: "suggestions",
      label: t.friends.peopleYouMayKnow,
      icon: <FiUserCheck size={15} />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t.friends.title}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tabs.map((tab) => {
            const count =
              tab.key === "requests"
                ? requests.length
                : tab.key === "all"
                ? allFriends.length
                : suggestions.length;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + View toggle — always visible */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search friends by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            title={viewMode === "grid" ? "List view" : "Grid view"}
          >
            {viewMode === "grid" ? <FiList size={18} /> : <FiGrid size={18} />}
          </button>
        </div>

        {/* ============ TAB: FRIEND REQUESTS ============ */}
        {activeTab === "requests" && (
          <section>
            {requests.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiUserPlus
                    size={32}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No pending requests
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  {t.friends.noRequests}
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"
                }
              >
                {requests.map((req: any) => (
                  <div
                    key={req.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 ${
                      viewMode === "list"
                        ? "flex items-center gap-4 p-4"
                        : "p-4 flex items-center gap-4"
                    }`}
                  >
                    <Image
                      src={req.sender?.avatar || ""}
                      alt={req.sender?.name || "User"}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {req.sender?.name} {req.sender?.surname}
                      </p>
                      <p className="text-xs text-gray-400">
                        {req.sender?.city}
                      </p>
                      {req.created_at && (
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <FiClock size={10} />
                          {formatFriendSince(new Date(req.created_at))}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleAccept(req.sender_id)}
                        className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(req.sender_id)}
                        className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ============ TAB: ALL FRIENDS ============ */}
        {activeTab === "all" && (
          <section>
            {allFriends.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiUsers
                    size={32}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No friends yet
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Start connecting with people!
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-3"
                }
              >
                {allFriends.map((person: any) => (
                  <div
                    key={person.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 ${
                      viewMode === "list"
                        ? "flex items-center gap-4 p-4"
                        : "p-4"
                    }`}
                  >
                    <div
                      className={
                        viewMode === "list"
                          ? "flex items-center gap-4 w-full"
                          : "flex flex-col items-center text-center"
                      }
                    >
                      <Image
                        src={person.avatar || ""}
                        alt={person.name || "User"}
                        width={viewMode === "list" ? 56 : 72}
                        height={viewMode === "list" ? 56 : 72}
                        className={`rounded-full object-cover shrink-0 ${
                          viewMode === "grid" ? "w-18 h-18 mb-3" : "w-14 h-14"
                        }`}
                      />
                      <div
                        className={
                          viewMode === "list" ? "flex-1 min-w-0" : ""
                        }
                      >
                        <p className="font-semibold text-gray-800 dark:text-white truncate">
                          {person.name} {person.surname}
                        </p>
                        <p className="text-xs text-gray-400">
                          {person.city}
                        </p>
                        {person.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {person.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiUser size={11} />
                            {person.mutualFriends} mutual
                          </span>
                          {person.friendSince && (
                            <span className="flex items-center gap-1">
                              <FiClock size={11} />
                              Since {formatFriendSince(person.friendSince)}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFriend(person.id)}
                        className={`flex items-center gap-1 text-sm bg-red-50 dark:bg-red-900/30 text-red-500 px-3 py-1.5 rounded-lg hover:opacity-80 transition ${
                          viewMode === "grid" ? "mt-3" : "shrink-0 ml-3"
                        }`}
                      >
                        <FiUserMinus size={14} />
                        <span>{t.friends.friends}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ============ TAB: PEOPLE YOU MAY KNOW ============ */}
        {activeTab === "suggestions" && (
          <section>
            {suggestions.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-16 text-center">
                <div className="w-20 h-20 mx-auto mb-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiUserCheck
                    size={32}
                    className="text-gray-300 dark:text-gray-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No suggestions found
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  {searchQuery
                    ? "Try a different search term."
                    : "You've connected with everyone!"}
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-3"
                }
              >
                {suggestions.map((person: any) => (
                  <div
                    key={person.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md dark:border dark:border-gray-700 ${
                      viewMode === "list"
                        ? "flex items-center gap-4 p-4"
                        : "p-4"
                    }`}
                  >
                    <div
                      className={
                        viewMode === "list"
                          ? "flex items-center gap-4 w-full"
                          : "flex flex-col items-center text-center"
                      }
                    >
                      <Image
                        src={person.avatar || ""}
                        alt={person.name || "User"}
                        width={viewMode === "list" ? 56 : 72}
                        height={viewMode === "list" ? 56 : 72}
                        className={`rounded-full object-cover shrink-0 ${
                          viewMode === "grid" ? "w-18 h-18 mb-3" : "w-14 h-14"
                        }`}
                      />
                      <div
                        className={
                          viewMode === "list" ? "flex-1 min-w-0" : ""
                        }
                      >
                        <p className="font-semibold text-gray-800 dark:text-white truncate">
                          {person.name} {person.surname}
                        </p>
                        <p className="text-xs text-gray-400">
                          {person.city}
                        </p>
                        {person.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {person.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiUser size={11} />
                            {person.mutualFriends} mutual
                          </span>
                        </div>
                      </div>
                      {friends.includes(person.id) ? (
                        <button
                          onClick={() => handleRemoveFriend(person.id)}
                          className={`flex items-center gap-1 text-sm bg-red-50 dark:bg-red-900/30 text-red-500 px-3 py-1.5 rounded-lg hover:opacity-80 transition ${
                            viewMode === "grid" ? "mt-3" : "shrink-0 ml-3"
                          }`}
                        >
                          <FiUserMinus size={14} />
                          <span>{t.friends.friends}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddFriend(person.id)}
                          className={`flex items-center gap-1 text-sm bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition ${
                            viewMode === "grid" ? "mt-3" : "shrink-0 ml-3"
                          }`}
                        >
                          <FiUserPlus size={14} />
                          <span>{t.friends.add}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
