"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "sb-flex sb-h-10 sb-w-full sb-items-center sb-justify-between sb-rounded-md sb-border sb-border-input sb-bg-background sb-px-3 sb-py-2 sb-text-sm sb-ring-offset-background placeholder:sb-text-muted-foreground focus:sb-outline-none focus:sb-ring-2 focus:sb-ring-ring focus:sb-ring-offset-2 disabled:sb-cursor-not-allowed disabled:sb-opacity-50 [&>span]:sb-line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="sb-h-4 sb-w-4 sb-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "sb-flex sb-cursor-default sb-items-center sb-justify-center sb-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="sb-h-4 sb-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "sb-flex sb-cursor-default sb-items-center sb-justify-center sb-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="sb-h-4 sb-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "sb-relative sb-z-50 sb-max-h-96 sb-min-w-[8rem] sb-overflow-hidden sb-rounded-md sb-border sb-bg-popover sb-text-popover-foreground sb-shadow-md data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0 data-[state=closed]:sb-zoom-out-95 data-[state=open]:sb-zoom-in-95 data-[side=bottom]:sb-slide-in-from-top-2 data-[side=left]:sb-slide-in-from-right-2 data-[side=right]:sb-slide-in-from-left-2 data-[side=top]:sb-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:sb-translate-y-1 data-[side=left]:sb--translate-x-1 data-[side=right]:sb-translate-x-1 data-[side=top]:sb--translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "sb-p-1",
          position === "popper" &&
            "sb-h-[var(--radix-select-trigger-height)] sb-w-full sb-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "sb-py-1.5 sb-pl-8 sb-pr-2 sb-text-sm sb-font-semibold",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "sb-relative sb-flex sb-w-full sb-cursor-default sb-select-none sb-items-center sb-rounded-sm sb-py-1.5 sb-pl-8 sb-pr-2 sb-text-sm sb-outline-none focus:sb-bg-accent focus:sb-text-accent-foreground data-[disabled]:sb-pointer-events-none data-[disabled]:sb-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="sb-absolute sb-left-2 sb-flex sb-h-3.5 sb-w-3.5 sb-items-center sb-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="sb-h-4 sb-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("sb--mx-1 sb-my-1 sb-h-px sb-bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
