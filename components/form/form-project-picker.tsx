"use client";

import { Tables } from "@/supabase";
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
  allProjects: Tables<"projects">[];
}

export const FormProjectPicker = ({
  fieldErrors,
  id,
  className,
  allProjects,
}: FormColorPickerProps) => {
  const { pending } = useFormStatus();
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  return (
    <div className={className}>
      <input
        type="text"
        id={id}
        name={id}
        value={projectId}
        className="hidden"
      />
      <Label htmlFor={id} className="text-right">
        Project
      </Label>

      <div className="w-full col-span-3">
        <Select onValueChange={setProjectId} disabled={pending}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projects</SelectLabel>
              {allProjects.map((item, index) => (
                <ProjectSelectItem
                  key={item.name}
                  color={item.color}
                  name={item.name}
                  projectId={item.id}
                />
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormErrors id={id} errors={fieldErrors} />
      </div>
    </div>
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
