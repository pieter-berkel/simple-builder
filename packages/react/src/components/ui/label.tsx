"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "tailwind-variants";

import { tv } from "@/lib/utils";

const labelVariants = tv({
  base: "sb-text-sm sb-font-medium sb-font-roboto sb-leading-none peer-disabled:sb-cursor-not-allowed peer-disabled:sb-opacity-70",
});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({ className })}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
