import { define } from "../define";
import { BytesFactory } from "../types";

export const bytes: BytesFactory = (headSd) =>
  define(
    (ctx, data) => {
      const { byteLength } = data;
      headSd.ser(ctx, byteLength);
      const { i } = ctx;
      ctx.i += byteLength;
      ctx.bytes.set(data, i);
    },
    (ctx) => {
      const byteLength = headSd.des(ctx);
      return ctx.bytes.subarray(ctx.i, (ctx.i += byteLength));
    }
  );
