"use server";

import { createSaveAction } from "@/lib/create-save-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateProject } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  console.log("Creating project start");
  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    console.log("Unauthorized");
    return {
      error: "Unauthorized",
    };
  }

  //We can use it, because it is already validated
  const { name, color } = data;

  let project;
  try {
    console.log("Creating project");
    var { data: projectData, error } = await db.from("Project").insert([
      {
        color,
        name,
      },
    ]);
    if (error) {
      return {
        error: "Failed to create project.",
      };
    }
    project = projectData![0];
    console.log("Project created");
  } catch (error) {
    console.error("Failed to create project", error);
    return {
      error: "Failed to create board.",
    };
  }
  console.log("Project created end", project);
  revalidatePath(`/dashboard`);
  return { data: project };
};

export const createProject = createSaveAction(CreateProject, handler);
