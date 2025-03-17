import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "sb-flex sb-min-h-[60px] sb-font-roboto sb-w-full sb-rounded-md sb-border sb-border-input sb-bg-transparent sb-px-3 sb-py-2 sb-text-sm sb-shadow-sm placeholder:sb-text-muted-foreground focus-visible:sb-outline-none focus-visible:sb-ring-1 focus-visible:sb-ring-ring disabled:sb-cursor-not-allowed disabled:sb-opacity-50",
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
