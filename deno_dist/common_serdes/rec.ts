import { define } from "../define.ts";
import { Serdes } from "../types/index.ts";

export type RecFactory = <T>(sd: () => Serdes<T>) => Serdes<T>;

export const rec: RecFactory = (sd) =>
  define(
    (ctx, data) => sd().ser(ctx, data),
    (ctx) => sd().des(ctx)
  );
