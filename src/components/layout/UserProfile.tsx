
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserRoleName } from "@/lib/utils";

interface UserProfileProps {
  user: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-4 border-t border-primary-900">
      <div className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-400">{getUserRoleName(user.role)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
