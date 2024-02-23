import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectPlusHabitCountType } from "@/lib/new-types";
import { Circle } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";

export type ProjectTileData = {
  project: ProjectPlusHabitCountType;
  variant?: "default" | "ghost" | "outline";
  onClick?: () => void;
  wrapper?: (children: React.ReactNode) => React.ReactNode;
};

interface ProjectTileProps {
  isCollapsed: boolean;
  className?: string;
  data: ProjectTileData;
  index: number;
}

export const ProjectTile = ({
  isCollapsed,
  data,
  className,
  index,
}: ProjectTileProps) => {
  const isWrapper = data.wrapper != null;
  console.log("project", data.project);
  const body = (
    <div
      className={cn(
        buttonVariants({
          variant: data.variant,
          size: "icon",
        }),
        "h-9 w-9",
        className,
        data.variant === "default" &&
          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
      )}
    >
      <Circle
        fill={data.project.color}
        color={data.project.color}
        className="h-4 w-4 flex-shrink-0"
      />
      <span className="sr-only">{data.project.name}</span>
    </div>
  );
  const content = isCollapsed ? (
    isWrapper ? (
      body
    ) : (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{body}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {data.project.name}
        </TooltipContent>
      </Tooltip>
    )
  ) : (
    <div
      // onClick={data.onClick}
      className={cn(
        buttonVariants({
          variant: data.variant,
          size: "sm",
        }),
        "w-full",
        className,
        data.variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <Circle
        fill={data.project.color}
        color={data.project.color}
        className="mr-2 h-4 w-4  flex-shrink-0"
      />
      <div className="w-full min-w-0">
        {data.project.name}
        {/* {data.label && (
          <span
            className={cn(
              "ml-auto",
              data.variant === "default" && "text-background dark:text-white"
            )}
          >
            {data.label}
          </span>
        )} */}
      </div>
      <div className="flex-shrink-0 ml-2">{data.project.habitCount}</div>
    </div>
  );
  const wrapper = data.wrapper ?? ((children) => children);
  return (
    <Draggable
      draggableId={data.project.id}
      index={index}
      key={data.project.id}
    >
      {(provided) => {
        var transform = provided.draggableProps.style?.transform;
        if (transform) {
          var t = transform.split(",")[1];
          if (t !== undefined)
            provided.draggableProps.style!.transform = "translate(0px," + t;
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="text-3xl text-white w-full "
          >
            {wrapper(content)}
          </div>
        );
      }}
    </Draggable>
  );
};

// export const ProjectTile = ({ project }: ProjectTileProps) => {
//   console.log("Project Tile");
//   let color = colorToTailwindBg(project.color);
//   console.log("Color to tailwind bg", color);
//   return (
//     <div className="flex flex-row items-center">
//       <div
//         className={cn(
//           "rounded-full",
//           //   color,
//           "bg-orange-500",
//           //   "bg-purple-600",
//           //   "bg-red-600",
//           "w-4 h-4"
//         )}
//       />
//       <div className="w-4" />
//       <div className="font-normal text-sm">{project.name}</div>
//     </div>
//   );
// };
