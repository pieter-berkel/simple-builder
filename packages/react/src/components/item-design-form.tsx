import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentItem } from "@simple-builder/server";
import { MonitorIcon, SmartphoneIcon } from "lucide-react";
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

import { builder } from "..";
import { useBuilder } from "./context/builder-context";
import { BackgroundPicker } from "./ui/background-picker";
import { ColorPicker } from "./ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SpacingInput } from "./ui/spacing-input";
import { Switch } from "./ui/switch";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Device = "desktop" | "mobile";

type ItemDesignFormProps = {
  item: ContentItem;
};

const designSchema = z.object({
  container: z.coerce.boolean(),
  hidden: z.enum(["always", "mobile", "desktop", "never"]),
  desktop: z.object({
    background: z.string(),
    color: z.string(),
    padding: z.string(),
    margin: z.string(),
  }),
  mobile: z.object({
    background: z.string(),
    color: z.string(),
    padding: z.string(),
    margin: z.string(),
  }),
});

export const ItemDesignForm = (props: ItemDesignFormProps) => {
  const { item } = props;
  const component = builder.getComponent(item.component);

  if (!component) {
    throw new Error(
      `[simple-builder]: Component "${item.component}" not found`,
    );
  }

  const getDefaultDeviceValue = <T,>(params: {
    device?: Device;
    key: string;
    fallback?: T;
  }): T => {
    const { device = "desktop", key, fallback = "" } = params;

    if (item.styles?.[device]?.[key] !== undefined) {
      return item.styles[device][key] as T;
    }

    if (component.defaultStyles?.[device]?.[key] !== undefined) {
      return component.defaultStyles[device][key] as T;
    }

    if (device === "mobile") {
      const desktopValue = getDefaultDeviceValue({
        ...params,
        device: "desktop",
      });

      if (desktopValue !== undefined) {
        return desktopValue as T;
      }
    }

    return fallback as T;
  };

  const getDefaultDeviceValues = (device: Device) => {
    return {
      background: getDefaultDeviceValue<string>({ device, key: "background" }),
      color: getDefaultDeviceValue<string>({ device, key: "color" }),
      padding: getDefaultDeviceValue<string>({ device, key: "padding" }),
      margin: getDefaultDeviceValue<string>({ device, key: "margin" }),
    };
  };

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    values: {
      container: item.styles?.container ?? true,
      hidden: item.styles?.hidden ?? "never",
      desktop: getDefaultDeviceValues("desktop"),
      mobile: getDefaultDeviceValues("mobile"),
    },
  });

  const { patchItem } = useBuilder();

  const onSubmit = (values: z.infer<typeof designSchema>) => {
    const { container, hidden, desktop, mobile } = values;
    const dirtyFields = form.formState.dirtyFields;

    type Entries<T> = {
      [K in keyof T]: [K, T[K]];
    }[keyof T][];

    const desktopPatch = (
      Object.entries(desktop) as Entries<typeof desktop>
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...(value && { [key]: value }),
      }),
      { ...item.styles?.desktop },
    );

    const mobilePatch = (
      Object.entries(mobile) as Entries<typeof mobile>
    ).reduce(
      (acc, [key, value]) => {
        const desktopValue = desktop[key];
        const isDirty = dirtyFields.desktop?.[key];

        if (value === desktopValue || isDirty) {
          return acc;
        }

        if (["padding", "margin"].includes(key)) {
          if (value === "0px" && desktopValue === "0px") {
            return acc;
          }
        }

        return {
          ...acc,
          ...(value && { [key]: value }),
        };
      },
      { ...item.styles?.mobile },
    );

    patchItem(item.id, {
      styles: {
        ...(container === false && { container }),
        ...(hidden !== "never" && { hidden }),
        ...(Object.keys(desktopPatch).length && { desktop: desktopPatch }),
        ...(Object.keys(mobilePatch).length && { mobile: mobilePatch }),
      },
    });
  };

  const [device, setDevice] = React.useState<Device>("desktop");

  React.useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.watch, form.handleSubmit]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="sb-space-y-4 sb-p-4">
          <Tabs
            defaultValue={device}
            onValueChange={(device) => setDevice(device as Device)}
          >
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
              name="hidden"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verbergen</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Nooit</SelectItem>
                        <SelectItem value="desktop">Op desktop</SelectItem>
                        <SelectItem value="mobile">Op mobiel</SelectItem>
                        <SelectItem value="always">Altijd</SelectItem>
                      </SelectContent>
                    </Select>
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
            <FormField
              control={form.control}
              key={`${device}.padding`}
              name={`${device}.padding`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Padding</FormLabel>
                  <FormControl>
                    <SpacingInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key={`${device}.margin`}
              name={`${device}.margin`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margin</FormLabel>
                  <FormControl>
                    <SpacingInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
