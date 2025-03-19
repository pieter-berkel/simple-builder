"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "sb-flex sb-cursor-default sb-select-none sb-items-center sb-gap-2 sb-rounded-sm sb-px-2 sb-py-1.5 sb-text-sm sb-outline-none focus:sb-bg-accent data-[state=open]:sb-bg-accent [&_svg]:sb-pointer-events-none [&_svg]:sb-size-4 [&_svg]:sb-shrink-0",
      inset && "sb-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="sb-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "sb-z-50 sb-min-w-[8rem] sb-overflow-hidden sb-rounded-md sb-border sb-bg-popover sb-p-1 sb-text-popover-foreground sb-shadow-lg data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0 data-[state=closed]:sb-zoom-out-95 data-[state=open]:sb-zoom-in-95 data-[side=bottom]:sb-slide-in-from-top-2 data-[side=left]:sb-slide-in-from-right-2 data-[side=right]:sb-slide-in-from-left-2 data-[side=top]:sb-slide-in-from-bottom-2 sb-origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "sb-z-50 sb-max-h-[var(--radix-dropdown-menu-content-available-height)] sb-min-w-[8rem] sb-overflow-y-auto sb-overflow-x-hidden sb-rounded-md sb-border sb-bg-popover sb-p-1 sb-text-popover-foreground sb-shadow-md",
        "data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0 data-[state=closed]:sb-zoom-out-95 data-[state=open]:sb-zoom-in-95 data-[side=bottom]:sb-slide-in-from-top-2 data-[side=left]:sb-slide-in-from-right-2 data-[side=right]:sb-slide-in-from-left-2 data-[side=top]:sb-slide-in-from-bottom-2 sb-origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "sb-relative sb-flex sb-cursor-default sb-select-none sb-items-center sb-gap-2 sb-rounded-sm sb-px-2 sb-py-1.5 sb-text-sm sb-outline-none sb-transition-colors focus:sb-bg-accent focus:sb-text-accent-foreground data-[disabled]:sb-pointer-events-none data-[disabled]:sb-opacity-50 [&>svg]:sb-size-4 [&>svg]:sb-shrink-0",
      inset && "sb-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "sb-relative sb-flex sb-cursor-default sb-select-none sb-items-center sb-rounded-sm sb-py-1.5 sb-pl-8 sb-pr-2 sb-text-sm sb-outline-none sb-transition-colors focus:sb-bg-accent focus:sb-text-accent-foreground data-[disabled]:sb-pointer-events-none data-[disabled]:sb-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="sb-absolute sb-left-2 sb-flex sb-h-3.5 sb-w-3.5 sb-items-center sb-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="sb-h-4 sb-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "sb-relative sb-flex sb-cursor-default sb-select-none sb-items-center sb-rounded-sm sb-py-1.5 sb-pl-8 sb-pr-2 sb-text-sm sb-outline-none sb-transition-colors focus:sb-bg-accent focus:sb-text-accent-foreground data-[disabled]:sb-pointer-events-none data-[disabled]:sb-opacity-50",
      className
    )}
    {...props}
  >
    <span className="sb-absolute sb-left-2 sb-flex sb-h-3.5 sb-w-3.5 sb-items-center sb-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="sb-h-2 sb-w-2 sb-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "sb-px-2 sb-py-1.5 sb-text-sm sb-font-semibold",
      inset && "sb-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("sb--mx-1 sb-my-1 sb-h-px sb-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("sb-ml-auto sb-text-xs sb-tracking-widest sb-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
