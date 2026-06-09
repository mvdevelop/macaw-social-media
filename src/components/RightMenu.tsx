// src/components/RightMenu.tsx

import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import RightNews from "./RightNews";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      {userId ? (
        <div className="flex flex-col gap-6">
          {/* Profile view: render normally */}
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </div>
      ) : null}

      {/* 3 balanced cards for the home sidebar */}
      <div className="flex flex-col gap-4">
        <div className="overflow-y-auto max-h-[280px] rounded-lg">
          <FriendRequests />
        </div>
        <div className="overflow-y-auto max-h-[280px] rounded-lg">
          <Birthdays />
        </div>
        <div className="overflow-y-auto max-h-[280px] rounded-lg">
          <RightNews />
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
