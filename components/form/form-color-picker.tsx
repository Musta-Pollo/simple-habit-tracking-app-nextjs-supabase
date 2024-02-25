"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormErrors } from "./form-errors";

interface FormColorPickerProps {
  fieldErrors?: Record<string, string[] | undefined>;
  id: string;
  className?: string;
}

export const FormColorPicker = ({
  fieldErrors,
  id,
  className,
}: FormColorPickerProps) => {
  const { pending } = useFormStatus();
  const [color, setColor] = useState<string | undefined>("red");
  return (
    <div className={className}>
      <input type="text" id={id} name={id} value={color} className="hidden" />
      <Label htmlFor="color" className="text-right">
        Color
      </Label>

      <div className="w-full col-span-3">
        <Select onValueChange={setColor} disabled={pending} value={color}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {colors.map((item, index) => (
                <ColorSelectItem
                  key={item.name}
                  color={item.color}
                  name={item.name}
                />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormErrors id="color" errors={fieldErrors} />
      </div>
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
