import * as React from "react";
import { ContentItem } from "@simple-builder/server";
import { format } from "date-fns";
import { CalendarIcon, PlusCircleIcon, XIcon } from "lucide-react";
import {
  ControllerRenderProps,
  useFieldArray,
  useForm,
  UseFormReturn,
} from "react-hook-form";

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
            <RenderFormField
              key={input.name}
              type={input.type}
              input={input}
              form={form}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

type RenderFormFieldProps = {
  type: InputType;
  input: ComponentInput<any>;
  form: UseFormReturn<Record<string, any>, any, undefined>;
};

const RenderFormField = (props: RenderFormFieldProps) => {
  const { type, input, form } = props;

  const fieldArray = useFieldArray({
    control: form.control,
    name: input.name,
  });

  if (input.multiple) {
    return (
      <fieldset className="sb-space-y-2">
        <FormLabel>{input.friendlyName || input.name}</FormLabel>
        <div className="sb-space-y-4">
          {fieldArray.fields.map((field, i) =>
            type !== "grouped" ? (
              <FormField
                key={field.id}
                control={form.control}
                name={`${input.name}.${i}` as string}
                render={({ field }) => (
                  <div className="sb-flex sb-items-center sb-gap-3">
                    <RenderInput field={field} type={input.type} />
                    <button type="button" onClick={() => fieldArray.remove(i)}>
                      <XIcon className="sb-h-4 sb-w-4" />
                    </button>
                  </div>
                )}
              />
            ) : (
              <div className="sb-flex sb-items-center sb-relative">
                <RenderFormField
                  key={field.id}
                  form={form}
                  type={type}
                  input={{
                    ...input,
                    name: `${input.name}.${i}`,
                    multiple: false,
                    friendlyName: "",
                  }}
                />
                <button
                  type="button"
                  onClick={() => fieldArray.remove(i)}
                  className="sb-absolute sb-top-2 sb-right-2 sb-text-foreground/70 hover:sb-text-foreground"
                >
                  <XIcon className="sb-h-4 sb-w-4" />
                </button>
              </div>
            ),
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "sb-w-[89%] sb-border-2 sb-border-dashed sb-text-muted-foreground",
              type === "grouped" && "sb-w-full",
            )}
            onClick={() => fieldArray.append(undefined)}
          >
            <PlusCircleIcon className="sb-h-4 sb-w-4" />
          </Button>
        </div>
      </fieldset>
    );
  }

  switch (type) {
    case "string":
    case "number":
    case "longText":
    case "richText":
    case "color":
    case "date":
    case "file":
      return (
        <FormField
          key={input.name}
          control={form.control}
          name={input.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{input.friendlyName || input.name}</FormLabel>
              <FormControl>
                <RenderInput type={type} field={field} />
              </FormControl>
              {input.helperText && (
                <FormDescription>{input.helperText}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "boolean":
      return (
        <FormField
          key={input.name}
          control={form.control}
          name={input.name}
          render={({ field }) => (
            <FormItem className="sb-flex sb-flex-row sb-items-center sb-justify-between sb-space-y-0">
              <FormLabel>{input.friendlyName || input.name}</FormLabel>
              <FormControl>
                <RenderInput type={type} field={field} />
              </FormControl>
              {input.helperText && (
                <FormDescription>{input.helperText}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "grouped":
      return (
        <div className="sb-space-y-2 sb-w-full">
          {input.friendlyName !== "" && (
            <FormLabel>{input.friendlyName || input.name}</FormLabel>
          )}
          <div className="sb-space-y-2 sb-p-3 sb-w-full sb-border sb-rounded-lg">
            {input.inputs.map((sub) => (
              <RenderFormField
                key={`${input.name}.${sub.name}`}
                type={sub.type}
                input={{
                  ...sub,
                  name: `${input.name}.${sub.name}`,
                }}
                form={form}
              />
            ))}
          </div>
        </div>
      );
    default:
      throw new Error(
        `[simple-builder]: Input type "${props.type}" not supported in render form field.`,
      );
  }
};

type RenderInputProps = {
  type: InputType;
  field: ControllerRenderProps<Record<string, any>, string>;
};

const RenderInput = (props: RenderInputProps) => {
  const { type, field } = props;

  switch (type) {
    case "string":
      return <Input {...field} />;
    case "longText":
    case "richText":
      return <Textarea {...field} />;
    case "number":
      return <Input type="number" {...field} />;
    case "color":
      return <ColorPicker color={field.value} onColorChange={field.onChange} />;
    case "date":
      return (
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
      );
    case "boolean":
      return <Switch checked={field.value} onCheckedChange={field.onChange} />;
    case "file":
      return (
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
      );
    default:
      throw new Error(
        `[simple-builder]: Input type "${props.type}" not supported in render input.`,
      );
  }
};
