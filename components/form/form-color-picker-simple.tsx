"use client";

import { Check } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FormColorPickerSimpleProps {
  id: string;
  selectedColor: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const FormColorSimplePicker = ({
  id,
  setColor,
  selectedColor,
}: FormColorPickerSimpleProps) => {
  const { pending } = useFormStatus();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="px-2 py-0"
            onClick={() => setOpen(true)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: selectedColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 z-50">
          <div className="grid grid-cols-5 h-full gap-4 items-center justify-center justify-items-center ">
            {hexColors.map((color) => {
              return (
                <div
                  onClick={() => {
                    setOpen(false);
                    return setColor(color);
                  }}
                  key={color}
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: color,
                  }}
                >
                  {selectedColor === color ? (
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

export const hexColors = [
  "#E42424", // Red
  "#3535B6", // Blue
  "#0FCA0F", // Green
  "#FFFF00", // Yellow
  "#E708E7", // Purple
  "#FFC0CB", // Pink
  "#8610DB", // Indigo
  "#02B7B7", // Teal
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#000000", // Default
];
