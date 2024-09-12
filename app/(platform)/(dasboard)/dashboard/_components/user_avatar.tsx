"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/hooks/use-app-store";

export const UserAvatar = () => {
  // const userId = useAuth().userId;
  // if (!userId) return null;
  // const user = await supabase.auth.getUser();
  // const user = useUser();
  const profile = useAppStore((state) => state.data.profile);
  const email = profile?.email ?? "";
  return (
    <Avatar className="w-4 h-4">
      <AvatarImage className="w-4 h-4" />
      <AvatarFallback>{`${email[0]}${email[1]}`.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
