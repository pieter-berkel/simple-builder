import * as React from "react";

import { ContainerItem } from "./container-item";
import { useBuilder } from "./context/builder-context";

type BuildContainerProps =
  | { root: true; parent?: never; multiple: true }
  | { root?: false; parent: string; multiple?: boolean };

export const BuildContainer = (props: BuildContainerProps) => {
  const { root = false, parent } = props;

  if (!root && !parent) {
    throw new Error("[simple-builder]: Parent is required when root is false");
  }

  const { content } = useBuilder();

  const blocks = content
    .filter((content) => (root ? !content.parent : parent === content.parent))
    .sort((a, b) => a.position - b.position);

  return blocks.map((block) => <ContainerItem key={block.id} block={block} />);
};
