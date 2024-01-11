import * as React from "react";
import { BuilderContent } from "@simple-builder/server";

import { builder } from "~/lib/builder";
import { DesignWrapper } from "./design-wrapper";

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
    return items.map((item) => (
      <DesignWrapper styles={item.styles}>
        {builder.bindComponent(item, true)}
      </DesignWrapper>
    ));
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BuildContainerInner {...props} />
    </React.Suspense>
  );
};

export default BuildContainer;
