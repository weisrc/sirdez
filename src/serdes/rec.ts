import { define } from "../define";
import { Serdes } from "../types";

export type RecFactory = <T>(sd: () => Serdes<T>) => Serdes<T>;

export const rec: RecFactory = (sd) =>
  define(
    (ctx, data) => sd().ser(ctx, data),
    (ctx) => sd().des(ctx)
  );
