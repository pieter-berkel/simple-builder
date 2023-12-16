// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { BuildContainer } from "@simple-builder/react";

type SectionProps = {};

export const Section = (props: SectionProps) => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-6xl bg-red-200 min-h-[100px]">
        <BuildContainer name="default" multiple {...props.builder} />
      </div>
    </div>
  );
};
