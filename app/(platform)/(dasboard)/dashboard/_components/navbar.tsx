"use client";

import { updateProjectsOrder } from "@/actions/change-projects-order";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";
import { VisibilityFilter } from "@/utils/zustand/schema";
import { Folder, Inbox, Plus, Sparkle, Sun, SunMoon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "sonner";
import { AccountSwitcher } from "./account_switcher";
import { CreateProjectDialogWrapper } from "./create-project-dialog-wrapper";
import { NavItem, NavItemData } from "./nav-item";
import { ProjectTile } from "./project-tile";

interface NavbarProps {}

export const Navbar = () => {
  const visibilityFilter = useAppStore(
    (state) => state.searchSettings.visibilityFilter
  );
  const setVisibilityFilter = useAppStore(
    (state) => state.searchSettings.setVisibilityFilter
  );
  const isCollapsed = useAppStore((state) => state.searchSettings.isCollapsed);
  const links: NavItemData[] = [
    {
      title: "All",
      icon: Inbox,
      variant: visibilityFilter === VisibilityFilter.All ? "primary" : "ghost",
      onClick: () => {
        setVisibilityFilter(VisibilityFilter.All);
      },
    },
    {
      title: "Today",
      icon: Sun,
      variant:
        visibilityFilter === VisibilityFilter.Today ? "primary" : "ghost",
      onClick: () => {
        setVisibilityFilter(VisibilityFilter.Today);
      },
    },
    {
      title: "Tommorow",
      icon: SunMoon,
      variant:
        visibilityFilter === VisibilityFilter.Tommorow ? "primary" : "ghost",
      onClick: () => {
        setVisibilityFilter(VisibilityFilter.Tommorow);
      },
    },
    {
      title: "Upcoming",
      icon: Sparkle,
      variant:
        visibilityFilter === VisibilityFilter.After_Tommorow
          ? "primary"
          : "ghost",
      onClick: () => {
        console.log("Upcoming");
        setVisibilityFilter(VisibilityFilter.After_Tommorow);
      },
    },
  ];
  // const projects = await db.pr.findMany();
  let router = useRouter();

  const { execute, fieldErrors } = useAction(updateProjectsOrder, {
    onSuccess: (data) => {
      if (data) {
        toast.success("Projects order updated");
      }
      console.log("Project order updated");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });
  const projects = useAppStore((state) => state.data.projects);
  const profile = useAppStore((state) => state.data.profile);

  const setProjects = useAppStore((state) => state.data.setProjects);

  const selectedProjectId = useAppStore(
    (state) => state.searchSettings.projectSelectedId
  );
  const setSelectedProjectId = useAppStore(
    (state) => state.searchSettings.setSelectedProjectId
  );
  console.log("Selected Project Id", selectedProjectId);

  return (
    <div className={cn("flex flex-col py-4")}>
      <div className="px-4 pb-3">
        <AccountSwitcher isCollapsed={isCollapsed} />
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
              smallerRightPadding
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
                    {/*<Button
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
                    </Button>*/}
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

                setProjects(newProjects);
                return execute({
                  dropResult,
                  projects: newProjects,
                });
              }}
            >
              <Droppable droppableId="projects">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {projects.map((project, index) => {
                      return (
                        <ProjectTile
                          index={index}
                          key={project.id}
                          isSelected={selectedProjectId == project.id}
                          data={{
                            project: project,
                            variant:
                              selectedProjectId == project.id
                                ? "primary"
                                : "ghost",
                            onClick: () => {
                              if (selectedProjectId == project.id) {
                                setSelectedProjectId(undefined);
                                return;
                              }
                              console.log("Project clicked");
                              setSelectedProjectId(project.id);
                            },
                          }}
                          isCollapsed={isCollapsed}
                        />
                      );
                    })}
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
