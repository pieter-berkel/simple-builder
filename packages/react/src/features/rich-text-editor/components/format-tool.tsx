import * as React from "react";
import { Editor } from "@tiptap/react";
import {
  LuBold,
  LuCode,
  LuItalic,
  LuRemoveFormatting,
  LuStrikethrough,
  LuUnderline,
} from "react-icons/lu";

import { FormatAction } from "../types";
import { ToolbarSection } from "./toolbar";

const actions: FormatAction[] = [
  {
    value: "bold",
    label: "Bold",
    icon: LuBold,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBold().run() &&
      !editor.isActive("codeBlock"),
  },
  {
    value: "italic",
    label: "Italic",
    icon: LuItalic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleItalic().run() &&
      !editor.isActive("codeBlock"),
  },
  {
    value: "underline",
    label: "Underline",
    icon: LuUnderline,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleUnderline().run() &&
      !editor.isActive("codeBlock"),
  },
  {
    value: "strikethrough",
    label: "Strikethrough",
    icon: LuStrikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleStrike().run() &&
      !editor.isActive("codeBlock"),
  },
  {
    value: "code",
    label: "Code",
    icon: LuCode,
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive("code"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCode().run() &&
      !editor.isActive("codeBlock"),
  },
  {
    value: "clearFormatting",
    label: "Clear formatting",
    icon: LuRemoveFormatting,
    action: (editor) => editor.chain().focus().unsetAllMarks().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().unsetAllMarks().run() &&
      !editor.isActive("codeBlock"),
  },
];

interface FormatToolProps {
  editor: Editor;
}

export const FormatTool = ({ editor }: FormatToolProps) => {
  return (
    <ToolbarSection editor={editor} actions={actions} mainActionCount={1} />
  );
};
