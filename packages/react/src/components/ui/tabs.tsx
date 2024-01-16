"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { VariantProps } from "tailwind-variants";

import { cn, tv } from "~/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = tv({
  variants: {
    variant: {
      contained:
        "sb-inline-flex sb-h-10 sb-items-center sb-justify-center sb-rounded-md sb-bg-muted sb-p-1 sb-text-muted-foreground",
      text: "sb-flex sb-items-center sb-border-b sb-px-4 sb-space-x-6",
    },
  },
  defaultVariants: {
    variant: "contained",
  },
});

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ variant, className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={tabsListVariants({ variant, className })}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = tv({
  variants: {
    variant: {
      contained:
        "sb-inline-flex sb-items-center sb-justify-center sb-whitespace-nowrap sb-rounded-sm sb-px-3 sb-py-1.5 sb-text-sm sb-font-medium sb-ring-offset-background sb-transition-all focus-visible:sb-outline-none focus-visible:sb-ring-2 focus-visible:sb-ring-ring focus-visible:sb-ring-offset-2 disabled:sb-pointer-events-none disabled:sb-opacity-50 data-[state=active]:sb-bg-background data-[state=active]:sb-text-foreground data-[state=active]:sb-shadow-sm",
      text: "sb-inline-flex sb-font-roboto sb-items-center sb-justify-center sb-whitespace-nowrap sb-py-3 sb-text-sm sb-font-medium sb-transition-all focus-visible:sb-outline-none disabled:sb-pointer-events-none disabled:sb-opacity-50 data-[state=active]:sb-border-black sb-border-b-2 sb-border-transparent data-[state=active]:sb-text-foreground sb-text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "contained",
  },
});

type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> &
  VariantProps<typeof tabsTriggerVariants>;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ variant, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={tabsTriggerVariants({ variant, className })}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "sb-ring-offset-background sb-font-roboto focus-visible:sb-outline-none focus-visible:sb-ring-2 focus-visible:sb-ring-ring focus-visible:sb-ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
