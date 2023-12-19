import { BuildContainer, BuildContainerProps } from "@simple-builder/react";

type ColumnsProps = {
  columns: number;
} & BuildContainerProps;

export const Columns = (props: ColumnsProps) => {
  const { columns = 2 } = props;

  return (
    <div
      className="grid gap-6 p-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from(Array(columns)).map((_, i) => (
        <BuildContainer
          key={i}
          name={`column-${i}`}
          multiple
          {...props.builder}
        />
      ))}
    </div>
  );
};
