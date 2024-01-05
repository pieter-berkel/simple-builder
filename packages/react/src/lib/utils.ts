import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  prefix: "sb-",
});

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

export const spacing = {
  parse: (input: string) => {
    const matches = input.match(/(\d+)/gm);

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
  },
  isIndipendent: (input: string) => {
    const { top, right, bottom, left } = spacing.parse(input);
    return top !== bottom || right !== left;
  },
};
