import { define } from "../define";
import { BytesFactory } from "../types";

export const bytes: BytesFactory = (headSd) =>
  define(
    (ctx, data) => {
      const { byteLength } = data;
      headSd.ser(ctx, byteLength);
      ctx.bytes.set(data, ctx.i);
      ctx.i += byteLength;
    },
    (ctx) => {
      const byteLength = headSd.des(ctx);
      return ctx.bytes.subarray(ctx.i, (ctx.i += byteLength));
    }
  );
