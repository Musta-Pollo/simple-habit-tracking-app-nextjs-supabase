"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover-dialog";
import { SelectItem } from "../ui/select";

interface FormDatePickerProps {
  id: string;
  initialValue?: Date;
}

export const FormDatePicker = ({ id, initialValue }: FormDatePickerProps) => {
  const { pending } = useFormStatus();
  const [date, setDate] = React.useState<Date>(
    initialValue ?? new Date(Date.now())
  );
  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={format(date, "yyyy-MM-dd")}
        className="hidden"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="w-full justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (date === undefined) return;
              setDate(date);
            }}
            initialFocus
          />
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
