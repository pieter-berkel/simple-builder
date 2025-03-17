import * as React from "react";
import { PaintbrushIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { MediaInput } from "./media-input";

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

  const solids = props.solids ?? [
    "#000000",
    "#ffffff",
    "#0f172a",
    "#F1F5F9",
    "#64748B",
    "#E6007E",
    "#F8FAFC",
    "#009DD1",
    "#FF0000",
  ];

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
            "sb-justify-start sb-text-left sb-font-normal sb-normal-case sb-w-full",
            !background && "sb-text-muted-foreground",
            className,
          )}
        >
          <div className="sb-w-full sb-flex sb-items-center sb-gap-2">
            {background ? (
              <div
                className="sb-h-4 sb-w-4 sb-rounded !sb-bg-center !sb-bg-cover sb-transition-all sb-border"
                style={{ background }}
              />
            ) : (
              <PaintbrushIcon className="sb-h-4 sb-w-4" />
            )}
            <div className="sb-truncate sb-flex-1">
              {background ? background : "Kies een achtergrond"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sb-w-64 sb-p-0">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="sb-w-full">
            <TabsTrigger className="sb-flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="sb-flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="sb-flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="solid"
            className="data-[state=active]:sb-flex sb-flex-wrap sb-gap-1 sb-p-4"
          >
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="sb-rounded-md sb-h-6 sb-w-6 sb-cursor-pointer active:sb-scale-105 sb-border"
                onClick={() => onBackgroundChange(s)}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="gradient"
            className="data-[state=active]:sb-flex sb-flex-wrap sb-gap-1 sb-p-4"
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
          <TabsContent value="image">
            <div className="sb-p-4 sb-border-b">
              <MediaInput
                className="sb-grid sb-grid-cols-2 sb-gap-1"
                itemClassName="sb-aspect-video sb-h-auto sb-w-full"
                multiple={false}
                onFilesChange={(files) => {
                  if (!files.length) return;
                  onBackgroundChange(`url(${files[0]})`);
                }}
                onError={(e) =>
                  console.error(
                    "[media-input]: Title: " + e?.title,
                    "media-input: Error: " + e?.description,
                  )
                }
              />
            </div>
            <div className="sb-grid sb-grid-cols-2 sb-gap-1 sb-p-4">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="sb-rounded-md sb-bg-cover sb-bg-center sb-aspect-video sb-w-full sb-cursor-pointer sb-border active:sb-scale-105"
                  onClick={() => onBackgroundChange(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
