import * as React from "react";
import { PaintbrushIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

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
            "justify-start text-left font-normal normal-case w-full",
            !color && "text-sb-muted-foreground",
            className,
          )}
        >
          <div className="w-full flex items-center gap-2">
            {color ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all border"
                style={{ background: color }}
              />
            ) : (
              <PaintbrushIcon className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {color ? color : "Kies een kleur"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 flex flex-wrap gap-1">
        {colors.map((s) => (
          <div
            key={s}
            style={{ background: s }}
            className="rounded-md h-6 w-6 cursor-pointer active:scale-105 border"
            onClick={() => onColorChange(s)}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};
