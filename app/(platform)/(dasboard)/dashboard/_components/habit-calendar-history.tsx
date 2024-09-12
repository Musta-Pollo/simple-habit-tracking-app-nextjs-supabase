"use client";

import { Completion, Habit } from "@/lib/new-types";
import { DateExtensions } from "@/utils/types-extensions/date-extension";
import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import { addDays } from "date-fns";
import { useMemo } from "react";
import HabitHistoryMonth from "./habit-history-month";

interface HabitCalendarHistoryProps {
  completions: Completion[];
  habit: Habit;
}

export const HabitCalendarHistory = ({
  completions,
  habit,
}: HabitCalendarHistoryProps) => {
  const oldestCompletion =
    completions.length == 0 ? undefined : completions[completions.length - 1];
  const endMonth = useMemo(() => {
    const oldDate = oldestCompletion?.day ?? new Date();
    const minus14Days = addDays(oldDate, -14);
    return DateExtensions.cropDateTillMonth(minus14Days);
  }, [oldestCompletion]);

  const completionsPerDay = useMemo(() => {
    return habitExtensions.habitCompletions(completions);
  }, [completions]);

  const allMonths = useMemo(() => {
    const months = [];
    const today = DateExtensions.addMonth(
      DateExtensions.cropDateTillMonth(new Date()),
      1
    );
    console.log("Today: ", today);
    console.log("Default today: ", new Date());
    let currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth() - 2);
    while (currentMonth < today) {
      months.push(currentMonth);
      currentMonth = DateExtensions.addMonth(currentMonth, 1);
    }
    return months.reverse();
  }, []);

  const renderMonth = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = allMonths[index];
    return (
      <div style={style}>
        <HabitHistoryMonth
          startOfTheMonth={item}
          habit={habit}
          completionMap={completionsPerDay}
        />
      </div>
    );
  };
  return (
    <div className="m-auto">
      {allMonths.map((month, index) => (
        <HabitHistoryMonth
          key={index}
          startOfTheMonth={month}
          habit={habit}
          completionMap={completionsPerDay}
        />
      ))}
    </div>
  );
};
