import { lazy } from "react";

import "~/global.css";

export { builder } from "~/lib/builder";
export { StaticContent } from "~/components/static-content";
export { BuildContainer } from "~/components/build-container";

export type { BuildContainerProps } from "~/types";

const BuilderContent = lazy(() => import("./components/builder-content"));
export { BuilderContent };
