import { BuilderComponent } from "@simple-builder/react";

import "./builder-registery";

type StaticContentRenderer = React.ComponentProps<typeof BuilderComponent>;

export const StaticContentRenderer = (props: StaticContentRenderer) => {
  return <BuilderComponent {...props} />;
};
