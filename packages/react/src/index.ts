import { lazy } from "react";

import "@/global.css";

export { builder } from "@/lib/builder";

export { StaticContent } from "@/components/static-content";

const BuilderContent = lazy(() => import("./components/builder-content"));
export { BuilderContent };

export { BuildContainer } from "@/components/build-container";

export type { BuildContainerProps } from "@/types";
