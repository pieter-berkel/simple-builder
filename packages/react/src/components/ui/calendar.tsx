"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "~/components/ui/button";

import { cn } from "~/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("sb-p-3 sb-font-roboto", className)}
      classNames={{
        months:
          "sb-flex sb-flex-col sm:sb-flex-row sb-space-y-4 sm:sb-space-x-4 sm:sb-space-y-0",
        month: "sb-space-y-4",
        caption:
          "sb-flex sb-justify-center sb-pt-1 sb-relative sb-items-center",
        caption_label: "sb-text-sm sb-font-medium",
        nav: "sb-space-x-1 sb-flex sb-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "sb-h-7 sb-w-7 sb-bg-transparent sb-p-0 sb-opacity-50 hover:sb-opacity-100",
        ),
        nav_button_previous: "sb-absolute sb-left-1",
        nav_button_next: "sb-absolute sb-right-1",
        table: "sb-w-full sb-border-collapse sb-space-y-1",
        head_row: "sb-flex",
        head_cell:
          "sb-text-muted-foreground sb-rounded-md sb-w-8 sb-font-normal sb-text-[0.8rem]",
        row: "sb-flex sb-w-full sb-mt-2",
        cell: cn(
          "sb-relative sb-p-0 sb-text-center sb-text-sm focus-within:sb-relative focus-within:sb-z-20 [&:has([aria-selected])]:sb-bg-accent [&:has([aria-selected].day-outside)]:sb-bg-accent/50 [&:has([aria-selected].day-range-end)]:sb-rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:sb-rounded-r-md [&:has(>.day-range-start)]:sb-rounded-l-md first:[&:has([aria-selected])]:sb-rounded-l-md last:[&:has([aria-selected])]:sb-rounded-r-md"
            : "[&:has([aria-selected])]:sb-rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "sb-h-8 sb-w-8 sb-p-0 sb-font-normal aria-selected:sb-opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "sb-bg-primary sb-text-primary-foreground hover:sb-bg-primary hover:sb-text-primary-foreground focus:sb-bg-primary focus:sb-text-primary-foreground",
        day_today: "sb-bg-accent sb-text-accent-foreground",
        day_outside:
          "day-outside sb-text-muted-foreground sb-opacity-50 aria-selected:sb-bg-accent/50 aria-selected:sb-text-muted-foreground aria-selected:sb-opacity-30",
        day_disabled: "sb-text-muted-foreground sb-opacity-50",
        day_range_middle:
          "aria-selected:sb-bg-accent aria-selected:sb-text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="sb-h-4 sb-w-4" />,
        IconRight: () => <ChevronRightIcon className="sb-h-4 sb-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
