import * as React from "react";
import { ImageIcon, PlusIcon } from "lucide-react";

import { ContainerItem } from "~/components/container-item";
import { useBuilder } from "~/components/context/builder-context";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { builder } from "~/lib/builder";

type BuildContainerProps =
  | { root: true; parent?: never; multiple: true }
  | { root?: false; parent: string; multiple?: boolean };

export const BuildContainer = (props: BuildContainerProps) => {
  const { root = false, parent, multiple = false } = props;

  if (!root && !parent) {
    throw new Error("[simple-builder]: Parent is required when root is false");
  }

  const { content, mode } = useBuilder();

  const blocks = content.filter((content) =>
    root ? !content.parent : parent === content.parent,
  );

  if (mode === "static") {
    return blocks.map((block) => (
      <ContainerItem key={block.id} block={block} />
    ));
  }

  return (
    <div>
      {multiple && <AddContentDividerButton parent={parent} position={0} />}

      {blocks.map((block, i) => (
        <React.Fragment key={block.id}>
          <ContainerItem block={block} />
          {multiple && (
            <AddContentDividerButton parent={parent} position={i + 1} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

type AddContentDividerButtonProps = {
  parent?: string;
  position: number;
};

const AddContentDividerButton = (props: AddContentDividerButtonProps) => {
  const { parent, position } = props;

  const { addContent } = useBuilder();

  const components = builder.getComponents();

  return (
    <div className="w-full h-1 -my-[2px] bg-sb-primary relative z-20 opacity-0 add-content-divider-button transition-opacity">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Blok Toevoegen
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1">
          <div className="grid grid-cols-2 gap-2">
            {components.map((component) => {
              const Icon = component.icon ?? ImageIcon;

              return (
                <PopoverClose key={component.name} asChild>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => addContent(component.name, parent, position)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {component.friendlyName ?? component.name}
                  </Button>
                </PopoverClose>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
