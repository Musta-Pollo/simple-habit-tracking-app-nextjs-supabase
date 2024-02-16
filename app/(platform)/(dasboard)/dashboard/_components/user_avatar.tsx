"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dbClient from "@/lib/db_client";

export const UserAvatar = () => {
  const supabase = dbClient();
  // const userId = useAuth().userId;
  // if (!userId) return null;
  // const user = await supabase.auth.getUser();
  // const user = useUser();
  return (
    <Avatar className="w-4 h-4">
      <AvatarImage className="w-4 h-4" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
