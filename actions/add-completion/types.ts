import { ActionState } from "@/lib/create-save-action";
import { CompletionAddedRemoved } from "@/lib/new-types";
import { z } from "zod";
import { ModifyCompletions } from "./schema";

export type InputType = z.infer<typeof ModifyCompletions>;
export type ReturnType = ActionState<InputType, CompletionAddedRemoved>;
