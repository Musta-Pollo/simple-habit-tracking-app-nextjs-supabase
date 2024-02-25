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

interface FormFrequencyPickerProps {
  id: string;
}

export const FormFrequencyPicker = ({ id }: FormFrequencyPickerProps) => {
  const { pending } = useFormStatus();
  const [frequencyType, setFrequencyType] =
    useState<Enums<"FrequencyType">>("per day");
  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={frequencyType}
        className="hidden"
      />

      <Select
        onValueChange={(value) =>
          setFrequencyType(value as Enums<"FrequencyType">)
        }
        value={frequencyType}
        disabled={pending}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="per day">Per Day</SelectItem>
            <SelectItem value="per week">Per Week</SelectItem>
            <SelectItem value="per month">Per Month</SelectItem>
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
