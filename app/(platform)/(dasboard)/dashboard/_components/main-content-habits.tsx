"use client";

import { applyFilter } from "@/helpers/pipeline";
import { useAppStore } from "@/hooks/use-app-store";
import { Completion, Habit } from "@/lib/new-types";
import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import { useEffect } from "react";
import { CustomExpansionTile } from "./custom-expansion-tile";
import HabitTile from "./habit-tile";
import { NothingFound } from "./nothing-found";
interface MainContentHabitsProps {
  habits: Habit[];
  completions: Completion[];
}

export const MainContentHabits = ({
  habits,
  completions,
}: MainContentHabitsProps) => {
  const selectedProjectId = useAppStore(
    (state) => state.searchSettings.projectSelectedId
  );

  const setCompletions = useAppStore((state) => state.data.setCompletions);
  useEffect(() => {
    setCompletions(completions);
  }, [completions]);
  //Get current day of the week
  const today = new Date();
  const day = today.getDay() - 1;

  const todayHabits = applyFilter(
    habits.filter((habit) =>
      habitExtensions.getHabitDaysIndexes(habit).includes(day)
    ),
    selectedProjectId != null,
    (data) => data.filter((habit) => habit.projectid === selectedProjectId)
  );
  const todayHabitsIds = todayHabits.map((habit) => habit.id);

  const tomorrowHabits = habits.filter(
    (habit) => !todayHabitsIds.includes(habit.id)
  );

  const tomorrowHabitsIds = tomorrowHabits.map((habit) => habit.id);
  const todayAndTomorrowHabitsIds = todayHabitsIds.concat(tomorrowHabitsIds);

  const afterTomorrowHabits = habits.filter(
    (habit) => !todayAndTomorrowHabitsIds.includes(habit.id)
  );

  //Get the visibility filter
  const showToday =
    useAppStore((state) => state.searchSettings.showToday()) &&
    todayHabits.length !== 0;
  const showTomorrow =
    useAppStore((state) => state.searchSettings.showTomorrow()) &&
    tomorrowHabits.length !== 0;
  const showAfterTomorrow =
    useAppStore((state) => state.searchSettings.showAfterTomorrow()) &&
    afterTomorrowHabits.length !== 0;

  const noHabitsToShow = !showAfterTomorrow && !showToday && !showTomorrow;
  if (noHabitsToShow) {
    return <NothingFound text="No Habits for this selection" />;
  }
  return (
    <div className="flex flex-col">
      {showToday && (
        <CustomExpansionTile title="Today" openInitially>
          <HabitList habits={todayHabits} />
        </CustomExpansionTile>
      )}
      {showTomorrow && (
        <CustomExpansionTile title="Tommorow" openInitially>
          <HabitList habits={tomorrowHabits} />
        </CustomExpansionTile>
      )}

      {showAfterTomorrow && (
        <CustomExpansionTile title="Upcoming" openInitially>
          <HabitList habits={afterTomorrowHabits} />
        </CustomExpansionTile>
      )}
    </div>
  );
};

interface HabitListProps {
  habits: Habit[];
}

export const HabitList = ({ habits }: HabitListProps) => {
  const selectedProjectId = useAppStore(
    (state) => state.searchSettings.projectSelectedId
  );
  return (
    <div className="flex flex-col gap-y-3">
      {selectedProjectId == undefined
        ? habits.map((habit) => (
            <HabitTile habit={habit} onClick={() => {}} key={habit.id} />
          ))
        : habits
            .filter((habit) => habit.projectid === selectedProjectId)
            .map((habit) => (
              <HabitTile habit={habit} onClick={() => {}} key={habit.id} />
            ))}
    </div>
  );
};
