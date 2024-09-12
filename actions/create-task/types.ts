import { ActionState } from "@/lib/create-save-action";
import { HabitWithIsDeletedIsEdited } from "@/lib/new-types";
import { z } from "zod";
import { CreateHabit } from "./schema";

export type InputType = z.infer<typeof CreateHabit>;
export type ReturnType = ActionState<InputType, HabitWithIsDeletedIsEdited>;
