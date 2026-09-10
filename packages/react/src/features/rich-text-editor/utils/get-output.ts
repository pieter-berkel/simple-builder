import { Editor } from "@tiptap/react";

import { normalizeRichTextColors } from "./normalize-rich-text-colors";

export const getOutput = (
	editor: Editor,
	format: "html" | "json" | "text",
): object | string => {
	switch (format) {
		case "json":
			return editor.getJSON();
		case "html":
			return editor.isEmpty ? "" : normalizeRichTextColors(editor.getHTML());
		default:
			return editor.getText();
	}
};
