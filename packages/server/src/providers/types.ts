import type { ContentItem, MaybePromise } from "@/types";

export type UpdatePageParams = ({ id: string } | { slug: string }) & {
  content?: ContentItem[];
};

export type GetFileRes = string;

export type UploadFileParams = {
  file: File;
};

export type Provider = {
  updatePage: (params: UpdatePageParams) => MaybePromise<void>;
  uploadFile: (params: UploadFileParams) => MaybePromise<GetFileRes>;
};
