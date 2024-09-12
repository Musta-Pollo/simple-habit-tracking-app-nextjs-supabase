import { ActionState } from "@/lib/create-save-action";
import { ProjectWithIsDeletedIsEdited } from "@/lib/new-types";
import { z } from "zod";
import { CreateProject } from "./schema";

export type InputType = z.infer<typeof CreateProject>;
export type ReturnType = ActionState<InputType, ProjectWithIsDeletedIsEdited>;
