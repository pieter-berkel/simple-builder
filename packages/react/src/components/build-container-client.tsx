import * as React from "react";
import { BuilderContent } from "@simple-builder/server";
import { ImageIcon, PlusIcon } from "lucide-react";

import { builder } from "~/lib/builder";
import { ContainerItemToolbar } from "./container-item-toolbar";
import { useBuilder } from "./context/builder-context";
import { DesignWrapper } from "./design-wrapper";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

type BuildContainerProps = {
  id?: string;
  name: string;
  content: BuilderContent;
  multiple?: boolean;
  edit: boolean;
};

export const BuildContainerInner = (props: BuildContainerProps) => {
  const { id, name, content, multiple = false } = props;

  const items = Array.isArray(content) ? content : content?.[name] || [];

  if (!multiple && items.length > 1) {
    console.error(
      "[simple-builder]: Multiple content blocks detected when using property multiple false.",
    );
  }

  return (
    <div>
      {items.length <= 0 ? (
        <AddContentPlaceholder parent={id} container={name} index={0} />
      ) : (
        multiple && (
          <AddContentDividerButton parent={id} container={name} index={0} />
        )
      )}

      {items.map((item, i) => (
        <React.Fragment key={item.id}>
          <div className="relative sb-container-item">
            <DesignWrapper styles={item.styles}>
              {builder.bindComponent(item, true)}
            </DesignWrapper>
            <ContainerItemToolbar
              contentId={item.id}
              canBringUp={i > 0}
              canBringDown={i < items.length - 1}
            />
          </div>

          {multiple && (
            <AddContentDividerButton
              parent={id}
              container={name}
              index={i + 1}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BuildContainerInner;

type AddContentButtonProps = {
  parent?: string;
  container: string;
  index: number;
  children: React.ReactNode;
};

const AddContentButton = (props: AddContentButtonProps) => {
  const components = builder.getComponents();

  const { addContent } = useBuilder();

  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent className="p-1">
        <div className="grid grid-cols-2 gap-2">
          {components.map((component) => {
            const Icon = component.icon ?? ImageIcon;

            return (
              <PopoverClose key={component.name} asChild>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    addContent(
                      component.name,
                      props.container,
                      props.parent,
                      props.index,
                    );
                  }}
                >
                  <Icon className="mr-2 h-4 w-4 shrink-0" />
                  {component.friendlyName ?? component.name}
                </Button>
              </PopoverClose>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const AddContentPlaceholder = (
  props: Omit<AddContentButtonProps, "children">,
) => {
  return (
    <AddContentButton {...props}>
      <div className="flex justify-center bg-sb-primary/50 p-4">
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          Blok Toevoegen
        </Button>
      </div>
    </AddContentButton>
  );
};

const AddContentDividerButton = (
  props: Omit<AddContentButtonProps, "children">,
) => {
  return (
    <AddContentButton {...props}>
      <div className="w-full h-1 -my-[2px] bg-sb-primary relative z-20 opacity-0 add-content-divider-button transition-opacity">
        <Button
          size="sm"
          className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Blok Toevoegen
        </Button>
      </div>
    </AddContentButton>
  );
};
