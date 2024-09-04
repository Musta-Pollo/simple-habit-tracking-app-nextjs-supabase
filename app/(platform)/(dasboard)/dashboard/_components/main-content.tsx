"use server";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import { CustomExpansionTile } from "./custom-expansion-tile";
import HabitTile from "./habit-tile";

// return string of an SVG

export const MainContent = async () => {
  const supabase = await createClient(cookies());
  // const { data: projects, error } = await supabase.from("projects").select("*");
  // let Iccon = iconMapper["search"];

  return (
    <div className="flex-col flex py-4">
      <div className="flex flex-row justify-between pl-4 items-center">
        <div className="font-bold text-xl"> All</div>
        <Button>
          <PlusIcon />
          <div className="w-2" />
          <div>Create Habit</div>
        </Button>
      </div>
      <div className="h-3" />
      <Separator />
      <div className="h-3" />
      <CustomExpansionTile title="Today">
        <div className="flex flex-col gap-y-3">
          <HabitTile />
          <HabitTile />
          <HabitTile />
        </div>
      </CustomExpansionTile>
    </div>
  );
};
