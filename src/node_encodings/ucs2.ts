import { Encoding } from "../types";

const { ucs2Write, ucs2Slice } = Buffer.prototype;

export const ucs2: Encoding<string> = {
  encode(ctx, data) {
    ctx.i += ucs2Write.call(ctx.bytes, data, ctx.i);
  },
  decode: (ctx, end) =>
    ucs2Slice.call(ctx.bytes, ctx.i, (ctx.i = end))
};
