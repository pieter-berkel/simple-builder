"use client";

import * as React from "react";
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Image } from "../image";

type MediaInputProps = {
  files?: string[];
  onFilesChange?: (files: string[]) => void;
  multiple?: boolean;
  limit?: number;
  onError?: (error: MediaInputError | null) => void;
  className?: string;
  itemClassName?: string;
};

export const MediaInput = (props: MediaInputProps) => {
  const { onFilesChange, limit = 32, multiple = false, onError } = props;

  const id = React.useId();

  const [queue, setQueue] = React.useState<File[]>([]);
  const [sources, setSources] = React.useState<string[]>(props.files ?? []);

  const maxConcurrentUploads = 3;
  const uploadingCountRef = React.useRef(0);

  const handleFilesAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (files.length + sources.length > (multiple ? limit : 1)) {
      onError?.(
        new MediaInputError(
          `Maximaal ${limit} bestanden.`,
          `Je probeerde nu ${
            files.length + sources.length
          } bestanden toe te voegen, maar je mag er maximaal ${limit} toevoegen.`,
        ),
      );
      return;
    }

    const queue = Array.from(files);
    setQueue(queue);

    for (const file of queue) {
      try {
        while (
          uploadingCountRef.current >= maxConcurrentUploads &&
          uploadingCountRef.current > 0
        ) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }

        uploadingCountRef.current++;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/simple-builder/file/upload", {
          method: "POST",
          body: formData,
        });

        if (res === undefined || !res.ok) {
          onError?.(
            new MediaInputError(
              "Bestand uploaden misulukt",
              `Bestand ${file.name} kon niet worden geüpload.`,
            ),
          );
          continue;
        }

        const { data: url } = await res.json();

        if (!url) {
          onError?.(
            new MediaInputError(
              "Bestand uploaden misulukt",
              `De URL van bestand ${file.name} kon niet worden opgehaald.`,
            ),
          );
          continue;
        }

        setSources((prev) => [...prev, url]);
        onFilesChange?.([...sources, url]);
      } catch (e) {
        onError?.(
          new MediaInputError(
            "Bestand uploaden misulukt",
            `Bestand ${file.name} kon niet worden geüpload.`,
          ),
        );
      } finally {
        setQueue((prev) => prev.filter((f) => f !== file));
        uploadingCountRef.current--;
      }
    }
  };

  const handleSourceDelete = async (src: string) => {
    setSources((prev) => prev.filter((s) => s !== src));
    onFilesChange?.(sources.filter((s) => s !== src));

    await fetch("/api/uploadthing/delete", {
      method: "POST",
      body: JSON.stringify({ src: src }),
    });
  };

  return (
    <div className={cn("flex flex-wrap gap-4", props.className)}>
      {sources.map((src) => (
        <MediaInputItem key={src} className={cn("group", props.itemClassName)}>
          <Image
            src={src}
            alt=""
            fill
            className="sb-absolute sb-inset-0 sb-object-cover sb-pointer-events-none"
          />
          <div className="sb-absolute sb-right-1 sb-top-1 sb-z-30 sb-flex sb-items-center sb-justify-end sb-gap-3 sb-opacity-0 sb-transition-opacity group-hover:sb-opacity-100">
            <button
              className="sb-flex sb-h-8 sb-w-8 sb-items-center sb-justify-center sb-rounded-full sb-border sb-bg-secondary sb-text-secondary-foreground sb-opacity-90 sb-shadow sb-transition-opacity hover:sb-opacity-100"
              onClick={() => handleSourceDelete(src)}
            >
              <Trash2Icon className="sb-h-4 sb-w-4" />
            </button>
          </div>
        </MediaInputItem>
      ))}
      {queue.map((_, i) => (
        <MediaInputItem
          key={i}
          className={cn(
            "sb-flex sb-h-28 sb-w-28 sb-items-center sb-justify-center",
            props.itemClassName,
          )}
        >
          <Loader2Icon className="sb-h-6 sb-w-6 sb-animate-spin" />
        </MediaInputItem>
      ))}

      {multiple || (!multiple && !sources.length && !queue.length) ? (
        <label
          htmlFor={id}
          className={cn(
            "sb-flex sb-h-28 sb-w-28 sb-cursor-pointer sb-items-center sb-justify-center sb-rounded-lg sb-border",
            props.itemClassName,
          )}
        >
          <PlusIcon className="sb-h-6 sb-w-6" />
          <input
            id={id}
            type="file"
            onChange={handleFilesAdd}
            multiple={multiple}
            accept=".png,.jpg,.jpeg,.webp,.gif,.svg"
            className="sb-hidden"
          />
        </label>
      ) : null}
    </div>
  );
};

type MediaInputItemProps = {
  children?: React.ReactNode;
  className?: string;
};

const MediaInputItem = (props: MediaInputItemProps) => {
  return (
    <div
      className={cn(
        "sb-relative sb-h-28 sb-w-28 sb-overflow-hidden sb-rounded-lg sb-border",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

class MediaInputError extends Error {
  title: string;
  description: string;

  constructor(message: string, description: string) {
    super(message);
    this.title = message;
    this.description = description;
  }
}
