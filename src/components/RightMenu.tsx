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

      {/* 3 equal-height cards for the home sidebar */}
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex-1 min-h-0 flex flex-col">
          <FriendRequests />
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <Birthdays />
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <RightNews />
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
