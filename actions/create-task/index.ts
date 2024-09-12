"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbServer from "@/lib/db_server";
import { HabitWithIsDeletedIsEdited } from "@/lib/new-types";
import { revalidatePath } from "next/cache";
import { CreateHabit } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const db = dbServer();
  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  //We can use it, because it is already validated
  const {
    name,
    projectId,
    icon,
    startDate,
    amount,
    partOfDay,
    iconColor,
    daysOfTheWeek,
    isDelete,
    id,
  } = data;
  const createData = {
    userid: user.id,
    created_at: new Date().toISOString(),
    name,
    projectid: projectId,
    icon,
    color_hexa: iconColor,
    amount,
    part_of_day: partOfDay,
    start_date: startDate.toISOString(),
    monday: daysOfTheWeek[0],
    tuesday: daysOfTheWeek[1],
    wednesday: daysOfTheWeek[2],
    thursday: daysOfTheWeek[3],
    friday: daysOfTheWeek[4],
    saturday: daysOfTheWeek[5],
    sunday: daysOfTheWeek[6],

    ...(id && { id: id }),
  };

  let habit: HabitWithIsDeletedIsEdited | undefined;

  if (!isDelete) {
    console.log("Create data", data);

    try {
      console.log("Creating habit");
      var { data: habitData, error } = await db
        .from("habits")
        .upsert([createData])
        .select("*");
      console.log({ projectData: habitData, error });
      habit = {
        ...habitData![0],
        isDeleted: false,
        isEdited: id ? true : false,
      };
      console.log("Project created");
    } catch (error) {
      console.error("Failed to create habit", error);
      return {
        error: "Failed to create habit.",
      };
    }
  }
  if (isDelete && id) {
    try {
      console.log("Delete habit");
      var { data: habitData, error } = await db
        .from("habits")
        .delete()
        .eq("id", id)
        .select("*");
      habit = {
        ...habitData![0],
        isDeleted: true,
        isEdited: false,
      };
      console.log("habit created");
    } catch (error) {
      console.error("Failed to create habit", error);
      return {
        error: "Failed to create habit.",
      };
    }
  }
  console.log("Habit created end", habit);
  revalidatePath(`/dashboard`);
  return { data: habit };
};

export const createTask = createSaveAction(handler, CreateHabit);
