"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { Habit } from "@/lib/new-types";
import { EditIcon } from "lucide-react";
import { CreateTaskDialogWrapper } from "./create-task-dialog-wrapper";

interface EditHabitButtonProps {
  habit: Habit;
}

export const EditHabitButton = ({ habit }: EditHabitButtonProps) => {
  const projects = useAppStore((state) => state.data.projects);
  const screenWidth = useAppStore((state) => state.searchSettings.screenWidth);
  const isSheet = screenWidth === "sm" || screenWidth === "md";
  const isDialog = !isSheet;
  return (
    <CreateTaskDialogWrapper
      allProjects={projects}
      align="start"
      side="right"
      initialValue={habit}
      isDialog={isDialog}
      isSheet={isSheet}
    >
      <Button variant="outline">
        <EditIcon className="text-white w-4 h-4" />
      </Button>
    </CreateTaskDialogWrapper>
  );
};
