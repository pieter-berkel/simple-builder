import type { Block } from "@simple-builder/server";
import { integer, sqliteTable as table, text } from "drizzle-orm/sqlite-core";

export const pages = table("pages", {
  id: text("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  blocks: text("blocks", { mode: "json" }).$type<Block[]>().notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
