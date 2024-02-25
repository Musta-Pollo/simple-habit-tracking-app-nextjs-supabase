import { z } from "zod";

export const ColorsTypeSchema = z.enum(
  [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "indigo",
    "teal",
    "cyan",
    "orange",
  ],
  {
    // required_error: "Color is required",
    // invalid_type_error: "Color must be a string",
    description: "Color of the project",
    errorMap: (issue, ctx) => {
      return { message: "Please select a color" };
    },
  }
);

export type ColorsType = z.infer<typeof ColorsTypeSchema>;

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
  iconColor: ColorsTypeSchema,
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon must be a string",
  }),
});
