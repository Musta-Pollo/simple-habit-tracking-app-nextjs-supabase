"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfilePlusEmail } from "@/lib/new-types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "./user_avatar";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  profile: ProfilePlusEmail;
}

export const AccountSwitcher = ({
  isCollapsed,
  profile,
}: AccountSwitcherProps) => {
  return (
    <div className={cn(isCollapsed && "flex justify-center")}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          onClick={() => {
            console.log("click");
          }}
        >
          <Button
            variant="outline"
            className={cn(
              "w-full",
              "px-2 py-1.5",
              isCollapsed && "px-4 py-1.5",
              "w-full",
              !isCollapsed && "justify-start w-full"
            )}
          >
            {isCollapsed ? (
              <UserAvatar profile={profile} />
            ) : (
              <div className="flex items-center w-full min-w-0">
                <div className="flex flex-grow min-w-0">
                  <UserAvatar profile={profile} />
                  <div className="w-4 flex-shrink-0" />
                  <div className="flex-1 overflow-hidden text-ellipsis text-start whitespace-nowrap text-xs font-medium">
                    {profile.email}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 flex-shrink-0" />
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}
            {/* <div className="flex items-center">
              {isCollapsed ? null : (
                <>
                  <div className="w-4 flex-grow-0" />
                  <div className="flex-grow overflow-hidden shrink text-xs font-medium">
                    Zimolajan789@gmail.com
                  </div>
                  <div className="w-4 flex-grow-0" />
                  <ChevronDown className="w-4 h-4 flexgro" />
                </>
              )} */}
            {/* </div> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/user-profile">
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <div
            onClick={async () => {
              await logout();
            }}
          >
            <DropdownMenuItem> Logout</DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
