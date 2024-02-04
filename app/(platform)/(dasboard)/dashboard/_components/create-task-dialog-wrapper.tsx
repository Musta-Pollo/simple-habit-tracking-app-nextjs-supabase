"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { createTask } from "@/actions/create-task";
import { FormInput } from "@/components/form/form-input";
import { FormProjectPicker } from "@/components/form/form-project-picker";
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

interface CreateTaskDialogWrapperProps {
  children: React.ReactNode;
  allProjects: Tables<"Project">[];
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
    const projectId = formData.get("projectId") as string;
    const name = formData.get("name") as string;
    const days = [1];
    const week_days = [1];
    const start_date = new Date();
    const frequencyType = "daily";
    const interval = 1;
    const icon = "calendar";
    const reminders = [60 * 6];
    execute({
      projectId,
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
        className="sm:max-w-[425px]"
        side={side}
        sideOffset={sideOffset}
        align={align}
      >
        <div className="text-lg font-semibold text-start text-neutral-300 pb-4 ">
          Create Task
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 w-full">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="w-full col-span-3">
                <FormInput
                  id="name"
                  placeholder="Enter your task name"
                  className="col-span-3 flex-grow"
                  required
                  autoFocus
                  errors={fieldErrors}
                />
              </div>
            </div>
            <FormProjectPicker
              className="grid grid-cols-4 items-center gap-4"
              id="projectId"
              fieldErrors={fieldErrors}
              allProjects={allProjects}
            />
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
          {/* <DialogFooter> */}
          <FormSubmit>Create</FormSubmit>
          {/* </DialogFooter> */}
        </form>
      </PopoverContent>
    </Popover>
  );
};
