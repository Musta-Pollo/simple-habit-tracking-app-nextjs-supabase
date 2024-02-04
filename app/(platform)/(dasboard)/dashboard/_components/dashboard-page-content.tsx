"use client";

import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tables } from "@/supabase";
import {
  Calendar,
  Circle,
  Folder,
  Home,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { CreateTaskDialogWrapper } from "./create-task-dialog-wrapper";
import { ModeToggle } from "./mode-toggle";
import { Navbar } from "./navbar";

interface DasboardPageProps {
  storageKey: string;
  navbarCollapsedSize: number;
  projects: Tables<"Project">[];
}

export const DasboardPageContent = ({
  storageKey,
  navbarCollapsedSize,
  projects,
}: DasboardPageProps) => {
  const [layout, setLayout] = useLocalStorage(storageKey + "-layout", [10, 50]);
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>(
    storageKey + "-collapsed",
    false
  );
  console.log("DashboardPage Content");
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
          defaultSize={layout[0]}
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
            links={[
              {
                title: "Add Task",
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
                title: "Dashboard",
                icon: Home,
                variant: "default",
                onClick: () => {
                  console.log("Cliked dashboard");
                },
              },
              {
                title: "Projects",
                icon: Folder,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked projects");
                },
              },
              {
                title: "Calendar",
                icon: Calendar,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked calendar");
                },
              },
              {
                title: "Settings",
                icon: Settings,
                variant: "ghost",
                onClick: () => {
                  console.log("Cliked settings");
                },
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={layout[1]}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <ModeToggle />
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              {/* <MailList items={mails} /> */}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {/* <MailList items={mails.filter((item) => !item.read)} /> */}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
