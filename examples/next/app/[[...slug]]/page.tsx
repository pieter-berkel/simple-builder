import * as React from "react";
import { notFound } from "next/navigation";

import { db } from "~/server/db";
import { StaticContentRenderer } from "./static-content-renderer";

export default async function Home({ params }: { params: { slug: string[] } }) {
  const slug = params.slug ? `/${params.slug.join("/")}` : "/";

  const page = await db.query.pages.findFirst({
    where: (fields, { eq }) => eq(fields.slug, slug),
  });

  if (!page) {
    return notFound();
  }

  return <StaticContentRenderer content={page.content} />;
}
