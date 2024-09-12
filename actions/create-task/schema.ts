import { ColorHexaTypeSchema } from "@/utils/validation/color-type";
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
  projectId: z
    .string({
      required_error: "Project is required",
      invalid_type_error: "Project must be a string",
    })
    .uuid({
      message: "Invalid project id",
    }),
  id: z.string().uuid().optional(),
  isDelete: z.boolean(),
  // frequencyType: z.enum(["daily", "monthly", "interval"], {
  //   errorMap: (issue, ctx) => {
  //     return { message: "Please select a frequency" };
  //   },
  // }),
  // days: z.number().int().min(1).max(31).array().min(1).max(31),
  // week_days: z.number().int().min(1).max(7).array().min(1).max(7),
  // interval: z.number().int().min(1).max(31),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Start date must be a date",
  }),
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  //repType: z.enum(["times", "mins"], {
  //  errorMap: (issue, ctx) => {
  //    return { message: "Please select a rep type" };
  //  },
  //}),
  partOfDay: z.enum(["Morning", "Afternoon", "Evening", "Any Time"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select a part of day" };
    },
  }),
  daysOfTheWeek: z
    .array(z.boolean())
    .min(7)
    .max(7)
    .refine((days) => days.some((day) => day === true), {
      message: "At least one day must be selected",
    }),
  iconColor: ColorHexaTypeSchema,
  //frequencyType: z.enum(["per day", "per week", "per month"], {
  //  errorMap: (issue, ctx) => {
  //    return { message: "Please select a frequency" };
  //  },
  //}),

  // end_date: z.date().optional(),
  // reminders: z
  //   .number()
  //   .min(0)
  //   .max(60 * 24)
  //   .array()
  //   .min(0)
  //   .max(5),
});
