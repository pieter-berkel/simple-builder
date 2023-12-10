import * as React from "react";
import type { BuilderContent } from "@simple-builder/server";

import type { BuilderMode } from "~/types";

type BuilderContextType = {
  mode: BuilderMode;

  content: BuilderContent;
  setContent: React.Dispatch<React.SetStateAction<BuilderContent>>;
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

  return (
    <BuilderContext.Provider
      value={{
        mode: props.mode ?? "static",
        content,
        setContent,
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
