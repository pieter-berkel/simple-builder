import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "sb:peer sb:inline-flex sb:h-5 sb:w-9 sb:shrink-0 sb:cursor-pointer sb:items-center sb:rounded-full sb:border-2 sb:border-transparent sb:shadow-sm sb:transition-colors sb:focus-visible:outline-hidden sb:focus-visible:ring-2 sb:focus-visible:ring-ring sb:focus-visible:ring-offset-2 sb:focus-visible:ring-offset-background sb:disabled:cursor-not-allowed sb:disabled:opacity-50 sb:data-[state=checked]:bg-primary sb:data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "sb:pointer-events-none sb:block sb:h-4 sb:w-4 sb:rounded-full sb:bg-background sb:shadow-lg sb:ring-0 sb:transition-transform sb:data-[state=checked]:translate-x-4 sb:data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
