import { Block } from "@simple-builder/server";

import { builder } from "~/lib/builder";

type ContainerItemProps = {
  block: Block;
};

export const ContainerItem = (props: ContainerItemProps) => {
  const { block } = props;
  return builder.bindComponent(block);
};
