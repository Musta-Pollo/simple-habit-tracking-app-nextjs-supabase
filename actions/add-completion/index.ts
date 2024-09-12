"use server";

import { createSaveAction } from "@/lib/create-save-action";
import dbActions from "@/lib/db_actions";
import { CompletionAddedRemoved } from "@/lib/new-types";
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

  const { day, habit_id, drop, user_id } = data;

  let completionRes: CompletionAddedRemoved;

  if (drop) {
    const firstDay = new Date(day);
    const secondDay = new Date(firstDay);
    secondDay.setDate(firstDay.getDate() + 1);

    const firstDayStr = firstDay.toISOString().split("T")[0];
    const seconDayStr = secondDay.toISOString().split("T")[0];

    const { error } = await db
      .from("completions")
      .delete()
      .eq("habit_id", habit_id)
      .eq("user_id", user_id)
      .gte("day", firstDayStr)
      .lt("day", seconDayStr);

    if (error) {
      console.error("Failed to delete completions", error);
      return {
        error: "Failed to delete completions",
      };
    }

    revalidatePath(`/dashboard`);
    return {
      error: undefined,
      data: (completionRes = {
        completionAdded: false,
        completionsRemoved: true,
        day,
      }),
    };
  }

  const { error } = await db.from("completions").insert([
    {
      day: day.toISOString(),
      habit_id,
      user_id,
    },
  ]);

  if (error) {
    console.error("Failed to add completion", error);
    return {
      error: "Failed to add completion",
    };
  }

  console.log("Completion added");
  revalidatePath(`/dashboard`);
  return {
    error: undefined,
    data: (completionRes = {
      completionAdded: true,
      completionsRemoved: false,
      day,
    }),
  };
};

export const modifyCompletions = createSaveAction(handler);
