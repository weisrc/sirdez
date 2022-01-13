import { asyncDefine } from "../asyncDefine";
import { AsyncOptionalFactory } from "../types";

export const asyncOptional: AsyncOptionalFactory = (sd) =>
  asyncDefine(
    async (ctx, data) => {
      if (data == undefined) {
        ctx.view.setUint8(ctx.i++, 0);
      } else {
        ctx.view.setUint8(ctx.i++, 1);
        await sd.ser(ctx, data);
      }
    },
    async (ctx) =>
      ctx.view.getUint8(ctx.i++) ? await sd.des(ctx) : undefined
  );
