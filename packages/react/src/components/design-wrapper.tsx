import * as React from "react";
import { ContentItem } from "@simple-builder/server";

type DesignWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  styles?: ContentItem["styles"];
};

export const DesignWrapper = (props: DesignWrapperProps) => {
  const { children, className, styles } = props;

  const { container = true, ...rest } = styles || {};

  return (
    <div className={className} style={rest}>
      {container ? (
        <div className="container mx-auto">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};
