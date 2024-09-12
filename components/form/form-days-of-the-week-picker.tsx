"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { SelectItem } from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { FormErrors } from "./form-errors";

interface DaysOfTheWeekPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  defaultDaysOfTheWeek?: boolean[];
}

export const DaysOfTheWeekPicker = ({
  id,
  errors,
  defaultDaysOfTheWeek,
}: DaysOfTheWeekPickerProps) => {
  const { pending } = useFormStatus();
  const [daysOfTheWeek, setDaysOfTheWeek] = useState(
    defaultDaysOfTheWeek ?? [false, false, false, false, false, false, false]
  );
  const values = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={JSON.stringify(daysOfTheWeek)}
        className="hidden"
      />

      <ToggleGroup
        type="multiple"
        value={values.filter((_, index) => daysOfTheWeek[index])}
        className="flex flex-row"
        onValueChange={(value) => {
          const newDaysOfTheWeek = values.map((day) => value.includes(day));
          setDaysOfTheWeek(newDaysOfTheWeek);
          console.log("New days of the week", newDaysOfTheWeek);
        }}
      >
        <ToggleGroupItem
          value="mon"
          id="mon"
          aria-label="Toggle monday"
          className="flex flex-grow"
        >
          <div>Mo</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="tue"
          aria-label="Toggle tuesday"
          className="flex flex-grow"
        >
          <div>Tu</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="wed"
          aria-label="Toggle wednesday"
          className="flex flex-grow"
        >
          <div>We</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="thu"
          aria-label="Toggle thursday"
          className="flex flex-grow"
        >
          <div>Th</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="fri"
          aria-label="Toggle friday"
          className="flex flex-grow"
        >
          <div>Fr</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="sat"
          aria-label="Toggle saturday"
          className="flex flex-grow"
        >
          <div>Sa</div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="sun"
          aria-label="Toggle sunday"
          className="flex flex-grow"
        >
          <div>Su</div>
        </ToggleGroupItem>
      </ToggleGroup>
      <FormErrors id={id} errors={errors} />
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
