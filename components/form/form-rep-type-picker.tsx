"use client";

import { Enums } from "@/supabase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface FormRepTypePickerProps {
  id: string;
}

import { useState } from "react";
import { useFormStatus } from "react-dom";

export const FormRepTypePicker = ({ id }: FormRepTypePickerProps) => {
  const { pending } = useFormStatus();
  const [repeatType, setRepeatType] = useState<Enums<"repeatType">>("times");
  return (
    <div className="flex flex-col">
      <input
        type="text"
        id={id}
        name={id}
        value={repeatType}
        className="hidden"
      />
      <Select
        onValueChange={(value) => setRepeatType(value as Enums<"repeatType">)}
        disabled={pending}
        value={repeatType}
      >
        <SelectTrigger className="">
          <SelectValue defaultValue="times" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Projects</SelectLabel> */}
            <SelectItem value="times">Times</SelectItem>
            <SelectItem value="mins">Mins</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

interface ProjectSelectItemProps {
  color: string;
  name: string;
  projectId: string;
}
