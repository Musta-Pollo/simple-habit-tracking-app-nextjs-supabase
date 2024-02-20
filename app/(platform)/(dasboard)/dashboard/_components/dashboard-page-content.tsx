"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfilePlusEmail, ProjectPlusHabitCountType } from "@/lib/new-types";
import { CalendarDays, Circle, Inbox, Plus, Sparkle, Sun } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { CreateTaskDialogWrapper } from "./create-task-dialog-wrapper";
import { Navbar } from "./navbar";

interface DasboardPageProps {
  storageKey: string;
  navbarCollapsedSize: number;
  projects: ProjectPlusHabitCountType[];
  profile: ProfilePlusEmail;
  children: React.ReactNode;
}

export const DasboardPageContent = ({
  storageKey,
  navbarCollapsedSize,
  projects,
  children,
  profile,
}: DasboardPageProps) => {
  const [layout, setLayout] = useLocalStorage(storageKey + "-layout", [10, 50]);
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>(
    storageKey + "-collapsed",
    false
  );
  console.log("DashboardPage Content");
  console.log("layout", layout);
  console.log("isCollapsed", isCollapsed);
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full"
        onLayout={(sizes: number[]) => {
          setTimeout(() => {
            setLayout(sizes);
          });
        }}
      >
        <ResizablePanel
          collapsible={true}
          defaultSize={layout == undefined ? 10 : layout[0]}
          //Write isCollapsed to local storage
          minSize={10}
          maxSize={20}
          onCollapse={() => {
            console.log("collapse");
            setTimeout(() => {
              setIsCollapsed(true);
            });
          }}
          collapsedSize={3}
          // onExpand={() => {
          //   setIsCollapsed(false);
          // }}
          onExpand={() => {
            console.log("expand");
            setTimeout(() => {
              setIsCollapsed(false);
            });
          }}
        >
          <Navbar
            isCollapsed={isCollapsed}
            projects={projects}
            profile={profile}
            links={[
              {
                title: "Add Habit",
                icon: Plus,
                variant: "outline",
                wrapper: (children) => (
                  <CreateTaskDialogWrapper
                    allProjects={projects}
                    align="start"
                    side="right"
                  >
                    {children}
                  </CreateTaskDialogWrapper>
                ),
              },
              {
                isSeperator: true,
                title: "",
                icon: Circle,
              },
              {
                title: "All Habits",
                icon: Inbox,
                variant: "default",
                onClick: () => {
                  console.log("Cliked dashboard");
                },
              },
              {
                title: "Today",
                icon: Sun,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked projects");
                },
              },
              {
                title: "Week",
                icon: CalendarDays,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked calendar");
                },
              },
              {
                title: "Future",
                icon: Sparkle,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked settings");
                },
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={layout == undefined ? 50 : layout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
