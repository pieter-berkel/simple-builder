import { createSimpleBuilderNextHandler } from "@simple-builder/server/adapters/next/app";

import { provider } from "./provider";

const handler = createSimpleBuilderNextHandler({ provider });

export { handler as GET, handler as POST };
