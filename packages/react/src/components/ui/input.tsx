import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "sb:flex sb:h-9 sb:w-full sb:rounded-md sb:border sb:border-input sb:bg-transparent sb:px-3 sb:py-1 sb:text-base sb:shadow-sm sb:transition-colors sb:file:border-0 sb:file:bg-transparent sb:file:text-sm sb:file:font-medium sb:file:text-foreground sb:placeholder:text-muted-foreground sb:focus-visible:outline-hidden sb:focus-visible:ring-1 sb:focus-visible:ring-ring sb:disabled:cursor-not-allowed sb:disabled:opacity-50 sb:md:text-sm",
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
      <div className="sb:relative">
        <Input ref={ref} className="sb:pl-9 sb:pr-7 sb:text-right" {...props} />
        {prepend && (
          <div className="sb:absolute sb:font-roboto sb:top-1/2 sb:left-3 sb:-translate-y-1/2">
            {prepend}
          </div>
        )}
        {append && (
          <div className="sb:absolute sb:font-roboto sb:top-1/2 sb:right-3 sb:-translate-y-1/2">
            {append}
          </div>
        )}
      </div>
    );
  },
);

AdvancedInput.displayName = "AdvancedInput";

export { Input, AdvancedInput };
