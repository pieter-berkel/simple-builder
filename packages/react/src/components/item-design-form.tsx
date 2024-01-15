import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentItem } from "@simple-builder/server";
import {
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  ScanIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { spacing } from "~/lib/utils";
import { useBuilder } from "./context/builder-context";
import { BackgroundPicker } from "./ui/background-picker";
import { ColorPicker } from "./ui/color-picker";
import { AdvancedInput } from "./ui/input";
import { Switch } from "./ui/switch";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Toggle } from "./ui/toggle";

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

const designSchema = z
  .object({
    container: z.boolean(),
    background: z.string(),
    color: z.string(),
    padding: spacingSchema,
    margin: spacingSchema,
  })
  .passthrough();

export const ItemDesignForm = (props: ItemDesignFormProps) => {
  const { item } = props;

  const { patchItem } = useBuilder();

  const initialPadding = spacing.parse((item.styles?.padding as string) ?? "");
  const initialMargin = spacing.parse((item.styles?.margin as string) ?? "");

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      ...item.styles,
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
    const { padding: p, margin: m, ...rest } = values;

    const padding = !p.indipendent
      ? `${p.vertical}px ${p.horizontal}px`
      : `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;

    const margin = !m.indipendent
      ? `${m.vertical}px ${m.horizontal}px`
      : `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`;

    patchItem(item.id, {
      styles: {
        padding,
        margin,
        ...rest,
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
          <Tabs>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="mobile">Mobiel</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="sb-space-y-4">
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
        </div>
      </form>
    </Form>
  );
};
