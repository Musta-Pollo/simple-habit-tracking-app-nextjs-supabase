import { ColorHexaTypeSchema } from "@/utils/validation/color-type";
import { z } from "zod";

export const CreateProject = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, {
      message: "Minimum lenght of 3 is required",
    })
    .max(255),
  iconColor: ColorHexaTypeSchema,
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon must be a string",
  }),
  order: z.number({
    required_error: "Order is required",
    invalid_type_error: "Order must be a number",
  }),
  id: z.string().uuid().optional(),
  isDelete: z.boolean(),
});
