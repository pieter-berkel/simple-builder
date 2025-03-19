import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "sb-inline-flex sb-items-center sb-justify-center sb-gap-2 sb-whitespace-nowrap sb-rounded-md sb-text-sm sb-font-medium sb-transition-colors focus-visible:sb-outline-none focus-visible:sb-ring-1 focus-visible:sb-ring-ring disabled:sb-pointer-events-none disabled:sb-opacity-50 [&_svg]:sb-pointer-events-none [&_svg]:sb-size-4 [&_svg]:sb-shrink-0",
  {
    variants: {
      variant: {
        default:
          "sb-bg-primary sb-text-primary-foreground sb-shadow hover:sb-bg-primary/90",
        destructive:
          "sb-bg-destructive sb-text-destructive-foreground sb-shadow-sm hover:sb-bg-destructive/90",
        outline:
          "sb-border sb-border-input sb-bg-background sb-shadow-sm hover:sb-bg-accent hover:sb-text-accent-foreground",
        secondary:
          "sb-bg-secondary sb-text-secondary-foreground sb-shadow-sm hover:sb-bg-secondary/80",
        ghost: "hover:sb-bg-accent hover:sb-text-accent-foreground",
        link: "sb-text-primary sb-underline-offset-4 hover:sb-underline",
      },
      size: {
        default: "sb-h-9 sb-px-4 sb-py-2",
        sm: "sb-h-8 sb-rounded-md sb-px-3 sb-text-xs",
        lg: "sb-h-10 sb-rounded-md sb-px-8",
        icon: "sb-h-9 sb-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
