"use server";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/hooks/use-app-store";
import { Tables } from "@/supabase";
import { createClient } from "@/utils/supabase/server";
import { FilterIcon } from "lucide-react";
import { cookies } from "next/headers";
import { CreateHabitButton } from "./create-habit-button";
import { MainContentHabits } from "./main-content-habits";
import { MainContentHeader } from "./main-content-header";

// return string of an SVG

export const MainContent = async () => {
  const supabase = await createClient(cookies());
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  const getAllHabitsFut = supabase.from("habits").select("*");
  const getAllTodayCompletionsFut = await supabase
    .from("completions")
    .select("*")
    .gte("day", todayStr)
    .lte("day", tomorrowStr);

  const [
    { data: habitsData, error: habitsError },
    { data: completionsData, error: completionsError },
  ] = await Promise.all([getAllHabitsFut, getAllTodayCompletionsFut]);

  let allHabits: Tables<"habits">[] = habitsData ?? [];
  let allTodayCompletions: Tables<"completions">[] = completionsData ?? [];

  console.log("All completions", allTodayCompletions);
  //Logic to show habits

  //const searchParams = store$.
  // const { data: projects, error } = await supabase.from("projects").select("*");
  // let Iccon = iconMapper["search"];

  return (
    <div className="flex-col flex py-4 h-screen">
      <MainContentHeader />
      <div className="h-3" />
      <Separator />
      <div className="h-3" />
      <ScrollArea className="flex-1">
        <MainContentHabits
          habits={allHabits}
          completions={allTodayCompletions}
        />
      </ScrollArea>
    </div>
  );
};
