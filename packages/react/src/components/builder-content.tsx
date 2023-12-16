import * as React from "react";
import type { BuilderContent as BuilderContentType } from "@simple-builder/server";

import { BuildContainer } from "./build-container";
import { BuilderProvider, useBuilder } from "./context/builder-context";

type BuilderContentProps = {
  content?: BuilderContentType;
};

export const BuilderContent = (props: BuilderContentProps) => {
  return (
    <BuilderProvider content={props.content}>
      <BuilderContentInner />
    </BuilderProvider>
  );
};

const BuilderContentInner = () => {
  const { content } = useBuilder();
  return <BuildContainer name="root" edit multiple content={content} />;
};

export default BuilderContent;
