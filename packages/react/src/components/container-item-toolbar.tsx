import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContentItem } from "@simple-builder/server";
import {
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  ArrowDown,
  ArrowUp,
  Edit2Icon,
  SaveIcon,
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
import { spacing } from "~/lib/utils";
import type { ComponentInput, InputType } from "~/types";
import { BackgroundPicker } from "./ui/background-picker";
import { ColorPicker } from "./ui/color-picker";
import { AdvancedInput, Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
    <div className="absolute z-20 top-1 right-1 rounded-md shadow flex flex-col gap-1 p-1 bg-sb-card text-sb-card-sb-foreground sb-item-toolbar opacity-0 transition-opacity">
      <div className="h-10 p-1 border border-sb-input bg-sb-background rounded-md text-sm font-medium flex gap-1 items-center justify-start">
        <EditButton id={contentId} />
        <Button
          variant="ghost"
          className="w-8 h-8 p-0"
          onClick={() => bringUp(contentId)}
          disabled={!canBringUp}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className="w-8 h-8 p-0"
          onClick={() => bringDown(contentId)}
          disabled={!canBringDown}
        >
          <ArrowDown className="h-5 w-5" />
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
        <Button variant="ghost" className="w-8 h-8 p-0">
          <Edit2Icon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={16}
        alignOffset={-8}
        className="p-0"
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6 p-4">
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
        <div className="border-t p-4">
          <Button type="submit" size="sm">
            <SaveIcon className="mr-2 h-4 w-4" /> Opslaan
          </Button>
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

  React.useEffect(() => {
    const subscription = form.watch(form.handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

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

  const [indipendentPadding, indipendentMargin] = form.watch([
    "padding.indipendent",
    "margin.indipendent",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 p-4">
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
              <FormItem className="flex flex-row items-center justify-between space-y-0">
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
          <div className="space-y-2">
            <FormLabel>Padding</FormLabel>
            <div className="grid grid-cols-[1fr,auto] gap-3">
              <div className="grid grid-cols-2 items-center gap-3">
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
                                <AlignHorizontalSpaceAroundIcon className="h-4 w-4" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalSpaceAroundIcon className="h-4 w-4 rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 rotate-180" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 -rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
              <div className="shrink-0">
                <FormField
                  control={form.control}
                  name="padding.indipendent"
                  render={({ field }) => (
                    <FormControl>
                      <Toggle
                        className="shrink-0 flex w-8 h-8 p-0"
                        variant="outline"
                        size="sm"
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        <ScanIcon className="h-4 w-4" />
                      </Toggle>
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <FormMessage />
          </div>
          <div className="space-y-2">
            <FormLabel>Margin</FormLabel>
            <div className="grid grid-cols-[1fr,auto] gap-3">
              <div className="grid grid-cols-2 items-center gap-3">
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
                                <AlignHorizontalSpaceAroundIcon className="h-4 w-4" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalSpaceAroundIcon className="h-4 w-4 rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 rotate-180" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
                                <AlignHorizontalJustifyStartIcon className="h-4 w-4 -rotate-90" />
                              }
                              append={
                                <span className="text-sb-muted-sb-foreground">
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
              <div className="shrink-0">
                <FormField
                  control={form.control}
                  name="margin.indipendent"
                  render={({ field }) => (
                    <FormControl>
                      <Toggle
                        className="shrink-0 flex w-8 h-8 p-0"
                        variant="outline"
                        size="sm"
                        pressed={field.value}
                        onPressedChange={field.onChange}
                      >
                        <ScanIcon className="h-4 w-4" />
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
    case "boolean":
      return (
        <FormItem className="flex flex-row items-center justify-between space-y-0">
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
      return null;
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
        <Button variant="ghost" className="w-8 h-8 p-0 text-sb-destructive">
          <Trash2Icon className="h-5 w-5" />
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
