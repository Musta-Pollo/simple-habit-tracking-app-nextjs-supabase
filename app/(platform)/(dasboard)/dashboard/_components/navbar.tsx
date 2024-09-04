"use client";

import { updateProjectsOrder } from "@/actions/change-projects-order";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { ProfilePlusEmail, ProjectPlusHabitCountType } from "@/lib/new-types";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Folder, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "sonner";
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
  let router = useRouter();
  const [optimisticProjects, reorderProjectsOptimistic] =
    useOptimistic<ProjectPlusHabitCountType[]>(projects);

  const { execute, fieldErrors } = useAction(updateProjectsOrder, {
    onSuccess: (data) => {
      toast.success("Projects order updated");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  console.log("Projects", projects);
  console.log("Optimistic Projects", optimisticProjects);

  if (isProjectsOpen == undefined) return null;
  return (
    <div className={cn("flex flex-col py-4")}>
      <div className="px-4 pb-3">
        <AccountSwitcher isCollapsed={isCollapsed} profile={profile} />
      </div>

      <Separator />
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-3 data-[collapsed=true]:py-2 "
      >
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          <div className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 px-4">
            {links.map((link, index) => (
              <NavItem isCollapsed={isCollapsed} key={index} data={link} />
            ))}
          </div>
          <Separator className="my-1" />
          <div className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 px-4">
            <NavItem
              isCollapsed={isCollapsed}
              className="hover:bg-transparent"
              data={{
                icon: Folder,
                title: "My Projects",
                variant: "ghost",

                trailing: (
                  <div className="flex gap-2">
                    <CreateProjectDialogWrapper
                      align="start"
                      side="right"
                      nextOrder={projects.length}
                    >
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
                      {isProjectsOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ),
              }}
            />

            <DragDropContext
              onDragEnd={(dropResult) => {
                if (!dropResult.destination) return;
                const newProjects = Array.from(projects);
                const [removed] = newProjects.splice(
                  dropResult.source.index,
                  1
                );
                newProjects.splice(dropResult.destination.index, 0, removed);

                reorderProjectsOptimistic(newProjects);
                return execute({
                  dropResult,
                  projects: newProjects,
                });
              }}
            >
              <Droppable droppableId="projects">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {optimisticProjects.map((project, index) => (
                      <ProjectTile
                        index={index}
                        key={project.id}
                        data={{
                          project: project,
                          variant: "ghost",
                          // onClick: () => {},
                        }}
                        isCollapsed={isCollapsed}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </nav>
      </div>
    </div>
  );
};
