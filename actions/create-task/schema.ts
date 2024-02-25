import { z } from "zod";

export const CreateHabit = z.object({
  name: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Minimum lenght of 3 is required",
    })
    .max(255),
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon must be a string",
  }),
  project: z
    .string({
      required_error: "Project is required",
      invalid_type_error: "Project must be a string",
    })
    .uuid({
      message: "Invalid project id",
    }),
  frequencyType: z.enum(["daily", "monthly", "interval"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select a frequency" };
    },
  }),
  days: z.number().int().min(1).max(31).array().min(1).max(31),
  week_days: z.number().int().min(1).max(7).array().min(1).max(7),
  interval: z.number().int().min(1).max(31),
  start_date: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a date",
  }),
  end_date: z.date().optional(),
  reminders: z
    .number()
    .min(0)
    .max(60 * 24)
    .array()
    .min(0)
    .max(5),
});
