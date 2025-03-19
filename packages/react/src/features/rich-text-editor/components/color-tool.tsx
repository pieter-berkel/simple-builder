import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Editor } from "@tiptap/react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

import { ToolbarButton } from "./toolbar";

interface ColorItem {
  cssVar: string;
}

interface ColorPalette {
  colors: ColorItem[];
  inverse: string;
}

const PALETTES: ColorPalette[] = [
  {
    inverse: "hsl(var(--background))",
    colors: [
      { cssVar: "hsl(var(--foreground))" },
      { cssVar: "hsl(var(--secondary-foreground))" },
      { cssVar: "hsl(var(--muted-foreground))" },
      { cssVar: "hsl(var(--accent-foreground))" },
      { cssVar: "hsl(var(--destructive-foreground))" },
    ],
  },

  {
    inverse: "hsl(var(--foreground))",
    colors: [
      { cssVar: "hsl(var(--background))" },
      { cssVar: "hsl(var(--secondary))" },
      { cssVar: "hsl(var(--muted))" },
      { cssVar: "hsl(var(--accent))" },
      { cssVar: "hsl(var(--destructive))" },
    ],
  },
];

export const ColorTool = ({ editor }: { editor: Editor }) => {
  const color =
    editor.getAttributes("textStyle")?.color || "hsl(var(--foreground))";

  const [selectedColor, setSelectedColor] = React.useState(color);

  React.useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  const handleColorChange = React.useCallback(
    (value: string) => {
      setSelectedColor(value);
      editor.chain().focus().setColor(value).run();
    },
    [editor],
  );

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <ToolbarButton className="sb-w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sb-size-5"
            style={{ color: selectedColor }}
          >
            <path d="M4 20h16" />
            <path d="m6 16 6-12 6 12" />
            <path d="M8 12h8" />
          </svg>
          <LuChevronDown className="sb-size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="sb-w-full">
        <ToggleGroup
          type="single"
          value={selectedColor}
          onValueChange={handleColorChange}
          className="sb-flex-col sb-gap-1.5"
        >
          {PALETTES.map((pallete, i) => (
            <div key={i} className="sb-flex sb-gap-1.5">
              {pallete.colors.map((color, j) => (
                <ToggleGroupItem
                  tabIndex={0}
                  key={j}
                  className="sb-relative sb-size-7 sb-rounded-md sb-border sb-p-0"
                  value={color.cssVar}
                  style={{ backgroundColor: color.cssVar }}
                >
                  {selectedColor === color.cssVar && (
                    <LuCheck
                      className="sb-absolute sb-inset-0 sb-m-auto sb-size-6"
                      style={{ color: pallete.inverse }}
                    />
                  )}
                </ToggleGroupItem>
              ))}
            </div>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  );
};
