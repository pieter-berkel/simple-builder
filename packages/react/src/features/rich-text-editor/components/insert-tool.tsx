import * as React from "react";
import { Editor } from "@tiptap/react";
import { LuCode, LuMinus, LuQuote } from "react-icons/lu";

import { FormatAction } from "../types";
import { ToolbarSection } from "./toolbar";

const actions: FormatAction[] = [
  {
    value: "codeBlock",
    label: "Code block",
    icon: LuCode,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCodeBlock().run(),
  },
  {
    value: "blockquote",
    label: "Blockquote",
    icon: LuQuote,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBlockquote().run(),
  },
  {
    value: "horizontalRule",
    label: "Divider",
    icon: LuMinus,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().setHorizontalRule().run(),
  },
];

interface InsertToolProps {
  editor: Editor;
}

export const InsertTool = ({ editor }: InsertToolProps) => {
  return (
    <ToolbarSection editor={editor} actions={actions} mainActionCount={0} />
  );
};
