import * as React from "react";
import { ContentItem } from "@simple-builder/server";

import { Image } from "~/components/image";

import { cn } from "~/lib/utils";

type DesignWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  styles?: ContentItem["styles"];
};

export const DesignWrapper = (props: DesignWrapperProps) => {
  const { children, className, styles } = props;

  const { container = true, background, ...rest } = styles || {};

  const matches =
    typeof background === "string"
      ? background.match(/url\(["']?(.*?)["']?\)/)
      : undefined;
  const src = matches ? matches[1] : undefined;

  return (
    <div
      className={cn("relative", className)}
      style={{ ...(!src && { background }), ...rest }}
    >
      {src && (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover absolute inset-0 pointer-events-none -z-[1]"
        />
      )}
      {container ? (
        <div className="container mx-auto">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};
