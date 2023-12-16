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
  | "date";

export type ComponentInput<T extends InputType> = {
  type: T;
  name: string;
  friendlyName?: string;
  helperText?: string;
  defaultValue?: any;
} & (T extends "string"
  ? { enum?: string[] | { label: string; value: any } }
  : {});

export type Component = {
  component: (props?: any) => JSX.Element;
  name: string;
  friendlyName?: string;
  icon?: any;
  description?: string;
  inputs?: ComponentInput<any>[];
  defaults?: Record<string, unknown>;
  defaultStyles?: Record<string, string>;
};
