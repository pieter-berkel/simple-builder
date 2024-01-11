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

const BuildContainerInner = (props: BuildContainerProps) => {
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
          <div className="sb-relative sb-container-item">
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
      <PopoverContent className="sb-p-1">
        <div className="sb-grid sb-grid-cols-2 sb-gap-2">
          {components.map((component) => {
            const Icon = component.icon ?? ImageIcon;

            return (
              <PopoverClose key={component.name} asChild>
                <Button
                  variant="ghost"
                  className="sb-justify-start"
                  onClick={() => {
                    addContent(
                      component.name,
                      props.container,
                      props.parent,
                      props.index,
                    );
                  }}
                >
                  <Icon className="sb-mr-2 sb-h-4 sb-w-4 sb-shrink-0" />
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
      <div className="sb-flex sb-justify-center sb-bg-primary/50 p-4">
        <Button size="sm">
          <PlusIcon className="sb-mr-2 sb-h-4 sb-w-4" />
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
      <div className="sb-w-full sb-h-1 sb--my-[2px] sb-bg-primary sb-relative sb-z-20 sb-opacity-0 add-content-divider-button sb-transition-opacity">
        <Button
          size="sm"
          className="sb-absolute sb-left-1/2 sb-top-1/2 sb--translate-y-1/2 sb--translate-x-1/2 sb-shadow"
        >
          <PlusIcon className="sb-mr-2 sb-h-4 sb-w-4" />
          Blok Toevoegen
        </Button>
      </div>
    </AddContentButton>
  );
};
