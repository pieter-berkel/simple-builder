import * as React from "react";
import type { BuilderContent } from "@simple-builder/server";

import { BuildContainer } from "~/components/build-container";
import { BuilderProvider } from "~/components/context/builder-context";

import { BuilderMode } from "~/types";

type BuilderProps = {
  mode?: BuilderMode;
  content?: BuilderContent;
};

export const Builder = (props: BuilderProps) => {
  const { mode, content } = props;

  return (
    <BuilderProvider mode={mode} content={content}>
      <BuildContainer root={true} multiple={true} />
    </BuilderProvider>
  );
};
