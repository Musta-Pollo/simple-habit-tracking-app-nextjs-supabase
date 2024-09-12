// Assuming Tables<"habits"> resolves to a type Habit

import { Completion, Habit, Project } from "@/lib/new-types";
import { ColorExtension } from "./color-extension";
import { DateExtensions } from "./date-extension";

export const habitExtensions = {
  getHabitDays(habit: Habit): boolean[] {
    return [
      habit.monday,
      habit.tuesday,
      habit.wednesday,
      habit.thursday,
      habit.friday,
      habit.saturday,
      habit.sunday,
    ];
  },
  getHabitDaysIndexes(habit: Habit): number[] {
    return this.getHabitDays(habit).reduce((acc, day, index) => {
      if (day) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);
  },

  daysOfTheHabit(habit: Habit): Iterable<Date> {
    const days = this.getHabitDaysIndexes(habit);
    let currentDate = DateExtensions.cropDate(new Date());

    return {
      [Symbol.iterator]: function* () {
        while (true) {
          const currentDayIndex = currentDate.getDay() - 1;
          if (currentDate < new Date(habit.start_date!)) break;
          if (days.includes(currentDayIndex)) {
            yield new Date(currentDate); // Ensure a new Date object is yielded
          }
          currentDate = DateExtensions.addDays(currentDate, -1);
        }
      },
    };
  },
  getCurrentDayStreakFromCompletions(
    completionsPerDay: {
      [key: string]: number;
    },
    habit: Habit
  ): number {
    // Get iterable of days when the habit should be completed
    const daysOfTheHabitIterable = this.daysOfTheHabit(habit);
    //start from the end of the iterable and check if the habit was completed enough times for that day
    let streak = 0;
    for (const day of daysOfTheHabitIterable) {
      const dayString = day.toDateString();
      if (completionsPerDay[dayString] >= habit.amount!) {
        streak++;
      } else {
        break;
      }
    }
    // if it was, increment the streak, if not, break the loop

    return streak;
  },
  getDaysCompleted(
    completionsPerDay: {
      [key: string]: number;
    },
    habit: Habit
  ): number {
    // Get iterable of days when the habit should be completed
    const daysOfTheHabitIterable = this.daysOfTheHabit(habit);
    //start from the end of the iterable and check if the habit was completed enough times for that day
    let daysCompleted = 0;
    for (const day of daysOfTheHabitIterable) {
      const dayString = day.toDateString();
      if (completionsPerDay[dayString] >= habit.amount!) {
        daysCompleted++;
      }
    }
    // if it was, increment the streak, if not, break the loop

    return daysCompleted;
  },

  getDaysFailed(
    completionsPerDay: {
      [key: string]: number;
    },
    habit: Habit
  ): number {
    // Get iterable of days when the habit should be completed
    const daysOfTheHabitIterable = this.daysOfTheHabit(habit);
    //start from the end of the iterable and check if the habit was completed enough times for that day
    let daysFailed = 0;
    const today = DateExtensions.cropDate(new Date());
    for (const day of daysOfTheHabitIterable) {
      const dayString = day.toDateString();
      if (day.getTime() === today.getTime()) continue;
      if (
        completionsPerDay[dayString] < habit.amount! ||
        completionsPerDay[dayString] == undefined
      ) {
        daysFailed++;
      }
    }
    // if it was, increment the streak, if not, break the loop

    return daysFailed;
  },

  habitDescription(
    habit: Habit,
    todayCompleted: number,
    projects: Project[]
  ): string {
    //day string
    const days = this.getHabitDays(habit);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let daysString = "";
    if (days.length == 7) {
      daysString = "Everyday";
    } else {
      daysString = days
        .reduce((acc, day, index) => {
          if (day) {
            acc.push(daysOfWeek[index]);
          }
          return acc;
        }, [] as string[])
        .join(", ");
    }

    //Today completed
    const todayCompletedString = `${todayCompleted}/${habit.amount}`;

    //const project
    const project = projects.find((project) => project.id == habit.projectid);
    const projectsString = project ? project.name : "No project";

    return `Today Completed: ${todayCompletedString} - Days: ${daysString} - Project: ${projectsString}`;
  },

  habitCompletions(completions: Completion[]) {
    return completions.reduce(
      (acc: { [key: string]: number }, completion) => {
        const datetime = new Date(completion.day);
        const date = new Date(
          datetime.getFullYear(),
          datetime.getMonth(),
          datetime.getDate()
        );
        const dateString = date.toDateString();
        acc[dateString] = (acc[dateString] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );
  },
  getColor(count: number, maxCount: number, color: string): string {
    const percentage = count / maxCount;
    const opacity = 0.2 + 0.8 * percentage;
    return ColorExtension.hexToRGBA(color, opacity);
  },

  //textColor for RGBA bqckground color
  getTextColor(color: string): string {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    console.log("R: ", r, "G: ", g, "B: ", b);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff";
  },

  // Add more utility functions as needed
};
