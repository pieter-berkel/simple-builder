import * as React from "react";
import { ContentItem } from "@simple-builder/server";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, useForm } from "react-hook-form";

import { cn } from "~/lib/utils";
import { ComponentInput, InputType } from "~/types";
import { builder } from "..";
import { useBuilder } from "./context/builder-context";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ColorPicker } from "./ui/color-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MediaInput } from "./ui/media-input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

type ContainerItemFormProps = {
  item: ContentItem;
};

export const ContainerItemForm = (props: ContainerItemFormProps) => {
  const { item } = props;

  const { patchItem } = useBuilder();

  const component = builder.getComponent(item.component);

  if (!component) {
    throw new Error(
      `[simple-builder]: Component with id ${item.component} not found in container item form component`,
    );
  }

  const form = useForm<Record<string, any>>({
    defaultValues: (component.inputs || []).reduce(
      (acc, input) => ({
        ...acc,
        [input.name]: item?.props?.[input.name] ?? input.defaultValue,
      }),
      {},
    ),
  });

  const onSubmit = (values: Record<string, any>) => {
    patchItem(item.id, {
      props: values,
    });
  };

  React.useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="sb-space-y-4 sb-p-4">
          {(component.inputs || []).map((input) => (
            <FormField
              key={input.name}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <RenderInput type={input.type} input={input} field={field} />
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

type RenderInputProps = {
  type: InputType;
  input: ComponentInput<any>;
  field: ControllerRenderProps<Record<string, any>, string>;
};

const RenderInput = (props: RenderInputProps) => {
  const { type, input, field } = props;

  switch (type) {
    case "string":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "longText":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "richText":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "number":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "color":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <ColorPicker color={field.value} onColorChange={field.onChange} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "date":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size="sm"
                  className={cn(
                    "sb-w-full sb-flex sb-justify-start sb-text-left sb-font-normal",
                    !field.value && "sb-text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="sb-mr-2 sb-h-4 sb-w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="sb-w-auto sb-p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "boolean":
      return (
        <FormItem className="sb-flex sb-flex-row sb-items-center sb-justify-between sb-space-y-0">
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    case "file":
      return (
        <FormItem>
          <FormLabel>{input.friendlyName || input.name}</FormLabel>
          <FormControl>
            <MediaInput
              className="sb-grid sb-grid-cols-2 sb-gap-1"
              itemClassName="sb-aspect-video sb-h-auto sb-w-full"
              multiple={false}
              onFilesChange={(files) => field.onChange(files[0])}
              onError={(e) =>
                console.error(
                  "[media-input]: Title: " + e?.title,
                  "media-input: Error: " + e?.description,
                )
              }
            />
          </FormControl>
          {input.helperText && (
            <FormDescription>{input.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      );
    default:
      throw new Error(
        `[simple-builder]: Input type "${props.type}" not supported`,
      );
  }
};
