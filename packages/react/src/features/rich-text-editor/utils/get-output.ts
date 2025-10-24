import { Editor } from "@tiptap/react";

export const getOutput = (
  editor: Editor,
  format: "html" | "json" | "text",
): object | string => {
  switch (format) {
    case "json":
      return editor.getJSON();
    case "html":
      return editor.isEmpty ? "" : editor.getHTML();
    default:
      return editor.getText();
  }
};
