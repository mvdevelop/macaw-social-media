
// src/components/RightMenu.tsx

import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Ad from "./Ad";
import UserInfoCard from "./UserInfoCard";

const RightMenu = ({ userId } : { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (<>
        <UserInfoCard />
        <UserMediaCard />
      </>) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
