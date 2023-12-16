// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { BuildContainer } from "@simple-builder/react";

export const TwoColumns = (props) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <BuildContainer name="column-1" multiple {...props.builder} />
      <BuildContainer name="column-2" multiple {...props.builder} />
    </div>
  );
};
