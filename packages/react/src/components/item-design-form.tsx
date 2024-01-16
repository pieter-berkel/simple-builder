import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentItem } from "@simple-builder/server";
import {
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  MonitorIcon,
  ScanIcon,
  SmartphoneIcon,
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
import { builder } from "..";
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
    desktop: z
      .object({
        padding: spacingSchema.optional(),
        margin: spacingSchema.optional(),
      })
      .passthrough()
      .optional(),
    mobile: z
      .object({
        padding: spacingSchema.optional(),
        margin: spacingSchema.optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const ItemDesignForm = (props: ItemDesignFormProps) => {
  const { item } = props;

  const component = builder.getComponent(item.component);

  if (!component) {
    throw new Error(
      `[simple-builder]: Component "${item.component}" not found`,
    );
  }

  const defaults = component.defaultStyles || {};

  const { patchItem } = useBuilder();
  const [device, setDevice] = React.useState("desktop");

  const getDefaultDesktopValue = (key: string, initial: any = "") => {
    const value = item.styles?.desktop?.[key];
    const def = defaults?.desktop?.[key];

    if (value !== undefined) {
      return value;
    } else if (def !== undefined) {
      return def;
    } else {
      return initial;
    }
  };

  const getDefaultMobileValue = (key: string, initial: any = "") => {
    const value = item.styles?.mobile?.[key];
    const desktopValue = item.styles?.desktop?.[key];

    const def = defaults?.mobile?.[key];
    const desktopDef = defaults?.desktop?.[key];

    if (value !== undefined) {
      return value;
    } else if (def !== undefined) {
      return def;
    } else if (desktopValue !== undefined) {
      return desktopValue;
    } else if (desktopDef !== undefined) {
      return desktopDef;
    } else {
      return initial;
    }
  };

  const getSpacingValue = (str: any) => {
    const parsed = spacing.parse(str);

    return {
      indipendent: spacing.isIndipendent(str),
      horizontal: parsed.left,
      vertical: parsed.top,
      ...parsed,
    };
  };

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      container: item.styles?.container || defaults.container || true,
      desktop: {
        background: getDefaultDesktopValue("background"),
        color: getDefaultDesktopValue("color"),
        padding: getSpacingValue(getDefaultDesktopValue("padding")),
        margin: getSpacingValue(getDefaultDesktopValue("margin")),
      },
      mobile: {
        background: getDefaultMobileValue("background"),
        color: getDefaultMobileValue("color"),
        padding: getSpacingValue(getDefaultMobileValue("padding")),
        margin: getSpacingValue(getDefaultMobileValue("margin")),
      },
    },
  });

  const onSubmit = (values: z.infer<typeof designSchema>) => {
    const { container } = values;

    const getPatchedDeviceValues = (
      device: "desktop" | "mobile" = "desktop",
    ) => {
      // @ts-expect-error TODO: fix this
      return Object.entries(values[device]).reduce((acc, [key, value]) => {
        let res = value;

        if (key === "padding" || key === "margin") {
          const data = value as z.infer<typeof spacingSchema>;

          const params = data.indipendent
            ? data
            : {
                top: data.vertical,
                bottom: data.vertical,
                left: data.horizontal,
                right: data.horizontal,
              };

          res = spacing.stringify(params);
        }

        return {
          ...acc,
          ...(!!res && defaults?.[device]?.[key] !== res ? { [key]: res } : {}),
        };
      }, {});
    };

    const patchedDesktopValues = getPatchedDeviceValues();
    const patchedMobileValues = getPatchedDeviceValues("mobile");

    patchItem(item.id, {
      styles: {
        ...(container === false && { container }),
        ...(Object.keys(patchedDesktopValues).length && {
          desktop: patchedDesktopValues,
        }),
        ...(Object.keys(patchedMobileValues).length && {
          mobile: patchedMobileValues,
        }),
      },
    });
  };

  React.useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

  const [indipendentPadding, indipendentMargin] = form.watch([
    `${device}.padding.indipendent`,
    `${device}.margin.indipendent`,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="sb-space-y-4 sb-p-4">
          <Tabs defaultValue={device} onValueChange={setDevice}>
            <TabsList className="sb-h-9 sb-grid sb-w-full sb-grid-cols-2">
              <TabsTrigger value="desktop" className="sb-text-xs">
                <MonitorIcon className="sb-h-4 sb-w-4 sb-mr-2" />
                <span>Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="sb-text-xs">
                <SmartphoneIcon className="sb-h-4 sb-w-4 sb-mr-2" />
                <span>Mobiel</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="sb-space-y-4">
            <FormField
              control={form.control}
              key={`${device}.background`}
              name={`${device}.background`}
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
              key={`${device}.color`}
              name={`${device}.color`}
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
                        key={`${device}.padding.horizontal`}
                        name={`${device}.padding.horizontal`}
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
                        key={`${device}.padding.vertical`}
                        name={`${device}.padding.vertical`}
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
                        key={`${device}.padding.left`}
                        name={`${device}.padding.left`}
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
                        key={`${device}.padding.top`}
                        name={`${device}.padding.top`}
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
                        key={`${device}.padding.right`}
                        name={`${device}.padding.right`}
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
                        key={`${device}.padding.bottom`}
                        name={`${device}.padding.bottom`}
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
                    key={`${device}.padding.indipendent`}
                    name={`${device}.padding.indipendent`}
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
                        key={`${device}.margin.horizontal`}
                        name={`${device}.margin.horizontal`}
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
                        key={`${device}.margin.vertical`}
                        name={`${device}.margin.vertical`}
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
                        key={`${device}.margin.left`}
                        name={`${device}.margin.left`}
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
                        key={`${device}.margin.top`}
                        name={`${device}.margin.top`}
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
                        key={`${device}.margin.right`}
                        name={`${device}.margin.right`}
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
                        key={`${device}.margin.bottom`}
                        name={`${device}.margin.bottom`}
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
                    key={`${device}.margin.indipendent`}
                    name={`${device}.margin.indipendent`}
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
