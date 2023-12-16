export type Simplify<TType> = TType extends any[] | Date
  ? TType
  : { [K in keyof TType]: TType[K] };

export type MaybePromise<T> = Promise<T> | T;

export type BuilderContent = ContentItem[];

export type ContentItem = {
  id: string;
  parent?: string;
  content?: Record<string, ContentItem[]>;
  component: string;
  props?: Record<string, unknown>;
};

export type Page = {
  id: string | number;
  name: string;
  slug: string;
  content: ContentItem[];
};
