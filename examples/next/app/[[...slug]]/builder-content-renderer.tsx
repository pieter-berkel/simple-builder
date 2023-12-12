"use client";

import { BuilderComponent } from "@simple-builder/react";

import "@simple-builder/react/styles";
import "./builder-registery";

type BuilderContentRendererProps = React.ComponentProps<
  typeof BuilderComponent
>;

export const BuilderContentRenderer = (props: BuilderContentRendererProps) => {
  return <BuilderComponent {...props} />;
};
