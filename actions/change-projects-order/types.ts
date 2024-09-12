import { ActionState } from "@/lib/create-save-action";
import { Tables } from "@/supabase";
import { DropResult } from "react-beautiful-dnd";

export type InputType = {
  projects: Tables<"projects">[];
  dropResult: DropResult;
};
export type ReturnType = ActionState<InputType, boolean>;
