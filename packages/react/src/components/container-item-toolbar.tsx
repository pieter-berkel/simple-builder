import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContentItem } from "@simple-builder/server";
import { format } from "date-fns";
import {
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  Edit2Icon,
  ScanIcon,
  Trash2Icon,
} from "lucide-react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import { useBuilder } from "~/components/context/builder-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { builder } from "~/lib/builder";
import { cn, spacing } from "~/lib/utils";
import type { ComponentInput, InputType } from "~/types";
import { BackgroundPicker } from "./ui/background-picker";
import { Calendar } from "./ui/calendar";
import { ColorPicker } from "./ui/color-picker";
import { AdvancedInput, Input } from "./ui/input";
import { MediaInput } from "./ui/media-input";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";

type ContainerItemToolbarProps = {
  contentId: string;
  canBringUp?: boolean;
  canBringDown?: boolean;
};

export const ContainerItemToolbar = (props: ContainerItemToolbarProps) => {
  const { contentId, canBringUp = false, canBringDown = false } = props;

  const { bringUp, bringDown } = useBuilder();

  return (
    <div className="sb-absolute sb-z-20 sb-top-1 sb-right-1 sb-rounded-md sb-shadow sb-flex sb-flex-col sb-gap-1 sb-p-1 sb-bg-card sb-text-card-foreground sb-item-toolbar sb-opacity-0 sb-transition-opacity">
      <div className="sb-h-10 sb-p-1 sb-border sb-border-input sb-bg-background sb-rounded-md sb-text-sm sb-font-medium sb-flex sb-gap-1 sb-items-center sb-justify-start">
        <EditButton id={contentId} />
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0"
          onClick={() => bringUp(contentId)}
          disabled={!canBringUp}
        >
          <ArrowUp className="sb-h-5 sb-w-5" />
        </Button>
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0"
          onClick={() => bringDown(contentId)}
          disabled={!canBringDown}
        >
          <ArrowDown className="sb-h-5 sb-w-5" />
        </Button>
        <DeleteButton contentId={contentId} />
      </div>
    </div>
  );
};

const EditButton = ({ id }: { id: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="sb-w-8 sb-h-8 sb-p-0">
          <Edit2Icon className="sb-h-5 sb-w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={16}
        alignOffset={-8}
        className="sb-p-0"
        collisionPadding={16}
      >
        <EditPopoverInner id={id} />
      </PopoverContent>
    </Popover>
  );
};

type EditPopoverInnerProps = {
  id: string;
};

const EditPopoverInner = (props: EditPopoverInnerProps) => {
  const { id } = props;
  const { getItem } = useBuilder();

  const item = getItem(id);

  if (!item) {
    throw new Error(
      `[simple-builder]: Item with id ${id} not found in container item form component`,
    );
  }

  return (
    <Tabs>
      <TabsList defaultValue="content">
        <TabsTrigger value="content">Inhoud</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <ContainerItemForm item={item} />
      </TabsContent>
      <TabsContent value="design">
        <ItemDesignForm item={item} />
      </TabsContent>
    </Tabs>
  );
};

type ContainerItemFormProps = {
  item: ContentItem;
};

const ContainerItemForm = (props: ContainerItemFormProps) => {
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

type ItemDesignFormProps = {
  item: ContentItem;
};

const spacingSchema = z.discriminatedUnion("indipendent", [
  z.object({
    indipendent: z.literal(false),
    horizontal: z.coerce.number(),
    vertical: z.coerce.number(),
  }),
  z.object({
    indipendent: z.literal(true),
    left: z.coerce.number(),
    right: z.coerce.number(),
    top: z.coerce.number(),
    bottom: z.coerce.number(),
  }),
]);

const designSchema = z.object({
  container: z.boolean(),
  background: z.string(),
  color: z.string(),
  padding: spacingSchema,
  margin: spacingSchema,
});

const ItemDesignForm = (props: ItemDesignFormProps) => {
  const { item } = props;

  const { patchItem } = useBuilder();

  const initialPadding = spacing.parse((item.styles?.padding as string) ?? "");
  const initialMargin = spacing.parse((item.styles?.margin as string) ?? "");

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      container: item.styles?.container ?? true,
      background: item.styles?.background ?? "",
      color: item.styles?.color ?? "",
      padding: {
        indipendent: spacing.isIndipendent(
          (item.styles?.padding as string) ?? "",
        ),
        horizontal: initialPadding.left,
        vertical: initialPadding.top,
        left: initialPadding.left,
        right: initialPadding.right,
        top: initialPadding.top,
        bottom: initialPadding.bottom,
      },
      margin: {
        indipendent: spacing.isIndipendent(
          (item.styles?.margin as string) ?? "",
        ),
        horizontal: initialMargin.left,
        vertical: initialMargin.top,
        left: initialMargin.left,
        right: initialMargin.right,
        top: initialMargin.top,
        bottom: initialMargin.bottom,
      },
    },
  });

  const onSubmit = (values: z.infer<typeof designSchema>) => {
    const { container, background, color, padding: p, margin: m } = values;

    const padding = !p.indipendent
      ? `${p.vertical}px ${p.horizontal}px`
      : `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

    const margin = !m.indipendent
      ? `${m.vertical}px ${m.horizontal}px`
      : `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`;

    patchItem(item.id, {
      styles: {
        container,
        background,
        color,
        padding,
        margin,
      },
    });
  };

  React.useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

  const [indipendentPadding, indipendentMargin] = form.watch([
    "padding.indipendent",
    "margin.indipendent",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="sb-space-y-4 sb-p-4">
          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achtergrond</FormLabel>
                <FormControl>
                  <BackgroundPicker
                    background={field.value}
                    onBackgroundChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhoud kleur</FormLabel>
                <FormControl>
                  <ColorPicker
                    color={field.value}
                    onColorChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr />
          <FormField
            control={form.control}
            name="container"
            render={({ field }) => (
              <FormItem className="sb-flex sb-flex-row sb-items-center sb-justify-between sb-space-y-0">
                <FormLabel>Volledige breedte</FormLabel>
                <FormControl>
                  <Switch
                    checked={!field.value}
                    onCheckedChange={(v) => field.onChange(!v)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr />
          <div className="sb-space-y-2">
            <FormLabel>Padding</FormLabel>
            <div className="sb-grid sb-grid-cols-[1fr,auto] sb-gap-3">
              <div className="sb-grid sb-grid-cols-2 sb-items-center sb-gap-3">
                {!indipendentPadding ? (
                  <>
                    <FormField
                      control={form.control}
                      name="padding.horizontal"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="padding.vertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="padding.left"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="padding.top"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="padding.right"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-180" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="padding.bottom"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb--rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <div className="sb-shrink-0">
                <FormField
                  control={form.control}
                  name="padding.indipendent"
                  render={({ field }) => (
                    <FormControl>
                      <Toggle
                        className="sb-shrink-0 sb-flex sb-w-8 sb-h-8 sb-p-0"
                        variant="outline"
                        size="sm"
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        <ScanIcon className="sb-h-4 sb-w-4" />
                      </Toggle>
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <FormMessage />
          </div>
          <div className="sb-space-y-2">
            <FormLabel>Margin</FormLabel>
            <div className="sb-grid sb-grid-cols-[1fr,auto] sb-gap-3">
              <div className="sb-grid sb-grid-cols-2 sb-items-center sb-gap-3">
                {!indipendentMargin ? (
                  <>
                    <FormField
                      control={form.control}
                      name="margin.horizontal"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="margin.vertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="margin.left"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="margin.top"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="margin.right"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-180" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="margin.bottom"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <AdvancedInput
                              {...field}
                              prepend={
                                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb--rotate-90" />
                              }
                              append={
                                <span className="sb-text-muted-foreground">
                                  px
                                </span>
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <div className="sb-shrink-0">
                <FormField
                  control={form.control}
                  name="margin.indipendent"
                  render={({ field }) => (
                    <FormControl>
                      <Toggle
                        className="sb-shrink-0 sb-flex sb-w-8 sb-h-8 sb-p-0"
                        variant="outline"
                        size="sm"
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        <ScanIcon className="sb-h-4 sb-w-4" />
                      </Toggle>
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <FormMessage />
          </div>
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

const DeleteButton = ({ contentId }: { contentId: string }) => {
  const { deleteContent } = useBuilder();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0 sb-text-destructive"
        >
          <Trash2Icon className="sb-h-5 sb-w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription>
          Weet je zeker dat je dit blok wilt verwijderen?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteContent(contentId)}
          >
            Verwijderen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
