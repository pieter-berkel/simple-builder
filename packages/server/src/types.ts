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
  styles?: {
    container?: boolean;
    desktop?: Record<string, unknown>;
    mobile?: Record<string, unknown>;
  };
};
