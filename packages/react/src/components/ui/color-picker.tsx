import * as React from "react";
import { PaintbrushIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
  className?: string;
  colors?: string[];
};

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, onColorChange, className } = props;

  const colors = props.colors ?? [
    "#000000",
    "#ffffff",
    "#0f172a",
    "#F1F5F9",
    "#64748B",
    "#E6007E",
    "#F8FAFC",
    "#009DD1",
    "#FF0000",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "sb-justify-start sb-text-left sb-font-normal sb-normal-case sb-w-full",
            !color && "sb-text-muted-foreground",
            className,
          )}
        >
          <div className="sb-w-full sb-flex sb-items-center sb-gap-2">
            {color ? (
              <div
                className="sb-h-4 sb-w-4 sb-rounded !sb-bg-center !sb-bg-cover sb-transition-all sb-border"
                style={{ background: color }}
              />
            ) : (
              <PaintbrushIcon className="sb-h-4 sb-w-4" />
            )}
            <div className="sb-truncate sb-flex-1">
              {color ? color : "Kies een kleur"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sb-w-64 sb-p-4 sb-flex sb-flex-wrap sb-gap-1">
        {colors.map((s) => (
          <div
            key={s}
            style={{ background: s }}
            className="sb-rounded-md sb-h-6 sb-w-6 sb-cursor-pointer active:sb-scale-105 sb-border"
            onClick={() => onColorChange(s)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};
