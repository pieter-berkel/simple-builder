import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "tailwind-variants";

import { tv } from "~/lib/utils";

const buttonVariants = tv({
  base: "sb-inline-flex sb-uppercase sb-font-roboto sb-items-center sb-justify-center sb-whitespace-nowrap sb-rounded-md sb-text-xs sb-font-semibold ring-offset-background sb-transition-colors focus-visible:sb-outline-none focus-visible:sb-ring-2 focus-visible:ring-ring focus-visible:sb-ring-offset-2 disabled:sb-pointer-events-none disabled:sb-opacity-50",
  variants: {
    variant: {
      primary:
        "sb-bg-primary sb-text-primary-foreground hover:sb-bg-primary/90",
      destructive:
        "sb-bg-destructive sb-text-destructive-foreground hover:sb-bg-destructive/90",
      outline:
        "sb-border border-input sb-bg-background hover:sb-bg-accent hover:sb-text-accent-foreground",
      ghost: "hover:sb-bg-accent hover:sb-text-accent-foreground",
    },
    size: {
      default: "sb-h-10 sb-px-4 sb-py-2",
      sm: "sb-h-8 sb-px-3 sb-py-1",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

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
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
