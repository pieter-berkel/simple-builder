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
  const { children, className } = props;

  const { background } = props.styles?.desktop ?? {};

  const matches =
    typeof background === "string"
      ? background.match(/url\(["']?(.*?)["']?\)/)
      : undefined;

  const src = matches ? matches[1] : undefined;

  const desktopStyles = props.styles?.desktop ?? {};
  const mobileStyles = props.styles?.mobile ?? {};

  const container = props.styles?.container ?? true;

  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div id={id} className={cn("sb-relative", className)}>
      {src && (
        <Image
          src={src}
          alt=""
          fill
          className="sb-object-cover sb-absolute sb-inset-0 sb-pointer-events-none sb--z-[1]"
        />
      )}
      {container ? (
        <div className="container sb-mx-auto">{children}</div>
      ) : (
        children
      )}

      <style>
        {`
        #${id} {
          ${Object.entries(desktopStyles)
            .filter(([key]) => !(key === "background" && src))
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ")}
        }

        @media (max-width: 1024px) {
          #${id} {
            ${Object.entries(mobileStyles)
              .filter(([key]) => !(key === "background" && src))
              .map(([key, value]) => `${key}: ${value}; `)
              .join(" ")}
          }
        }
      `.replace(/\s\s+/g, " ")}
      </style>
    </div>
  );
};

export default DesignWrapper;
