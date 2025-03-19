import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { LuEllipsis } from "react-icons/lu";

import { FormatAction } from "../types";
import { ColorTool } from "./color-tool";
import { ElementTool } from "./element-tool";
import { FormatTool } from "./format-tool";
import { InsertTool } from "./insert-tool";
import { LinkTool } from "./link-tool";
import { ListTool } from "./list-tool";

export const Toolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="sb-shrink-0 sb-overflow-x-auto sb-border-b sb-border-border sb-p-2">
      <div className="sb-flex sb-w-max sb-items-center sb-gap-px">
        <ElementTool editor={editor} />
        <Separator orientation="vertical" className="sb-mx-2 sb-h-7" />
        <FormatTool editor={editor} />
        <Separator orientation="vertical" className="sb-mx-2 sb-h-7" />
        <ColorTool editor={editor} />
        <Separator orientation="vertical" className="sb-mx-2 sb-h-7" />
        <ListTool editor={editor} />
        <Separator orientation="vertical" className="sb-mx-2 sb-h-7" />
        <LinkTool editor={editor} />
        <InsertTool editor={editor} />
      </div>
    </div>
  );
};

interface ToolbarSectionProps {
  editor: Editor;
  actions: FormatAction[];
  mainActionCount?: number;
}

export const ToolbarSection = ({
  editor,
  actions,
  mainActionCount = 0,
}: ToolbarSectionProps) => {
  const { mainActions, dropdownActions } = React.useMemo(() => {
    return {
      mainActions: actions.slice(0, mainActionCount),
      dropdownActions: actions.slice(mainActionCount),
    };
  }, [actions, mainActionCount]);

  const isDropdownActive = React.useMemo(() => {
    return dropdownActions.some((action) => action.isActive(editor));
  }, [dropdownActions, editor]);

  return (
    <>
      {mainActions.map((action) => (
        <ToolbarButton
          key={action.label}
          onClick={() => action.action(editor)}
          disabled={!action.canExecute(editor)}
          pressed={action.isActive(editor)}
        >
          <action.icon className="sb-size-5" />
        </ToolbarButton>
      ))}
      {dropdownActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToolbarButton pressed={isDropdownActive}>
              <LuEllipsis className="sb-size-5" />
            </ToolbarButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {dropdownActions.map((action) => (
              <DropdownMenuItem
                key={action.label}
                className={cn("sb-flex sb-flex-row sb-items-center sb-gap-2", {
                  "sb-bg-accent": action.isActive(editor),
                })}
                onClick={() => action.action(editor)}
                disabled={!action.canExecute(editor)}
              >
                <action.icon className="sb-size-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Toggle>
>(({ className, ...props }, ref) => {
  return (
    <Toggle
      size="sm"
      className={cn(
        "sb-size-8 sb-p-0 data-[state=on]:sb-bg-accent",
        { "sb-bg-accent": props.pressed },
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

ToolbarButton.displayName = "ToolbarButton";
