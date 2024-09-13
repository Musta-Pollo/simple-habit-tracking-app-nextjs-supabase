"use client";

import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

import { createTask } from "@/actions/create-task";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { DaysOfTheWeekPicker } from "@/components/form/form-days-of-the-week-picker";
import { FormIconPicker } from "@/components/form/form-icon-picker";
import { FormInput } from "@/components/form/form-input";
import { FormNumberPicker } from "@/components/form/form-number-picker";
import { FormPartOfDayPicker } from "@/components/form/form-part-of-day-picker";
import { FormProjectPicker } from "@/components/form/form-project-picker";
import { FormSubmit } from "@/components/form/form-submit";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "@/hooks/use-app-store";
import { Habit } from "@/lib/new-types";
import { Enums, Tables } from "@/supabase";
import { habitExtensions } from "@/utils/types-extensions/habit-extension";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import InputItem from "./input-item";

interface CreateTaskDialogWrapperProps {
  children: React.ReactNode;
  allProjects: Tables<"projects">[];
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  initialValue?: Habit;
  isDialog: boolean;
  isSheet: boolean;
}

export const CreateTaskDialogWrapper = ({
  children,
  allProjects,
  side = "bottom",
  sideOffset = 0,
  align,
  initialValue,
  isDialog,
  isSheet,
}: CreateTaskDialogWrapperProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { pending } = useFormStatus();
  const [isDelete, setIsDelete] = useState(false);
  const isEditing = initialValue != null;
  const setSelectedHabitId = useAppStore(
    (state) => state.searchSettings.setSelectedHabitId
  );
  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (data) => {
      if (data.isDeleted) {
        router.replace(`/dashboard/`);
        setSelectedHabitId(undefined);
        toast.success(`Habit "${data.name}" deleted`);
      } else if (data.isEdited) {
        toast.success(`Habit "${data.name}" edited`);
      } else {
        toast.success(`Habit "${data.name}" created`);
      }
      closeRef.current?.click();
      console.log("Success");
    },
    onError: (error) => {
      toast.error(error);
      console.log(error);
    },
  });

  console.log("Field errors", fieldErrors);

  const onSubmit = (formData: FormData) => {
    console.log({ formData });
    const projectId = formData.get("projectId") as string;
    const name = formData.get("name") as string;

    const partOfDay = formData.get("partOfDay") as Enums<"part_of_day">;
    const amount = parseInt(formData.get("amount") as string);
    const startDate = new Date(formData.get("startDate") as string);
    const icon = formData.get("icon") as string;
    const iconColor = formData.get("iconColor") as string;
    const daysOfTheWeek = JSON.parse(
      formData.get("daysOfTheWeek") as string
    ) as boolean[];
    //print iconColor, icon, amount

    console.log("Executing: ", {
      projectId,
      name,
      partOfDay,
      amount,
      startDate,
      icon,
      iconColor,
      daysOfTheWeek,
      isDelete,
      id: initialValue?.id,
    });

    execute({
      projectId,
      name,
      partOfDay,
      amount,
      startDate,
      icon,
      iconColor,
      daysOfTheWeek,
      isDelete,
      id: initialValue?.id,
    });
    console.log("onSubmit");
    console.log(formData);
  };

  const formContent = (
    <form action={onSubmit}>
      <div className="grid gap-4 py-4 grid-cols-8 w-auto justify-stretch items-stretch">
        <div className="col-span-6">
          <InputItem label="name">
            <FormInput
              id="name"
              placeholder="Enter your habit name"
              className="flex-grow"
              required
              defaultValue={initialValue?.name ?? undefined}
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
                defaultIcon={initialValue?.icon ?? undefined}
                defaultColor={initialValue?.color_hexa ?? undefined}
              />
            </div>
          </InputItem>
        </div>
        <div className="col-span-8">
          <InputItem label="Project">
            <FormProjectPicker
              id="projectId"
              fieldErrors={fieldErrors}
              allProjects={allProjects}
              defaultProjectId={initialValue?.projectid ?? undefined}
            />
          </InputItem>
        </div>
        <div className="col-span-5">
          <InputItem label="partOfDay">
            <FormPartOfDayPicker
              id="partOfDay"
              defaultPartOfDay={initialValue?.part_of_day ?? undefined}
            />
          </InputItem>
        </div>
        <div className="col-span-3">
          <InputItem label="amount">
            <FormNumberPicker
              id="amount"
              defaultAmount={initialValue?.amount}
            />
          </InputItem>
        </div>
        <div className="col-span-8">
          <InputItem label="Days of the Week">
            <DaysOfTheWeekPicker
              id="daysOfTheWeek"
              errors={fieldErrors}
              defaultDaysOfTheWeek={
                initialValue && habitExtensions.getHabitDays(initialValue)
              }
            />
          </InputItem>
        </div>
        {/*
      <div className="col-span-2">
        <InputItem label="repType">
          <FormRepTypePicker id="repType" />
        </InputItem>
      </div>

      <div className="col-span-4">
        <InputItem label="frequencyType">
          <FormFrequencyPicker id="frequencyType" />
        </InputItem>
      </div>
      */}

        <div className="col-span-8">
          <InputItem label="startDate">
            <FormDatePicker
              id="startDate"
              initialValue={
                initialValue?.start_date
                  ? new Date(initialValue.start_date)
                  : undefined
              }
            />
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
  );
  return (
    <>
      {isDialog && (
        <Popover>
          <PopoverTrigger asChild>{children}</PopoverTrigger>
          <PopoverContent
            className="max-w-[1200px] min-w-[400px]"
            side={side}
            sideOffset={sideOffset}
            align={align}
          >
            <div className="text-lg font-semibold text-start text-neutral-300 pb-4 ">
              {isEditing ? "Edit Habit" : "Create Habit"}
            </div>
            <PopoverClose ref={closeRef} asChild>
              <Button
                className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </PopoverClose>
            {formContent}
          </PopoverContent>
        </Popover>
      )}
      {isSheet && (
        <Drawer>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent className="p-4">
            <div className="text-lg font-semibold text-start text-neutral-300 pb-4 ">
              {isEditing ? "Edit Habit" : "Create Habit"}
            </div>
            <DrawerClose ref={closeRef} asChild>
              <Button
                className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>

            {formContent}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
