"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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
      className={cn("sb:p-3 sb:font-roboto", className)}
      classNames={{
        months:
          "sb:flex sb:flex-col sb:sm:flex-row sb:gap-y-4 sb:sm:gap-x-4 sb:sm:gap-y-0",
        month: "sb:gap-y-4",
        caption:
          "sb:flex sb:justify-center sb:pt-1 sb:relative sb:items-center",
        caption_label: "sb:text-sm sb:font-medium",
        nav: "sb:gap-x-1 sb:flex sb:items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "sb:h-7 sb:w-7 sb:bg-transparent sb:p-0 sb:opacity-50 sb:hover:opacity-100",
        ),
        nav_button_previous: "sb:absolute sb:left-1",
        nav_button_next: "sb:absolute sb:right-1",
        table: "sb:w-full sb:border-collapse sb:flex sb:flex-col sb:gap-y-1",
        head_row: "sb:flex",
        head_cell:
          "sb:text-muted-foreground sb:rounded-md sb:w-8 sb:font-normal sb:text-[0.8rem]",
        row: "sb:flex sb:w-full sb:mt-2",
        cell: cn(
          "sb:relative sb:p-0 sb:text-center sb:text-sm sb:focus-within:relative sb:focus-within:z-20 sb:[&:has([aria-selected])]:bg-accent sb:[&:has([aria-selected].day-outside)]:bg-accent/50 sb:[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "sb:[&:has(>.day-range-end)]:rounded-r-md sb:[&:has(>.day-range-start)]:rounded-l-md sb:first:[&:has([aria-selected])]:rounded-l-md sb:last:[&:has([aria-selected])]:rounded-r-md"
            : "sb:[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "sb:h-8 sb:w-8 sb:p-0 sb:font-normal sb:aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "sb:bg-primary sb:text-primary-foreground sb:hover:bg-primary sb:hover:text-primary-foreground sb:focus:bg-primary sb:focus:text-primary-foreground",
        day_today: "sb:bg-accent sb:text-accent-foreground",
        day_outside:
          "day-outside sb:text-muted-foreground sb:opacity-50 sb:aria-selected:bg-accent/50 sb:aria-selected:text-muted-foreground sb:aria-selected:opacity-30",
        day_disabled: "sb:text-muted-foreground sb:opacity-50",
        day_range_middle:
          "sb:aria-selected:bg-accent sb:aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="sb:h-4 sb:w-4" />,
        IconRight: () => <ChevronRightIcon className="sb:h-4 sb:w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
