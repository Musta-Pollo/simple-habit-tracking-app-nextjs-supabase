import { useAppStore } from "@/hooks/use-app-store";
import { iconMapper } from "@/lib/icons/icon-mapper";
import { Habit } from "@/lib/new-types";
import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { HabitCompleteButton } from "./habit-complete-button";

interface HabitTileProps {
  habit: Habit;
  onClick: () => void;
  //title: string;
}

const HabitTile = ({ habit, onClick }: HabitTileProps) => {
  const Icon = iconMapper[habit.icon ?? "search"];
  const habitColor = habit.color_hexa ?? "blue";
  console.log(`text-[#${habitColor}] w-5 h-5`);
  const router = useRouter();
  const setSelectedHabitId = useAppStore(
    (state) => state.searchSettings.setSelectedHabitId
  );
  const selectedHabitId = useAppStore(
    (state) => state.searchSettings.habitSelectedId
  );
  const isSelected = selectedHabitId === habit.id;
  const projects = useAppStore((state) => state.data.projects);
  const todayCompletions = useAppStore(
    (state) => state.data.completions
  ).filter((completion) => completion.habit_id === habit.id);
  const completedPercentage = (todayCompletions.length / habit.amount) * 100;

  const habitDescription = habitExtensions.habitDescription(
    habit,
    todayCompletions.length,
    projects
  );

  return (
    <div
      onClick={() => {
        console.log("C: Habit Tile Clicked");
        if (isSelected) {
          setSelectedHabitId(undefined);
          router.replace(`/dashboard`);
        } else {
          setSelectedHabitId(habit.id);
          router.replace(`/dashboard/${habit.id}`);
        }
      }}
      className={clsx(
        "flex items-center justify-between p-2  shadow-sm rounded-lg hover:bg-white/5",
        selectedHabitId === habit.id && "bg-white/10"
      )}
    >
      <div className="flex items-center">
        {/* Progress Circle Icon */}
        <div className="relative">
          <div
            style={{ backgroundColor: `${habitColor}1A` }}
            className={`w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <Icon style={{ color: `${habitColor}` }} className=" w-5 h-5" />
          </div>
          {/* Progress Ring */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              strokeWidth="4"
              stroke="currentColor"
              className="text-gray-800"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              strokeWidth="4"
              stroke="currentColor"
              style={{ color: `${habitColor}` }}
              fill="none"
              strokeDasharray="113"
              strokeDashoffset={113 - (113 * completedPercentage) / 100}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
        </div>

        {/* Habit Title and Progress */}
        <div className="ml-4">
          <div className="text-sm font-medium text-slate-300">
            {habit.name ?? ""}
          </div>
          <div className="h-0.5" />
          <div className="text-xs text-slate-400">{habitDescription}</div>
        </div>
      </div>

      {/* Complete Button */}
      <HabitCompleteButton
        habitId={habit.id}
        isHabitCompleted={completedPercentage === 100}
      />
    </div>
  );
};

export default HabitTile;
