import { BuildContainer } from "@simple-builder/react";
import { Block } from "@simple-builder/server";

type SectionProps = {
  builder: {
    parent: string;
    blocks: Block[];
  };
};

export const Section = (props: SectionProps) => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-6xl bg-red-200 min-h-[100px]">
        <BuildContainer {...props.builder} />
      </div>
    </div>
  );
};
