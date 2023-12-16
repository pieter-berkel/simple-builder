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
