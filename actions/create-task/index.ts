"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbServer from "@/lib/db_server";
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
  const { name, projectId, icon, startDate, amount, partOfDay, iconColor } =
    data;

  console.log("Create data", data);

  let project;
  try {
    console.log("Creating habit");
    var { data: projectData, error } = await db
      .from("habits")
      .insert([
        {
          userid: user.id,
          created_at: new Date().toISOString(),
          name,
          projectid: projectId,
          icon,
          icon_color: iconColor,
          amount,
          part_of_day: partOfDay,
          start_date: startDate.toISOString(),
        },
      ])
      .select();
    console.log({ projectData, error });
    project = projectData![0];
    console.log("Project created");
  } catch (error) {
    console.error("Failed to create project", error);
    return {
      error: "Failed to create habit.",
    };
  }
  console.log("Project created end", project);
  revalidatePath(`/dashboard`);
  return { data: project };
};

export const createTask = createSaveAction(handler, CreateHabit);
