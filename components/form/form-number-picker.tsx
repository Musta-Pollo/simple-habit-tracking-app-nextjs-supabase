"use client";

import { SelectItem } from "../ui/select";
interface FormNumberPickerProps {
  id: string;
}

import { useState } from "react";
import { Input } from "../ui/input";

export const FormNumberPicker = ({ id }: FormNumberPickerProps) => {
  const [amount, setAmount] = useState<number>(1);
  return (
    <Input
      type="number"
      name={id}
      key={id}
      min="1"
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
    />
  );
};

interface ProjectSelectItemProps {
  color: string;
  name: string;
  projectId: string;
}

const ProjectSelectItem = ({
  color,
  name,
  projectId,
}: ProjectSelectItemProps) => {
  return (
    <SelectItem value={projectId}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        <div>{name}</div>
      </div>
    </SelectItem>
  );
};
