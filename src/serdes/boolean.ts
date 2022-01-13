import { define } from "../define";
import { SerDes } from "../types";

export const boolean: SerDes<boolean> = define(
  (ctx, data) => void ctx.view.setUint8(ctx.i++, +data),
  (ctx) => !!ctx.view.getUint8(ctx.i++)
);
