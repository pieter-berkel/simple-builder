import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-sb-input bg-sb-background px-3 py-1 text-sm ring-offset-sb-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sb-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sb-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

type AdvancedInputProps = {
  prepend?: React.ReactNode;
  append?: React.ReactNode;
} & InputProps;

const AdvancedInput = React.forwardRef<HTMLInputElement, AdvancedInputProps>(
  ({ prepend, append, ...props }, ref) => {
    return (
      <div className="relative">
        <Input ref={ref} className="pl-9 pr-7 text-right" {...props} />
        {prepend && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            {prepend}
          </div>
        )}
        {append && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {append}
          </div>
        )}
      </div>
    );
  },
);

AdvancedInput.displayName = "AdvancedInput";

export { Input, AdvancedInput };
