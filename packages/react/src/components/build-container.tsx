import * as React from "react";
import { BuilderContent } from "@simple-builder/server";

import { builder } from "~/lib/builder";

const BuildContainerInner = React.lazy(
  () => import("./build-container-client"),
);

type BuildContainerProps = {
  id?: string;
  name: string;
  content: BuilderContent;
  multiple?: boolean;
  edit: boolean;
};

export const BuildContainer = (props: BuildContainerProps) => {
  const { content, edit, name } = props;

  const items = Array.isArray(content) ? content : content?.[name] || [];

  if (!edit) {
    return items.map((item) => builder.bindComponent(item));
  }

  return <BuildContainerInner {...props} />;
};

export default BuildContainer;
