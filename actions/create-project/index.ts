"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbServer from "@/lib/db_server";
import { revalidatePath } from "next/cache";
import { CreateProject } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  console.log("Creating project start");
  const db = dbServer();
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
  const { name, iconColor, icon, order } = data;

  let project;
  try {
    console.log("Creating project");

    let data = {
      name,
      icon_color: iconColor,
      icon,
      userid: user.id,
      order,
    };
    console.log("Creating project", data);
    var {
      data: projectData,
      error,
      statusText,
      status,
      count,
    } = await db.from("projects").insert([data]).select("*");
    if (error) {
      console.error("Failed to create project", error);
      console.log(
        `Error ${JSON.stringify(error)}, ${statusText}, ${status}, ${count}`
      );
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

export const createProject = createSaveAction(handler, CreateProject);
