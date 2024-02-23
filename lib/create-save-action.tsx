import { z } from "zod";

export type FieldErrors<T> = {
  [P in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSaveAction = <TInput, TOutput>(
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>,
  schema?: z.Schema<TInput>
) => {
  {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
      if (schema) {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
          return {
            fieldErrors: validationResult.error.flatten()
              .fieldErrors as FieldErrors<TInput>,
          };
        }

        return handler(validationResult.data);
      }
      return handler(data);
    };
  }
};
