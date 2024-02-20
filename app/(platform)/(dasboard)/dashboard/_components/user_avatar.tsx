"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfilePlusEmail } from "@/lib/new-types";

interface UserAvatarProps {
  profile: ProfilePlusEmail;
}

export const UserAvatar = ({ profile }: UserAvatarProps) => {
  // const userId = useAuth().userId;
  // if (!userId) return null;
  // const user = await supabase.auth.getUser();
  // const user = useUser();
  const email = profile.email;
  return (
    <Avatar className="w-4 h-4">
      <AvatarImage className="w-4 h-4" />
      <AvatarFallback>{`${email[0]}${email[1]}`.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
