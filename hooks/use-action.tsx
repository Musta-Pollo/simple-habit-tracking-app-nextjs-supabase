import { ActionState, FieldErrors } from "@/lib/create-save-action";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        console.log("execute");
        const result = await action(input);
        console.log(result);
        if (!result) {
          return;
        }
        console.log("Result Ok");
        setFieldErrors(result.fieldErrors);
        if (result.error) {
          console.log(result.error);
          setError(result.error);
          options.onError?.(result.error);
          console.log("Errors occured");
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
          console.log("Has Data");
        }
        console.log("End");
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
