import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import { LuChevronDown, LuHeading } from "react-icons/lu";

import { ToolbarButton } from "./toolbar";

const formatActions: {
  label: string;
  element: keyof React.JSX.IntrinsicElements;
  level?: Level;
  className: string;
}[] = [
  {
    label: "Normal Text",
    element: "span",
    className: "sb-grow",
  },
  {
    label: "Heading 1",
    element: "h1",
    level: 1,
    className: "sb-m-0 sb-grow sb-text-3xl sb-font-extrabold",
  },
  {
    label: "Heading 2",
    element: "h2",
    level: 2,
    className: "sb-m-0 sb-grow sb-text-xl sb-font-bold",
  },
  {
    label: "Heading 3",
    element: "h3",
    level: 3,
    className: "sb-m-0 sb-grow sb-text-lg sb-font-semibold",
  },
  {
    label: "Heading 4",
    element: "h4",
    level: 4,
    className: "sb-m-0 sb-grow sb-text-base sb-font-semibold",
  },
];

type Props = {
  editor: Editor;
};

export const ElementTool = ({ editor }: Props) => {
  const isActive = editor.isActive("heading");

  const handleFormatChange = React.useCallback(
    (level?: Level) => {
      if (level) {
        editor.chain().focus().toggleHeading({ level }).run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="sb-w-12 data-[state=open]:sb-bg-accent"
          pressed={isActive}
        >
          <LuHeading className="sb-size-5" />
          <LuChevronDown className="sb-size-5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {formatActions.map(({ element: Element, ...action }) => (
          <DropdownMenuItem
            key={action.label}
            className={cn({
              "sb-bg-accent": action.level
                ? editor.isActive("heading", { level: action.level })
                : editor.isActive("paragraph"),
            })}
            onClick={() => handleFormatChange(action.level)}
          >
            <Element className={action.className}>{action.label}</Element>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
