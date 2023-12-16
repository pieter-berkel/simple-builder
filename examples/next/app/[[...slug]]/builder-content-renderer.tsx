"use client";

import { BuilderContent } from "@simple-builder/react";

import "@simple-builder/react/styles";
import "./builder-registery";

type BuilderContentRendererProps = React.ComponentProps<typeof BuilderContent>;

export const BuilderContentRenderer = (props: BuilderContentRendererProps) => {
  return <BuilderContent {...props} />;
};
