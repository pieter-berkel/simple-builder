import * as React from "react";
import { Editor } from "@tiptap/react";
import { LuList, LuListOrdered } from "react-icons/lu";

import { FormatAction } from "../types";
import { ToolbarSection } from "./toolbar";

const actions: FormatAction[] = [
  {
    value: "orderedList",
    label: "Numbered list",
    icon: LuListOrdered,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleOrderedList().run(),
  },
  {
    value: "bulletList",
    label: "Bullet list",
    icon: LuList,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBulletList().run(),
  },
];

interface ListToolProps {
  editor: Editor;
}

export const ListTool = ({ editor }: ListToolProps) => {
  return (
    <ToolbarSection editor={editor} actions={actions} mainActionCount={2} />
  );
};
