"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const UserAvatar = () => {
  const supabase = createClientComponentClient();
  // const userId = useAuth().userId;
  // if (!userId) return null;
  const user = supabase.auth.getUser();
  const user = useUser();
  return (
    <Avatar className="w-4 h-4">
      <AvatarImage src={user.user?.imageUrl} className="w-4 h-4" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
