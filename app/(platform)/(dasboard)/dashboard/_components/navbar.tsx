"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfilePlusEmail, ProjectPlusHabitCountType } from "@/lib/new-types";
import { cn } from "@/lib/utils";
import { ChevronDown, Folder, Plus } from "lucide-react";
import { AccountSwitcher } from "./account_switcher";
import { CreateProjectDialogWrapper } from "./create-project-dialog-wrapper";
import { NavItem, NavItemData } from "./nav-item";
import { ProjectTile } from "./project-tile";

interface NavbarProps {
  isCollapsed: boolean;
  isProjectsOpen: boolean;
  links: NavItemData[];
  projects: ProjectPlusHabitCountType[];
  profile: ProfilePlusEmail;
  setIsProjectsOpen: (value: boolean) => void;
}

export const Navbar = ({
  isCollapsed,
  links,
  projects,
  profile,
  isProjectsOpen,
  setIsProjectsOpen,
}: NavbarProps) => {
  // const projects = await db.pr.findMany();
  return (
    <div className={cn("flex flex-col")}>
      <div className="p-2 h-[52px]">
        <AccountSwitcher isCollapsed={isCollapsed} profile={profile} />
      </div>
      <Separator />
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) => (
            <NavItem isCollapsed={isCollapsed} key={index} data={link} />
          ))}
          <Separator className="my-1" />
          <NavItem
            isCollapsed={isCollapsed}
            className="hover:bg-transparent"
            data={{
              icon: Folder,
              title: "My Projects",
              variant: "ghost",

              trailing: (
                <div className="flex gap-2">
                  <CreateProjectDialogWrapper align="start" side="right">
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CreateProjectDialogWrapper>
                  <Button
                    onClick={() => {
                      setIsProjectsOpen(!isProjectsOpen);
                    }}
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              ),
            }}
          />

          {isProjectsOpen && (
            <>
              {...projects.map((project) => (
                <div key={project.name} className="text-3xl text-white w-full ">
                  <ProjectTile
                    data={{
                      project: project,
                      variant: "ghost",
                      onClick: () => {},
                    }}
                    isCollapsed={isCollapsed}
                  />
                </div>
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
