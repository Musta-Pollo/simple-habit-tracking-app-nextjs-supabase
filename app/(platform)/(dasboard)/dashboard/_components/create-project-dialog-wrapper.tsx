"use client";

import { createProject } from "@/actions/create-project";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { ColorsType } from "@/actions/create-project/schema";
import { FormIconPicker } from "@/components/form/form-icon-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import InputItem from "./input-item";

interface CreateProjectDialogWrapperProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const CreateProjectDialogWrapper = ({
  children,
  side,
  sideOffset,
  align,
}: CreateProjectDialogWrapperProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createProject, {
    onSuccess: (data) => {
      toast.success(`Project "${data.name}" created`);
      closeRef.current?.click();
      console.log("Success");
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const iconColor = formData.get("iconColor") as ColorsType;
    const icon = formData.get("icon") as ColorsType;
    const name = formData.get("name") as string;
    execute({ iconColor, icon, name });
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
          Create Project
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
                  errors={fieldErrors}
                />
              </InputItem>
            </div>
            <div className="col-span-2">
              <InputItem label="icon">
                <div className="w-full">
                  <FormIconPicker id="icon" />
                </div>
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
