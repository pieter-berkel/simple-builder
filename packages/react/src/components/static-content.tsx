import * as React from "react";
import { BuilderContent } from "@simple-builder/server";

import { BuildContainer } from "./build-container";

type StaticContentProps = {
  content?: BuilderContent;
};

export const StaticContent = (props: StaticContentProps) => {
  return (
    <BuildContainer
      name="root"
      edit={false}
      multiple
      content={props.content || []}
    />
  );
};
