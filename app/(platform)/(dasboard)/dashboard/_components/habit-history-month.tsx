"use client";

import { modifyCompletions } from "@/actions/add-completion";
import { padLeft } from "@/helpers/string";
import { useAction } from "@/hooks/use-action";
import { Habit } from "@/lib/new-types";
import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import debounce from "debounce";
import React from "react";
import { toast } from "sonner";
interface HabitHistoryMonthProps {
  startOfTheMonth: Date;
  habit: Habit;
  completionMap: { [key: string]: number };
}

export default function HabitHistoryMonth({
  startOfTheMonth,
  habit,
  completionMap,
}: HabitHistoryMonthProps) {
  //Generate all days of the month from the startOfTheMonth until is a next month
  let days = [];
  let currentDate = new Date(startOfTheMonth);
  console.log("Start of the month: ", startOfTheMonth);
  while (currentDate.getMonth() === startOfTheMonth.getMonth()) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  days = days.reverse();
  const [isIncrementing, setIsIncrementing] = React.useState(false);

  console.log("Days: ", days);

  const { execute, fieldErrors } = useAction(modifyCompletions, {
    onSuccess: (data) => {
      if (data.completionsRemoved) {
        toast.success(`Completions removed for ${data.day.toDateString()}`);
      } else {
        toast.success(`Completion added for ${data.day.toDateString()}`);
      }
      console.log("Success");
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  console.log("Field errors", fieldErrors);

  //console.log("Today");
  const columnCount = 7;
  const rowCount = Math.ceil(days.length / 7);
  const CELL_GAP = 5;
  const columnWidth = 60;
  const width = 7 * columnWidth + 6 * CELL_GAP;

  const renderDay = ({ item }: { item: Date }) => {
    const dayCompletedTimes = completionMap[item.toDateString()] || 0;
    const isDayCompleted = dayCompletedTimes >= habit.amount;
    const color = habitExtensions.getColor(
      dayCompletedTimes,
      habit.amount!,
      habit.color_hexa!
    );
    const textColor =
      dayCompletedTimes >= habit.amount / 2 ? "#000000" : "#ffffff";
    return (
      <div
        className="flex flex-col justify-center items-center cursor-pointer h-12 w-12"
        onClick={debounce(
          async () => {
            try {
              ///////////////////////////////////////////
              execute({
                habit_id: habit.id,
                day: item,
                user_id: habit.userid,
                drop: isDayCompleted,
              });
            } catch (error) {
              console.error("Error incrementing habit", error);
            }
          },
          1000,
          {
            immediate: true,
          }
        )}
      >
        <div className="p-0.5">
          <div
            style={{ backgroundColor: color }}
            className="px-3 py-2 rounded-lg"
          >
            <div
              style={{
                color: textColor,
              }}
              className="font-nunito-500  text-base flex-shrink text-start"
            >
              {padLeft(item.getDate(), 2, "0")}
              {/*{item.toLocaleDateString()}*/}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-8" />
      <div className="font-semibold text-base text-white text-center">
        {startOfTheMonth.toLocaleString("default", { month: "long" })}
      </div>
      <div className="h-4" />
      <div className="flex flex-wrap gap-2.5 justify-between max-w-[29rem] px-4">
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              //flex: "1 0 13%", // Adjust the basis to fit 7 items per row
              //maxWidth: "13%", // Ensure items don't exceed the row width
              boxSizing: "border-box",
            }}
          >
            {renderDay({
              item: day,
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
