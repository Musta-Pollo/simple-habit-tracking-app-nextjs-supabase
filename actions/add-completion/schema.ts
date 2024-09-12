import { z } from "zod";

export const ModifyCompletions = z.object({
  habit_id: z.string().uuid(),
  day: z.date(),
  drop: z.boolean().default(false),
  user_id: z.string().uuid(),
});
