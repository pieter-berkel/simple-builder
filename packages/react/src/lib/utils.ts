import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const insertAt = <T extends any[]>(
  items: T | undefined,
  index: number,
  item: T[number],
) => {
  return Array.isArray(items)
    ? [...items.slice(0, index), item, ...items.slice(index)]
    : [item];
};

// create a function called parsePadding that accepts a padding string for example:
// "24px 16px 8px 4px" or "24px 16px" or "24px" or "24px 16px 8px" or "24px 16px 8px 16px"
// and returns an object with the following properties:
// top: "24", right: "16", bottom: "8", left: "4"

export const spacing = {
  parse: (input: string) => {
    const matches = input.match(/(\d+)/gm);

    const [top = 0, right, bottom, left] =
      matches?.map((match) => +match) || [];

    return {
      top,
      right: right || top,
      bottom: bottom || top,
      left: left || right || top,
    };
  },
  isIndipendent: (input: string) => {
    const { top, right, bottom, left } = spacing.parse(input);
    return top !== bottom || right !== left;
  },
};
