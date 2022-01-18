import { define } from "../define.ts";
import { OptionalFactory } from "../types/index.ts";

export const optional: OptionalFactory = (sd) =>
  define(
    (ctx, data) => {
      if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
      } else {
        ctx.view.setUint8(ctx.i++, 1);
        sd.ser(ctx, data);
      }
    },
    (ctx) => (ctx.view.getUint8(ctx.i++) ? sd.des(ctx) : undefined)
  );
