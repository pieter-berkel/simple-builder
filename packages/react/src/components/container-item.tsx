import * as React from "react";
import { Block } from "@simple-builder/server";

import { ContainerItemToolbar } from "~/components/container-item-toolbar";

import { builder } from "~/lib/builder";
import { useBuilder } from "./context/builder-context";

type ContainerItemProps = {
  block: Block;
};

export const ContainerItem = (props: ContainerItemProps) => {
  const { block } = props;

  const { mode } = useBuilder();

  return (
    <div className="relative sb-container-item">
      {builder.bindComponent(block)}
      {mode === "edit" && <ContainerItemToolbar contentId={block.id} />}
    </div>
  );
};
