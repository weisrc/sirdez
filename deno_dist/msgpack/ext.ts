import { ClazzSerdes } from "../common_serdes/index.ts";

interface Ext<T> extends ClazzSerdes<T> {
  id: number;
}

export function fixext<T>(
  id: number,
  serdes: ClazzSerdes<T>
): Ext<T> {
  return {
    id,
    ...serdes
  };
}
