import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex uppercase items-center justify-center whitespace-nowrap rounded-md text-xs font-semibold ring-offset-sb-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sb-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-sb-primary text-sb-primary-foreground hover:bg-sb-primary/90",
        destructive:
          "bg-sb-destructive text-sb-destructive-foreground hover:bg-sb-destructive/90",
        outline:
          "border border-sb-input bg-sb-background hover:bg-sb-accent hover:text-sb-accent-foreground",
        ghost: "hover:bg-sb-accent hover:text-sb-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
