import { ActionState } from "@/lib/create-save-action";
import { Tables } from "@/supabase";
import { z } from "zod";
import { CreateHabit } from "./schema";

export type InputType = z.infer<typeof CreateHabit>;
export type ReturnType = ActionState<InputType, Tables<"habits">>;
