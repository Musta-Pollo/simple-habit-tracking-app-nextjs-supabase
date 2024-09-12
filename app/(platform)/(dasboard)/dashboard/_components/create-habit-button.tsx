"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { PlusIcon } from "lucide-react";
import { CreateTaskDialogWrapper } from "./create-task-dialog-wrapper";

export const CreateHabitButton = () => {
  const projects = useAppStore((state) => state.data.projects);
  const screenWidth = useAppStore((state) => state.searchSettings.screenWidth);
  const isSheet = screenWidth === "sm" || screenWidth === "md";
  const isDialog = !isSheet;
  return (
    <CreateTaskDialogWrapper
      allProjects={projects}
      align="start"
      side="right"
      isDialog={isDialog}
      isSheet={isSheet}
    >
      <Button>
        <PlusIcon className="text-white w-4 h-4" />
        <div className="w-2" />
        <span className="text-white">Create Habit</span>
      </Button>
    </CreateTaskDialogWrapper>
  );
};
