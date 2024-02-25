"use client";

import { Check } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SelectItem } from "../ui/select";

interface FormColorPickerSimpleProps {
  id: string;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const FormColorSimplePicker = ({
  id,
  setColor,
  color,
}: FormColorPickerSimpleProps) => {
  const { pending } = useFormStatus();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <input type="text" id={id} name={id} value={color} className="hidden" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="px-2 py-0"
            onClick={() => setOpen(true)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: color }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid grid-cols-5 h-full gap-4 items-center justify-center justify-items-center ">
            {colors.map((item, index) => {
              console.log(`Color is selected  ${item.name == color}`);
              return (
                <div
                  onClick={() => {
                    setOpen(false);
                    return setColor(item.color);
                  }}
                  key={item.name}
                  className="w-5 h-5 rounded-full"
                  style={{ background: item.color }}
                >
                  {item.color === color ? (
                    <div className="flex flex-row justify-center items-center">
                      <Check
                        strokeWidth={3}
                        className="w-5 h-5 text-background m-auto p-1"
                      />
                    </div>
                  ) : (
                    // </div>
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ColorSelectItemProps {
  color: string;
  name: string;
}

const ColorSelectItem = ({ color, name }: ColorSelectItemProps) => {
  return (
    <SelectItem value={color}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        <div>{name}</div>
      </div>
    </SelectItem>
  );
};

const colors = [
  { color: "red", name: "Apple" },
  { color: "blue", name: "Blueberry" },
  { color: "orange", name: "Orange" },
  { color: "green", name: "Pineapple" },
  { color: "yellow", name: "Banana" },
  { color: "purple", name: "Grape" },
  { color: "pink", name: "Strawberry" },
  { color: "indigo", name: "Indigo" },
  { color: "teal", name: "Teal" },
  { color: "cyan", name: "Cyan" },
];
