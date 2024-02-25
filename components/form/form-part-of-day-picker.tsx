"use client";

import { Enums } from "@/supabase";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormPartOfDayPickerProps {
  id: string;
}

export const FormPartOfDayPicker = ({ id }: FormPartOfDayPickerProps) => {
  const { pending } = useFormStatus();
  const [partOfDay, setPartOfDay] = useState<Enums<"partOfDay">>("any time");
  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={partOfDay}
        className="hidden"
      />

      <Select
        onValueChange={(value) => setPartOfDay(value as Enums<"partOfDay">)}
        value={partOfDay}
        disabled={pending}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a part of day" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="any time">Any Time</SelectItem>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="afternoon">Afternoon</SelectItem>
            <SelectItem value="evening">Evening</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
