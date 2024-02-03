"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      autoFocus,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            ref={ref}
            id={id}
            name={id}
            type="text"
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            defaultValue={defaultValue}
            className={cn(className)}
            aria-describedby={`${id}-error`}
            autoFocus={autoFocus}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
