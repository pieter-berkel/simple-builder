"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const toggleVariants = cva(
  "sb-inline-flex sb-items-center sb-justify-center sb-rounded-md sb-text-sm sb-font-medium sb-ring-offset-background sb-transition-colors hover:sb-bg-muted hover:sb-text-muted-foreground focus-visible:sb-outline-none focus-visible:sb-ring-1 focus-visible:sb-ring-ring focus-visible:sb-ring-offset-2 disabled:sb-pointer-events-none disabled:sb-opacity-50 data-[state=on]:sb-bg-accent data-[state=on]:sb-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "sb-bg-transparent",
        outline:
          "sb-border sb-border-input sb-bg-transparent hover:sb-bg-accent hover:sb-text-accent-foreground",
      },
      size: {
        default: "sb-h-10 sb-px-3",
        sm: "sb-h-9 sb-px-2.5",
        lg: "sb-h-11 sb-px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
