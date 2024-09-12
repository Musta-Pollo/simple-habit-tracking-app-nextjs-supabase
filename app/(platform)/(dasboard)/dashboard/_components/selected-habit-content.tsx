"use server";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Completion } from "@/lib/new-types";
import { createClient } from "@/utils/supabase/server";
import { CheckCircleIcon, CircleXIcon, FlameIcon } from "lucide-react";
import { cookies } from "next/headers";

import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import { EditHabitButton } from "./edit-habit-button";
import { HabitCalendarHistory } from "./habit-calendar-history";
import { NothingFound } from "./nothing-found";

// return string of an SVG

interface SelectedHabitContentProps {
  habitId: string;
}

export const SelectedHabitContent = async ({
  habitId,
}: SelectedHabitContentProps) => {
  const supabase = await createClient(cookies());

  const getAllHabitCompletionsFut = supabase
    .from("completions")
    .select("*")
    .eq("habit_id", habitId)
    .order("day", { ascending: false });
  const getHabitFut = supabase
    .from("habits")
    .select("*")
    .eq("id", habitId)
    .single();

  const [
    { data: habit, error: habitError },
    { data: allCompletionsData, error: completionsError },
  ] = await Promise.all([getHabitFut, getAllHabitCompletionsFut]);
  if (habit == null) return <NothingFound text="No habit with this id" />;
  let allTodayCompletions: Completion[] = allCompletionsData ?? [];

  console.log("All completions", allTodayCompletions);
  let completionsMap = habitExtensions.habitCompletions(allTodayCompletions);
  const daysStreak = habitExtensions.getCurrentDayStreakFromCompletions(
    completionsMap,
    habit
  );
  const daysCompleted = habitExtensions.getDaysCompleted(completionsMap, habit);
  const daysFailed = habitExtensions.getDaysFailed(completionsMap, habit);
  //Logic to show habits

  //const searchParams = store$.
  // const { data: projects, error } = await supabase.from("projects").select("*");
  // let Iccon = iconMapper["search"];

  return (
    <div className="flex-col flex py-4 h-screen">
      <div className="flex flex-row justify-between pl-4 pr-4 items-center">
        <div className="font-bold text-xl"> {habit.name}</div>
        <EditHabitButton habit={habit} />
      </div>
      <div className="h-3" />
      <Separator />
      <div className="h-3" />
      <ScrollArea className="flex-1 flex py-2 flex-col">
        {/*<MainContentHabits
          habits={allHabits}
          completions={allTodayCompletions}
        />*/}
        <div className="px-4">
          <Card>
            <CardHeader>
              <CardDescription>Current streak</CardDescription>
              <CardTitle className="flex flex-row items-center">
                <FlameIcon size={20} color="#EB8313" />
                <div className="w-2" />
                {daysStreak} days streak
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="h-4" />
        <div className="px-4  flex md:flex-row flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardDescription>Completed days</CardDescription>
              <CardTitle className="flex flex-row items-center">
                <CheckCircleIcon size={20} color="#0CE137" />
                <div className="w-2" />
                {daysCompleted} days completed
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex flex-1">
            <CardHeader>
              <CardDescription>Failed days</CardDescription>
              <CardTitle className="flex flex-row items-center">
                <CircleXIcon size={20} color="#E14312" />
                <div className="w-2" />
                {daysFailed} days failed
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="h-4" />
        <div className="px-4">
          <Card>
            {/*<CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>*/}
            <HabitCalendarHistory
              habit={habit}
              completions={allTodayCompletions}
            />
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};
