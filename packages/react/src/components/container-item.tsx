import * as React from "react";
import { Block } from "@simple-builder/server";

import { ContainerItemToolbar } from "~/components/container-item-toolbar";

import { builder } from "~/lib/builder";

type ContainerItemProps = {
  block: Block;
};

export const ContainerItem = (props: ContainerItemProps) => {
  const { block } = props;

  return (
    <div className="relative sb-container-item">
      {builder.bindComponent(block)}
      <ContainerItemToolbar contentId={block.id} />
    </div>
  );
};
