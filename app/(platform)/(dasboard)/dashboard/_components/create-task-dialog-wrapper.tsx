"use client";

import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { createTask } from "@/actions/create-task";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormFrequencyPicker } from "@/components/form/form-frequency-picker";
import { FormIconPicker } from "@/components/form/form-icon-picker";
import { FormInput } from "@/components/form/form-input";
import { FormNumberPicker } from "@/components/form/form-number-picker";
import { FormPartOfDayPicker } from "@/components/form/form-part-of-day-picker";
import { FormProjectPicker } from "@/components/form/form-project-picker";
import { FormRepTypePicker } from "@/components/form/form-rep-type-picker";
import { FormSubmit } from "@/components/form/form-submit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tables } from "@/supabase";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { useFormStatus } from "react-dom";
import InputItem from "./input-item";

interface CreateTaskDialogWrapperProps {
  children: React.ReactNode;
  allProjects: Tables<"projects">[];
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const CreateTaskDialogWrapper = ({
  children,
  allProjects,
  side = "bottom",
  sideOffset = 0,
  align,
}: CreateTaskDialogWrapperProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { pending } = useFormStatus();
  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.name}" created`);
      closeRef.current?.click();
      console.log("Success");
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const projectId = formData.get("project") as string;
    const name = formData.get("name") as string;
    const days = [1];
    const week_days = [1];
    const start_date = new Date();
    const frequencyType = "daily";
    const interval = 1;
    const icon = "calendar";
    const reminders = [60 * 6];
    execute({
      project: projectId,
      name,
      days,
      week_days,
      start_date,
      frequencyType,
      interval,
      icon,
      reminders,
    });
    console.log("onSubmit");
    console.log(formData);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="max-w-[1200px] min-w-[400px]"
        side={side}
        sideOffset={sideOffset}
        align={align}
      >
        <div className="text-lg font-semibold text-start text-neutral-300 pb-4 ">
          Habit
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          {/* <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader> */}
          <div className="grid gap-4 py-4 grid-cols-8 w-auto justify-stretch items-stretch">
            <div className="col-span-6">
              <InputItem label="name">
                <FormInput
                  id="name"
                  placeholder="Enter your task name"
                  className="flex-grow"
                  required
                  autoFocus
                  errors={fieldErrors}
                />
              </InputItem>
            </div>
            <div className="col-span-2">
              <InputItem label="icon">
                <div className="w-full">
                  <FormIconPicker
                    id="icon"
                    fieldErrors={fieldErrors}
                    allProjects={allProjects}
                  />
                </div>
              </InputItem>
            </div>
            <div className="col-span-4">
              <InputItem label="project">
                <FormProjectPicker
                  id="project"
                  fieldErrors={fieldErrors}
                  allProjects={allProjects}
                />
              </InputItem>
            </div>
            <div className="col-span-2">
              <InputItem label="amount">
                <FormNumberPicker id="amount" />
              </InputItem>
            </div>
            <div className="col-span-2">
              <InputItem label="repType">
                <FormRepTypePicker id="repType" />
              </InputItem>
            </div>

            <div className="col-span-4">
              <InputItem label="partOfDay">
                <FormPartOfDayPicker id="partOfDay" />
              </InputItem>
            </div>
            <div className="col-span-4">
              <InputItem label="frequencyType">
                <FormFrequencyPicker id="frequencyType" />
              </InputItem>
            </div>

            <div className="col-span-8">
              <InputItem label="startDate">
                <FormDatePicker id="startDate" />
              </InputItem>
            </div>
          </div>
          {/* <DialogFooter> */}
          <FormSubmit>Create</FormSubmit>
          {/* </DialogFooter> */}
        </form>
      </PopoverContent>
    </Popover>
  );
};
