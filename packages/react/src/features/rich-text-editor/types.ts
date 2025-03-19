import { IconType } from "react-icons/lib";
import { Editor } from "@tiptap/react";

export interface FormatAction {
  label: string;
  icon: IconType;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canExecute: (editor: Editor) => boolean;
  value: string;
}
