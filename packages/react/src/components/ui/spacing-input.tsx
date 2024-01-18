import * as React from "react";
import {
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  ScanIcon,
} from "lucide-react";

import { AdvancedInput } from "./input";
import { Toggle } from "./toggle";

type SpacingInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const SpacingInput = (props: SpacingInputProps) => {
  const [value, setValue] = React.useState(parse(props.value || "0px"));

  const [indipendent, setIndipendent] = React.useState(
    isIndipendent(parse(props.value || "0px")),
  );

  React.useEffect(() => {
    if (!props.onChange) return;
    props.onChange(stringify(value));
  }, [value, props.onChange]);

  return (
    <div className="sb-grid sb-grid-cols-[1fr,auto] sb-gap-3">
      <div className="sb-grid sb-grid-cols-2 sb-items-center sb-gap-3">
        {!indipendent ? (
          <>
            <AdvancedInput
              value={value.left}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, left: +value, right: +value }))
              }
              prepend={
                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />
            <AdvancedInput
              value={value.top}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, top: +value, bottom: +value }))
              }
              prepend={
                <AlignHorizontalSpaceAroundIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />
          </>
        ) : (
          <>
            <AdvancedInput
              value={value.left}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, left: +value }))
              }
              prepend={
                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />

            <AdvancedInput
              value={value.top}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, top: +value }))
              }
              prepend={
                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-90" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />
            <AdvancedInput
              value={value.right}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, right: +value }))
              }
              prepend={
                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb-rotate-180" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />
            <AdvancedInput
              value={value.bottom}
              pattern="\d+"
              onChange={({ target: { value } }) =>
                setValue((prev) => ({ ...prev, bottom: +value }))
              }
              prepend={
                <AlignHorizontalJustifyStartIcon className="sb-h-4 sb-w-4 sb--rotate-90" />
              }
              append={<span className="sb-text-muted-foreground">px</span>}
            />
          </>
        )}
      </div>
      <div className="sb-shrink-0">
        <Toggle
          className="sb-shrink-0 sb-flex sb-w-8 sb-h-8 sb-p-0"
          variant="outline"
          size="sm"
          pressed={indipendent}
          onPressedChange={setIndipendent}
        >
          <ScanIcon className="sb-h-4 sb-w-4" />
        </Toggle>
      </div>
    </div>
  );
};

const isIndipendent = (value: ReturnType<typeof parse>) => {
  const { top, right, bottom, left } = value;
  return top !== bottom || right !== left;
};

const parse = (value: string) => {
  const matches = value.match(/(\d+)/gm);

  const [top = 0, right = 0, bottom = 0, left = 0] =
    matches?.map((match) => +match) || [];

  switch (matches?.length) {
    case 1:
      return { top, right: top, bottom: top, left: top };
    case 2:
      return { top, bottom: top, left: right, right };
    case 3:
      return { top, right, left: right, bottom };
    default:
      return { top, right, bottom, left };
  }
};

const stringify = (value: ReturnType<typeof parse>) => {
  const { top, right, bottom, left } = value;

  if (top === right && top === bottom && top === left) {
    return `${top}px`;
  }

  if (top === bottom && right === left) {
    return `${top}px ${right}px`;
  }

  if (right === left) {
    return `${top}px ${right}px ${bottom}px`;
  }

  return `${top}px ${right}px ${bottom}px ${left}px`;
};
