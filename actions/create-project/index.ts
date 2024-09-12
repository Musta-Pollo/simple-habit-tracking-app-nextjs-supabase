"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbServer from "@/lib/db_server";
import { ProjectWithIsDeletedIsEdited } from "@/lib/new-types";
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
  const { name, iconColor, icon, order, id, isDelete } = data;

  let project: ProjectWithIsDeletedIsEdited | undefined;
  let createData = {
    name,
    color_hexa: iconColor,
    icon,
    userid: user.id,
    order,
    ...(id && { id: id }),
  };

  if (!isDelete) {
    try {
      console.log("Creating project");

      console.log("Creating project", data);
      var {
        data: projectData,
        error,
        statusText,
        status,
        count,
      } = await db.from("projects").upsert([createData]).select("*");
      if (error) {
        console.error("Failed to create project", error);
        console.log(
          `Error ${JSON.stringify(error)}, ${statusText}, ${status}, ${count}`
        );
        return {
          error: "Failed to create project.",
        };
      }
      project = {
        ...projectData![0],
        isDeleted: false,
        isEdited: id ? true : false,
      };
      console.log("Project created");
    } catch (error) {
      console.error("Failed to create project", error);
      return {
        error: "Failed to create board.",
      };
    }
  }
  let projectId = id;
  if (isDelete && projectId) {
    try {
      console.log("Deleting project");
      var {
        data: projectData,
        error,
        statusText,
        status,
        count,
      } = await db.from("projects").delete().eq("id", projectId).select("*");
      if (error) {
        console.error("Failed to delete project", error);
        console.log(
          `Error ${JSON.stringify(error)}, ${statusText}, ${status}, ${count}`
        );
        return {
          error: "Failed to delete project.",
        };
      }
      project = {
        ...projectData![0],
        isDeleted: true,
        isEdited: false,
      };
      console.log("Project deleted");
    } catch (error) {
      console.error("Failed to delete project", error);
      return {
        error: "Failed to delete project.",
      };
    }
  }
  console.log("Project  / delete end", project);
  revalidatePath(`/dashboard`);
  return { data: project };
};

export const createProject = createSaveAction(handler, CreateProject);
