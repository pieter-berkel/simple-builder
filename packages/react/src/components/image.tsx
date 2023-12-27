import * as React from "react";
// @ts-expect-error - External module
import NextImage from "next/image";

// get props of HTMLImageElement
type ImageProps = React.ComponentProps<"img"> & {
  alt: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
  unoptimized?: boolean;
} & (
    | {
        fill?: false;
        width: number;
        height: number;
      }
    | {
        fill: true;
        width?: number;
        height?: number;
      }
  );

export const Image = (props: ImageProps) => {
  if (typeof NextImage !== "undefined") {
    return <NextImage.default {...props} />;
  }

  return <img {...props} />;
};
