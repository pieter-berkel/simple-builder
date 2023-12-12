import type { Provider } from "@simple-builder/server/providers";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

import { db } from "~/server/db";
import * as s from "~/server/db/schema";

export const provider: Provider = {
  async getPages() {
    return await db.query.pages.findMany({
      columns: { slug: true },
    });
  },

  async getPage(params) {
    const identifier = "id" in params ? "id" : "slug";
    const value = "id" in params ? params.id : params.slug;

    return await db.query.pages.findFirst({
      where: (fields, { eq }) => eq(fields[identifier], value),
      columns: { id: true, name: true, slug: true, content: true },
    });
  },

  async updatePage(params) {
    const identifier = "id" in params ? "id" : "slug";
    const value = "id" in params ? params.id : params.slug;

    await db
      .update(s.pages)
      .set({
        content: params.content,
        updatedAt: new Date(),
      })
      .where(eq(s.pages[identifier], value));
  },

  async uploadFile(params) {
    const { file } = params;

    const utapi = new UTApi();
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.url;
  },
};
