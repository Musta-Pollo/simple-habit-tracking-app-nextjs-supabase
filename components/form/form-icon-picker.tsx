"use client";

import { Tables } from "@/supabase";
interface FormIconPickerProps {
  fieldErrors?: Record<string, string[] | undefined>;
  id: string;
  allProjects: Tables<"projects">[];
}

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addSpacesToCamelCase } from "@/helpers/string";
import { iconMapper } from "@/lib/icons/icon-mapper";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FormColorSimplePicker } from "./form-color-picker-simple";

export const FormIconPicker = ({
  fieldErrors,
  id,
  allProjects,
}: FormIconPickerProps) => {
  const [iconId, setIconId] = useState<string>("Search");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>("red");
  let Icon = iconMapper[iconId];
  const icons = Object.keys(iconMapper);
  console.log("icons", icons);
  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          <div className="flex flex-row flex-grow ">
            <Icon color={color} className="h-4 w-4 flex-shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border rounded-md" align="start">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex-grow font-semibold text-lg">Icon</div>
            <FormColorSimplePicker
              id="icon_color"
              color={color}
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
                const Icon2 = iconMapper[icon];
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
  );
};

interface ProjectSelectItemProps {
  color: string;
  name: string;
  projectId: string;
}
