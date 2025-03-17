import { NextRequest } from "next/server";

import type { Provider, UpdatePageParams } from "@/providers/types";

export interface Config {
  provider: Provider;
}

export const createSimpleBuilderNextHandler = (config: Config) => {
  const { provider } = config;

  return async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    switch (true) {
      case pathname.endsWith("/simple-builder/page/update"): {
        const json = (await req.json()) as UpdatePageParams;
        await provider.updatePage(json);
        return new Response();
      }
      case pathname.endsWith("/simple-builder/file/upload"): {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const url = await provider.uploadFile({ file });
        return Response.json({ data: url });
      }
    }
  };
};
