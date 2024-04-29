import { StaticContent } from "@simple-builder/react";

import "./builder-registery";
import "@simple-builder/react/styles";

type StaticContentRenderer = React.ComponentProps<typeof StaticContent>;

export const StaticContentRenderer = (props: StaticContentRenderer) => {
  return <StaticContent {...props} />;
};
