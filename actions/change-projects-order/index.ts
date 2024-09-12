"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbActions from "@/lib/db_actions";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   console.log("Creating project start");
//   const db = dbServer();
//   const {
//     data: { user },
//   } = await db.auth.getUser();

//   if (!user) {
//     console.log("Unauthorized");
//     return {
//       error: "Unauthorized",
//     };
//   }

//   //We can use it, because it is already validated
//   const { name, color } = data;

//   let project;
//   try {
//     console.log("Creating project");

//     let data = {
//       color,
//       name,
//     };
//     console.log("Creating project", data);
//     var {
//       data: projectData,
//       error,
//       statusText,
//       status,
//       count,
//     } = await db.from("projects").insert([data]).select("*");
//     if (error) {
//       console.error("Failed to create project", error);
//       console.log(
//         `Error ${JSON.stringify(error)}, ${statusText}, ${status}, ${count}`
//       );
//       return {
//         error: "Failed to create project.",
//       };
//     }
//     project = projectData![0];
//     console.log("Project created");
//   } catch (error) {
//     console.error("Failed to create project", error);
//     return {
//       error: "Failed to create board.",
//     };
//   }
//   console.log("Project created end", project);
//   revalidatePath(`/dashboard`);
//   return { data: project };
// };

// "use server";

// import dbActions from "@/lib/db_actions";
// import { Tables } from "@/supabase";
// import { revalidatePath } from "next/cache";
// import { DropResult } from "react-beautiful-dnd";
// import { toast } from "sonner";

const handler = async (data: InputType): Promise<ReturnType> => {
  const db = dbActions();

  const { dropResult, projects } = data;

  if (!dropResult.destination) {
    return {};
  }

  const { error } = await db.from("projects").upsert(
    projects.map((p, index) => {
      return {
        id: p.id,
        name: p.name,
        color_hexa: p.color_hexa,
        userid: p.userid,
        order: index,
        icon: p.icon,
      };
    })
  );
  if (error) {
    console.error("Failed to update project order", error);
    return {
      error: "Failed to update project order",
    };
  } else {
    revalidatePath(`/dashboard`, "layout");
    return {
      data: true,
    };
  }
};

export const updateProjectsOrder = createSaveAction(handler);
