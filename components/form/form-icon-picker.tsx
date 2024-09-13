"use client";

interface FormIconPickerProps {
  id: string;
  child?: React.ReactNode;
  defaultIcon?: string;
  defaultColor?: string;
}

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-dialog";
import { addSpacesToCamelCase } from "@/helpers/string";
import { getIconComponent, iconMapper } from "@/lib/icons/icon-mapper";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FormColorSimplePicker, hexColors } from "./form-color-picker-simple";

export const FormIconPicker = ({
  id,
  child,
  defaultColor,
  defaultIcon,
}: FormIconPickerProps) => {
  const [iconId, setIconId] = useState<string>(defaultIcon ?? "Search");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>(defaultColor ?? hexColors[0]);
  let Icon = iconMapper[iconId];
  const icons = Object.keys(iconMapper);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div>
      <input type="text" id={id} name={id} value={iconId} className="hidden" />
      <input
        type="text"
        id="iconColor"
        name="iconColor"
        value={color}
        className="hidden"
      />
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          asChild
        >
          {child ? (
            child
          ) : (
            <Button variant="outline" className="w-full">
              <div className="flex flex-row flex-grow ">
                <Icon color={color} className="h-4 w-4 flex-shrink-0" />
              </div>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="border rounded-md" align="start">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex-grow font-semibold text-lg">Icon</div>
              <FormColorSimplePicker
                id="iconColor"
                selectedColor={color}
                setColor={setColor}
              />
            </div>
            <div className="bg-background/95 py-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8"
                    value={searchedInput}
                    onInput={(e) => setSearchedInput(e.currentTarget.value)}
                  />
                </div>
              </form>
            </div>
            <div className="h-1" />
            <ScrollArea className="h-48" type="always">
              <div className="grid grid-cols-6 gap-2">
                {(searchedInput.length == 0
                  ? icons.slice(0, 1485)
                  : icons.filter((icon) =>
                      icon.toLowerCase().includes(searchedInput.toLowerCase())
                    )
                ).map((icon, index) => {
                  const Icon2 = getIconComponent(icon);

                  return (
                    <TooltipProvider key={icon}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-8 h-8 p-1"
                            onClick={() => {
                              setIconId(icon);
                              setOpen(false);
                            }}
                          >
                            <Icon2 className="h-4 w-4 flex-shrink-0" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {addSpacesToCamelCase(icon)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ProjectSelectItemProps {
  color: string;
  name: string;
  projectId: string;
}
