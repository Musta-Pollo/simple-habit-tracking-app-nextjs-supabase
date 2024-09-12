"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/hooks/use-app-store";
import { ProfilePlusEmail, ProjectPlusHabitCountType } from "@/lib/new-types";
import { observer } from "@legendapp/state/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Navbar } from "./navbar";

interface DasboardPageProps {
  storageKey: string;
  navbarCollapsedSize: number;
  projects: ProjectPlusHabitCountType[];
  profile: ProfilePlusEmail;
  children: React.ReactNode;
  habits: React.ReactNode;
}
//xl: 1280px and up
//lg: 1024px and up
//md: 768px and up
//sm: 640px and up

const DasboardPageContent: React.FC<DasboardPageProps> = ({
  storageKey,
  navbarCollapsedSize,
  projects,
  children,
  profile,
  habits,
}: DasboardPageProps) => {
  //get url params
  const params = useParams();
  const router = useRouter();
  const habitId = params.habitId as string | undefined;
  const setSelectedHabitId = useAppStore(
    (state) => state.searchSettings.setSelectedHabitId
  );

  const [isHabitSheetOpen, setIsHabitSheetOpen] = useState(false);

  const isFilterSheetOpen = useAppStore(
    (state) => state.searchSettings.isFilterSheetOpen
  );
  const setIsFilterSheetOpen = useAppStore(
    (state) => state.searchSettings.setIsFilterSheetOpen
  );
  const selectedHabitId = useAppStore(
    (state) => state.searchSettings.habitSelectedId
  );

  useEffect(() => {
    setSelectedHabitId(habitId);
  }, [habitId, setSelectedHabitId]);

  useEffect(() => {
    if (selectedHabitId) {
      setIsHabitSheetOpen(true);
    } else {
      setIsHabitSheetOpen(false);
    }
  }, [selectedHabitId]);

  const onSheetClose = () => {
    console.log("onSheetClose");
    setSelectedHabitId(undefined);
    router.replace("/dashboard");
  };

  const [layout, setLayout] = useLocalStorage(
    storageKey + "-layout",
    [20, 50, 40]
  );
  const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>(
    storageKey + "-collapsed",
    false
  );
  const setIsCollapsedStore = useAppStore(
    (state) => state.searchSettings.setIsCollapsed
  );

  useEffect(() => {
    setIsCollapsedStore(isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  const [isMounted, setIsMounted] = useState(false);
  const setProjects = useAppStore((state) => state.data.setProjects);
  const setProfile = useAppStore((state) => state.data.setProfile);

  useEffect(() => {
    setIsMounted(true);
    setProjects(projects);
    setProfile(profile);
  }, [profile, projects, setProfile, setProjects]);

  const screenWidth = useAppStore((state) => state.searchSettings.screenWidth);
  const setScreenWidth = useAppStore(
    (state) => state.searchSettings.setScreenWidth
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setScreenWidth("xl");
      } else if (window.innerWidth >= 1024) {
        setScreenWidth("lg");
      } else if (window.innerWidth >= 768) {
        setScreenWidth("md");
      } else {
        setScreenWidth("sm");
      }
    };

    // Set initial side based on current window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const visibilityFilter = useAppStore(
    (state) => state.searchSettings.visibilityFilter
  );
  const setVisibilityFilter = useAppStore(
    (state) => state.searchSettings.setVisibilityFilter
  );

  if (!isMounted) {
    return null;
  }

  console.log("DashboardPage Content");
  console.log("layout", layout);
  console.log("isCollapsed", isCollapsed);

  let collapsedSize = (() => {
    switch (screenWidth) {
      case "xl":
        return 3;
      case "lg":
        return 4;
      case "md":
        return 6;
      case "sm":
        return 9;
    }
  })();
  return (
    <TooltipProvider delayDuration={0}>
      {/*{screenWidth === "sm" ||
        (screenWidth === "md" && (
          <Drawer open={isHabitSheetOpen} onOpenChange={onSheetClose}>
            <DrawerContent className="visible xl:hidden md:min-w-[35rem] min-w-full  pt-8 md:pt-0 h-2/6">
              {children}
            </DrawerContent>
          </Drawer>
        ))}
      {screenWidth !== "sm" && screenWidth !== "md" && (
        <Sheet open={isHabitSheetOpen} onOpenChange={onSheetClose} modal key="">
          <SheetContent
            className="visible xl:hidden md:min-w-[35rem] min-w-full  pt-8 md:pt-0 h-2/6"
            side={"right"}
          >
            {children}
          </SheetContent>
        </Sheet>
      )}*/}

      {screenWidth !== "xl" && screenWidth !== "sm" && screenWidth !== "md" && (
        <Sheet open={isHabitSheetOpen} onOpenChange={onSheetClose} modal key="">
          <SheetContent
            className="md:min-w-[35rem] pt-8 md:pt-0"
            side={"right"}
          >
            {children}
          </SheetContent>
        </Sheet>
      )}

      {(screenWidth === "sm" || screenWidth === "md") && (
        <Drawer
          open={isHabitSheetOpen}
          onOpenChange={(change) => {
            if (!change) {
              onSheetClose();
            }
          }}
          modal
          key=""
        >
          <DrawerContent className="h-4/5 ">{children}</DrawerContent>
        </Drawer>
      )}

      {(screenWidth === "sm" || screenWidth === "md") && (
        <Drawer
          open={isFilterSheetOpen}
          onOpenChange={setIsFilterSheetOpen}
          modal
        >
          <DrawerContent className="md:min-w-[35rem]">
            <Navbar />
          </DrawerContent>
        </Drawer>
      )}
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full "
        onLayout={(sizes: number[]) => {
          if (screenWidth === "xl") {
            setTimeout(() => {
              setLayout(sizes);
            });
          }
          if (screenWidth === "lg" || screenWidth === "md") {
            setTimeout(() => {
              setLayout([sizes[0], sizes[1], layout[2]]);
            });
          }
          if (screenWidth === "sm") {
            setTimeout(() => {
              setLayout([layout[0], sizes[1], layout[2]]);
            });
          }
        }}
      >
        {screenWidth !== "sm" && (
          <>
            <ResizablePanel
              collapsible={screenWidth !== "md"}
              defaultSize={layout == undefined ? 20 : layout[0]}
              //Write isCollapsed to local storage
              //className="hidden sm:block"
              minSize={collapsedSize * 3}
              maxSize={collapsedSize * 3 * 2}
              onCollapse={() => {
                console.log("collapse");
                setTimeout(() => {
                  setIsCollapsed(true);
                });
              }}
              collapsedSize={collapsedSize}
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
              <Navbar />
            </ResizablePanel>
            <ResizableHandle withHandle />)
          </>
        )}
        <ResizablePanel defaultSize={layout == undefined ? 50 : layout[1]}>
          {habits}
        </ResizablePanel>

        {screenWidth === "xl" && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={layout == undefined ? 40 : layout[2]}>
              {children}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

DasboardPageContent.displayName = "DasboardPageContent";

export const MemoizedDashboardPageContent = React.memo(
  observer(DasboardPageContent)
);
