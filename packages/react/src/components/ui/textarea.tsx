import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "sb:flex sb:min-h-[60px] sb:font-roboto sb:w-full sb:rounded-md sb:border sb:border-input sb:bg-transparent sb:px-3 sb:py-2 sb:text-sm sb:shadow-sm sb:placeholder:text-muted-foreground sb:focus-visible:outline-hidden sb:focus-visible:ring-1 sb:focus-visible:ring-ring sb:disabled:cursor-not-allowed sb:disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
