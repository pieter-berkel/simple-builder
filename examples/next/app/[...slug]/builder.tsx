"use client";

import { BuilderComponent } from "@simple-builder/react";
import type { BuilderContent } from "@simple-builder/server";

import "@simple-builder/react/styles";
import "./builder-registery";

type RenderBuilderContentProps = {
  content?: BuilderContent;
};

export const RenderBuilderContent = (props: RenderBuilderContentProps) => {
  const { content } = props;

  return <BuilderComponent mode="edit" content={content} />;
};
