import type { GetPageParams, GetPageRes, GetPagesRes } from "~/providers/types";

type Config = {
  baseUrl?: string;
};

type BuilderClient = (config?: Config) => {
  getPages: () => Promise<GetPagesRes>;
  getPage: (params: GetPageParams) => Promise<GetPageRes>;
};

export const createBuilderClient: BuilderClient = (config) => {
  const baseUrl =
    config?.baseUrl || process.env.NEXT_PUBLIC_SIMPLE_BUILDER_API_URL;

  if (!baseUrl) {
    throw new Error(
      "Simple builder API url is not defined. please provide a baseUrl in the config or set the NEXT_PUBLIC_SIMPLE_BUILDER_API_URL environment variable.",
    );
  }

  return {
    getPages: async () => {
      const response = await fetch(`${baseUrl}/pages`);
      const { data } = await response.json();
      return data;
    },
    getPage: async (params) => {
      const response = await fetch(`${baseUrl}/page`, {
        method: "POST",
        body: JSON.stringify(params),
      });

      const { data } = await response.json();
      return data;
    },
  };
};
