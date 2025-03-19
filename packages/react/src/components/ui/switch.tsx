import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "sb-peer sb-inline-flex sb-h-5 sb-w-9 sb-shrink-0 sb-cursor-pointer sb-items-center sb-rounded-full sb-border-2 sb-border-transparent sb-shadow-sm sb-transition-colors focus-visible:sb-outline-none focus-visible:sb-ring-2 focus-visible:sb-ring-ring focus-visible:sb-ring-offset-2 focus-visible:sb-ring-offset-background disabled:sb-cursor-not-allowed disabled:sb-opacity-50 data-[state=checked]:sb-bg-primary data-[state=unchecked]:sb-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "sb-pointer-events-none sb-block sb-h-4 sb-w-4 sb-rounded-full sb-bg-background sb-shadow-lg sb-ring-0 sb-transition-transform data-[state=checked]:sb-translate-x-4 data-[state=unchecked]:sb-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
