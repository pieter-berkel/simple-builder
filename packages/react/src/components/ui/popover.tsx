import * as React from "react";
import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverClose = PopoverPrimitive.Close;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "sb-z-50 sb-w-72 sb-rounded-md sb-border sb-bg-popover sb-p-4 sb-text-popover-foreground sb-shadow-md sb-outline-none data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0 data-[state=closed]:sb-zoom-out-95 data-[state=open]:sb-zoom-in-95 data-[side=bottom]:sb-slide-in-from-top-2 data-[side=left]:sb-slide-in-from-right-2 data-[side=right]:sb-slide-in-from-left-2 data-[side=top]:sb-slide-in-from-bottom-2 sb-origin-[--radix-popover-content-transform-origin]",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
