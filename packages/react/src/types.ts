import { BuilderContent, ContentItem } from "@simple-builder/server";

export type Simplify<TType> = TType extends any[] | Date
  ? TType
  : { [K in keyof TType]: TType[K] };

export type MaybePromise<T> = Promise<T> | T;

export type InputType =
  | "string"
  | "number"
  | "boolean"
  | "longText"
  | "richText"
  | "file"
  | "color"
  | "date"
  | "grouped";

export type ComponentInput<T extends InputType> = {
  type: T;
  name: string;
  friendlyName?: string;
  helperText?: string;
  defaultValue?: any;
  multiple?: boolean;
} & (T extends "string"
  ? { enum?: string[] | { label: string; value: any } }
  : {}) &
  (T extends "grouped"
    ? {
        inputs: ComponentInput<any>[];
      }
    : {});

export type Component = {
  component: (props?: any) => JSX.Element;
  name: string;
  friendlyName?: string;
  icon?: any;
  description?: string;
  inputs?: ComponentInput<InputType>[];
  defaults?: Record<string, unknown>;
  defaultStyles?: ContentItem["styles"];
};

export type BuildContainerProps = {
  builder: {
    id?: string;
    content: BuilderContent;
    edit: boolean;
  };
};
