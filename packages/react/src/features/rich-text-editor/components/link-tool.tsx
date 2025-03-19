import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { useForm } from "react-hook-form";
import { LuLink2 } from "react-icons/lu";
import { z } from "zod";

import { ToolbarButton } from "./toolbar";

export const LinkTool = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = React.useState(false);

  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, " ");

  const handleSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent({
          type: "text",
          text: text || url,
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                target: openInNewTab ? "_blank" : "",
              },
            },
          ],
        })
        .setLink({ href: url })
        .run();

      editor.commands.enter();
      setOpen(false);
    },
    [editor],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          pressed={editor.isActive("link")}
          disabled={editor.isActive("codeBlock")}
        >
          <LuLink2 className="sb-size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sb-w-full sb-min-w-80">
        <LinkForm onSave={handleSetLink} defaultText={text} />
      </DialogContent>
    </Dialog>
  );
};

interface LinkFormProps {
  defaultUrl?: string;
  defaultText?: string;
  defaultIsNewTab?: boolean;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

const schema = z.object({
  url: z.string().min(0),
  text: z.string().optional(),
  isNewTab: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const LinkForm = ({
  onSave,
  defaultIsNewTab,
  defaultUrl,
  defaultText,
}: LinkFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      url: defaultUrl || "",
      text: defaultText || "",
      isNewTab: defaultIsNewTab || false,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSave(values.url, values.text, values.isNewTab);
  };

  return (
    <Form {...form}>
      <div className="sb-space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input type="url" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isNewTab"
          render={({ field }) => (
            <FormItem>
              <div className="sb-flex sb-items-center sb-space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Open in new tab</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
          Save
        </Button>
      </div>
    </Form>
  );
};
