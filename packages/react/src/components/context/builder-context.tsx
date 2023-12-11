import * as React from "react";
import type { BuilderContent } from "@simple-builder/server";

import { builder } from "~/lib/builder";
import type { BuilderMode } from "~/types";

type BuilderContextType = {
  mode: BuilderMode;

  content: BuilderContent;
  setContent: React.Dispatch<React.SetStateAction<BuilderContent>>;
  addContent: (name: string, parent?: string, index?: number) => void;
  canBringDirection: (id: string, direction: "up" | "down") => boolean;
  bringDirection: (id: string, direction: "up" | "down") => void;
  deleteContent: (id: string) => void;
};

export const BuilderContext = React.createContext<BuilderContextType | null>(
  null,
);

type BuilderProviderProps = {
  children: React.ReactNode;
  mode?: BuilderMode;
  content?: BuilderContent;
};

export const BuilderProvider = (props: BuilderProviderProps) => {
  const [content, setContent] = React.useState<BuilderContent>(
    props.content ?? [],
  );

  const addContent = React.useCallback(
    (name: string, parent?: string, index: number = 0) => {
      const component = builder.getComponent(name);

      if (!component) {
        throw new Error(`[simple-builder]: Component "${name}" not found`);
      }

      setContent((content) => {
        const { container, remaining } = splitContainerItems(content, parent);

        container.splice(index, 0, {
          id: crypto.randomUUID(),
          ...(parent && { parent }),
          component: component.name,
          props: component.inputs
            ? component.inputs.reduce((acc, input) => {
                return {
                  ...acc,
                  [input.name]: input.defaultValue,
                };
              }, {})
            : {},
        });

        return [...container, ...remaining];
      });
    },
    [],
  );

  const deleteContent = React.useCallback(
    (id: string) => {
      setContent((content) => {
        const deleteChildren = (parent: string) => {
          const children = content.filter((item) => item.parent === parent);
          for (const child of children) {
            deleteChildren(child.id);
            content.splice(content.indexOf(child), 1);
          }
        };

        deleteChildren(id);
        return content.filter(({ id: _id }) => _id !== id);
      });
    },
    [setContent],
  );

  const canBringDirection = React.useCallback(
    (id: string, direction: "up" | "down") => {
      const active = content.find((content) => content.id === id);
      if (!active) return false;

      const { container } = splitContainerItems(content, active.parent);
      const activeIndex = container.findIndex((item) => item.id === id);

      return direction === "up"
        ? activeIndex > 0
        : activeIndex < container.length - 1;
    },
    [content, setContent],
  );

  const bringDirection = React.useCallback(
    (id: string, direction: "up" | "down") => {
      setContent((content) => {
        const active = content.find((content) => content.id === id);
        if (!active) return content;

        const { container, remaining } = splitContainerItems(
          content,
          active.parent,
        );

        const activeIndex = container.findIndex((item) => item.id === id);
        const targetIndex =
          direction === "up" ? activeIndex - 1 : activeIndex + 1;

        const target = container[targetIndex];
        if (!target) return content;

        container[targetIndex] = active;
        container[activeIndex] = target;

        return [...container, ...remaining];
      });
    },
    [setContent],
  );

  return (
    <BuilderContext.Provider
      value={{
        mode: props.mode ?? "static",
        content,
        setContent,
        addContent,
        canBringDirection,
        bringDirection,
        deleteContent,
      }}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = React.useContext(BuilderContext);

  if (!context) {
    throw new Error(
      "[simple-builder]: useBuilder must be used within a BuilderProvider",
    );
  }

  return context;
};

const splitContainerItems = (content: BuilderContent, parent?: string) => {
  const container = content.filter((content) => content.parent === parent);
  const remaining = content.filter((content) => content.parent !== parent);
  return { container, remaining };
};
