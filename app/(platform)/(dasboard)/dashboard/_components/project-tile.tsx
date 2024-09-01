import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectPlusHabitCountType } from "@/lib/new-types";

import { FormIconPicker } from "@/components/form/form-icon-picker";
import { iconMapper } from "@/lib/icons/icon-mapper";
import { Edit2Icon, PaletteIcon, Trash2Icon } from "lucide-react";
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
  const Icon = iconMapper[data.project.icon];
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
      <Icon
        fill={data.project.icon_color}
        color={data.project.icon_color}
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
      <FormIconPicker
        id="icon"
        child={
          <Icon
            color={data.project.icon_color}
            className="mr-2 h-4 w-4  flex-shrink-0"
          />
        }
      />

      <div className="w-full min-w-0">
        {/*{data.project.name}*/}
        {data.project && (
          <span
            className={cn(
              "ml-auto",
              data.variant === "default" && "text-background dark:text-white"
            )}
          >
            {data.project.name}
          </span>
        )}
      </div>
      <div className="flex-shrink-0 ml-2">{data.project.habitCount}</div>
    </div>
  );
  const wrapper = data.wrapper ?? ((children) => children);
  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem className=" rounded-md">
          <div className="flex flex-row items-center">
            <Edit2Icon className="w-4 h-4" />
            <div className="w-2" />
            Rename
          </div>
        </ContextMenuItem>
        <ContextMenuItem className=" rounded-md">
          <div className="flex flex-row items-center">
            <PaletteIcon className="w-4 h-4" />
            <div className="w-2" />
            Change Color
          </div>
        </ContextMenuItem>
        <ContextMenuItem className=" rounded-md">
          <div className="flex flex-row items-center">
            <Trash2Icon className="w-4 h-4" />
            <div className="w-2" />
            Delete
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

{
  /* <ContextMenu>
  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
  Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
  <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu> */
}
