import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { Content, Editor, useEditor, UseEditorOptions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

import { Link } from "../extensions/link";
import { getOutput } from "../utils/get-output";

export interface UseRichTextEditorOptions extends UseEditorOptions {
  value?: Content;
  output?: "html" | "json" | "text";
  editorClassName?: string;
  onUpdate?: (content: Content) => void;
  onBlur?: (content: Content) => void;
}

export const useRichTextEditor = ({
  value,
  output = "html",
  editorClassName,
  onUpdate,
  onBlur,
  ...options
}: UseRichTextEditorOptions) => {
  const handleCreate = useCallback(
    (editor: Editor) => {
      if (value && editor.isEmpty) {
        editor.commands.setContent(value);
      }
    },
    [value],
  );

  const handleUpdate = useCallback(
    (editor: Editor) => {
      onUpdate?.(getOutput(editor, output));
    },
    [output],
  );

  const handleBlur = useCallback(
    (editor: Editor) => {
      onBlur?.(getOutput(editor, output));
    },
    [output, onBlur],
  );

  const editor = useEditor({
    extensions: [StarterKit, Underline, Color, TextStyle, Link],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: cn("sb-focus:outline-none", editorClassName),
      },
    },
    onCreate: ({ editor }) => handleCreate(editor),
    onUpdate: ({ editor }) => handleUpdate(editor),
    onBlur: ({ editor }) => handleBlur(editor),
    ...options,
  });

  return editor;
};
