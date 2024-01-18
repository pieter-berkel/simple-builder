import * as React from "react";
import type { BuilderContent } from "@simple-builder/server";

import { builder } from "~/lib/builder";
import { insertAt } from "~/lib/utils";

type BuilderContextType = {
  url: string;

  content: BuilderContent;
  setContent: React.Dispatch<React.SetStateAction<BuilderContent>>;

  getItem: (id: string) => BuilderContent[number] | undefined;
  patchItem: (id: string, patch: Partial<BuilderContent[number]>) => void;

  addContent: (
    name: string,
    container: string,
    parent?: string,
    index?: number,
  ) => void;
  deleteContent: (id: string) => void;
  bringUp: (id: string) => void;
  bringDown: (id: string) => void;
  save: () => void;
};

export const BuilderContext = React.createContext<BuilderContextType | null>(
  null,
);

type BuilderProviderProps = {
  children: React.ReactNode;
  url?: string;
  content?: BuilderContent;
};

export const BuilderProvider = (props: BuilderProviderProps) => {
  const url = props.url ?? "/api/simple-builder";

  const [content, setContent] = React.useState<BuilderContent>(
    props.content ?? [],
  );

  const getItem = React.useCallback(
    (id: string) => {
      return findRecursive(content, (item) => item.id === id);
    },
    [content],
  );

  const patchItem = React.useCallback(
    (id: string, patch: Partial<BuilderContent[number]>) => {
      setContent((content) =>
        mapRecursive(content, (item) => {
          if (item.id === id) {
            return {
              ...item,
              ...patch,
            };
          }

          return item;
        }),
      );
    },
    [setContent, mapRecursive],
  );

  const addContent = React.useCallback(
    (name: string, container: string, parent?: string, index: number = 0) => {
      const component = builder.getComponent(name);

      if (!component) {
        throw new Error(`[simple-builder]: Component "${name}" not found`);
      }

      const entry = {
        id: crypto.randomUUID(),
        component: component.name,
        ...(parent && { parent }),
        ...(component.inputs && {
          props: component.inputs.reduce(
            (acc, input) => ({
              ...acc,
              [input.name]: input.defaultValue,
            }),
            {},
          ),
        }),
        ...(component.defaultStyles && {
          styles: component.defaultStyles,
        }),
      };

      if (!parent) {
        setContent((content) => insertAt(content, index, entry));
        return;
      }

      setContent((content) =>
        mapRecursive(content, (item) => {
          if (item.id === parent) {
            return {
              ...item,
              content: {
                ...item.content,
                [container]: insertAt(item.content?.[container], index, entry),
              },
            };
          }

          return item;
        }),
      );
    },
    [setContent, mapRecursive],
  );

  const deleteContent = React.useCallback(
    (id: string) =>
      setContent((prev) => filterRecursive(prev, (item) => item.id !== id)),
    [setContent, filterRecursive],
  );

  const bringUp = React.useCallback(
    (id: string) => {
      setContent((content) =>
        mapRecursive(content, (item, index, arr) => {
          if (item.id === id && index > 0) {
            return arr[index - 1];
          }

          if (arr[index + 1]?.id === id) {
            return arr[index + 1];
          }

          return item;
        }),
      );
    },
    [setContent, mapRecursive],
  );

  const bringDown = React.useCallback(
    (id: string) => {
      setContent((content) =>
        mapRecursive(content, (item, index, arr) => {
          if (item.id === id && index < arr.length - 1) {
            return arr[index + 1];
          }

          if (arr[index - 1]?.id === id) {
            return arr[index - 1];
          }

          return item;
        }),
      );
    },
    [setContent, mapRecursive],
  );

  const save = React.useCallback(async () => {
    const slug = window.location.pathname;

    await fetch(`${url}/page/update`, {
      method: "POST",
      body: JSON.stringify({
        slug,
        content,
      }),
    });
  }, [content]);

  return (
    <BuilderContext.Provider
      value={{
        url,
        content,
        setContent,
        getItem,
        patchItem,
        addContent,
        bringUp,
        bringDown,
        deleteContent,
        save,
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

const filterRecursive = <T extends any[]>(
  items: T,
  predicate: (item: T[number], index: number) => boolean,
  key: string = "content",
): T => {
  return items.filter(predicate).map((item) => ({
    ...item,
    ...(item[key] && {
      [key]: Object.entries(item[key] ?? {}).reduce(
        (acc, [name, content]) => ({
          ...acc,
          [name]: filterRecursive(content as T, predicate, key),
        }),
        {},
      ),
    }),
  })) as T;
};

const mapRecursive = <T extends any[]>(
  items: T,
  predicate: (item: T[number], index: number, arr: any[]) => T[number],
  key: string = "content",
): T => {
  return items.map(predicate).map((item) => ({
    ...item,
    ...(item[key] && {
      [key]: Object.entries(item[key] ?? {}).reduce(
        (acc, [name, content]) => ({
          ...acc,
          [name]: mapRecursive(content as T, predicate, key),
        }),
        {},
      ),
    }),
  })) as T;
};

const findRecursive = <T extends any[]>(
  items: T,
  predicate: (item: T[number]) => boolean,
  key: string = "content",
): T[number] | undefined => {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }

    if (item[key]) {
      const keys = Object.keys(item[key] ?? {});
      for (const x of keys) {
        const found = findRecursive(item[key][x] as T, predicate, key);

        if (found) {
          return found;
        }
      }
    }
  }
};
