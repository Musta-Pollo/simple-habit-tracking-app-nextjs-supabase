"use client";

import { createProject } from "@/actions/create-project";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { ColorsType } from "@/actions/create-project/schema";
import { FormColorPicker } from "@/components/form/form-color-picker";
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
    const color = formData.get("color") as ColorsType;
    const name = formData.get("name") as string;
    execute({ color, name });
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
                  placeholder="Enter your project name"
                  className="col-span-3 flex-grow"
                  required
                  autoFocus
                  errors={fieldErrors}
                />
              </div>
            </div>
            <FormColorPicker
              className="grid grid-cols-4 items-center gap-4"
              id="color"
              fieldErrors={fieldErrors}
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
