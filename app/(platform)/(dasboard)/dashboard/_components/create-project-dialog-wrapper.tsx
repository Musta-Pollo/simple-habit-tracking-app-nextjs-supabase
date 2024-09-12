"use client";

import { createProject } from "@/actions/create-project";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { FormIconPicker } from "@/components/form/form-icon-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProjectPlusHabitCountType } from "@/lib/new-types";
import { X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import InputItem from "./input-item";

interface CreateProjectDialogWrapperProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  nextOrder: number;
  initialValue?: ProjectPlusHabitCountType;
}

export const CreateProjectDialogWrapper = ({
  children,
  side,
  sideOffset,
  align,
  nextOrder,
  initialValue,
}: CreateProjectDialogWrapperProps) => {
  const isEditing = initialValue != null;
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isDelete, setIsDelete] = useState(false);
  const { execute, fieldErrors } = useAction(createProject, {
    onSuccess: (data) => {
      if (data.isDeleted) {
        toast.success(`Project "${data.name}" deleted`);
        console.log("Project deleted");
      } else if (data.isEdited) {
        toast.success(`Project "${data.name}" edited`);
      } else {
        toast.success(`Project "${data.name}" created`);
      }
      closeRef.current?.click();
      console.log("Success");
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const iconColor = formData.get("iconColor") as string;
    const icon = formData.get("icon") as string;
    const name = formData.get("name") as string;
    execute({
      iconColor,
      icon,
      name,
      order: initialValue?.order ?? nextOrder,
      id: isEditing ? initialValue.id : undefined,
      isDelete,
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
          {isEditing ? `Edit Project` : "Create Project"}
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
          <div className="grid gap-4 py-4 grid-cols-8 w-auto justify-stretch items-stretch">
            <div className="col-span-6">
              <InputItem label="name">
                <FormInput
                  id="name"
                  placeholder="Enter your task name"
                  className="flex-grow"
                  required
                  autoFocus
                  defaultValue={initialValue?.name}
                  errors={fieldErrors}
                />
              </InputItem>
            </div>
            <div className="col-span-2">
              <InputItem label="icon">
                <div className="w-full">
                  <FormIconPicker
                    id="icon"
                    defaultColor={initialValue?.color_hexa}
                    defaultIcon={initialValue?.icon}
                  />
                </div>
              </InputItem>
            </div>
          </div>
          {/* <DialogFooter> */}
          <div className="flex flex-row justify-between">
            <FormSubmit>{isEditing ? "Save" : "Create"}</FormSubmit>
            {isEditing && (
              <div
                onClick={() => {
                  setIsDelete(true);
                }}
              >
                <FormSubmit variant="destructive">Delete</FormSubmit>
              </div>
            )}
          </div>
          {/* </DialogFooter> */}
        </form>
      </PopoverContent>
    </Popover>
  );
};
