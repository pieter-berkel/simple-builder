import type { ContentItem, MaybePromise, Page } from "~/types";

export type GetPagesRes = {
  slug: string;
}[];

export type GetPageParams = { id: string } | { slug: string };

export type GetPageRes = Page | undefined;

export type UpdatePageParams = ({ id: string } | { slug: string }) & {
  name?: string;
  slug?: string;
  content?: ContentItem[];
};

export type GetFileRes = string;

export type UploadFileParams = {
  file: File;
};

export type Provider = {
  getPages: () => MaybePromise<GetPagesRes>;
  getPage: (params: GetPageParams) => MaybePromise<GetPageRes>;
  updatePage: (params: UpdatePageParams) => MaybePromise<void>;
  uploadFile: (params: UploadFileParams) => MaybePromise<GetFileRes>;
};
