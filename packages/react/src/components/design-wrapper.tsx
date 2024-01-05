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
      className={cn("sb-relative", className)}
      style={{ ...(!src && { background }), ...rest }}
    >
      {src && (
        <Image
          src={src}
          alt=""
          fill
          className="sb-object-cover sb-absolute sb-inset-0 sb-pointer-events-none sb--z-[1]"
        />
      )}
      {container ? (
        <div className="sb-container sb-mx-auto">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};
