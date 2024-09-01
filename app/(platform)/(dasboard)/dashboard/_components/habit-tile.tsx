import { Button } from "@/components/ui/button";
import { DumbbellIcon } from "lucide-react";

const HabitTile = () => {
  const progressPercentage = 10;
  return (
    <div className="flex items-center justify-between p-2  shadow-sm rounded-lg">
      <div className="flex items-center">
        {/* Progress Circle Icon */}
        <div className="relative">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/10">
            <DumbbellIcon className="text-green-500 w-5 h-5" />
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
              className="text-green-500"
              fill="none"
              strokeDasharray="113"
              strokeDashoffset={113 - (113 * progressPercentage) / 100}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
        </div>

        {/* Habit Title and Progress */}
        <div className="ml-4">
          <div className="text-sm font-medium text-slate-300">Training</div>
          <div className="text-xs text-slate-400">1/10 completed</div>
        </div>
      </div>

      {/* Complete Button */}
      <Button
        size="sm"
        className="mr-2"
        variant="outline"
      >
        Complete
      </Button>
    </div>
  );
};

export default HabitTile;
