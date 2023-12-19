import * as React from "react";
import { PaintbrushIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { cn } from "~/lib/utils";

type BackgroundPickerProps = {
  background: string;
  onBackgroundChange: (background: string) => void;
  className?: string;
  solids?: string[];
  gradients?: string[];
  images?: string[];
};

export const BackgroundPicker = (props: BackgroundPickerProps) => {
  const { background, onBackgroundChange, className } = props;

  const solids = props.solids ?? ["#000000", "#ffffff"];

  const gradients = props.gradients ?? [
    "linear-gradient(to top left,#accbee,#e7f0fd)",
    "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
  ];

  const images = props.images ?? [
    "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  ];

  const defaultTab = React.useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "justify-start text-left font-normal normal-case w-full",
            !background && "text-sb-muted-foreground",
            className,
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all border"
                style={{ background }}
              />
            ) : (
              <PaintbrushIcon className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : "Kies een achtergrond"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="solid"
            className="data-[state=active]:flex flex-wrap gap-1 p-4"
          >
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105 border"
                onClick={() => onBackgroundChange(s)}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="gradient"
            className="data-[state=active]:flex flex-wrap gap-1 p-4"
          >
            {gradients.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105 border"
                onClick={() => onBackgroundChange(s)}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="image"
            className="data-[state=active]:grid grid-cols-2 gap-1 p-4"
          >
            {images.map((s) => (
              <div
                key={s}
                style={{ backgroundImage: s }}
                className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer border active:scale-105"
                onClick={() => onBackgroundChange(s)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
