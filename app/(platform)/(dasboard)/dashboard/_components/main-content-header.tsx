"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { FilterIcon } from "lucide-react";
import { CreateHabitButton } from "./create-habit-button";

export const MainContentHeader = () => {
  const isFilterSheetOpen = useAppStore(
    (state) => state.searchSettings.isFilterSheetOpen
  );
  const setIsFilterSheetOpen = useAppStore(
    (state) => state.searchSettings.setIsFilterSheetOpen
  );

  return (
    <div className="flex flex-row justify-between pl-4 pr-4 items-center">
      <div className="font-bold text-xl"> All</div>
      <div className="flex flex-row justify-end gap-x-2">
        <Button
          className="visible md:hidden"
          variant="outline"
          onClick={() => {
            setIsFilterSheetOpen(true);
          }}
        >
          <FilterIcon size={24} />
        </Button>
        <CreateHabitButton />
      </div>
    </div>
  );
};
