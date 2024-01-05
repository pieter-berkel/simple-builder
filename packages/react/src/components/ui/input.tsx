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
          "sb-flex sb-h-8 sb-w-full sb-font-roboto sb-rounded-md sb-border sb-border-input sb-bg-background sb-px-3 sb-py-1 sb-text-sm sb-ring-offset-background file:sb-border-0 file:sb-bg-transparent file:sb-text-sm file:sb-font-medium placeholder:sb-text-muted-foreground focus-visible:sb-outline-none focus-visible:sb-ring-1 focus-visible:ring-sb-ring focus-visible:sb-ring-offset-2 disabled:sb-cursor-not-allowed disabled:sb-opacity-50",
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
      <div className="sb-relative">
        <Input ref={ref} className="sb-pl-9 sb-pr-7 sb-text-right" {...props} />
        {prepend && (
          <div className="sb-absolute sb-font-roboto sb-top-1/2 sb-left-3 sb--translate-y-1/2">
            {prepend}
          </div>
        )}
        {append && (
          <div className="sb-absolute sb-font-roboto sb-top-1/2 sb-right-3 sb--translate-y-1/2">
            {append}
          </div>
        )}
      </div>
    );
  },
);

AdvancedInput.displayName = "AdvancedInput";

export { Input, AdvancedInput };
