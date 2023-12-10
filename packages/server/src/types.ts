export type Simplify<TType> = TType extends any[] | Date
  ? TType
  : { [K in keyof TType]: TType[K] };

export type MaybePromise<T> = Promise<T> | T;

export type BuilderContent = Block[];

export type Block = {
  id: string;
  parent?: string;
  name?: string;
  position: number;
  component: string;
  styles?: Record<string, string>;
  props?: Record<string, unknown>;
};

export type Page = {
  id: string | number;
  name: string;
  slug: string;
  blocks: Block[];
};
