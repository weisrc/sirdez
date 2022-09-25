import { ClazzSerdes } from "../serdes";

interface Ext<T> extends ClazzSerdes<T> {
  id: number;
}

export function fixext<T>(id: number, serdes: ClazzSerdes<T>): Ext<T> {
  return {
    id,
    ...serdes,
  };
}