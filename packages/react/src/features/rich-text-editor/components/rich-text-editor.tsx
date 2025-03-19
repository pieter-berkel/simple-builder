import * as React from "react";
import { cn } from "@/lib/utils";
import { Content, EditorContent } from "@tiptap/react";

import {
  useRichTextEditor,
  UseRichTextEditorOptions,
} from "../hooks/useRichTextEditor";
import { Toolbar } from "./toolbar";

interface RichTextEditorProps extends UseRichTextEditorOptions {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  className,
  editorClassName,
  editorContentClassName,
  ...props
}: RichTextEditorProps) => {
  const editor = useRichTextEditor({
    value,
    onUpdate: onChange,
    editorClassName: cn("sb-flex-1 sb-px-3 sb-py-1", editorClassName),
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "sb-flex sb-h-auto sb-min-h-72 sb-w-full sb-flex-col sb-rounded-md sb-border sb-border-input sb-shadow-sm focus-within:sb-border-primary",
        className,
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn(
          "sb-editflow sb-prose sb-flex sb-flex-1",
          editorContentClassName,
        )}
      />
    </div>
  );
};
